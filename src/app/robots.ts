import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/terms", "/privacy"],
      },
    ],
    sitemap: "https://www.offmarketyachts.com/sitemap.xml",
    host: "https://www.offmarketyachts.com",
  };
}
