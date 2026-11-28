import {
  isSitemapSection,
  renderSectionSitemap,
  SITEMAP_SECTIONS,
  XML_HEADERS,
} from "@/lib/sitemap";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_SECTIONS.map((section) => ({ section: `${section}.xml` }));
}

/** One sitemap per section: /sitemaps/pages.xml, /listings.xml, /intelligence.xml. */
export async function GET(_request: Request, ctx: RouteContext<"/sitemaps/[section]">) {
  const { section: file } = await ctx.params;
  const section = file.replace(/\.xml$/, "");
  if (!file.endsWith(".xml") || !isSitemapSection(section)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(renderSectionSitemap(section), { headers: XML_HEADERS });
}
