import type { MetadataRoute } from "next";

import { ARTICLES } from "@/data/articles";
import { getIndexableLandingPages } from "@/data/landing";
import { getAllOpportunitySlugs } from "@/lib/opportunities";
import { SITE } from "@/lib/site";

/**
 * The sitemap lists only pages we actually want indexed.
 *
 * Excluded by design (§26): lead funnels and confirmation pages, admin, and
 * any masked opportunity page that lacks enough unique public content to be
 * useful on its own. A URL in a sitemap is a request to index it, so a page
 * that carries `noindex` must never appear here.
 */

interface Entry {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
}

/**
 * Fixed dates for evergreen pages, so a deploy does not claim every page
 * changed today. Bump one only when its content genuinely changes.
 */
const STATIC_PAGES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily", lastModified: "2026-09-08" },
  {
    path: "/off-market-yachts",
    priority: 0.95,
    changeFrequency: "daily",
    lastModified: "2026-09-08",
  },
  {
    path: "/sell-your-yacht-privately",
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: "2026-09-08",
  },
  {
    path: "/private-market-intelligence",
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: "2026-09-08",
  },
  { path: "/owner-representation", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-09-08" },
  { path: "/yacht-brokers", priority: 0.65, changeFrequency: "monthly", lastModified: "2026-09-08" },
  { path: "/family-offices", priority: 0.65, changeFrequency: "monthly", lastModified: "2026-09-08" },
  { path: "/yacht-shows", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-09-08" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly", lastModified: "2026-09-08" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly", lastModified: "2026-09-08" },
  { path: "/partners/mox-yacht", priority: 0.4, changeFrequency: "yearly", lastModified: "2026-09-08" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", lastModified: "2026-09-08" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", lastModified: "2026-09-08" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [...STATIC_PAGES];

  // Commercial-intent landing pages.
  for (const page of getIndexableLandingPages()) {
    entries.push({
      path: `/${page.slug}`,
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: "2026-09-08",
    });
  }

  // Opportunity detail pages — only those with enough unique public content.
  for (const { slug, indexable, updatedAt } of getAllOpportunitySlugs()) {
    if (!indexable) continue;
    entries.push({
      path: `/off-market-yachts/${slug}`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: updatedAt,
    });
  }

  // Editorial cluster.
  for (const article of ARTICLES) {
    entries.push({
      path: `/private-market-intelligence/${article.slug}`,
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: article.updated,
    });
  }

  return entries.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified: new Date(lastModified ?? "2026-09-08"),
    changeFrequency,
    priority,
  }));
}
