import type { Metadata } from "next";
import Link from "next/link";
import { LAST_UPDATED, OWNER_NAME, SITE_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Sky Ball website and game.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <div className="prose-page">
      <h1>Terms of Use</h1>
      <p>Last updated: {LAST_UPDATED}</p>
      <p>{SITE_NAME} is published by {OWNER_NAME}. By using this website and game you agree to these terms. See also our <Link href="/privacy">Privacy Policy</Link>.</p>
      <h2>Personal use</h2>
      <p>The game is free to play for personal, non-commercial entertainment. You may link to this site.</p>
      <h2>Fair use</h2>
      <ul>
        <li>Do not attempt to disrupt the site, overload it or access it by automated means that harm others.</li>
        <li>Do not copy, resell or republish the game, its code or its content without permission.</li>
        <li>Do not use the site for unlawful purposes.</li>
      </ul>
      <h2>No rewards</h2>
      <p>Stars and scores are for fun only. The game offers no prizes, money or other rewards.</p>
      <h2>Availability and changes</h2>
      <p>The game is provided as is, without guarantees that it will be uninterrupted or error-free. {OWNER_NAME} may change or remove features at any time. Saved progress is stored in your browser and may be lost if you clear your data.</p>
      <h2>Liability</h2>
      <p>To the extent permitted by law, {OWNER_NAME} is not liable for losses arising from use of the site. Playing games for long periods can be tiring, so take breaks.</p>
      <h2>Ownership</h2>
      <p>The game, its levels, text and code are the property of {OWNER_NAME} unless stated otherwise.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent through the <Link href="/contact">Contact page</Link>.</p>
      <h2>Third-party content</h2>
      <p>The game uses the open-source Three.js library under its own licence.</p>
      <p><i>These terms are a general template and are not legal advice. The site owner should review them for their own situation and location.</i></p>
    </div>
  );
}
