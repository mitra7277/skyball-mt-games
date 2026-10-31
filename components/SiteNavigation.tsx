"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-3 text-sm font-bold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 md:hidden"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="text-lg leading-none">{open ? "×" : "☰"}</span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <nav
        id="primary-navigation"
        aria-label="Main"
        className={`${open ? "absolute right-0 top-[calc(100%+0.75rem)] flex w-[min(18rem,calc(100vw-2rem))] flex-col rounded-2xl border border-white/15 bg-[#071b42] p-2 shadow-2xl md:static md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none" : "hidden md:flex md:flex-row"} z-40 gap-1 text-sm font-semibold md:gap-x-5`}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center rounded-xl px-3 py-2 text-white hover:bg-white/10 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 md:min-h-10 md:px-2 md:py-1"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
