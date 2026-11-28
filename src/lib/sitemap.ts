import { ARTICLES } from "@/data/articles";
import { getIndexableLandingPages } from "@/data/landing";
import { getAllOpportunitySlugs } from "@/lib/opportunities";
import { canonical, SITE } from "@/lib/site";
import { isLocaleReady, languageAlternates, localizedPath, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

/**
 * Sitemaps list only pages we actually want indexed.
 *
 * Excluded by design (§26): lead funnels and confirmation pages, admin, and
 * any masked opportunity page that lacks enough unique public content to be
 * useful on its own. A URL in a sitemap is a request to index it, so a page
 * that carries `noindex` must never appear here.
 *
 * The site is split into one sitemap per section, tied together by the
 * index at /sitemap.xml. Search Console then reports submitted vs indexed
 * per section, so an indexing problem in listings or articles shows up on
 * its own instead of disappearing into one total.
 *
 * `priority` and `changefreq` are left out on purpose: Google ignores both.
 * `lastmod` is kept, and only ever carries a date the content really changed.
 */

/** Bump when evergreen or landing-page content genuinely changes. */
export const SITE_LASTMOD = "2026-11-24";

export const SITEMAP_SECTIONS = ["pages", "listings", "intelligence"] as const;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];

export function isSitemapSection(value: string): value is SitemapSection {
  return (SITEMAP_SECTIONS as readonly string[]).includes(value);
}

export function sitemapUrl(section: SitemapSection): string {
  return `${SITE.url}/sitemaps/${section}.xml`;
}

interface Entry {
  path: string;
  lastModified: string;
}

const STATIC_PATHS = [
  "/",
  "/off-market-yachts",
  "/sell-your-yacht-privately",
  "/private-market-intelligence",
  "/owner-representation",
  "/yacht-brokers",
  "/family-offices",
  "/yacht-shows",
  "/about",
  "/contact",
  "/partners/mox-yacht",
  "/privacy",
  "/terms",
];

/** Hubs, company pages and commercial-intent landing pages. */
function pageEntries(): Entry[] {
  const entries: Entry[] = STATIC_PATHS.map((path) => ({ path, lastModified: SITE_LASTMOD }));
  for (const page of getIndexableLandingPages()) {
    entries.push({ path: `/${page.slug}`, lastModified: SITE_LASTMOD });
  }
  return entries;
}

/** Opportunity detail pages — only those with enough unique public content. */
function listingEntries(): Entry[] {
  return getAllOpportunitySlugs()
    .filter(({ indexable }) => indexable)
    .map(({ slug, updatedAt }) => ({
      path: `/off-market-yachts/${slug}`,
      lastModified: updatedAt,
    }));
}

/** Editorial cluster. */
function intelligenceEntries(): Entry[] {
  return ARTICLES.map((article) => ({
    path: `/private-market-intelligence/${article.slug}`,
    lastModified: article.updated,
  }));
}

function entriesFor(section: SitemapSection): Entry[] {
  switch (section) {
    case "pages":
      return pageEntries();
    case "listings":
      return listingEntries();
    case "intelligence":
      return intelligenceEntries();
  }
}

function isoDate(value: string | undefined): string {
  const date = new Date(value ?? SITE_LASTMOD);
  return (Number.isNaN(date.getTime()) ? new Date(SITE_LASTMOD) : date).toISOString();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function latest(entries: Entry[]): string {
  const times = entries.map((e) => Date.parse(isoDate(e.lastModified)));
  return new Date(times.length ? Math.max(...times) : Date.parse(SITE_LASTMOD)).toISOString();
}

export function renderSectionSitemap(section: SitemapSection): string {
  const locales: Locale[] = ["en", ...SUPPORTED_LOCALES.filter(isLocaleReady)];
  const urls = entriesFor(section)
    .flatMap(({ path, lastModified }) => {
      const alternates = Object.entries(languageAlternates(path))
        .map(([language, href]) =>
          `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(href)}" />`
        )
        .join("\n");
      return locales.map((locale) => {
        const localizedUrl = canonical(localizedPath(locale, path));
        return `<url>\n<loc>${escapeXml(localizedUrl)}</loc>\n<lastmod>${isoDate(lastModified)}</lastmod>\n${alternates}\n</url>`;
      });
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

export function renderSitemapIndex(): string {
  const items = SITEMAP_SECTIONS.map(
    (section) =>
      `<sitemap>\n<loc>${escapeXml(sitemapUrl(section))}</loc>\n<lastmod>${latest(entriesFor(section))}</lastmod>\n</sitemap>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export const XML_HEADERS = { "Content-Type": "application/xml; charset=utf-8" };
