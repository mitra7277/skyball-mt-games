import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import GameFrame from "@/components/GameFrame";
import GameExperience from "@/components/GameExperience";
export const metadata: Metadata = {
  title: "Play Sky Ball Online",
  description: "Play Sky Ball in your browser: a free 3D ball-balancing game with 40 levels. Works with keyboard or touch controls.",
  alternates: { canonical: "/games/sky-ball" },
};
export default function PlayPage() {
  return (
    <div className="prose-page">
      <h1>Play Sky Ball</h1>
      <GameExperience slug="sky-ball" title="Sky Ball" objective="Reach the green finish pad in each course. Touch checkpoints to save a restart point, and collect stars for score." controls={["Keyboard: WASD or arrow keys; touch: drag the on-screen joystick.", "Pause with P, Space, or Escape; use the in-game controls to restart a level."]}>
        <Suspense fallback={<p role="status">Loading game…</p>}><GameFrame /></Suspense>
      </GameExperience>
      <noscript><p>Sky Ball needs JavaScript and WebGL. Please enable JavaScript to play.</p></noscript>
      <h2>Controls at a glance</h2>
      <p>Keyboard: W A S D or arrow keys to roll, Space or P to pause. Touch: drag the joystick at the bottom-left. Reach the green pad to finish. If you fall, you restart at your last checkpoint. New here? Read <Link href="/how-to-play">How to Play</Link>.</p>
      <p>If the game stays black, your browser may have WebGL turned off. Try updating the browser or enabling hardware acceleration in its settings. Your progress is saved in this browser only.</p>
    </div>
  );
}
