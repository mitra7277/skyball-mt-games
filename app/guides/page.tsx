import type { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/games";
export const metadata: Metadata = {
  title: "Game Guides",
  description: "Original controls, objectives, tips, and walkthrough overviews for games in the MT Games library.",
  alternates: { canonical: "/guides" },
};
export default function GuidesPage() {
  return <div className="prose-page"><h1>Game guides</h1><p>Learn the controls and goals for each MT Games title. Sky Ball’s level list links to the course details currently provided by the game; it does not invent obstacle-by-obstacle routes that are not shown in-game.</p><div className="grid gap-4 sm:grid-cols-2">{GAMES.map((game) => <article key={game.slug} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"><p className="mb-1 text-xs font-bold uppercase tracking-wider text-sky-700">{game.category}</p><h2 className="m-0 text-xl font-extrabold text-sky-deep">{game.shortTitle}</h2><p className="mt-2 text-sm text-slate-600">{game.tagline}</p><Link href={`/games/${game.slug}`} className="font-bold">Read guide and play <span aria-hidden="true">→</span></Link>{game.slug === "sky-ball" && <p className="mb-0 mt-3 text-sm text-slate-600"><Link href="/levels">Browse all 40 level overviews</Link> · <Link href="/how-to-play">Controls and mechanics</Link> · <Link href="/tips">Strategy tips</Link></p>}</article>)}</div></div>;
}
