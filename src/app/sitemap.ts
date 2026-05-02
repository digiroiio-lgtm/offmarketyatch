import type { MetadataRoute } from "next";

const BASE_URL = "https://www.offmarketyachts.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/buy-off-market-yachts", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/sell-off-market-yacht", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/off-market-superyachts", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/off-market-motor-yachts", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/off-market-catamarans", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/off-market-trimarans", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/yacht-brokers", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/family-offices", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/submit-yacht", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/private-access", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/owner-representation", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/private-yacht-brokerage", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
