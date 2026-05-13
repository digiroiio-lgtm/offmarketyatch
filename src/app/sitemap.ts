import type { MetadataRoute } from "next";

const BASE_URL = "https://www.offmarketyachts.com";

// Static dates prevent every deploy from marking all pages as "modified today".
// Update the date for a specific page only when its content meaningfully changes.
const PAGE_DATES: Record<string, string> = {
  "/":                          "2026-05-12",
  "/buy-off-market-yachts":     "2026-05-12",
  "/sell-off-market-yacht":     "2026-05-12",
  "/off-market-superyachts":    "2026-05-12",
  "/off-market-motor-yachts":   "2026-05-12",
  "/off-market-catamarans":     "2026-05-12",
  "/off-market-trimarans":      "2026-05-12",
  "/yacht-brokers":             "2026-05-12",
  "/family-offices":            "2026-05-12",
  "/submit-yacht":              "2026-05-12",
  "/private-access":            "2026-05-12",
  "/owner-representation":      "2026-05-12",
  "/private-yacht-brokerage":   "2026-05-12",
  "/about":                     "2026-05-12",
  "/contact":                   "2026-05-12",
  "/yacht-shows":               "2026-05-12",
  "/privacy":                   "2026-05-12",
  "/terms":                     "2026-05-12",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/buy-off-market-yachts", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/sell-off-market-yacht", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/off-market-superyachts", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/off-market-motor-yachts", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/off-market-catamarans", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/off-market-trimarans", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/yacht-brokers", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/family-offices", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/submit-yacht", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/private-access", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/owner-representation", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/private-yacht-brokerage", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/yacht-shows", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(PAGE_DATES[url] ?? "2026-05-12"),
    changeFrequency,
    priority,
  }));
}
