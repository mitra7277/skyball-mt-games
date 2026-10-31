export const SITE_NAME = "MT Games";
export const DEFAULT_SITE_URL = "https://skyball-mt-games.vercel.app";
const normalizeSiteUrl = (value?: string) => {
  const trimmed = (value ?? DEFAULT_SITE_URL).trim().replace(/\/+$/, "");
  return trimmed || DEFAULT_SITE_URL;
};
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "mitranjankumar3201@gmail.com";
export const OWNER_NAME = "MT Games";
export const BRAND_LINE = `${SITE_NAME} · Original games for your browser`;
export const LAST_UPDATED = "October 2026";
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/guides", label: "Guides" },
  { href: "/awards", label: "Awards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export const PAGES = ["/", "/games", "/games/sky-ball", "/games/endless-runner", "/games/block-puzzle", "/games/car-racing", "/guides", "/awards", "/faq", "/how-to-play", "/levels", "/tips", "/about", "/contact", "/privacy", "/terms"];
