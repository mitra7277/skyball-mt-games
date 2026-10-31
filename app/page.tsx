import type { Metadata } from "next";
import Link from "next/link";
import GameLibrary from "@/components/GameLibrary";
export const metadata: Metadata = {
  title: { absolute: "MT Games – Free Browser Games" },
  description: "Discover original free browser games from MT Games. Play Sky Ball, take on an endless runner, solve block puzzles, and race through traffic.",
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <div className="prose-page">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#071b42] px-6 py-12 text-white shadow-[0_28px_80px_-28px_rgba(10,42,94,.7)] sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_10%,rgba(81,196,255,.55),transparent_36%),radial-gradient(ellipse_at_10%_90%,rgba(39,112,226,.5),transparent_44%),linear-gradient(145deg,#071b42,#104788_62%,#147ea1)]" />
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-2xl font-black tracking-tighter text-amber-300 shadow-2xl backdrop-blur">MT</div>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[.3em] text-sky-200">A little more play in your day</p>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-6xl">Find your next <span className="text-amber-300">favorite game.</span></h1>
        <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-sky-100 sm:text-lg">Meet the MT Games collection: original games made to jump into quickly, whether you are rolling through the clouds, solving a puzzle, or racing the clock.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/games/sky-ball" className="inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-7 py-3 font-extrabold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white">Play featured game <span aria-hidden="true" className="ml-2">→</span></Link>
          <Link href="/games" className="inline-flex min-h-12 items-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white">Explore all games</Link>
        </div>
      </section>
      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Handpicked for you</p><h2 className="m-0 text-2xl font-black text-sky-deep sm:text-3xl">Featured game</h2></div>
          <Link href="/games/sky-ball" className="font-bold no-underline">Discover Sky Ball <span aria-hidden="true">→</span></Link>
        </div>
        <GameLibrary featuredOnly />
      </section>
      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Made to play</p><h2 className="m-0 text-2xl font-black text-sky-deep sm:text-3xl">All games</h2></div>
          <Link href="/games" className="font-bold no-underline">Browse the library <span aria-hidden="true">→</span></Link>
        </div>
        <GameLibrary />
      </section>
      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Freshly added</p><h2 className="m-0 text-2xl font-black text-sky-deep sm:text-3xl">New games</h2></div>
          <Link href="/games" className="font-bold no-underline">See the full collection <span aria-hidden="true">→</span></Link>
        </div>
        <GameLibrary newOnly />
      </section>
      <section className="mt-12 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="m-0 text-2xl font-black text-sky-deep">Popular games</h2>
        <p className="mb-0 mt-2 max-w-2xl text-slate-600">We do not publish player counts or popularity rankings, so we will not guess. Check back as the collection grows, or explore every game above.</p>
      </section>
      <p className="mt-6 text-sm text-slate-600">New to Sky Ball? Read the <Link href="/how-to-play">controls guide</Link> or explore all <Link href="/levels">40 levels</Link>.</p>
    </div>
  );
}
