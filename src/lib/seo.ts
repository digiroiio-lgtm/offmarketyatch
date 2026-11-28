import type { Metadata } from "next";

import { SITE, canonical } from "@/lib/site";
import { isLocaleReady, languageAlternates, LOCALE_CONFIG, localizedPath, t, type Locale } from "@/lib/i18n";
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
  /** Use the title as-is, without the "| OffMarketYacht" template suffix. */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function pageMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  noindex = false,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = canonical(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
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


export function localizedPageMetadata(locale: Locale, path: string, base: Metadata): Metadata {
  const localizedUrl = canonical(localizedPath(locale, path));
  const title = typeof base.title === "string" ? t(locale, base.title) : base.title;
  const description = typeof base.description === "string" ? t(locale, base.description) : SITE.description;
  const baseOpenGraph = (base.openGraph && typeof base.openGraph === "object" ? base.openGraph : {}) as Record<string, unknown>;
  const baseTwitter = (base.twitter && typeof base.twitter === "object" ? base.twitter : {}) as Record<string, unknown>;

  return {
    ...base,
    title,
    description,
    alternates: {
      ...(base.alternates ?? {}),
      canonical: localizedUrl,
      languages: languageAlternates(path),
    },
    ...(!isLocaleReady(locale) ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      ...baseOpenGraph,
      url: localizedUrl,
      locale: LOCALE_CONFIG[locale].ogLocale,
      title: typeof baseOpenGraph.title === "string" ? t(locale, baseOpenGraph.title) : title,
      description: typeof baseOpenGraph.description === "string" ? t(locale, baseOpenGraph.description) : description,
    } as Metadata["openGraph"],
    twitter: {
      ...baseTwitter,
      title: typeof baseTwitter.title === "string" ? t(locale, baseTwitter.title) : title,
      description: typeof baseTwitter.description === "string" ? t(locale, baseTwitter.description) : description,
    } as Metadata["twitter"],
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

export function organizationSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    image: `${SITE.url}/og-default.jpg`,
    description: t(locale, SITE.description),
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        areaServed: ["US", "IT", "DE", "AT", "CH", "FR", "BE", "LU", "AE", "SA", "QA", "Worldwide"],
        availableLanguage: ["English", "Italian", "German", "French", "Arabic"],
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Luxembourg" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Italy" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
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

export function websiteSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonical(localizedPath(locale, "/"))}#website`,
    url: canonical(localizedPath(locale, "/")),
    name: SITE.name,
    description: t(locale, SITE.description),
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: LOCALE_CONFIG[locale].htmlLang,
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
