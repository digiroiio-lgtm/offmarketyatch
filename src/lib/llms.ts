import "server-only";

import { ARTICLES } from "@/data/articles";
import { getIndexableLandingPages } from "@/data/landing";
import { IS_SAMPLE_INVENTORY, SAMPLE_INVENTORY_NOTICE } from "@/lib/inventory-mode";
import { getOpportunities } from "@/lib/opportunities";
import { SITE, canonical } from "@/lib/site";

/**
 * Plain-text site guides for language models (llms.txt convention).
 *
 * Everything here comes from the same public sources the pages render from.
 * Opportunities are read only through `getOpportunities()`, which returns the
 * masked `PublicOpportunity` DTO, so nothing withheld on the site can appear
 * here. `npm run audit:confidentiality` scans the built files as well.
 */

const SUMMARY =
  `${SITE.description} Yacht identity, exact price and location are never published; ` +
  "they are released to qualified buyers only, under the owner's terms.";

const CORE_PAGES: { path: string; label: string; note: string }[] = [
  { path: "/off-market-yachts", label: "Private market", note: "Masked off-market yacht opportunities." },
  { path: "/request-private-access", label: "Request private access", note: "Buyer qualification form." },
  { path: "/sell-your-yacht-privately", label: "Sell your yacht privately", note: "Owner-side confidential sale process." },
  { path: "/private-market-intelligence", label: "Private market intelligence", note: "Guides to buying and selling off-market." },
  { path: "/owner-representation", label: "Owner representation", note: "Confidential representation for owners." },
  { path: "/yacht-brokers", label: "Broker cooperation", note: "How brokers co-operate on private listings." },
  { path: "/family-offices", label: "Family offices", note: "Private acquisition for family offices." },
  { path: "/about", label: "About", note: "Who we are and how the platform works." },
  { path: "/contact", label: "Contact", note: "Confidential enquiries." },
];

function link(path: string, label: string, note?: string): string {
  return `- [${label}](${canonical(path)})${note ? `: ${note}` : ""}`;
}

function header(): string[] {
  const lines = [`# ${SITE.name}`, "", `> ${SUMMARY}`, ""];
  if (IS_SAMPLE_INVENTORY) lines.push(`Note: ${SAMPLE_INVENTORY_NOTICE}`, "");
  return lines;
}

export function buildLlmsTxt(): string {
  const lines = header();

  lines.push("## Key pages", "");
  for (const page of CORE_PAGES) lines.push(link(page.path, page.label, page.note));

  lines.push("", "## Yacht categories, locations and budgets", "");
  for (const page of getIndexableLandingPages()) {
    lines.push(link(`/${page.slug}`, page.h1, page.metaDescription));
  }

  lines.push("", "## Market intelligence", "");
  for (const article of ARTICLES) {
    lines.push(link(`/private-market-intelligence/${article.slug}`, article.title, article.metaDescription));
  }

  lines.push(
    "",
    "## Optional",
    "",
    link("/privacy", "Privacy policy"),
    link("/terms", "Terms of use"),
    `- [Full text version](${canonical("/llms-full.txt")}): articles, FAQs and the public opportunity list in one file.`,
    "",
    `Contact: ${SITE.email}`,
    ""
  );
  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const lines = header();

  lines.push("## Opportunities (masked public view)", "");
  for (const o of getOpportunities()) {
    lines.push(
      `### ${o.reference}: ${o.titlePublic}`,
      "",
      `- URL: ${canonical(`/off-market-yachts/${o.slug}`)}`,
      `- Type: ${o.type}; length: ${o.lengthDisplay}; cruising area: ${o.locationPublic}`,
      `- Price: ${o.priceLabel}; status: ${o.availabilityType}`,
      "",
      o.descriptionPublic,
      ""
    );
  }

  lines.push("## Landing pages", "");
  for (const page of getIndexableLandingPages()) {
    lines.push(`### ${page.h1}`, "", canonical(`/${page.slug}`), "", page.standfirst, "", ...page.intro.flatMap((p) => [p, ""]));
    for (const faq of page.faqs) lines.push(`**${faq.question}**`, "", faq.answer, "");
  }

  lines.push("## Market intelligence articles", "");
  for (const article of ARTICLES) {
    lines.push(
      `### ${article.title}`,
      "",
      canonical(`/private-market-intelligence/${article.slug}`),
      `Published ${article.published}; updated ${article.updated}.`,
      "",
      article.standfirst,
      "",
      ...article.intro.flatMap((p) => [p, ""])
    );
    for (const section of article.sections) {
      lines.push(`#### ${section.heading}`, "", ...section.paragraphs.flatMap((p) => [p, ""]));
      if (section.bullets) lines.push(...section.bullets.map((b) => `- ${b}`), "");
    }
    for (const faq of article.faqs) lines.push(`**${faq.question}**`, "", faq.answer, "");
  }

  lines.push(`Contact: ${SITE.email}`, "");
  return lines.join("\n");
}
