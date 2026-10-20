import type { Metadata } from "next";
import Link from "next/link";
import ContinueLink from "@/components/ContinueLink";
export const metadata: Metadata = {
  title: { absolute: "Sky Ball: 3D Challenge – Free 3D Ball Rolling Game" },
  description: "Play Sky Ball by MT Games, a free 3D ball-balancing game. Roll across floating sky platforms, bridges and moving obstacles through 40 levels in your browser.",
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <div className="prose-page">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#071b42] px-6 py-12 text-center text-white shadow-[0_28px_80px_-28px_rgba(10,42,94,.7)] sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_10%,rgba(81,196,255,.55),transparent_36%),radial-gradient(ellipse_at_10%_90%,rgba(39,112,226,.5),transparent_44%),linear-gradient(145deg,#071b42,#104788_62%,#147ea1)]" />
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-white/30 bg-white/10 text-5xl shadow-2xl backdrop-blur">🔴</div>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[.3em] text-sky-200">MT Games presents</p>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-6xl">Sky Ball <span className="text-amber-300">3D Challenge</span></h1>
        <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-sky-100 sm:text-lg">Find your balance above the clouds. Roll across floating platforms, ride moving ferries, dodge spinning bars, and conquer 40 handcrafted courses.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/play" className="inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-7 py-3 font-extrabold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white">Start playing <span aria-hidden="true" className="ml-2">→</span></Link>
          <Link href="/levels" className="inline-flex min-h-12 items-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white">Select level</Link>
          <ContinueLink />
        </div>
        <div className="mx-auto mt-9 grid max-w-xl grid-cols-3 gap-2 text-sm">
          <div className="rounded-xl border border-white/15 bg-white/10 p-3"><strong className="block text-xl text-amber-300">40</strong><span className="text-sky-100">levels</span></div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-3"><strong className="block text-xl text-amber-300">3D</strong><span className="text-sky-100">in-browser</span></div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-3"><strong className="block text-xl text-amber-300">Free</strong><span className="text-sky-100">no download</span></div>
        </div>
      </section>
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[["01", "Stay on the path", "Steer across bridges and narrow sky lanes. Momentum matters, so ease off before a sharp turn."], ["02", "Watch the timing", "Ride moving platforms when they come close and slip past rotating bars between sweeps."], ["03", "Reach the beacon", "Touch checkpoints, collect stars, and roll onto the green finish pad to unlock the next course."]].map(([n, title, body]) => <article key={n} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"><span className="text-xs font-extrabold tracking-[.2em] text-sky-600">{n} / HOW TO PLAY</span><h2 className="mb-2 mt-3 text-lg font-extrabold text-sky-deep">{title}</h2><p className="m-0 text-sm leading-relaxed text-slate-600">{body}</p></article>)}
      </section>
      <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <div><h2 className="m-0 text-xl font-extrabold text-sky-deep">Ready for the next course?</h2><p className="mb-0 mt-1 text-sm text-slate-600">Keyboard on desktop, touch joystick on mobile. Your progress stays in this browser.</p></div>
        <Link href="/levels" className="rounded-xl bg-sky-deep px-5 py-3 font-bold text-white no-underline shadow transition hover:bg-blue-900">Browse all 40 levels</Link>
      </section>
      <p className="mt-5 text-sm text-slate-600">Learn the <Link href="/how-to-play">controls and mechanics</Link>, or visit <Link href="/tips">Tips &amp; Guides</Link> for help with tricky courses.</p>
    </div>
  );
}
