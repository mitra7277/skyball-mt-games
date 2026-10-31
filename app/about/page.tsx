import type { Metadata } from "next";
import Link from "next/link";
import { OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "About Us",
  description: "About MT Games, an independent collection of original free browser games including Sky Ball, puzzles, racing, and arcade games.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <div className="prose-page">
      <h1>About {OWNER_NAME}</h1>
      <p>{OWNER_NAME} is the maker and publisher of {SITE_NAME}, a collection of original browser games. The games are designed to open quickly, be easy to learn, and work on a computer or phone without a download or account.</p>
      <h2>About the game</h2>
      <p>Sky Ball: 3D Challenge is the collection&apos;s featured game. It has 40 original levels with bridges, moving platforms, and rotating obstacles. MT Games also offers original arcade, puzzle, and racing games. The website is built with Next.js; the games use browser-based technologies and original visuals.</p>
      <h2>What we aim for</h2>
      <ul>
        <li>A game that works properly in the browser, on desktop and mobile.</li>
        <li>Clear controls, a how-to guide and tips so you can improve rather than get stuck.</li>
        <li>Respect for your privacy: game progress is stored on your device, and there are no player accounts.</li>
        <li>No pop-ups that block play.</li>
      </ul>
      <h2>Get in touch</h2>
      <p>Found a bug or have an idea? Visit the <Link href="/contact">Contact page</Link>. You can also read our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>, browse <Link href="/games">all games</Link>, or read the <Link href="/guides">game guides</Link>.</p>
    </div>
  );
}
