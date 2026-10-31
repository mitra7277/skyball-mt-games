import type { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/games";

export const metadata: Metadata = {
  title: "Game Guides",
  description: "Original controls, objectives, step-by-step guides, strategies, and common mistakes for every MT Games title.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="prose-page">
      <h1>Game guides</h1>
      <p className="max-w-3xl text-slate-600">Use these instructions to learn each game before you play. Desktop keys and mobile touch controls are listed on every guide; all scores and course progress stay in the browser where you earned them.</p>
      <div className="space-y-5">
        {GAMES.map((game) => (
          <article key={game.slug} id={game.slug} className="scroll-mt-24 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm sm:p-7">
            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-sky-700">{game.category}</p>
            <h2 className="m-0 text-2xl font-black text-sky-deep">{game.shortTitle}</h2>
            <p className="mt-2 text-slate-600">{game.description}</p>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Objective</h3>
            <p>{game.objective}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <section><h3 className="mt-2 text-lg font-bold text-slate-950">Controls</h3><ul>{game.controls.map((control) => <li key={control}>{control}</li>)}</ul></section>
              <section><h3 className="mt-2 text-lg font-bold text-slate-950">How to play</h3><ol className="list-decimal space-y-1 pl-5">{game.guide.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <section><h3 className="mt-5 text-lg font-bold text-slate-950">Strategies to try</h3><ul>{game.guide.advanced.map((tip) => <li key={tip}>{tip}</li>)}</ul></section>
              <section><h3 className="mt-5 text-lg font-bold text-slate-950">Common problems and solutions</h3><ul>{game.guide.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Quick tips</h3>
            <ul>{game.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
            <p className="mb-0 mt-4"><Link href={`/games/${game.slug}`} className="font-bold">Open {game.shortTitle} and play →</Link></p>
          </article>
        ))}
      </div>
      <p className="mt-6">More game-specific questions are answered in the <Link href="/faq">FAQ</Link>. See the <Link href="/awards">Awards page</Link> for progress-based achievements.</p>
    </div>
  );
}
