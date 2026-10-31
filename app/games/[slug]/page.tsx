import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import GameFrame from "@/components/GameFrame";
import GameExperience from "@/components/GameExperience";
import { GAMES, getGame } from "@/lib/games";

const EndlessRunnerGame = dynamic(() => import("@/components/games/EndlessRunnerGame"), { loading: () => <p role="status">Loading Cloud Sprint…</p> });
const BlockPuzzleGame = dynamic(() => import("@/components/games/BlockPuzzleGame"), { loading: () => <p role="status">Loading Prism Pop…</p> });
const CarRacingGame = dynamic(() => import("@/components/games/CarRacingGame"), { loading: () => <p role="status">Loading Neon Drift…</p> });

export function generateStaticParams() {
  return GAMES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = getGame(params.slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: { title: game.title, description: game.description, images: [game.thumbnail], type: "website" },
  };
}

function PlaySurface({ slug }: { slug: string }) {
  if (slug === "sky-ball") return <Suspense fallback={<p role="status">Loading Sky Ball…</p>}><GameFrame /></Suspense>;
  if (slug === "endless-runner") return <EndlessRunnerGame />;
  if (slug === "block-puzzle") return <BlockPuzzleGame />;
  if (slug === "car-racing") return <CarRacingGame />;
  return null;
}

export default function GameDetailsPage({ params }: { params: { slug: string } }) {
  const game = getGame(params.slug);
  if (!game) notFound();
  const related = GAMES.filter((entry) => entry.slug !== game.slug);
  return (
    <article className="prose-page">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600"><Link href="/games">Games</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{game.shortTitle}</span></nav>
      <div className="mb-5 overflow-hidden rounded-3xl border border-sky-100 bg-slate-950"><img src={game.thumbnail} alt="" className="max-h-72 w-full object-cover" /></div>
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">{game.category} · MT Games</p>
      <h1>{game.title}</h1>
      <p className="max-w-3xl text-lg text-slate-600">{game.description}</p>
      <a href="#play" className="btn !no-underline">Play now <span aria-hidden="true">↓</span></a>
      <section id="play" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 mt-0">Play {game.shortTitle}</h2>
        <GameExperience slug={game.slug} title={game.shortTitle} objective={game.objective} controls={game.controls}>
          <PlaySurface slug={game.slug} />
        </GameExperience>
      </section>
      <section className="mt-8 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <h2 className="mt-0">Objective</h2><p>{game.objective}</p>
        <h2>Controls</h2><ul>{game.controls.map((control) => <li key={control}>{control}</li>)}</ul>
        <h2>Beginner instructions</h2><ol className="list-decimal space-y-1 pl-5">{game.guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <h2>Advanced strategies</h2><ul>{game.guide.advanced.map((tip) => <li key={tip}>{tip}</li>)}</ul>
        <h2>Game-specific tips</h2><ul>{game.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
        <h2>Common problems and solutions</h2><ul>{game.guide.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul>
        {game.slug === "sky-ball" && <p className="mb-0"><Link href="/levels">Level overviews for all 40 courses</Link> · <Link href="/how-to-play">Full controls and troubleshooting</Link> · <Link href="/tips">More Sky Ball strategies</Link></p>}
      </section>
      <section className="mt-8">
        <h2>Frequently asked questions</h2>
        {game.faqs.map((faq) => <article key={faq.question} className="mb-3 rounded-xl border border-sky-100 bg-white p-4"><h3 className="m-0 text-base font-bold text-slate-950">{faq.question}</h3><p className="mb-0 mt-2 text-slate-600">{faq.answer}</p></article>)}
      </section>
      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><h2 className="m-0">Related games</h2><Link href="/games" className="font-bold">All games →</Link></div>
        <div className="grid gap-3 sm:grid-cols-3">{related.map((entry) => <Link key={entry.slug} href={`/games/${entry.slug}`} className="rounded-xl border border-sky-100 bg-white p-4 font-extrabold text-sky-deep no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">{entry.shortTitle}<span className="mt-1 block text-sm font-normal text-slate-600">{entry.tagline}</span></Link>)}</div>
      </section>
    </article>
  );
}
