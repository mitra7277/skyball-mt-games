"use client";
import { useEffect, useRef, useState } from "react";

type Thing = { lane: number; depth: number; kind: "barrier" | "orb" };
type Runner = { lane: number; jump: number; distance: number; score: number; things: Thing[]; spawnAt: number; active: boolean; paused: boolean; over: boolean; time: number };
type Command = "start" | "pause" | "restart" | "left" | "right" | "jump";

export default function EndlessRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runnerRef = useRef<Runner>({ lane: 1, jump: 0, distance: 0, score: 0, things: [], spawnAt: 0, active: false, paused: false, over: false, time: 0 });
  const commandRef = useRef<(command: Command) => void>(() => undefined);
  const [phase, setPhase] = useState<"ready" | "running" | "paused" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    try { setBest(Number(localStorage.getItem("mt-runner-best")) || 0); }
    catch (error) { console.warn("Could not read the runner best score from browser storage.", error); }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const game = runnerRef.current;
    let raf = 0;
    let last = 0;
    let paintTime = 0;
    let pointerStart: { x: number; y: number } | null = null;
    const laneX = (lane: number, depth: number) => canvas.width * (0.5 + (lane - 1) * (0.16 + depth * 0.21));
    const reset = (begin: boolean) => {
      Object.assign(game, { lane: 1, jump: 0, distance: 0, score: 0, things: [], spawnAt: 0.8, active: begin, paused: false, over: false, time: 0 });
      setScore(0);
      setPhase(begin ? "running" : "ready");
    };
    const action = (cmd: Command) => {
      if (cmd === "start") { if (game.over) reset(true); else { game.active = true; game.paused = false; setPhase("running"); } }
      if (cmd === "restart") reset(true);
      if (cmd === "pause" && game.active) { game.paused = !game.paused; setPhase(game.paused ? "paused" : "running"); }
      if (cmd === "left" && game.active && !game.paused && !game.over) game.lane = Math.max(0, game.lane - 1);
      if (cmd === "right" && game.active && !game.paused && !game.over) game.lane = Math.min(2, game.lane + 1);
      if (cmd === "jump" && game.active && !game.paused && !game.over && game.jump <= 0) game.jump = 0.78;
    };
    commandRef.current = action;
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(box.width * dpr));
      canvas.height = Math.max(1, Math.round(box.height * dpr));
    };
    const onKey = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "BUTTON"].includes((event.target as HTMLElement)?.tagName)) return;
      if (["ArrowLeft", "a", "A"].includes(event.key)) { event.preventDefault(); action("left"); }
      else if (["ArrowRight", "d", "D"].includes(event.key)) { event.preventDefault(); action("right"); }
      else if (["ArrowUp", " ", "w", "W"].includes(event.key)) { event.preventDefault(); action("jump"); }
      else if (["p", "P", "Escape"].includes(event.key)) { event.preventDefault(); action("pause"); }
    };
    const onPointerDown = (event: PointerEvent) => { pointerStart = { x: event.clientX, y: event.clientY }; };
    const onPointerUp = (event: PointerEvent) => {
      if (!pointerStart) return;
      const dx = event.clientX - pointerStart.x; const dy = event.clientY - pointerStart.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) > 24) action(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "jump" : "pause"));
      pointerStart = null;
    };
    const paint = (now: number) => {
      const w = canvas.width; const h = canvas.height;
      const horizon = h * 0.25;
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "#11113a"); gradient.addColorStop(0.52, "#40328b"); gradient.addColorStop(1, "#101a38");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#c4b5fd"; ctx.globalAlpha = 0.75;
      for (let i = 0; i < 30; i++) { const x = ((i * 193 + 37) % 997) / 997 * w; const y = ((i * 71 + 13) % 191) / 191 * horizon; ctx.fillRect(x, y, Math.max(2, w * 0.002), Math.max(2, w * 0.002)); }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#1e1b4b"; ctx.beginPath(); ctx.moveTo(w * 0.28, horizon); ctx.lineTo(w * 0.72, horizon); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#67e8f9"; ctx.lineWidth = Math.max(2, w * 0.004);
      for (const edge of [0.28, 0.72]) { ctx.beginPath(); ctx.moveTo(w * edge, horizon); ctx.lineTo(w * (edge < 0.5 ? 0 : 1), h); ctx.stroke(); }
      for (const divider of [1 / 3, 2 / 3]) { ctx.beginPath(); ctx.moveTo(w * (0.5 + (divider - 0.5) * 0.44), horizon); ctx.lineTo(w * divider, h); ctx.stroke(); }
      if (game.active && !game.paused && !game.over) {
        const dt = Math.min(0.04, Math.max(0, (now - last) / 1000));
        game.time += dt;
        const speed = 0.34 + Math.min(0.42, game.distance / 850);
        game.distance += dt * (95 + speed * 110);
        if (game.jump > 0) game.jump = Math.max(0, game.jump - dt);
        game.spawnAt -= dt;
        if (game.spawnAt <= 0) {
          const lane = Math.floor(Math.random() * 3);
          const kind = Math.random() < 0.33 ? "orb" : "barrier";
          game.things.push({ lane, depth: 0, kind });
          game.spawnAt = Math.max(0.48, 1.15 - game.distance / 2400) + Math.random() * 0.24;
        }
        for (const thing of game.things) {
          thing.depth += dt * speed;
          if (thing.depth > 0.78 && thing.depth < 0.86 && thing.lane === game.lane) {
            if (thing.kind === "orb") { game.score += 25; thing.depth = 1.1; }
            else if (game.jump < 0.2) { game.over = true; game.active = false; setPhase("over"); }
          }
        }
        game.things = game.things.filter((thing) => thing.depth < 1.05);
      }
      for (let line = 0; line < 13; line++) {
        const z = ((line / 13 + (game.distance / 110) % 1) % 1);
        const y = horizon + z * z * (h - horizon);
        const alpha = 0.12 + z * 0.33;
        ctx.strokeStyle = `rgba(165,180,252,${alpha})`; ctx.lineWidth = 1 + z * 2;
        ctx.beginPath(); ctx.moveTo(w * (0.28 - z * 0.28), y); ctx.lineTo(w * (0.72 + z * 0.28), y); ctx.stroke();
      }
      for (const thing of game.things) {
        const z = thing.depth; const x = laneX(thing.lane, z); const y = horizon + z * z * (h * 0.72);
        const size = 8 + z * w * 0.055;
        if (thing.kind === "orb") {
          ctx.fillStyle = "#fde047"; ctx.shadowColor = "#facc15"; ctx.shadowBlur = size;
          ctx.beginPath(); ctx.arc(x, y - size, size * 0.38, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "#fb7185"; ctx.shadowColor = "#f43f5e"; ctx.shadowBlur = size * 0.4;
          ctx.fillRect(x - size, y - size * 1.35, size * 2, size * 1.35); ctx.shadowBlur = 0;
          ctx.fillStyle = "#fecdd3"; ctx.fillRect(x - size * 0.7, y - size * 1.15, size * 0.4, size * 0.3);
        }
      }
      const playerX = laneX(game.lane, 0.83);
      const jumpHeight = game.jump > 0 ? Math.sin((1 - game.jump / 0.78) * Math.PI) * h * 0.12 : 0;
      const playerY = h * 0.87 - jumpHeight;
      ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(playerX, h * 0.89, w * 0.045, h * 0.018, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#22d3ee"; ctx.strokeStyle = "#ecfeff"; ctx.lineWidth = Math.max(2, w * 0.005);
      ctx.beginPath(); ctx.roundRect(playerX - w * 0.032, playerY - h * 0.1, w * 0.064, h * 0.1, w * 0.018); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#082f49"; ctx.fillRect(playerX - w * 0.019, playerY - h * 0.075, w * 0.038, h * 0.025);
      if (game.active && !game.paused && !game.over && now - paintTime > 100) {
        setScore(Math.floor(game.distance) + game.score);
        paintTime = now;
      }
      last = now;
      raf = requestAnimationFrame(paint);
    };
    resize(); window.addEventListener("resize", resize); window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointerDown); canvas.addEventListener("pointerup", onPointerUp);
    raf = requestAnimationFrame(paint);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("keydown", onKey); canvas.removeEventListener("pointerdown", onPointerDown); canvas.removeEventListener("pointerup", onPointerUp); };
  }, []);

  useEffect(() => {
    if (phase !== "over") return;
    const finalScore = Math.floor(runnerRef.current.distance) + runnerRef.current.score;
    setScore(finalScore);
    if (finalScore <= best) return;
    setBest(finalScore);
    try { localStorage.setItem("mt-runner-best", String(finalScore)); }
    catch (error) { console.warn("Could not save the runner best score to browser storage.", error); }
  }, [best, phase]);

  const command = (value: Command) => commandRef.current(value);
  return (
    <section aria-label="Cloud Sprint game" className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 px-4 py-3 text-white">
        <p className="m-0 font-bold">Distance <span className="text-cyan-300">{score} m</span><span className="mx-3 text-slate-600">·</span>Best <span className="text-amber-300">{best} m</span></p>
        <button type="button" onClick={() => command("pause")} className="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-bold hover:bg-white/10">{phase === "paused" ? "Resume" : "Pause"}</button>
      </div>
      <div className="relative h-[52dvh] min-h-[310px] max-h-[560px] touch-none">
        <canvas ref={canvasRef} aria-label="Three-lane runner track. Use arrow keys or touch controls." className="h-full w-full" />
        {(phase === "ready" || phase === "over" || phase === "paused") && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 p-4 text-center text-white backdrop-blur-sm"><div className="max-w-sm rounded-2xl border border-white/20 bg-slate-950/90 p-6 shadow-2xl"><p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-cyan-300">{phase === "over" ? "Run complete" : phase === "paused" ? "Taking a breather?" : "Ready when you are"}</p><h3 className="m-0 text-2xl font-black">{phase === "over" ? `${score} m` : phase === "paused" ? "Game paused" : "Cloud Sprint"}</h3><p className="my-3 text-sm text-slate-300">{phase === "over" ? "Dodge the barriers and see if you can beat your best distance." : "Switch lanes, jump over barriers, and collect the glowing orbs."}</p><button type="button" onClick={() => command(phase === "over" ? "restart" : phase === "paused" ? "pause" : "start")} className="min-h-11 rounded-xl bg-amber-300 px-6 py-2 font-extrabold text-slate-950">{phase === "over" ? "Run again" : phase === "paused" ? "Resume run" : "Start running"}</button></div></div>}
      </div>
      <div className="flex items-center justify-center gap-3 bg-slate-900 p-3 sm:hidden">
        <button type="button" aria-label="Move left" onClick={() => command("left")} className="h-12 min-w-14 rounded-xl bg-white/10 text-xl font-black text-white">←</button>
        <button type="button" aria-label="Jump" onClick={() => command("jump")} className="h-12 min-w-20 rounded-xl bg-cyan-500 font-extrabold text-slate-950">Jump</button>
        <button type="button" aria-label="Move right" onClick={() => command("right")} className="h-12 min-w-14 rounded-xl bg-white/10 text-xl font-black text-white">→</button>
        <button type="button" aria-label="Restart" onClick={() => command("restart")} className="h-12 min-w-14 rounded-xl border border-white/20 text-sm font-bold text-white">↻</button>
      </div>
      <p className="m-0 px-4 pb-3 text-center text-xs text-slate-400">A/D or ←/→ to switch lanes · Space/↑ to jump · P to pause</p>
    </section>
  );
}
