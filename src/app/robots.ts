import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/** Crawlers that fetch pages for AI search, answers and model training. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

const DISALLOW = [
  "/api/",
  "/admin",
  "/admin/",
  // Faceted/query variants of the marketplace duplicate the canonical.
  "/off-market-yachts?*",
];

/**
 * `/request-private-access` is deliberately not disallowed: the page carries
 * `noindex`, and a crawler blocked by robots.txt can never read that tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
