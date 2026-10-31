import type { Metadata } from "next";
import GameLibrary from "@/components/GameLibrary";
export const metadata: Metadata = {
  title: "Games Library",
  description: "Browse the MT Games library of original free browser games. Find 3D games, arcade runs, racing, and puzzles.",
  alternates: { canonical: "/games" },
};
export default function GamesPage() {
  return <div className="prose-page"><p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Pick your next game</p><h1>Games library</h1><p className="mb-6 max-w-2xl text-slate-600">Original browser games from MT Games. Search by name or browse by category; every game includes its own play page and instructions.</p><GameLibrary /></div>;
}
