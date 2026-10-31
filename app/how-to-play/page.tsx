import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "How to Play",
  description: "Controls, rules, checkpoints, stars and scoring for Sky Ball, plus troubleshooting for keyboard, touch and graphics issues.",
  alternates: { canonical: "/how-to-play" },
};
export default function HowToPlay() {
  return (
    <div className="prose-page">
      <h1>How to Play</h1>
      <p>Sky Ball is a ball-balancing course game. Get from the start platform to the green finish pad without falling off.</p>
      <h2>Controls</h2>
      <ul>
        <li><b>Keyboard:</b> W A S D or the arrow keys roll the ball. Space or P (or Esc) pauses and resumes.</li>
        <li><b>Touch:</b> use the joystick at the bottom-left. Drag it in the direction you want to roll and let go to stop pushing.</li>
        <li><b>Mouse / touch for menus:</b> tap or click the buttons on screen. The pause and mute buttons are at the top right.</li>
      </ul>
      <h2>Rules</h2>
      <ul>
        <li>The ball has momentum. It keeps rolling a little after you let go, so gentle corrections are usually better than sharp, repeated turns.</li>
        <li>Falling off the edge sends the ball back to the latest checkpoint you touched (or the start).</li>
        <li>Moving platforms carry the ball. Rotating bars push it sideways and can suddenly change your line.</li>
        <li>Finishing a level unlocks the next one, and your local progress is saved in this browser.</li>
      </ul>
      <h2>Checkpoint rhythm</h2>
      <p>A white glowing circle is an untouched checkpoint. Roll through it and it turns gold. When you fall, the timer keeps going, so the checkpoint saves your position but not your elapsed time. In practice, this means you should take the next safe checkpoint, recover your line, and then commit to the next hazard rather than replaying the whole section from the start.</p>
      <h2>How the 40 levels work</h2>
      <p>The course set is built from a small number of repeating patterns: long bridges, moving platforms, narrow ledges, rotating bar hazards, and finish pads. The game will often ask you to slow down before a narrow crossing, then re-accelerate once you are centered. A steady line is usually safer than a dramatic last-second correction.</p>
      <ul>
        <li><b>Bridges:</b> keep your ball centered early. Entering at an angle creates a hard correction when the bridge narrows.</li>
        <li><b>Moving platforms:</b> wait for a full motion cycle and then roll on when the platform lines up with the next safe surface.</li>
        <li><b>Rotating bars:</b> use the edges where possible and avoid fighting a bar once it has already knocked you off line.</li>
        <li><b>Finish pad:</b> the green pad ends the course once you reach it.</li>
      </ul>
      <h2>Stars, score and times</h2>
      <p>Each star is worth 100 points. Your score and time show at the top of the screen. The best time for each level is stored on your device, which is useful for trying a cleaner route or a faster line after you know the checkpoint spacing.</p>
      <h2>Troubleshooting</h2>
      <ul>
        <li><b>Keys do nothing:</b> click inside the game once so it receives keyboard input.</li>
        <li><b>Black screen or WebGL message:</b> update your browser, turn on hardware acceleration, or try another browser.</li>
        <li><b>Page scrolls while playing on a phone:</b> keep your thumb on the joystick area. Try fullscreen with the button under the game.</li>
        <li><b>Progress missing:</b> progress lives in your browser storage. It is cleared if you clear site data or use private browsing.</li>
        <li><b>Choppy performance:</b> close other tabs and use a recent browser. Lower-powered devices automatically use lighter graphics settings.</li>
      </ul>
      <p><Link href="/games/sky-ball">Ready? Play Sky Ball now.</Link></p>
    </div>
  );
}
