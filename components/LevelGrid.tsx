"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LEVELS } from "@/lib/levels";

type Save = { unlocked: number; best: Record<string, number> };

export default function LevelGrid() {
  const [save, setSave] = useState<Save>({ unlocked: 1, best: {} });
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("sb") || "{}");
      setSave({ unlocked: Number(raw.unlocked) || 1, best: raw.best || {} });
    } catch { /* storage unavailable: keep defaults */ }
  }, []);
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5" aria-label="Level select">
      {LEVELS.map((l) => {
        const open = l.id <= save.unlocked;
        const best = save.best[String(l.id - 1)];
        const inner = (
          <>
            <span className="block text-2xl font-extrabold">{l.id}</span>
            <span className="block text-xs">{open ? (best ? `Best ${best.toFixed(1)}s` : "Not played") : "Locked"}</span>
          </>
        );
        return (
          <li key={l.id}>
            {open ? (
              <Link href={`/play?level=${l.id}`} className="block rounded-xl bg-yellow-400 p-3 text-center text-slate-900 shadow hover:bg-yellow-300">{inner}</Link>
            ) : (
              <span aria-disabled="true" className="block rounded-xl bg-slate-300 p-3 text-center text-slate-600">{inner}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
