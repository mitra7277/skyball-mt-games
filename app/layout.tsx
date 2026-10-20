import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { OWNER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Free 3D Ball Rolling Game`, template: `%s | ${SITE_NAME}` },
  description: "Roll a ball across floating sky platforms in 10 original 3D levels. Free to play in your browser on desktop and mobile.",
  applicationName: SITE_NAME,
  authors: [{ name: OWNER_NAME }],
  creator: OWNER_NAME,
  publisher: OWNER_NAME,
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: SITE_NAME, type: "website", title: SITE_NAME, description: "A free 3D ball-balancing game with 10 levels. Play in your browser." },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a2a5e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4221940206853514"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2">Skip to content</a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
