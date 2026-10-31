import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "About Us",
  description: "About MT Games: four original browser games, game-specific guides, locally saved progress, and how to get in touch.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <div className="prose-page">
      <h1>About {SITE_NAME}</h1>
      <p>{SITE_NAME} is the name used for this website and its collection of original browser games. The site currently offers four playable titles with game-specific instructions and desktop or touch controls; no download or player account is required. This page does not represent a separately identified company or publish a business address.</p>
      <h2>Games and progress</h2>
      <p>Sky Ball: 3D Challenge is a 40-course precision platform game built around checkpoints, moving platforms, rotating bars, and optional stars. Cloud Sprint is an endless lane runner, Prism Pop is a match-three game with move-limited score goals, and Neon Drift is a single-player traffic dodger. These games use browser storage for local scores and progress; it is not an online profile or cross-device leaderboard.</p>
      <p>Game-specific guides explain objectives and strategies, and the Awards page reports milestones derived from saved player progress. All game rewards are in-game recognition only; they have no cash or external prize value.</p>
      <h2>What we aim for</h2>
      <ul>
        <li>Games that can be started directly in a current desktop or mobile browser.</li>
        <li>Clear first-visit tutorials, controls, strategies, FAQs, and restart or pause options.</li>
        <li>Local progress without player accounts or cross-device leaderboards.</li>
        <li>First-visit tutorials can be skipped and replayed later from game settings.</li>
      </ul>
      <h2>Get in touch</h2>
      <p>For questions or bug reports, use the <Link href="/contact">Contact page</Link>{CONTACT_EMAIL ? <> or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : null}. Read the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>, browse <Link href="/games">all games</Link> and the <Link href="/guides">game guides</Link>, or review your <Link href="/awards">earned achievements</Link>.</p>
    </div>
  );
}
