import Link from "next/link";
import { BRAND_LINE, NAV, OWNER_NAME } from "@/lib/site";
export default function SiteFooter() {
  return (
    <footer className="bg-sky-deep text-sm text-sky-100">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-base font-bold text-white">{BRAND_LINE}</p>
        <nav aria-label="Footer" className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="py-1 hover:underline">{n.label}</Link>
          ))}
          <Link href="/privacy" className="py-1 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="py-1 hover:underline">Terms of Use</Link>
        </nav>
        <p className="mt-3 text-xs text-sky-200">© {new Date().getFullYear()} {OWNER_NAME}. All rights reserved. A free browser game.</p>
      </div>
    </footer>
  );
}
