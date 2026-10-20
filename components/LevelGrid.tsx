"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LEVELS } from "@/lib/levels";

type Save = { unlocked: number; best: Record<string, number>; bestScore: Record<string, number>; completed: Record<string, boolean> };
const emptySave: Save = { unlocked: 1, best: {}, bestScore: {}, completed: {} };

export default function LevelGrid() {
  const [save, setSave] = useState<Save>(emptySave);
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("sb") || "{}");
      setSave({
        unlocked: Number.isInteger(+raw.unlocked) && +raw.unlocked >= 1 && +raw.unlocked <= 40 ? +raw.unlocked : 1,
        best: raw.best && typeof raw.best === "object" ? raw.best : {},
        bestScore: raw.bestScore && typeof raw.bestScore === "object" ? raw.bestScore : {},
        completed: raw.completed && typeof raw.completed === "object" ? raw.completed : {},
      });
    } catch { /* Keep the first level available if browser storage is unavailable. */ }
  }, []);

  function resetProgress() {
    if (!window.confirm("Reset all unlocked levels, completions, and best times on this device?")) return;
    try { localStorage.removeItem("sb"); } catch { /* The current view still resets. */ }
    setSave(emptySave);
  }

  const completed = Object.values(save.completed).filter(Boolean).length;
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm">
        <p className="m-0 font-semibold text-slate-700">{completed} of 40 cleared <span className="mx-2 text-sky-300">·</span> {save.unlocked} unlocked</p>
        <button type="button" onClick={resetProgress} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-700">Reset progress</button>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5" aria-label="Level select">
        {LEVELS.map((level) => {
          const open = level.id <= save.unlocked;
          const done = !!save.completed[String(level.id - 1)];
          const card = (
            <>
              <span className="flex items-center justify-between text-xs font-bold uppercase tracking-[.14em] text-sky-700"><span>Level {String(level.id).padStart(2, "0")}</span><span aria-label={done ? "Completed" : open ? "Unlocked" : "Locked"}>{done ? "✓" : open ? "●" : "🔒"}</span></span>
              <span className="mt-2 block text-base font-extrabold text-slate-900">{level.name}</span>
              <span className="mt-1 block min-h-10 text-xs leading-relaxed text-slate-600">{level.summary}</span>
              <span className="mt-3 flex items-center justify-between border-t border-slate-200/80 pt-2 text-xs font-semibold text-slate-600"><span>{save.best[String(level.id - 1)] ? `Best ${Number(save.best[String(level.id - 1)]).toFixed(1)}s` : open ? "Ready to play" : "Complete prior level"}</span><span>{level.stars} ★</span></span>
            </>
          );
          return <li key={level.id}>{open ? <Link href={`/play?level=${level.id}`} aria-label={`Play level ${level.id}: ${level.name}`} className={`block h-full rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-700 ${done ? "border-emerald-300 bg-emerald-50" : "border-sky-100 bg-white"}`}>{card}</Link> : <div aria-disabled="true" className="h-full rounded-2xl border border-slate-200 bg-slate-100/80 p-4 opacity-75">{card}</div>}</li>;
        })}
      </ul>
    </>
  );
}
