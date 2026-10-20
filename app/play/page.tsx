import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import GameFrame from "@/components/GameFrame";
export const metadata: Metadata = {
  title: "Play Sky Ball Online",
  description: "Play Sky Ball in your browser: a free 3D ball-balancing game with 10 levels. Works with keyboard or touch controls.",
  alternates: { canonical: "/play" },
};
export default function PlayPage() {
  return (
    <div className="prose-page">
      <h1>Play Sky Ball</h1>
      <Suspense fallback={<p role="status">Loading game…</p>}><GameFrame /></Suspense>
      <noscript><p>Sky Ball needs JavaScript and WebGL. Please enable JavaScript to play.</p></noscript>
      <h2>Controls at a glance</h2>
      <p>Keyboard: W A S D or arrow keys to roll, Space or P to pause. Touch: drag the joystick at the bottom-left. Reach the green pad to finish. If you fall, you restart at your last checkpoint. New here? Read <Link href="/how-to-play">How to Play</Link>.</p>
      <p>If the game stays black, your browser may have WebGL turned off. Try updating the browser or enabling hardware acceleration in its settings. Your progress is saved in this browser only.</p>
    </div>
  );
}
