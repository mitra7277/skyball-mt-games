import Link from "next/link";
import { NAV, OWNER_NAME, SITE_NAME } from "@/lib/site";
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071b42]/95 text-white shadow-lg shadow-sky-950/10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" aria-label="MT Games home" className="flex items-center gap-3 leading-tight">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300 text-sm font-black tracking-tighter text-slate-950 shadow">MT</span>
          <span><span className="block text-lg font-extrabold tracking-tight">{SITE_NAME}</span><span className="block text-[11px] text-sky-200">by {OWNER_NAME}</span></span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-md py-2 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
