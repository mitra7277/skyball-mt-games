"use client";
import { useEffect, useState } from "react";

type Achievement = {
  id: string;
  game: string;
  title: string;
  description: string;
  progress: number;
  target: number;
};

function readCount(key: string): number {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch (error) {
    console.warn(`Could not read ${key} for game achievements.`, error);
    return 0;
  }
}

function loadAchievements(): Achievement[] {
  let skyball = 0;
  let puzzleLevel = 1;
  let puzzleBest = 0;
  try {
    const saved = JSON.parse(localStorage.getItem("sb") || "{}") as { completed?: Record<string, unknown> };
    skyball = Object.values(saved.completed || {}).filter((completed) => completed === true).length;
  } catch (error) {
    console.warn("Could not read Sky Ball achievements.", error);
  }
  try {
    const saved = JSON.parse(localStorage.getItem("mt-match3-progress") || "{}") as { level?: number; best?: number };
    puzzleLevel = Number.isInteger(saved.level) && saved.level! > 0 ? saved.level! : 1;
    puzzleBest = Number.isFinite(saved.best) && saved.best! > 0 ? saved.best! : 0;
  } catch (error) {
    console.warn("Could not read Prism Pop achievements.", error);
  }
  return [
    { id: "skyball-first-finish", game: "Sky Ball", title: "First Landing", description: "Complete your first Sky Ball course.", progress: Math.min(skyball, 1), target: 1 },
    { id: "skyball-ten-courses", game: "Sky Ball", title: "Cloud Explorer", description: "Complete ten different courses. Progress is based on saved course completions.", progress: Math.min(skyball, 10), target: 10 },
    { id: "skyball-all-courses", game: "Sky Ball", title: "Above the Clouds", description: "Complete all 40 courses in the original Sky Ball campaign.", progress: Math.min(skyball, 40), target: 40 },
    { id: "runner-long-haul", game: "Cloud Sprint", title: "Long Haul", description: "Set a personal best of at least 1,000 metres in a single run.", progress: Math.min(readCount("mt-runner-best"), 1000), target: 1000 },
    { id: "runner-orb-collector", game: "Cloud Sprint", title: "Orb Collector", description: "Collect 25 gold orbs across your runs.", progress: Math.min(readCount("mt-runner-orbs"), 25), target: 25 },
    { id: "racing-distance", game: "Neon Drift", title: "Open Road", description: "Reach a personal best of 500 metres in a single run.", progress: Math.min(readCount("mt-racing-best"), 500), target: 500 },
    { id: "prism-first-level", game: "Prism Pop", title: "First Bloom", description: "Clear the first match-three level and unlock the next one.", progress: Math.min(puzzleLevel - 1, 1), target: 1 },
    { id: "prism-high-score", game: "Prism Pop", title: "Cascade Chaser", description: "Set a match-three best score of 2,000 points or more.", progress: Math.min(puzzleBest, 2000), target: 2000 },
  ];
}

export default function AwardsBoard() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [newUnlocks, setNewUnlocks] = useState<string[]>([]);

  useEffect(() => {
    const current = loadAchievements();
    let saved: string[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("mt-achievements-unlocked") || "[]");
      if (Array.isArray(parsed)) saved = parsed.filter((id): id is string => typeof id === "string");
    } catch (error) {
      console.warn("Could not read saved achievement unlocks.", error);
    }
    const earned = current.filter((achievement) => achievement.progress >= achievement.target).map((achievement) => achievement.id);
    const next = [...new Set([...saved, ...earned])];
    setAchievements(current);
    setUnlocked(next);
    setNewUnlocks(earned.filter((id) => !saved.includes(id)));
    try { localStorage.setItem("mt-achievements-unlocked", JSON.stringify(next)); }
    catch (error) { console.warn("Could not save achievement unlocks.", error); }
  }, []);

  if (!achievements.length) return <p role="status">Loading your saved achievements…</p>;
  const earnedCount = achievements.filter((achievement) => unlocked.includes(achievement.id)).length;
  return (
    <div>
      <div className="mb-5 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-[.2em] text-sky-700">Your game history</p>
        <p className="m-0 text-lg font-bold text-slate-900">{earnedCount} of {achievements.length} achievements unlocked</p>
        <p className="mb-0 mt-1 text-sm text-slate-600">These awards are calculated from course completions, best distances, collected orbs, and puzzle progress saved in this browser. Scores and unlocks are not shared across devices.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {achievements.map((achievement) => {
          const isUnlocked = unlocked.includes(achievement.id);
          const progress = Math.round(achievement.progress / achievement.target * 100);
          return (
            <article key={achievement.id} className={`rounded-2xl border p-5 transition ${isUnlocked ? "border-amber-300 bg-amber-50 shadow-sm" : "border-slate-200 bg-white"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-sky-700">{achievement.game}</p>
                  <h2 className="m-0 text-lg font-extrabold text-slate-950">{achievement.title}</h2>
                </div>
                <span aria-label={isUnlocked ? "Unlocked" : "Locked"} className={`rounded-full px-3 py-1 text-xs font-extrabold ${isUnlocked ? "bg-amber-300 text-slate-950" : "bg-slate-100 text-slate-600"}`}>{isUnlocked ? "Unlocked" : "Locked"}</span>
              </div>
              <p className="mb-3 mt-2 text-sm leading-relaxed text-slate-600">{achievement.description}</p>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`${achievement.title} progress`} aria-valuenow={achievement.progress} aria-valuemin={0} aria-valuemax={achievement.target}>
                <div className={`h-full rounded-full transition-[width] duration-700 ${isUnlocked ? "bg-amber-400" : "bg-sky-600"}`} style={{ width: `${Math.min(100, progress)}%` }} />
              </div>
              <p className="mb-0 mt-2 text-xs font-semibold text-slate-500">{achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}</p>
              {newUnlocks.includes(achievement.id) && <p className="mb-0 mt-2 animate-bounce text-sm font-extrabold text-amber-700">Achievement unlocked!</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
