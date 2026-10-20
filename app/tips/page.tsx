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
      <p>Short guides to the obstacles you will meet. Jump to: {TIPS.map((t, i) => (<span key={t.slug}>{i > 0 && " · "}<a href={`#${t.slug}`}>{t.title}</a></span>))}</p>
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
