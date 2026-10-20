import type { Metadata } from "next";
import Link from "next/link";
import { OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "About Us",
  description: "About MT Games and Sky Ball: 3D Challenge, a free 3D ball-balancing browser game with 40 original levels.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <div className="prose-page">
      <h1>About {OWNER_NAME}</h1>
      <p>{OWNER_NAME} is the maker and publisher of {SITE_NAME}, a free browser game about rolling a ball across floating sky platforms. The aim is a game that opens quickly, is fun to replay and is easy to learn, on a computer or a phone, with no download and no account.</p>
      <h2>About the game</h2>
      <p>{SITE_NAME} has 40 original levels with bridges, moving platforms and rotating obstacles. The levels, visuals and code were created for this game. It is drawn with Three.js, an open-source 3D library, and the website is built with Next.js.</p>
      <h2>What we aim for</h2>
      <ul>
        <li>A game that works properly in the browser, on desktop and mobile.</li>
        <li>Clear controls, a how-to guide and tips so you can improve rather than get stuck.</li>
        <li>Respect for your privacy: progress is saved on your own device, and there are no accounts.</li>
        <li>No pop-ups that block play.</li>
      </ul>
      <h2>Get in touch</h2>
      <p>Found a bug or have an idea? Visit the <Link href="/contact">Contact page</Link>. You can also read our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>, or <Link href="/play">play the game</Link>.</p>
    </div>
  );
}
