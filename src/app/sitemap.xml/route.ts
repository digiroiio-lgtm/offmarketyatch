import { renderSitemapIndex, XML_HEADERS } from "@/lib/sitemap";

/** Sitemap index: points crawlers at one sitemap per site section. */
export function GET() {
  return new Response(renderSitemapIndex(), { headers: XML_HEADERS });
}
