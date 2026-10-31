import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import { OWNER_NAME, SITE_NAME } from "@/lib/site";
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071b42]/95 text-white shadow-lg shadow-sky-950/10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link href="/" aria-label="MT Games home" className="flex items-center gap-3 leading-tight">
          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-sm font-black tracking-tighter text-slate-950 shadow">MT</span>
          <span><span className="block text-base font-extrabold tracking-tight sm:text-lg">{SITE_NAME}</span><span className="block text-[11px] text-sky-200">by {OWNER_NAME}</span></span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
