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
/** Bump when evergreen or landing-page content genuinely changes. */
const SITE_LASTMOD = "2026-10-10";

const STATIC_PAGES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily", lastModified: SITE_LASTMOD },
  {
    path: "/off-market-yachts",
    priority: 0.95,
    changeFrequency: "daily",
    lastModified: SITE_LASTMOD,
  },
  {
    path: "/sell-your-yacht-privately",
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: SITE_LASTMOD,
  },
  {
    path: "/private-market-intelligence",
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: SITE_LASTMOD,
  },
  { path: "/owner-representation", priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
  { path: "/yacht-brokers", priority: 0.65, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
  { path: "/family-offices", priority: 0.65, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
  { path: "/yacht-shows", priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
  { path: "/about", priority: 0.5, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
  { path: "/partners/mox-yacht", priority: 0.4, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [...STATIC_PAGES];

  // Commercial-intent landing pages.
  for (const page of getIndexableLandingPages()) {
    entries.push({
      path: `/${page.slug}`,
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: SITE_LASTMOD,
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
    lastModified: new Date(lastModified ?? SITE_LASTMOD),
    changeFrequency,
    priority,
  }));
}
