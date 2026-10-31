import type { Metadata } from "next";
import Link from "next/link";
import GameLibrary from "@/components/GameLibrary";
export const metadata: Metadata = {
  title: { absolute: "MT Games – Free Browser Games" },
  description: "Discover original free browser games from MT Games: a 40-course 3D platform game, a lane runner, a match-three puzzle, and an arcade racer.",
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <div className="prose-page">
      <section className="relative isolate overflow-hidden rounded-[1.5rem] bg-[#071b42] px-5 py-6 text-white shadow-[0_28px_80px_-28px_rgba(10,42,94,.7)] sm:rounded-[2rem] sm:px-12 sm:py-12">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_10%,rgba(81,196,255,.55),transparent_36%),radial-gradient(ellipse_at_10%_90%,rgba(39,112,226,.5),transparent_44%),linear-gradient(145deg,#071b42,#104788_62%,#147ea1)]" />
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-base font-black tracking-tighter text-amber-300 shadow-2xl backdrop-blur sm:mb-4 sm:h-16 sm:w-16 sm:rounded-2xl sm:text-2xl">MT</div>
        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-sky-200 sm:mb-3 sm:text-xs sm:tracking-[.3em]">A little more play in your day</p>
        <h1 className="mb-2 text-[2rem] font-black leading-[1.05] tracking-tight !text-white sm:mb-4 sm:text-5xl lg:text-6xl">Find your next <span className="!text-amber-300">favorite game.</span></h1>
        <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-sky-100 sm:mb-6 sm:text-lg">Four original browser games with clear controls, saved local progress, and a quick-start guide for every game.</p>
        <div className="flex flex-row justify-center gap-2 sm:gap-3">
          <Link href="/games/sky-ball" className="!no-underline !text-slate-950 inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-amber-300 px-3 py-3 text-xs font-extrabold shadow-lg shadow-amber-950/30 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white sm:flex-none sm:px-7 sm:text-base"><span className="sm:hidden">Play Sky Ball</span><span className="hidden sm:inline">Play featured game</span><span aria-hidden="true" className="ml-2">→</span></Link>
          <Link href="/games" className="!no-underline !text-white inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-3 py-3 text-xs font-bold transition hover:bg-white/20 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white sm:flex-none sm:px-6 sm:text-base"><span className="sm:hidden">All games</span><span className="hidden sm:inline">Explore all games</span></Link>
        </div>
      </section>
      <section className="mt-8 sm:mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-[11px] font-extrabold uppercase tracking-[.2em] text-sky-700 sm:text-xs">Handpicked for you</p><h2 className="m-0 text-2xl font-black text-sky-deep sm:text-3xl">Featured game</h2></div>
          <Link href="/games/sky-ball" className="font-bold no-underline">Discover Sky Ball <span aria-hidden="true">→</span></Link>
        </div>
        <GameLibrary featuredOnly />
      </section>
      <section className="mt-8 sm:mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Made to play</p><h2 className="m-0 text-2xl font-black text-sky-deep sm:text-3xl">All games</h2></div>
          <Link href="/games" className="font-bold no-underline">Browse the library <span aria-hidden="true">→</span></Link>
        </div>
        <GameLibrary />
      </section>
      <section className="mt-8 sm:mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Freshly added</p><h2 className="m-0 text-2xl font-black text-sky-deep sm:text-3xl">New games</h2></div>
          <Link href="/games" className="font-bold no-underline">See the full collection <span aria-hidden="true">→</span></Link>
        </div>
        <GameLibrary newOnly />
      </section>
      <section className="mt-8 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:mt-12 sm:p-8">
        <h2 className="m-0 text-2xl font-black text-sky-deep">Choose your kind of challenge</h2>
        <ul className="mb-0 mt-3 grid gap-2 pl-5 text-slate-600 sm:grid-cols-2">
          <li><Link href="/games/sky-ball">Sky Ball</Link> — precise 3D platforming across 40 courses.</li>
          <li><Link href="/games/endless-runner">Cloud Sprint</Link> — switch lanes, jump, and collect orbs.</li>
          <li><Link href="/games/block-puzzle">Prism Pop</Link> — match gems and build score-boosting cascades.</li>
          <li><Link href="/games/car-racing">Neon Drift</Link> — read the road and weave through traffic.</li>
        </ul>
        <p className="mb-0 mt-4 text-slate-600">Need help? Follow the <Link href="/guides">original game guides</Link>, check your progress on the <Link href="/awards">Awards page</Link>, or browse the <Link href="/faq">FAQ</Link>.</p>
      </section>
      <p className="mt-6 text-sm text-slate-600">New to Sky Ball? Read the <Link href="/how-to-play">controls guide</Link> or explore all <Link href="/levels">40 levels</Link>.</p>
    </div>
  );
}
