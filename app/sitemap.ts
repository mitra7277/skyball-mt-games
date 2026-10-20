import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" || p === "/play" ? 1 : 0.6 }));
}
