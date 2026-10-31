import type { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/games";
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about playing MT Games titles, browser support, saved game progress, and mobile controls.",
  alternates: { canonical: "/faq" },
};
export default function FAQPage() {
  return <div className="prose-page"><h1>Frequently asked questions</h1><h2>About MT Games</h2><p>MT Games is a collection of original browser games. No account or download is required to play.</p><h2>Playing and privacy</h2><p>Games run in your browser. Sky Ball progress and mini-game best scores are saved locally on the device where you play. See the <Link href="/privacy">Privacy Policy</Link> for details about storage and advertising.</p><h2>Game questions</h2>{GAMES.map((game) => <section key={game.slug}><h2>{game.shortTitle}</h2>{game.faqs.map((faq) => <article key={faq.question} className="mb-4 rounded-xl border border-sky-100 bg-white p-4"><h3 className="m-0 text-base font-bold text-slate-950">{faq.question}</h3><p className="mb-0 mt-2 text-sm text-slate-600">{faq.answer}</p></article>)}<p><Link href={`/games/${game.slug}`}>Play {game.shortTitle}</Link></p></section>)}</div>;
}
