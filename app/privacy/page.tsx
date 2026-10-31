import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, LAST_UPDATED, SITE_NAME } from "@/lib/site";
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
      <p>{SITE_NAME} is the name used for this website and game collection. This policy explains what the site, its games, and the third-party services loaded by the site do with information.</p>
      <h2>Summary</h2>
      <p>This site does not require an account to play. Games store progress and settings on your device, and the site may use third-party advertising and hosting services to deliver content securely.</p>
      <h2>Data stored on your device</h2>
      <p>Sky Ball uses the <code>sb</code> local-storage item for unlocked levels, completions, best times, and in-game sound settings. Cloud Sprint stores its best distance and cumulative orb count; Neon Drift stores its best distance; and Prism Pop stores its highest unlocked level and best score. Shared sound, graphics, and vibration preferences, each game&apos;s tutorial state, and achievement unlocks are also stored in this browser. Game progress is not uploaded to an MT Games account or synced between devices. You can remove it by clearing this site&apos;s data in your browser; doing so also removes saved progress.</p>
      <h2>Cookies</h2>
      <p>The games use browser local storage rather than cookies to save progress and settings. This site does not set a gameplay-tracking cookie. The hosting and advertising services described below may use technical logs, cookies, or similar technologies for their own delivery, security, and advertising purposes.</p>
      <h2>Data collection</h2>
      <p>Playing does not require an account or personal details, and saved gameplay progress is not sent to this site. Vercel, the hosting provider, may process technical request information such as IP address, browser details, and requested pages to deliver and protect the service. The games&apos; Three.js library is served from this site rather than fetched from a third-party game engine host.</p>
      <h2>Contact form</h2>
      <p>The contact form only opens a message in your own email app. We receive the message, and your email address, only if you choose to send it. We use it to reply to you.</p>
      <h2>Advertising, cookies, and consent</h2>
      <p>This site loads the Google AdSense script. Loading the script can make a request to Google even when no advertisement is displayed; whether an ad is served can also depend on publisher-account settings. Google and any advertising partners enabled for the account may use cookies or similar technologies to serve, limit, and measure ads, including ads based on a visitor&apos;s previous visits to this or other sites. The active advertising partners depend on the publisher&apos;s account configuration. See <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">Google&apos;s advertising and privacy information</a> and <a href="https://support.google.com/adsense/answer/9012903?hl=en" target="_blank" rel="noreferrer">Google&apos;s ad technology provider information</a>.</p>
      <p>Visitors can manage personalized advertising through <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a>. They can also review opt-out choices for some participating companies at <a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer">YourAdChoices</a>. These options do not remove locally saved game progress or necessarily prevent all ads.</p>
      <p>Google&apos;s <a href="https://www.google.com/about/company/user-consent-policy/" target="_blank" rel="noreferrer">EU user consent policy</a> requires disclosures and consent for users in the European Economic Area, the United Kingdom, and Switzerland where applicable. This site does not currently show an on-site advertising consent dialog or preference control. The publisher must review the account&apos;s selected ad partners and configure a suitable consent flow before serving ads to visitors where consent is required.</p>
      <h2>Children</h2>
      <p>These are general-audience browser games and do not require a player account. The site does not intentionally ask children to provide personal information. Advertising providers may handle browser data under their own policies and the consent choices applicable to the visitor.</p>
      <h2>Your rights and contact</h2>
      <p>Saved game progress remains in the visitor&apos;s browser and can be removed by clearing this site&apos;s data. The site does not provide an account-based data export or deletion tool. For privacy questions {CONTACT_EMAIL ? <>write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : <>please use the <Link href="/contact">Contact page</Link></>}.</p>
      <h2>Changes</h2>
      <p>We may update this policy and will change the date above when we do.</p>
    </div>
  );
}
