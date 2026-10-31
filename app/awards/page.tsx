import type { Metadata } from "next";
import AwardsBoard from "@/components/AwardsBoard";

export const metadata: Metadata = {
  title: "Awards and Achievements",
  description: "See MT Games achievements unlocked through saved course completions, high scores, orb collections, and puzzle progress.",
  alternates: { canonical: "/awards" },
};

export default function AwardsPage() {
  return (
    <div className="prose-page">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Earned through play</p>
      <h1>Awards &amp; achievements</h1>
      <p className="mb-6 max-w-3xl text-slate-600">Every award below is tied to progress recorded by the games on this device. Locked awards show the measurable progress needed to earn them; there are no player rankings, prize claims, or invented statistics.</p>
      <AwardsBoard />
    </div>
  );
}
