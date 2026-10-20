"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContinueLink() {
  const [level, setLevel] = useState(0);
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("sb") || "{}");
      const unlocked = Number(raw.unlocked);
      if (Number.isInteger(unlocked) && unlocked >= 1 && unlocked <= 40) setLevel(unlocked);
    } catch { /* No saved game means there is nothing to continue yet. */ }
  }, []);
  if (!level) return null;
  return <Link href={`/play?level=${level}`} className="inline-flex min-h-12 items-center rounded-xl border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white">Continue level {level}</Link>;
}
