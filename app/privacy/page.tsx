import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, LAST_UPDATED, OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MT Games handles local game progress, browser storage, advertising, and data collection.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <div className="prose-page">
      <h1>Privacy Policy</h1>
      <p>Last updated: {LAST_UPDATED}</p>
      <p>{SITE_NAME} is published by {OWNER_NAME}. This policy explains what this website and its games do with information.</p>
      <h2>Summary</h2>
      <p>This site does not require an account to play. Games store progress and settings on your device, and the site may use third-party advertising and hosting services to deliver content securely.</p>
      <h2>Data stored on your device</h2>
      <p>Sky Ball uses the local-storage item <code>sb</code> for unlocked levels, completions, best times, and in-game sound settings. Cloud Sprint, Neon Drift, and Prism Pop store their best scores, collected orbs, and puzzle progress in separate local-storage items. Shared sound, graphics, vibration, and per-game tutorial preferences, plus achievement unlocks, are also saved locally. This data stays in your browser on your device and is not sent to MT Games. You can remove it by clearing this site&apos;s data in your browser.</p>
      <h2>Cookies</h2>
      <p>The site does not set its own tracking cookies for gameplay. Our hosting provider may use technical cookies or logs needed to deliver the site, and Google AdSense may use cookies or similar technologies when ads are served or measured.</p>
      <h2>Data collection</h2>
      <p>{OWNER_NAME} does not intentionally collect personal data through gameplay. Achievement progress is calculated from local game saves and is not uploaded or shared between players. Like most websites, the hosting provider (Vercel) processes standard server logs such as IP address, browser type, and requested pages to serve and protect the site. Sky Ball&apos;s 3D library is served from this site, not from a third party.</p>
      <h2>Contact form</h2>
      <p>The contact form only opens a message in your own email app. We receive the message, and your email address, only if you choose to send it. We use it to reply to you.</p>
      <h2>Advertising</h2>
      <p>This site includes Google AdSense code for publisher verification and possible ad serving. The presence of that code does not guarantee that ads will appear on every page or for every visitor. When Google serves ads, it may use cookies or similar technologies to manage ad delivery, frequency capping, and measurement. For more information, see Google&apos;s advertising privacy information at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">https://policies.google.com/technologies/ads</a>.</p>
      <h2>Children</h2>
      <p>The game is suitable for general audiences. We do not knowingly collect personal information from children.</p>
      <h2>Your rights and contact</h2>
      <p>Because we do not hold personal data from play, there is nothing to access or delete on our side. For privacy questions {CONTACT_EMAIL ? <>write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : <>please use the <Link href="/contact">Contact page</Link> once an address is published there</>}.</p>
      <h2>Changes</h2>
      <p>We may update this policy and will change the date above when we do.</p>
    </div>
  );
}
