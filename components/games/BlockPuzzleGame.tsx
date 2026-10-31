"use client";
import { useEffect, useMemo, useState } from "react";

type Cell = [number, number];
type Shape = { name: string; cells: Cell[]; color: string };
const SHAPES: Shape[] = [
  { name: "Dot", cells: [[0, 0]], color: "bg-cyan-400" },
  { name: "Pair", cells: [[0, 0], [1, 0]], color: "bg-sky-400" },
  { name: "Line three", cells: [[0, 0], [1, 0], [2, 0]], color: "bg-blue-400" },
  { name: "Line four", cells: [[0, 0], [1, 0], [2, 0], [3, 0]], color: "bg-violet-400" },
  { name: "Square", cells: [[0, 0], [1, 0], [0, 1], [1, 1]], color: "bg-fuchsia-400" },
  { name: "Corner", cells: [[0, 0], [0, 1], [0, 2], [1, 2]], color: "bg-amber-400" },
  { name: "Tee", cells: [[0, 0], [1, 0], [2, 0], [1, 1]], color: "bg-emerald-400" },
  { name: "Zigzag", cells: [[0, 0], [1, 0], [1, 1], [2, 1]], color: "bg-rose-400" },
  { name: "Larger corner", cells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], color: "bg-orange-400" },
];
type Piece = Shape & { id: number };
type Board = boolean[][];
const emptyBoard = (): Board => Array.from({ length: 10 }, () => Array(10).fill(false) as boolean[]);
const fits = (board: Board, shape: Shape, row: number, col: number) => shape.cells.every(([x, y]) => row + y < 10 && col + x < 10 && !board[row + y]?.[col + x]);
const rollPieces = (): Piece[] => Array.from({ length: 3 }, (_, i) => ({ ...SHAPES[Math.floor(Math.random() * SHAPES.length)], id: Date.now() + i + Math.floor(Math.random() * 10000) }));
const anyMove = (board: Board, pieces: Piece[]) => pieces.some((piece) => board.some((row, r) => row.some((_, c) => fits(board, piece, r, c))));

export default function BlockPuzzleGame() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [pieces, setPieces] = useState<Piece[]>(rollPieces);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [message, setMessage] = useState("Choose a block shape, then choose where to place its top-left cell.");

  useEffect(() => {
    try { setBest(Number(localStorage.getItem("mt-block-puzzle-best")) || 0); }
    catch (error) { console.warn("Could not read the puzzle best score from browser storage.", error); }
  }, []);
  useEffect(() => {
    if (!over || score <= best) return;
    setBest(score);
    try { localStorage.setItem("mt-block-puzzle-best", String(score)); }
    catch (error) { console.warn("Could not save the puzzle best score to browser storage.", error); }
  }, [best, over, score]);

  const preview = useMemo(() => selected === null ? null : pieces[selected], [pieces, selected]);
  function placeAt(row: number, col: number) {
    if (selected === null || !preview || over) { setMessage("Select one of the available shapes first."); return; }
    if (!fits(board, preview, row, col)) { setMessage(`That ${preview.name.toLowerCase()} does not fit there. Try an open area on the board.`); return; }
    const next = board.map((line) => [...line]);
    for (const [x, y] of preview.cells) next[row + y][col + x] = true;
    const rows = new Set<number>(); const cols = new Set<number>();
    for (let r = 0; r < 10; r++) if (next[r].every(Boolean)) rows.add(r);
    for (let c = 0; c < 10; c++) if (next.every((line) => line[c])) cols.add(c);
    for (const r of rows) next[r].fill(false);
    for (const c of cols) for (let r = 0; r < 10; r++) next[r][c] = false;
    const cleared = rows.size + cols.size;
    const nextScore = score + preview.cells.length + cleared * 20;
    const rest = pieces.filter((_, index) => index !== selected);
    const nextPieces = rest.length ? rest : rollPieces();
    setBoard(next); setPieces(nextPieces); setScore(nextScore); setSelected(null);
    setMessage(cleared ? `Cleared ${cleared} line${cleared === 1 ? "" : "s"}! Choose your next shape.` : "Nice placement. Choose another shape.");
    setOver(!anyMove(next, nextPieces));
  }
  function restart() {
    setBoard(emptyBoard()); setPieces(rollPieces()); setSelected(null); setScore(0); setOver(false);
    setMessage("Choose a block shape, then choose where to place its top-left cell.");
  }

  return (
    <section aria-label="Block Bloom puzzle game" className="rounded-2xl border border-sky-100 bg-slate-950 p-4 text-white shadow-xl sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div><p className="m-0 text-xs font-extrabold uppercase tracking-[.2em] text-cyan-300">Block Bloom</p><p className="mb-0 mt-1 text-sm text-slate-300">Score <strong className="text-xl text-white">{score}</strong><span className="mx-3 text-slate-600">·</span>Best <strong className="text-amber-300">{best}</strong></p></div>
        <button type="button" onClick={restart} className="min-h-10 rounded-xl border border-white/20 px-4 py-2 text-sm font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">Restart</button>
      </div>
      <p className="mb-4 min-h-10 text-sm text-slate-300" aria-live="polite">{over ? `No available shape fits. Final score: ${score}.` : message}</p>
      <div className="mx-auto grid aspect-square w-full max-w-[500px] grid-cols-10 gap-1 rounded-xl bg-slate-800 p-2" role="grid" aria-label="10 by 10 block puzzle board">
        {board.map((line, r) => line.map((filled, c) => <button key={`${r}-${c}`} type="button" role="gridcell" aria-label={`Row ${r + 1}, column ${c + 1}${filled ? ", filled" : ""}`} onClick={() => placeAt(r, c)} disabled={over} className={`aspect-square rounded-sm transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${filled ? "bg-cyan-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,.5)]" : "bg-slate-700 hover:bg-slate-600"}`} />))}</div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
        {pieces.map((piece, index) => <button key={piece.id} type="button" aria-label={`Select ${piece.name} shape`} aria-pressed={selected === index} onClick={() => { setSelected(index); setMessage(`${piece.name} selected. Choose the top-left board cell for this shape.`); }} className={`flex min-h-24 flex-col items-center justify-center rounded-xl border p-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${selected === index ? "border-amber-300 bg-amber-300/10" : "border-white/15 bg-white/5 hover:bg-white/10"}`}>
          <span className="mb-1 text-[11px] font-bold text-slate-300">{piece.name}</span>
          <span className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(...piece.cells.map(([x]) => x)) + 1}, 13px)` }} aria-hidden="true">
            {Array.from({ length: (Math.max(...piece.cells.map(([, y]) => y)) + 1) * (Math.max(...piece.cells.map(([x]) => x)) + 1) }, (_, cell) => {
              const width = Math.max(...piece.cells.map(([x]) => x)) + 1;
              const hasCell = piece.cells.some(([x, y]) => y * width + x === cell);
              return <span key={cell} className={`h-[13px] w-[13px] rounded-[3px] ${hasCell ? piece.color : "opacity-0"}`} />;
            })}
          </span>
        </button>)}
      </div>
      {over && <div className="mt-5 rounded-xl border border-rose-300/40 bg-rose-400/10 p-4 text-center"><p className="mb-3 font-bold">Board full — game over</p><button type="button" onClick={restart} className="rounded-lg bg-amber-300 px-5 py-2 font-extrabold text-slate-950">Play again</button></div>}
      <p className="mb-0 mt-4 text-center text-xs text-slate-400">Tap a shape, then tap a board cell to place it. Clear complete rows or columns.</p>
    </section>
  );
}
