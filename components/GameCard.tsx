import Link from "next/link";
import type { Game } from "@/lib/games";

export default function GameCard({ game }: { game: Game }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-900/10">
      <Link href={`/games/${game.slug}`} className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-sky-600">
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
          {/* SVG thumbnails are small, original illustrations shipped with this site. */}
          <img src={game.thumbnail} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
          {game.featured && <span className="absolute left-3 top-3 rounded-full bg-amber-300 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-950">Featured</span>}
          {game.isNew && <span className="absolute left-3 top-3 rounded-full bg-cyan-300 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-950">New</span>}
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="m-0 text-lg font-extrabold text-slate-950">{game.shortTitle}</h3>
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800">{game.category}</span>
          </div>
          <p className="mb-4 mt-0 text-sm leading-relaxed text-slate-600">{game.tagline}</p>
          <span className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-800">View game <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span></span>
        </div>
      </Link>
    </article>
  );
}
