import type { Metadata } from "next";
import LevelGrid from "@/components/LevelGrid";
import { LEVELS } from "@/lib/levels";
export const metadata: Metadata = {
  title: "Levels",
  description: "Explore all 40 Sky Ball courses, read level tips, and track your unlocked progress.",
  alternates: { canonical: "/levels" },
};
export default function LevelsPage() {
  return (
    <div className="prose-page">
      <h1>Levels</h1>
      <p>Finish a course to unlock the next. Completed, unlocked, and locked states are saved in this browser. Select any unlocked course to play it.</p>
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
