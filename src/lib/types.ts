/**
 * Public-facing types for the off-market opportunity marketplace.
 *
 * IMPORTANT: this module is imported by Client Components. It must only ever
 * describe data that is safe to ship to a browser. Confidential record shapes
 * live in `src/data/opportunities.ts`, which is `server-only`.
 */

export type YachtType =
  | "Motor Yacht"
  | "Superyacht"
  | "Explorer Yacht"
  | "Sailing Yacht"
  | "Catamaran"
  | "Sport Yacht"
  | "Trimaran";

/**
 * How a listing came to us and what we can honestly claim about it.
 * See §25 of the product brief — an inferred opportunity must never be
 * presented as a confirmed seller.
 */
export type AvailabilityType =
  | "VERIFIED OFF-MARKET"
  | "PRIVATE LISTING"
  | "BROKER-SOURCED"
  | "PUBLIC MARKET"
  | "POTENTIAL OPPORTUNITY";

export type ConfidentialityLevel = "open" | "restricted" | "confidential";

/** Controls how much of the price we are permitted to publish. */
export type PriceVisibility = "exact" | "band" | "on-request";

/** Controls how precisely we may describe where the yacht is. */
export type LocationGranularity = "region" | "country" | "area";

export type BuildRegion =
  | "Northern European Build"
  | "Italian Build"
  | "Dutch Build"
  | "German Build"
  | "Turkish Build"
  | "North American Build"
  | "Asian Build";

export type CruisingArea =
  | "Florida"
  | "Florida / Bahamas"
  | "Florida / Caribbean"
  | "US East Coast"
  | "US West Coast"
  | "Caribbean"
  | "Bahamas"
  | "Mediterranean"
  | "Middle East"
  | "Northern Europe";

export type OpportunityBadge =
  | "OFF-MARKET"
  | "PRIVATE SALE"
  | "CONFIDENTIAL"
  | "NEW OPPORTUNITY"
  | "PRICE OPPORTUNITY"
  | "POTENTIAL OPPORTUNITY"
  | "USA"
  | "FLORIDA"
  | "BAHAMAS"
  | "CARIBBEAN"
  | "MEDITERRANEAN"
  | "EXPLORER"
  | "SUPERYACHT"
  | "MOTOR YACHT"
  | "SAILING";

/** Why an image is safe to show for a confidential listing. */
export type ImageTreatment =
  | "authorized" // owner/broker approved photography of this vessel
  | "illustrative" // representative imagery, explicitly labelled as such
  | "silhouette"; // generated silhouette, no photography at all

export interface PublicImage {
  /** Non-identifying alt text. Never contains yacht name, yard or berth. */
  alt: string;
  treatment: ImageTreatment;
  /** Deterministic visual seed used to render the privacy-treated artwork. */
  seed: string;
}

/**
 * The ONLY opportunity shape that may cross the server/client boundary,
 * appear in HTML, JSON-LD, OpenGraph, sitemaps or API responses.
 *
 * Every field here has been through `toPublicOpportunity()`.
 */
export interface PublicOpportunity {
  /** Stable public reference, e.g. "OMY-1048". Never the internal id. */
  reference: string;
  slug: string;
  /** Masked headline, e.g. "150–165 ft Motor Yacht". */
  titlePublic: string;
  type: YachtType;
  /**
   * Publishable length. Exact where disclosure is permitted, otherwise the
   * midpoint of the published band — the true figure never leaves the server.
   */
  lengthFt: number;
  lengthM: number;
  /** Ready-to-render length, e.g. "164 ft / 50 m" or "150–165 ft". */
  lengthDisplay: string;
  /** Band label used for faceting, e.g. "130–165 ft". */
  lengthBandLabel: string;
  year: number | null;
  yearLabel: string;
  refitYear: number | null;
  buildRegion: BuildRegion;
  hullMaterial: string | null;
  cabins: number | null;
  guests: number | null;
  crew: number | null;
  /** Generalised cruising area — never a marina or berth. */
  locationPublic: CruisingArea;
  country: string;
  /** Ready-to-render price string. Respects `priceVisibility`. */
  priceLabel: string;
  priceMin: number | null;
  priceMax: number | null;
  priceVisibility: PriceVisibility;
  currency: "USD";
  availabilityType: AvailabilityType;
  confidentialityLevel: ConfidentialityLevel;
  /** Buyer-facing copy. Written for publication; contains no private detail. */
  descriptionPublic: string;
  /** Short acquisition rationale for the detail page. */
  opportunityNotes: string;
  /** Which non-public fields exist, so the page can show honest locks. */
  lockedFields: string[];
  badges: OpportunityBadge[];
  images: PublicImage[];
  featured: boolean;
  /** True only where a human has confirmed the seller position. */
  verified: boolean;
  usageProfile: string | null;
  condition: string | null;
  publishedAt: string;
  updatedAt: string;
  /** ISO date, used for "recently added" ordering. Never a fake timestamp. */
  createdAt: string;
  /** True when the record carries enough unique public content to index. */
  indexable: boolean;
}

export type PriceBandKey =
  | "under-5m"
  | "5m-10m"
  | "10m-25m"
  | "25m-50m"
  | "50m-plus";

export type LengthBandKey =
  | "under-80"
  | "80-100"
  | "100-130"
  | "130-165"
  | "165-plus";
