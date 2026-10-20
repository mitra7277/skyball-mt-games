export const SITE_NAME = "Sky Ball: 3D Challenge";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.example").replace(/\/$/, "");
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
export const OWNER_NAME = "MT Games";
export const BRAND_LINE = `${SITE_NAME} by ${OWNER_NAME}`;
export const LAST_UPDATED = "October 2026";
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/how-to-play", label: "How to Play" },
  { href: "/levels", label: "Levels" },
  { href: "/tips", label: "Tips & Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export const PAGES = ["/", "/play", "/how-to-play", "/levels", "/tips", "/about", "/contact", "/privacy", "/terms"];
