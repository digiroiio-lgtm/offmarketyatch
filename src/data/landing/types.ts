import type { OpportunityQuery } from "@/lib/opportunities";

/**
 * A commercial-intent landing page.
 *
 * Every page in this system carries content written for that specific segment.
 * The shared shape is a layout contract, not a template to be filled with
 * spun text — a page with nothing distinctive to say should not exist, and
 * `indexable: false` keeps a thin one out of the index if it does.
 */
export interface LandingPage {
  /** URL segment, without slashes. */
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  /** One-line positioning under the H1. */
  standfirst: string;
  /** Unique body copy. Rendered as paragraphs. */
  intro: string[];
  /** Which opportunities this page lists. */
  query: OpportunityQuery;
  /** Heading above the inventory grid. */
  inventoryHeading: string;
  /** Shown when the query returns nothing — always routes to a lead funnel. */
  emptyMessage: string;
  /** AI-citable question/answer units. */
  answers: { question: string; answer: string }[];
  faqs: { question: string; answer: string }[];
  /** Secondary editorial section, below the inventory. */
  detail?: { heading: string; body: string[] };
  /** Internal links out to related segments and intelligence. */
  related: { href: string; label: string }[];
  breadcrumb: { label: string; href?: string }[];
  /**
   * Set false for a page that cannot carry enough unique substance to deserve
   * indexing (§26). Nothing is indexed by default just because it exists.
   */
  indexable?: boolean;
}
