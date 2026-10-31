import type { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/games";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Practical answers about MT Games controls, mobile support, sound, graphics, saved scores, tutorials, awards, and troubleshooting.",
  alternates: { canonical: "/faq" },
};

const platformFaqs = [
  { question: "Do I need an account or a download?", answer: "No. MT Games runs in a current desktop or mobile browser. Sky Ball requires WebGL; the other games use browser canvas and HTML." },
  { question: "Can I play on a phone or tablet?", answer: "Yes. Sky Ball has a touch joystick, Cloud Sprint and Neon Drift include touch buttons and swipes, and Prism Pop uses tap-to-select and tap-to-swap. Use the controls shown on each game page." },
  { question: "Where is my progress saved?", answer: "Scores, level unlocks, settings, tutorials, and earned achievements are stored in local storage on this browser and device. They are not synced to an account or transferred between devices. Clearing site data can remove them." },
  { question: "How do tutorials work?", answer: "Each game shows its own first-visit quick-start tutorial. Completing or skipping it is saved separately for that game. Use Settings → Replay tutorial to see it again." },
  { question: "How do I adjust sound?", answer: "Open Settings above any game to control synthesized background music, sound effects, their separate volumes, and master mute. Browser audio starts only after your first interaction; some mobile browsers also require the device to be unmuted." },
  { question: "Can I change graphics quality?", answer: "The shared Settings panel offers Low, Medium, and High quality. In the 3D Sky Ball game and canvas games that setting adjusts rendering resolution; it does not change the puzzle board." },
  { question: "Does vibration work on every phone?", answer: "Vibration is optional and only works on browsers and devices that expose the vibration API. It can be unavailable in iOS browsers or blocked by device settings." },
  { question: "How are awards earned?", answer: "Awards are based on saved course completions, best distances, collected Cloud Sprint orbs, and Prism Pop level or score progress. The Awards page does not display player rankings or invented statistics." },
  { question: "Why is a game blank or slow to load?", answer: "Check that JavaScript is enabled, refresh the page, and close heavy background tabs. Sky Ball also needs WebGL and hardware acceleration. Low graphics quality can reduce rendering load on older devices." },
  { question: "What data does the site collect?", answer: "Gameplay progress is stored in this browser and is not sent to MT Games. Hosting and advertising providers may process technical data as described in the Privacy Policy." },
];

export default function FAQPage() {
  return (
    <div className="prose-page">
      <h1>Frequently asked questions</h1>
      <p className="max-w-3xl text-slate-600">Answers for the features that are currently available in the MT Games library. For controls and a step-by-step explanation, open the relevant <Link href="/guides">game guide</Link>.</p>
      <section>
        <h2>Playing on MT Games</h2>
        {platformFaqs.map((faq) => <article key={faq.question} className="mb-3 rounded-xl border border-sky-100 bg-white p-4"><h3 className="m-0 text-base font-bold text-slate-950">{faq.question}</h3><p className="mb-0 mt-2 text-sm text-slate-600">{faq.answer}</p></article>)}
      </section>
      {GAMES.map((game) => (
        <section key={game.slug}>
          <h2>{game.shortTitle}</h2>
          <p>{game.objective}</p>
          {game.faqs.map((faq) => <article key={faq.question} className="mb-3 rounded-xl border border-sky-100 bg-white p-4"><h3 className="m-0 text-base font-bold text-slate-950">{faq.question}</h3><p className="mb-0 mt-2 text-sm text-slate-600">{faq.answer}</p></article>)}
          <p><Link href={`/games/${game.slug}`}>Play {game.shortTitle}</Link> · <Link href={`/guides#${game.slug}`}>Read the full guide</Link></p>
        </section>
      ))}
      <section>
        <h2>Policies and support</h2>
        <p>For details about browser storage, hosting logs, and advertising, read the <Link href="/privacy">Privacy Policy</Link>. See the <Link href="/terms">Terms of Use</Link> or send a game issue through <Link href="/contact">Contact</Link>.</p>
      </section>
    </div>
  );
}
