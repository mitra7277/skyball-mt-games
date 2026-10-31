import type { Metadata } from "next";
import Link from "next/link";
import { OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "About Us",
  description: "About MT Games: original browser games, game-specific guides, local progress, and a privacy-conscious no-account experience.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <div className="prose-page">
      <h1>About {OWNER_NAME}</h1>
      <p>{OWNER_NAME} makes and publishes {SITE_NAME}, a small collection of original browser games. Each title has a playable page, instructions, and controls for desktop and touch devices; no download or player account is required.</p>
      <h2>Games and progress</h2>
      <p>Sky Ball: 3D Challenge is a 40-course precision platform game built around checkpoints, moving platforms, rotating bars, and optional stars. Cloud Sprint is an endless lane runner, Prism Pop is a match-three game with move-limited score goals, and Neon Drift is a single-player traffic dodger. These games use browser storage for local scores and progress; it is not an online profile or cross-device leaderboard.</p>
      <p>Game-specific guides explain objectives and strategies, and the Awards page reports milestones derived from saved player progress. All game rewards are in-game recognition only; they have no cash or external prize value.</p>
      <h2>What we aim for</h2>
      <ul>
        <li>A game that works properly in the browser, on desktop and mobile.</li>
        <li>Clear first-visit tutorials, controls, strategies, FAQs, and restart or pause options.</li>
        <li>Respect for your privacy: game progress and preferences are stored on your device; there are no player accounts.</li>
        <li>No pop-ups that block play.</li>
      </ul>
      <h2>Get in touch</h2>
      <p>Found a bug or have an idea? Visit the <Link href="/contact">Contact page</Link>. You can also read our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>, browse <Link href="/games">all games</Link>, read the <Link href="/guides">game guides</Link>, or review your <Link href="/awards">earned achievements</Link>.</p>
    </div>
  );
}
