import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, LAST_UPDATED, OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sky Ball handles local storage, cookies, advertising and data collection.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <div className="prose-page">
      <h1>Privacy Policy</h1>
      <p>Last updated: {LAST_UPDATED}</p>
      <p>{SITE_NAME} is published by {OWNER_NAME}. This policy explains what the website and game do with information.</p>
      <h2>Summary</h2>
      <p>This site has no accounts, does not ask for personal information to play, and, as published, does not run advertising or analytics.</p>
      <h2>Data stored on your device</h2>
      <p>The game uses your browser&apos;s local storage (one item named <code>sb</code>) to remember your unlocked levels, best times, mute setting and whether you have seen the tutorial. This data stays on your device and is not sent to us. You can remove it by clearing this site&apos;s data in your browser.</p>
      <h2>Cookies</h2>
      <p>The site does not set cookies of its own. Our hosting provider may use technical cookies or logs needed to deliver the site securely.</p>
      <h2>Data collection</h2>
      <p>{OWNER_NAME} does not collect personal data through the game. Like most websites, the hosting provider (Vercel) processes standard server logs such as IP address, browser type and requested pages to serve and protect the site. The game&apos;s 3D library is served from this site, not from a third party.</p>
      <h2>Contact form</h2>
      <p>The contact form only opens a message in your own email app. We receive the message, and your email address, only if you choose to send it. We use it to reply to you.</p>
      <h2>Advertising</h2>
      <p>No advertising is shown at the moment. If ads are added later, they will be served by a third-party provider that may use cookies or similar technology to show and measure ads, and this policy and a consent notice (where legally required) will be updated before that happens. Ads will not be placed over the game or controls.</p>
      <h2>Children</h2>
      <p>The game is suitable for general audiences. We do not knowingly collect personal information from children.</p>
      <h2>Your rights and contact</h2>
      <p>Because we do not hold personal data from play, there is nothing to access or delete on our side. For privacy questions {CONTACT_EMAIL ? <>write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : <>please use the <Link href="/contact">Contact page</Link> once an address is published there</>}.</p>
      <h2>Changes</h2>
      <p>We may update this policy and will change the date above when we do.</p>
    </div>
  );
}
