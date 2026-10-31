"use client";
import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import { GAME_CATEGORIES, GAMES } from "@/lib/games";

export default function GameLibrary({ featuredOnly = false, newOnly = false }: { featuredOnly?: boolean; newOnly?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const games = useMemo(() => {
    const source = featuredOnly ? GAMES.filter((game) => game.featured) : newOnly ? GAMES.filter((game) => game.isNew) : GAMES;
    const normalized = query.trim().toLowerCase();
    return source.filter((game) => (
      (category === "All" || game.category === category)
      && (!normalized || `${game.title} ${game.description} ${game.category}`.toLowerCase().includes(normalized))
    ));
  }, [category, featuredOnly, newOnly, query]);

  return (
    <div>
      {!featuredOnly && (
        <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <label className="sr-only" htmlFor="game-search">Search games</label>
          <input id="game-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games..." className="min-h-12 rounded-xl border border-sky-200 bg-white px-4 text-slate-950 placeholder:text-slate-500 focus:border-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-100" />
          <p className="m-0 text-sm font-semibold text-slate-600" aria-live="polite">{games.length} {games.length === 1 ? "game" : "games"}</p>
        </div>
      )}
      {!featuredOnly && (
        <div className="mb-5 flex flex-wrap gap-2" aria-label="Game categories">
          {GAME_CATEGORIES.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-700 ${category === item ? "border-sky-800 bg-sky-800 text-white" : "border-sky-200 bg-white text-slate-700 hover:bg-sky-50"}`}>{item}</button>
          ))}
        </div>
      )}
      {games.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{games.map((game) => <GameCard key={game.slug} game={game} />)}</div> : <p className="rounded-2xl border border-sky-100 bg-white p-6 text-slate-600">No games match that search. Try another title or category.</p>}
    </div>
  );
}
