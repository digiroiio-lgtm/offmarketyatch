import type { Metadata } from "next";

import { SITE, canonical } from "@/lib/site";
import type { PublicOpportunity } from "@/lib/types";

/**
 * Metadata and JSON-LD builders.
 *
 * Structured data is only emitted where the underlying record genuinely
 * satisfies the schema. In particular there is no `Product`/`Offer` markup for
 * masked opportunities: a confidential listing has no published price, no
 * identified product and no purchasable offer, so claiming otherwise would be
 * structured-data abuse.
 */

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = canonical(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: "en_US",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: SITE.tagline }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.jpg"],
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    image: `${SITE.url}/og-default.jpg`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        areaServed: ["US", "Worldwide"],
        availableLanguage: ["English"],
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "Caribbean" },
      { "@type": "Place", name: "Mediterranean" },
    ],
    knowsAbout: [
      "Off-market yachts",
      "Private yacht sales",
      "Confidential yacht sales",
      "Yacht acquisition",
      "Yacht buyer representation",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * ItemList of opportunity pages. Carries only the public reference, masked
 * title and URL — no price, no identity, nothing withheld.
 */
export function opportunityListSchema(
  opportunities: PublicOpportunity[],
  listName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: opportunities.length,
    itemListElement: opportunities.map((opportunity, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${opportunity.reference} — ${opportunity.titlePublic}`,
      url: canonical(`/off-market-yachts/${opportunity.slug}`),
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical(input.path) },
    datePublished: input.published,
    dateModified: input.modified,
    image: `${SITE.url}/og-default.jpg`,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}
