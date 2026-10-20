import type { Metadata } from "next";
import LevelGrid from "@/components/LevelGrid";
import { LEVELS } from "@/lib/levels";
export const metadata: Metadata = {
  title: "Levels",
  description: "All 10 Sky Ball levels with descriptions, star counts and your unlocked progress.",
  alternates: { canonical: "/levels" },
};
export default function LevelsPage() {
  return (
    <div className="prose-page">
      <h1>Levels</h1>
      <p>Finish a level to unlock the next. Unlocked levels open directly in the game. Progress is read from this browser.</p>
      <LevelGrid />
      <h2>Level guide</h2>
      <ol className="space-y-3">
        {LEVELS.map((l) => (
          <li key={l.id}><h3 className="font-bold text-sky-deep">Level {l.id}: {l.name} <span className="text-sm font-normal">({l.stars} {l.stars === 1 ? "star" : "stars"})</span></h3><p>{l.summary}</p></li>
        ))}
      </ol>
    </div>
  );
}
