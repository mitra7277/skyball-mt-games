import type { Metadata } from "next";
import Link from "next/link";
import { TIPS } from "@/lib/tips";
export const metadata: Metadata = {
  title: "Tips & Guides",
  description: "Gameplay guides for Sky Ball: steady controls, moving platforms, rotating bars, narrow bridges, checkpoints and stars.",
  alternates: { canonical: "/tips" },
};
export default function TipsPage() {
  return (
    <div className="prose-page">
      <h1>Tips &amp; Guides</h1>
      <p>These are the patterns that show up most often in the 40-level run: bridges, moving platforms, rotating bars, and checkpoint-heavy sections. Jump to: {TIPS.map((t, i) => (<span key={t.slug}>{i > 0 && " · "}<a href={`#${t.slug}`}>{t.title}</a></span>))}</p>
      <h2>Start with a stable line</h2>
      <p>Most mistakes happen because the ball enters a narrow section at an angle and then tries to correct too late. If the route ahead is twisty, line up before the platform edge and keep the ball near the center of the safe surface. A steady path will beat a frantic last-second turn in almost every level.</p>
      <h2>Use checkpoints as recovery points</h2>
      <p>Checkpoints are not just for safety; they let you take a chance on a risky route and recover quickly if you miss the landing. If a moving platform or rotating bar is pushing you off line, do not panic. Ride it to the edge, reset your angle, and continue from the last gold checkpoint.</p>
      {TIPS.map((t) => (
        <article key={t.slug} id={t.slug}>
          <h2>{t.title}</h2>
          {t.body.map((p, i) => <p key={i}>{p}</p>)}
        </article>
      ))}
      <p>Put it into practice on the <Link href="/levels">Levels</Link> page.</p>
    </div>
  );
}
