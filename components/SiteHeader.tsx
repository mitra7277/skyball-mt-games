import Link from "next/link";
import { NAV, OWNER_NAME, SITE_NAME } from "@/lib/site";
export default function SiteHeader() {
  return (
    <header className="bg-sky-deep text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="leading-tight"><span className="block text-lg font-extrabold tracking-tight">{SITE_NAME}</span><span className="block text-xs text-sky-200">by {OWNER_NAME}</span></Link>
        <nav aria-label="Main" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="py-1 hover:underline">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
