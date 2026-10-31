"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Gem = number;
type Position = { row: number; column: number };
type Board = Gem[][];
const SIZE = 8;
const GEM_COUNT = 6;
const COLORS = ["#fb7185", "#fbbf24", "#34d399", "#38bdf8", "#a78bfa", "#f472b6"];
const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function findMatches(board: Board): Set<string> {
  const matches = new Set<string>();
  const addRun = (run: Position[]) => {
    if (run.length >= 3) run.forEach(({ row, column }) => matches.add(`${row}:${column}`));
  };
  for (let row = 0; row < SIZE; row++) {
    let run: Position[] = [];
    for (let column = 0; column <= SIZE; column++) {
      if (column < SIZE && board[row][column] === board[row][run.length ? run[0].column : column]) {
        run.push({ row, column });
      } else {
        addRun(run);
        run = column < SIZE ? [{ row, column }] : [];
      }
    }
  }
  for (let column = 0; column < SIZE; column++) {
    let run: Position[] = [];
    for (let row = 0; row <= SIZE; row++) {
      if (row < SIZE && board[row][column] === board[run.length ? run[0].row : row][column]) {
        run.push({ row, column });
      } else {
        addRun(run);
        run = row < SIZE ? [{ row, column }] : [];
      }
    }
  }
  return matches;
}

function makeBoard(random: () => number = Math.random): Board {
  const board: Board = [];
  for (let row = 0; row < SIZE; row++) {
    board[row] = [];
    for (let column = 0; column < SIZE; column++) {
      let gem = Math.floor(random() * GEM_COUNT);
      while (
        (column > 1 && board[row][column - 1] === gem && board[row][column - 2] === gem)
        || (row > 1 && board[row - 1][column] === gem && board[row - 2][column] === gem)
      ) gem = (gem + 1) % GEM_COUNT;
      board[row][column] = gem;
    }
  }
  return board;
}

function swapGems(board: Board, first: Position, second: Position): Board {
  const next = board.map((row) => [...row]);
  [next[first.row][first.column], next[second.row][second.column]] = [next[second.row][second.column], next[first.row][first.column]];
  return next;
}

function settleBoard(board: Board, matches: Set<string>): Board {
  const next = board.map((row) => [...row]);
  for (let column = 0; column < SIZE; column++) {
    const remaining = next.map((row, index) => matches.has(`${index}:${column}`) ? null : row[column]).filter((gem): gem is Gem => gem !== null);
    const refill = Array.from({ length: SIZE - remaining.length }, () => Math.floor(Math.random() * GEM_COUNT));
    const columnGems = [...refill, ...remaining];
    for (let row = 0; row < SIZE; row++) next[row][column] = columnGems[row];
  }
  return next;
}

function hasMove(board: Board): boolean {
  for (let row = 0; row < SIZE; row++) for (let column = 0; column < SIZE; column++) {
    for (const [dr, dc] of [[0, 1], [1, 0]]) {
      const nextRow = row + dr;
      const nextColumn = column + dc;
      if (nextRow < SIZE && nextColumn < SIZE && findMatches(swapGems(board, { row, column }, { row: nextRow, column: nextColumn })).size) return true;
    }
  }
  return false;
}

function freshPlayableBoard(random: () => number = Math.random): Board {
  let board = makeBoard(random);
  while (findMatches(board).size || !hasMove(board)) board = makeBoard(random);
  return board;
}

function initialPlayableBoard(): Board {
  let seed = 0x4d544741;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  return freshPlayableBoard(random);
}

export default function BlockPuzzleGame() {
  const [board, setBoard] = useState<Board>(initialPlayableBoard);
  const [selected, setSelected] = useState<Position | null>(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [moves, setMoves] = useState(20);
  const [resolving, setResolving] = useState(false);
  const [phase, setPhase] = useState<"ready" | "playing" | "paused" | "won" | "lost">("ready");
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [message, setMessage] = useState("Swap neighboring gems to make a row or column of three.");
  const [preferences, setPreferences] = useState({ soundEffects: true, masterMuted: false, vibration: false });
  const resolvingRef = useRef(false);
  const restartRef = useRef<() => void>(() => undefined);
  const phaseRef = useRef(phase);
  const target = 900 + (level - 1) * 350;
  phaseRef.current = phase;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mt-match3-progress") || "{}") as { level?: number; best?: number };
      setLevel(Number.isInteger(saved.level) && saved.level! > 0 ? Math.min(saved.level!, 50) : 1);
      setBest(Number.isFinite(saved.best) && saved.best! >= 0 ? saved.best! : 0);
    } catch (error) {
      console.warn("Could not read puzzle progress from browser storage.", error);
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    try { localStorage.setItem("mt-match3-progress", JSON.stringify({ level, best })); }
    catch (error) { console.warn("Could not save puzzle progress to browser storage.", error); }
  }, [best, level, progressLoaded]);

  useEffect(() => {
    const onCommand = (event: Event) => {
      const { command } = (event as CustomEvent<{ command: string }>).detail || {};
      if (command === "restart") restartRef.current();
      if (command === "pause" && !resolvingRef.current) {
        const nextPhase = phaseRef.current === "paused" ? "playing" : phaseRef.current === "playing" ? "paused" : phaseRef.current;
        if (nextPhase !== phaseRef.current) {
          phaseRef.current = nextPhase;
          setPhase(nextPhase);
          window.dispatchEvent(new CustomEvent("mt-game-phase", { detail: { phase: nextPhase } }));
        }
      }
    };
    const onPreferences = (event: Event) => {
      const settings = (event as CustomEvent<{ soundEffects?: boolean; masterMuted?: boolean; vibration?: boolean }>).detail;
      setPreferences({
        soundEffects: settings.soundEffects !== false,
        masterMuted: settings.masterMuted === true,
        vibration: settings.vibration === true,
      });
    };
    window.addEventListener("mt-game-command", onCommand);
    window.addEventListener("mt-game-preferences", onPreferences);
    return () => {
      window.removeEventListener("mt-game-command", onCommand);
      window.removeEventListener("mt-game-preferences", onPreferences);
    };
  }, []);

  const playSound = (frequency: number, duration = 0.1) => {
    if (!preferences.soundEffects || preferences.masterMuted) return;
    window.dispatchEvent(new CustomEvent("mt-game-sound", { detail: { frequency, duration } }));
  };

  async function chooseGem(position: Position) {
    if (phase === "ready") setPhase("playing");
    if ((phase !== "ready" && phase !== "playing") || resolvingRef.current) return;
    if (!selected) {
      setSelected(position);
      return;
    }
    const distance = Math.abs(selected.row - position.row) + Math.abs(selected.column - position.column);
    if (distance !== 1) {
      setSelected(position);
      return;
    }
    const swapped = swapGems(board, selected, position);
    const initialMatches = findMatches(swapped);
    setSelected(null);
    if (!initialMatches.size) {
      setMessage("Those gems do not match yet. Try a neighboring pair that makes three.");
      playSound(180, 0.07);
      return;
    }

    resolvingRef.current = true;
    setResolving(true);
    setBoard(swapped);
    const nextMoves = moves - 1;
    setMoves(nextMoves);
    let nextBoard = swapped;
    let earned = 0;
    let chain = 0;
    let matches = initialMatches;
    while (matches.size && chain < 10) {
      chain++;
      earned += matches.size * 60 * chain;
      setBoard(nextBoard);
      setMessage(chain > 1 ? `Chain reaction ×${chain}!` : `${matches.size} gems matched!`);
      playSound(390 + chain * 95, 0.12);
      if (preferences.vibration && navigator.vibrate) navigator.vibrate(chain > 1 ? [18, 30, 18] : 16);
      await wait(180);
      nextBoard = settleBoard(nextBoard, matches);
      matches = findMatches(nextBoard);
    }
    const nextScore = score + earned;
    setScore(nextScore);
    setBoard(nextBoard);
    if (nextScore >= target) {
      setPhase("won");
      setLevel((current) => Math.min(50, current + 1));
      setBest((current) => Math.max(current, nextScore));
      setMessage(`Level ${level} complete! Your next board has a higher target.`);
      playSound(880, 0.24);
    } else if (nextMoves === 0) {
      setPhase("lost");
      setBest((current) => Math.max(current, nextScore));
      setMessage(`Move limit reached. Score ${nextScore} of ${target}; try a longer chain next time.`);
    } else if (!hasMove(nextBoard)) {
      setBoard(freshPlayableBoard());
      setMessage("No swaps remained, so the gems were reshuffled. Your score and moves are safe.");
    } else {
      setMessage(`${earned} points${chain > 1 ? ` across ${chain} cascades` : ""}. ${Math.max(0, target - nextScore)} points to the goal.`);
    }
    resolvingRef.current = false;
    setResolving(false);
  }

  function restart() {
    setBoard(freshPlayableBoard());
    setSelected(null);
    setScore(0);
    setMoves(20);
    setPhase("playing");
    phaseRef.current = "playing";
    window.dispatchEvent(new CustomEvent("mt-game-phase", { detail: { phase: "playing" } }));
    setMessage(`Reach ${target} points before your moves run out.`);
  }

  function nextLevel() {
    setBoard(freshPlayableBoard());
    setSelected(null);
    setScore(0);
    setMoves(20);
    setPhase("playing");
    phaseRef.current = "playing";
    window.dispatchEvent(new CustomEvent("mt-game-phase", { detail: { phase: "playing" } }));
    setMessage(`Level ${level} goal: ${900 + (level - 1) * 350} points in 20 moves.`);
  }

  restartRef.current = restart;
  const gemLegend = useMemo(() => ["Ruby", "Sunstone", "Leaf", "Wave", "Star", "Bloom"], []);
  return (
    <section aria-label="Prism Pop match-three game" className="overflow-hidden rounded-2xl border border-indigo-950 bg-[#10152f] text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#171d3d] px-4 py-3">
        <div>
          <p className="m-0 text-xs font-extrabold uppercase tracking-[.2em] text-fuchsia-300">Prism Pop · Level {level}</p>
          <p className="mb-0 mt-1 text-sm text-slate-300">Score <strong className="text-xl text-white">{score}</strong><span className="mx-2 text-slate-500">/ {target}</span>Best <strong className="text-amber-300">{best}</strong></p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={restart} className="min-h-11 rounded-xl border border-white/20 px-4 text-sm font-bold hover:bg-white/10">Restart</button>
        </div>
      </div>
      <div className="px-3 pb-4 pt-3 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-sm">
          <p className="m-0 font-semibold text-slate-300" aria-live="polite">{message}</p>
          <p className="m-0 shrink-0 rounded-lg bg-white/10 px-3 py-1.5 font-bold">{moves} moves</p>
        </div>
        <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/10" aria-label={`${Math.min(100, Math.round(score / target * 100))}% of level goal`}>
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 transition-[width] duration-300" style={{ width: `${Math.min(100, score / target * 100)}%` }} />
        </div>
        <div role="grid" aria-label="Eight by eight gem board" className="game-interaction mx-auto grid aspect-square w-full max-w-[500px] grid-cols-8 gap-1 rounded-2xl border border-white/10 bg-[#080d21] p-2 sm:gap-1.5 sm:p-3">
          {board.map((row, rowIndex) => row.map((gem, columnIndex) => {
            const active = selected?.row === rowIndex && selected.column === columnIndex;
            return (
              <button
                key={`${rowIndex}:${columnIndex}`}
                type="button"
                role="gridcell"
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}, ${gemLegend[gem]}`}
                aria-selected={active}
                disabled={resolving || phase === "won" || phase === "lost" || phase === "paused"}
                onClick={() => void chooseGem({ row: rowIndex, column: columnIndex })}
                className={`relative aspect-square touch-manipulation rounded-xl border p-0 transition-all duration-150 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default ${active ? "scale-90 border-white bg-white/20 shadow-[0_0_16px_rgba(255,255,255,.7)]" : "border-white/10 bg-white/[.04] hover:scale-105 hover:bg-white/10"}`}
              >
                <span aria-hidden="true" className="absolute inset-[12%] rounded-[30%] shadow-[inset_3px_4px_6px_rgba(255,255,255,.55),inset_-4px_-5px_8px_rgba(0,0,0,.32),0_2px_8px_rgba(0,0,0,.25)] transition-transform" style={{ background: `radial-gradient(circle at 30% 25%, #fff9, transparent 38%), ${COLORS[gem]}`, transform: active ? "scale(.86) rotate(45deg)" : "rotate(45deg)" }}>
                  <span className="absolute inset-[28%] rounded-full border border-white/35" />
                </span>
              </button>
            );
          }))}
        </div>
        <p className="mb-0 mt-3 text-center text-xs text-slate-400">Tap one gem, then a neighboring gem. Match three or more; longer chains earn more points.</p>
      </div>
      {(phase === "paused" || phase === "won" || phase === "lost") && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/75 p-4" role="dialog" aria-modal="true" aria-labelledby="match3-result">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#171d3d] p-6 text-center shadow-2xl">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-fuchsia-300">{phase === "paused" ? "Paused" : phase === "won" ? "Level cleared" : "Out of moves"}</p>
            <h2 id="match3-result" className="m-0 text-2xl font-black">{phase === "paused" ? "Take a breather" : phase === "won" ? `Level ${level - 1} complete!` : "One more try?"}</h2>
            <p className="my-3 text-sm text-slate-300">{phase === "paused" ? "Your board and remaining moves are waiting." : phase === "won" ? "Your progress is saved on this device. The next level raises the score goal." : `You scored ${score} of ${target} points in 20 moves.`}</p>
            <button type="button" autoFocus onClick={phase === "paused" ? () => setPhase("playing") : phase === "won" ? nextLevel : restart} className="min-h-12 rounded-xl bg-amber-300 px-6 font-extrabold text-slate-950">{phase === "paused" ? "Resume" : phase === "won" ? "Play next level" : "Try again"}</button>
          </div>
        </div>
      )}
    </section>
  );
}
