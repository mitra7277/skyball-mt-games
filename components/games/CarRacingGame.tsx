"use client";
import { useEffect, useRef, useState } from "react";

type Traffic = { lane: number; depth: number; color: string };
type Racer = { lane: number; lanePosition: number; distance: number; traffic: Traffic[]; nextCar: number; active: boolean; paused: boolean; over: boolean };
type Command = "start" | "pause" | "restart" | "left" | "right";

export default function CarRacingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const racerRef = useRef<Racer>({ lane: 1, lanePosition: 1, distance: 0, traffic: [], nextCar: 0.9, active: false, paused: false, over: false });
  const commandRef = useRef<(command: Command) => void>(() => undefined);
  const [phase, setPhase] = useState<"ready" | "running" | "paused" | "over">("ready");
  const [distance, setDistance] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    try { setBest(Number(localStorage.getItem("mt-racing-best")) || 0); }
    catch (error) { console.warn("Could not read the racing best distance from browser storage.", error); }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const game = racerRef.current;
    let raf = 0;
    let last = 0;
    let lastRender = 0;
    let lastUi = 0;
    let swipeStart: number | null = null;
    const reset = (begin: boolean) => {
      Object.assign(game, { lane: 1, lanePosition: 1, distance: 0, traffic: [], nextCar: 0.8, active: begin, paused: false, over: false });
      setDistance(0); setPhase(begin ? "running" : "ready");
    };
    const action = (cmd: Command) => {
      if (cmd === "start") { if (game.over) reset(true); else { game.active = true; game.paused = false; setPhase("running"); } }
      if (cmd === "restart") reset(true);
      if (cmd === "pause" && game.active) { game.paused = !game.paused; setPhase(game.paused ? "paused" : "running"); }
      if (cmd === "left" && game.active && !game.paused && !game.over) game.lane = Math.max(0, game.lane - 1);
      if (cmd === "right" && game.active && !game.paused && !game.over) game.lane = Math.min(2, game.lane + 1);
    };
    commandRef.current = action;
    const resize = () => {
      const box = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(box.width * dpr)); canvas.height = Math.max(1, Math.round(box.height * dpr));
    };
    const onKey = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "BUTTON"].includes((event.target as HTMLElement)?.tagName)) return;
      if (["ArrowLeft", "a", "A"].includes(event.key)) { event.preventDefault(); action("left"); }
      else if (["ArrowRight", "d", "D"].includes(event.key)) { event.preventDefault(); action("right"); }
      else if (["p", "P", "Escape"].includes(event.key)) { event.preventDefault(); action("pause"); }
    };
    const onDown = (event: PointerEvent) => { swipeStart = event.clientX; };
    const onUp = (event: PointerEvent) => {
      if (swipeStart === null) return;
      const dx = event.clientX - swipeStart;
      if (Math.abs(dx) > 24) action(dx < 0 ? "left" : "right");
      swipeStart = null;
    };
    const polygon = (points: Array<[number, number]>, color: string) => {
      ctx.fillStyle = color; ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill();
    };
    const drawCar = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = "rgba(0,0,0,.4)"; ctx.beginPath(); ctx.ellipse(x, y + height * 0.45, width * 0.52, height * 0.16, 0, 0, Math.PI * 2); ctx.fill();
      polygon([[x - width * .44, y + height * .38], [x - width * .36, y - height * .12], [x - width * .23, y - height * .48], [x + width * .22, y - height * .48], [x + width * .36, y - height * .12], [x + width * .44, y + height * .38]], color);
      polygon([[x - width * .21, y - height * .2], [x - width * .14, y - height * .4], [x + width * .14, y - height * .4], [x + width * .23, y - height * .2]], "#bae6fd");
      ctx.fillStyle = "#0f172a"; ctx.fillRect(x - width * .48, y + height * .06, width * .12, height * .22); ctx.fillRect(x + width * .36, y + height * .06, width * .12, height * .22);
      ctx.fillStyle = "#fef08a"; ctx.fillRect(x - width * .33, y + height * .27, width * .13, height * .05); ctx.fillRect(x + width * .2, y + height * .27, width * .13, height * .05);
    };
    const paint = (now: number) => {
      if (now - lastRender < 32) { raf = requestAnimationFrame(paint); return; }
      lastRender = now;
      const w = canvas.width; const h = canvas.height; const horizon = h * 0.23;
      const bg = ctx.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, "#160a36"); bg.addColorStop(.46, "#312e81"); bg.addColorStop(1, "#080d1f"); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#f0abfc"; ctx.globalAlpha = .85; ctx.beginPath(); ctx.arc(w * .77, h * .14, h * .065, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      const lx = w * .27; const rx = w * .73;
      polygon([[lx, horizon], [rx, horizon], [w * .98, h], [w * .02, h]], "#15172f");
      ctx.strokeStyle = "#22d3ee"; ctx.lineWidth = Math.max(2, w * .004);
      for (const [a, b] of [[lx, w * .02], [rx, w * .98]]) { ctx.beginPath(); ctx.moveTo(a, horizon); ctx.lineTo(b, h); ctx.stroke(); }
      for (const divider of [1 / 3, 2 / 3]) {
        ctx.beginPath(); ctx.moveTo(w * (0.5 + (divider - 0.5) * .46), horizon); ctx.lineTo(w * divider, h); ctx.stroke();
      }
      if (game.active && !game.paused && !game.over) {
        const dt = Math.min(.04, Math.max(0, (now - last) / 1000));
        const speed = .3 + Math.min(.55, game.distance / 950);
        game.distance += dt * (48 + speed * 52);
        game.lanePosition += (game.lane - game.lanePosition) * Math.min(1, dt * 10);
        game.nextCar -= dt;
        if (game.nextCar <= 0) {
          const lane = Math.floor(Math.random() * 3);
          game.traffic.push({ lane, depth: 0, color: ["#fb7185", "#a78bfa", "#f59e0b", "#34d399"][Math.floor(Math.random() * 4)] });
          game.nextCar = Math.max(.45, 1.25 - game.distance / 1900) + Math.random() * .28;
        }
        for (const traffic of game.traffic) {
          traffic.depth += dt * speed;
          if (traffic.depth > .79 && traffic.depth < .9 && traffic.lane === Math.round(game.lanePosition)) {
            game.over = true; game.active = false; setPhase("over");
          }
        }
        game.traffic = game.traffic.filter((car) => car.depth < 1.06);
      }
      for (let i = 0; i < 12; i++) {
        const z = ((i / 12 + (game.distance / 75) % 1) % 1); const y = horizon + z * z * (h - horizon);
        ctx.strokeStyle = `rgba(196,181,253,${.12 + .3 * z})`; ctx.lineWidth = 1 + z * 2;
        ctx.beginPath(); ctx.moveTo(w * (.27 - z * .25), y); ctx.lineTo(w * (.73 + z * .25), y); ctx.stroke();
      }
      for (const car of game.traffic) {
        const z = car.depth; const x = w * (.5 + (car.lane - 1) * (.15 + z * .22)); const y = horizon + z * z * h * .72;
        drawCar(x, y, w * (.035 + z * .11), h * (.045 + z * .17), car.color);
      }
      const playerX = w * (.5 + (game.lanePosition - 1) * .35);
      drawCar(playerX, h * .83, w * .13, h * .22, "#f43f5e");
      if (game.active && !game.paused && !game.over && now - lastUi > 100) { setDistance(Math.floor(game.distance)); lastUi = now; }
      last = now;
      raf = requestAnimationFrame(paint);
    };
    resize(); window.addEventListener("resize", resize); window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(paint);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("keydown", onKey); canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointerup", onUp); };
  }, []);

  useEffect(() => {
    if (phase !== "over") return;
    const result = Math.floor(racerRef.current.distance);
    setDistance(result);
    if (result <= best) return;
    setBest(result);
    try { localStorage.setItem("mt-racing-best", String(result)); }
    catch (error) { console.warn("Could not save the racing best distance to browser storage.", error); }
  }, [best, phase]);
  const command = (value: Command) => commandRef.current(value);

  return (
    <section aria-label="Neon Drift racing game" className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 px-4 py-3 text-white"><p className="m-0 font-bold">Distance <span className="text-cyan-300">{distance} m</span><span className="mx-3 text-slate-600">·</span>Best <span className="text-amber-300">{best} m</span></p><button type="button" onClick={() => command("pause")} className="min-h-11 rounded-lg border border-white/20 px-3 py-1.5 text-sm font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuchsia-300">{phase === "paused" ? "Resume" : "Pause"}</button></div>
      <div className="relative h-[52dvh] min-h-[310px] max-h-[560px] touch-none">
        <canvas ref={canvasRef} aria-label="Three-lane racing road. Use left and right arrow keys or touch controls." className="h-full w-full" />
        {(phase === "ready" || phase === "paused" || phase === "over") && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 p-4 text-center text-white backdrop-blur-sm"><div className="max-w-sm rounded-2xl border border-white/20 bg-slate-950/90 p-6 shadow-2xl"><p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-fuchsia-300">{phase === "over" ? "Race over" : phase === "paused" ? "Pit stop" : "Ready to race"}</p><h3 className="m-0 text-2xl font-black">{phase === "over" ? `${distance} m` : phase === "paused" ? "Race paused" : "Neon Drift"}</h3><p className="my-3 text-sm text-slate-300">{phase === "over" ? "Traffic caught up. Find a clear lane and try again." : "Steer between lanes to dodge oncoming traffic."}</p><button type="button" onClick={() => command(phase === "over" ? "restart" : phase === "paused" ? "pause" : "start")} className="min-h-11 rounded-xl bg-amber-300 px-6 py-2 font-extrabold text-slate-950">{phase === "over" ? "Race again" : phase === "paused" ? "Resume race" : "Start racing"}</button></div></div>}
      </div>
      <div className="flex items-center justify-center gap-5 bg-slate-900 px-3 pt-3 sm:hidden" style={{ paddingBottom: "calc(.75rem + env(safe-area-inset-bottom))" }}><button type="button" aria-label="Steer left" onClick={() => command("left")} className="h-12 min-w-20 rounded-xl bg-white/10 text-2xl font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">←</button><button type="button" aria-label="Steer right" onClick={() => command("right")} className="h-12 min-w-20 rounded-xl bg-white/10 text-2xl font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">→</button><button type="button" aria-label="Restart" onClick={() => command("restart")} className="h-12 min-w-16 rounded-xl border border-white/20 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">↻</button></div>
      <p className="m-0 px-4 pb-3 text-center text-xs text-slate-400">A/D or ←/→ to change lanes · P to pause · avoid the traffic</p>
    </section>
  );
}
