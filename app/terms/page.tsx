import type { Metadata } from "next";
import Link from "next/link";
import { LAST_UPDATED, OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the MT Games website and browser games.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <div className="prose-page">
      <h1>Terms of Use</h1>
      <p>Last updated: {LAST_UPDATED}</p>
      <p>{SITE_NAME} is published by {OWNER_NAME}. By using this website and its games you agree to these terms. See also our <Link href="/privacy">Privacy Policy</Link>.</p>
      <h2>Personal use</h2>
      <p>The games are free to play for personal, non-commercial entertainment. You may link to this site and play in a browser without creating an account or paying a fee.</p>
      <h2>Fair use</h2>
      <ul>
        <li>Do not attempt to disrupt the site, overload it, or access it by automated means that harm others.</li>
        <li>Do not copy, resell, republish, or redistribute the game, its code, or its level content without permission.</li>
        <li>Do not use the site for unlawful purposes or to interfere with other players&apos; access.</li>
      </ul>
      <h2>No rewards</h2>
      <p>Stars, scores, and progression are for fun only. The game offers no prizes, money, or other rewards.</p>
      <h2>Availability and changes</h2>
      <p>The site may occasionally be unavailable or have errors, and game features may change. Saved progress is stored in your browser and may be lost if you clear site data or use private browsing. Playing for long periods can be tiring, so take breaks.</p>
      <h2>Ownership</h2>
      <p>The game, its levels, text, visual design, and code are the property of {OWNER_NAME} unless stated otherwise. The site may also include third-party libraries and services, including open-source software and ad-serving technology.</p>
      <h2>Third-party content and services</h2>
      <p>The game uses the open-source Three.js library under its own licence. The site may also use third-party hosting and advertising providers, including Google AdSense, whose own terms and privacy policies apply to their services.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent through the <Link href="/contact">Contact page</Link>.</p>
    </div>
  );
}
