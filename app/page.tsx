import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: { absolute: "Sky Ball: 3D Challenge – Free 3D Ball Rolling Game" },
  description: "Play Sky Ball by MT Games, a free 3D ball-balancing game. Roll across floating sky platforms, bridges and moving obstacles through 10 levels in your browser.",
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <div className="prose-page">
      <section className="rounded-2xl bg-gradient-to-b from-sky-400 to-sky-200 p-8 text-center shadow">
        <h1>Sky Ball: 3D Challenge</h1>
        <p className="mx-auto max-w-xl text-lg">Guide a ball across floating sky platforms, narrow bridges and spinning obstacles. Ten original levels, no download needed.</p>
        <p className="text-sm font-semibold text-sky-deep">A game by MT Games</p>
        <Link href="/play" className="btn !no-underline">Play Now</Link>
      </section>
      <h2>What you will do</h2>
      <ul>
        <li>Roll the ball with the keyboard or an on-screen joystick.</li>
        <li>Cross bridges, ride moving platforms and slip past rotating bars.</li>
        <li>Touch glowing checkpoints so a fall only sends you back a little.</li>
        <li>Collect stars, beat your best time and unlock the next level.</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>10 hand-built levels that get steadily harder.</li>
        <li>Works on desktop, tablet and phone, in portrait or landscape.</li>
        <li>Progress and best times saved in your own browser.</li>
        <li>Sound effects with a mute button, and a pause button whenever you need one.</li>
      </ul>
      <h2>Quick controls</h2>
      <p>On a computer use W A S D or the arrow keys, and Space or P to pause. On a touch screen, drag the joystick in the bottom-left corner. See <Link href="/how-to-play">How to Play</Link> for the details, or the <Link href="/tips">Tips &amp; Guides</Link> if a level has you stuck.</p>
      <p>Browse all <Link href="/levels">levels</Link> to see what is unlocked.</p>
    </div>
  );
}
