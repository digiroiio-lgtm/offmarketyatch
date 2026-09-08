import "server-only";

import { OPPORTUNITY_RECORDS, type OpportunityRecord } from "@/data/opportunities";
import { getOverride } from "@/lib/admin-store";
import {
  LENGTH_BANDS,
  PRICE_BANDS,
  compactUsd,
  exactUsd,
  ftToM,
  lengthBandFor,
  maskedLengthRange,
  priceBandFor,
} from "@/lib/format";
import type {
  AvailabilityType,
  CruisingArea,
  LengthBandKey,
  OpportunityBadge,
  PriceBandKey,
  PublicOpportunity,
  YachtType,
} from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DATA ACCESS LAYER
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Every read of the opportunity store goes through this module, and every
 *  return value is a `PublicOpportunity` DTO built field-by-field from an
 *  explicit allow-list. Confidential columns are never spread, never
 *  `...record`-ed, and never reach a Client Component, JSON-LD block,
 *  OpenGraph tag, sitemap entry or API response.
 *
 *  Masking happens here, on the server. It is not a CSS or JavaScript overlay:
 *  the withheld values are absent from the payload entirely.
 */

// ─── Badge derivation ────────────────────────────────────────────────────────

/**
 * Badges are derived from stored fields only. There is deliberately no path
 * that can produce "3 buyers viewing", "seller motivated", "price just
 * dropped" or a countdown — if the record does not support a claim, the badge
 * does not exist.
 */
const NEW_OPPORTUNITY_WINDOW_DAYS = 21;

function deriveBadges(record: OpportunityRecord, now: Date): OpportunityBadge[] {
  const badges: OpportunityBadge[] = [];

  switch (record.availabilityType) {
    case "VERIFIED OFF-MARKET":
      badges.push("OFF-MARKET");
      break;
    case "PRIVATE LISTING":
      badges.push("PRIVATE SALE");
      break;
    case "POTENTIAL OPPORTUNITY":
      badges.push("POTENTIAL OPPORTUNITY");
      break;
    default:
      break;
  }

  if (record.confidentialityLevel === "confidential") badges.push("CONFIDENTIAL");

  const ageDays = Math.floor(
    (now.getTime() - new Date(record.createdAt).getTime()) / 86_400_000
  );
  if (ageDays <= NEW_OPPORTUNITY_WINDOW_DAYS) badges.push("NEW OPPORTUNITY");

  // Geography badges come straight from the published cruising area.
  if (record.country === "United States") badges.push("USA");
  if (record.locationPublic.startsWith("Florida")) badges.push("FLORIDA");
  if (record.locationPublic === "Bahamas") badges.push("BAHAMAS");
  if (record.locationPublic.includes("Caribbean")) badges.push("CARIBBEAN");
  if (record.locationPublic === "Mediterranean") badges.push("MEDITERRANEAN");

  if (record.type === "Explorer Yacht") badges.push("EXPLORER");
  if (record.type === "Superyacht") badges.push("SUPERYACHT");
  if (record.type === "Motor Yacht") badges.push("MOTOR YACHT");
  if (record.type === "Sailing Yacht" || record.type === "Catamaran") badges.push("SAILING");

  return Array.from(new Set(badges));
}

// ─── Masking ─────────────────────────────────────────────────────────────────

function buildPriceLabel(record: OpportunityRecord): string {
  switch (record.priceVisibility) {
    case "exact":
      return record.askingPrice !== null ? exactUsd(record.askingPrice) : "Price on request";
    case "band":
      if (record.priceMin !== null && record.priceMax !== null) {
        return `${compactUsd(record.priceMin)}–${compactUsd(record.priceMax)}`;
      }
      if (record.priceMin !== null) return `From ${compactUsd(record.priceMin)}`;
      if (record.priceMax !== null) return `Up to ${compactUsd(record.priceMax)}`;
      return "Price on request";
    case "on-request":
    default:
      return "Price on request";
  }
}

/**
 * Which confidential attributes exist on this record, expressed as buyer-facing
 * labels. The detail page shows these as locks so the visitor knows what is
 * being withheld rather than guessing — and the values themselves stay here.
 */
function deriveLockedFields(record: OpportunityRecord): string[] {
  const locked: string[] = [];
  if (record.yachtNamePrivate) locked.push("Yacht Identity");
  if (record.builderPrivate) locked.push("Shipyard");
  if (record.priceVisibility !== "exact") locked.push("Exact Asking Price");
  locked.push("Full Specification");
  if (record.locationPrivate) locked.push("Current Location");
  if (record.imagesPrivate.length > 0) locked.push("Additional Photography");
  if (record.brokerContactPrivate) locked.push("Broker / Seller Access");
  return locked;
}

/**
 * Alt text is published, so it is masked like any other published field.
 *
 * A record's stored alt text is authored by a human and can easily carry an
 * exact length ("Silhouette of a 164 ft motor yacht") that the rest of the
 * masking is holding back. Rather than trusting the author, any figure that
 * looks like a length in feet is rewritten to the published band. This is the
 * defence-in-depth counterpart to §21's rule that confidential values must not
 * reach image filenames or alt text.
 */
function maskAltText(alt: string, isConfidential: boolean, bandLabel: string): string {
  if (!isConfidential) return alt;
  return alt.replace(/\b\d{2,3}\s?(ft|foot|feet|m|metre|meter)\b/gi, bandLabel);
}

/**
 * A page is worth indexing only if it carries enough unique public substance to
 * be useful on its own (§26 — no thin masked doorway pages).
 *
 * The test is total unique prose rather than a cut on any single field. A
 * record with a short description but a substantial acquisition rationale is
 * still a useful page; one with a one-line description and nothing else is not,
 * whatever the spec table adds. Each floor exists on its own account, so a
 * record cannot pass by padding one field to compensate for an empty one.
 */
const MIN_DESCRIPTION_CHARS = 150;
const MIN_NOTES_CHARS = 80;
const MIN_COMBINED_CHARS = 320;

function isIndexable(record: OpportunityRecord): boolean {
  const description = record.descriptionPublic.trim().length;
  const notes = record.opportunityNotes.trim().length;
  return (
    record.status === "published" &&
    description >= MIN_DESCRIPTION_CHARS &&
    notes >= MIN_NOTES_CHARS &&
    description + notes >= MIN_COMBINED_CHARS
  );
}

/**
 * Build the public DTO. This is the single choke point between the
 * confidential store and everything else.
 */
function toPublicOpportunity(record: OpportunityRecord, now: Date): PublicOpportunity {
  const isConfidential = record.confidentialityLevel === "confidential";

  // Length: exact where permitted, otherwise a published range whose midpoint
  // is the only number that leaves the server.
  const masked = maskedLengthRange(record.lengthFt);
  const publishedFt = isConfidential ? masked.midpoint : record.lengthFt;
  const publishedM = isConfidential ? ftToM(masked.midpoint) : record.lengthM;
  const lengthDisplayValue = isConfidential
    ? masked.label
    : `${record.lengthFt} ft / ${record.lengthM} m`;

  const titlePublic = isConfidential
    ? `${masked.label} ${record.titlePublic}`
    : `${record.lengthFt} ft ${record.titlePublic}`;

  return {
    reference: record.publicReference,
    slug: record.slug,
    titlePublic,
    type: record.type,
    lengthFt: publishedFt,
    lengthM: publishedM,
    lengthDisplay: lengthDisplayValue,
    lengthBandLabel: lengthBandFor(publishedFt).label,
    year: record.year,
    yearLabel: record.year === null ? "Year on request" : String(record.year),
    refitYear: record.refitYear,
    // `builderPublic` is published only when the record explicitly sets it;
    // `builderPrivate` has no path to this object.
    buildRegion: record.buildRegion,
    hullMaterial: record.hullMaterial,
    cabins: record.cabins,
    guests: record.guests,
    crew: record.crew,
    locationPublic: record.locationPublic,
    country: record.country,
    priceLabel: buildPriceLabel(record),
    priceMin: record.priceVisibility === "on-request" ? null : record.priceMin,
    priceMax: record.priceVisibility === "on-request" ? null : record.priceMax,
    priceVisibility: record.priceVisibility,
    currency: "USD",
    availabilityType: record.availabilityType,
    confidentialityLevel: record.confidentialityLevel,
    descriptionPublic: record.descriptionPublic,
    opportunityNotes: record.opportunityNotes,
    lockedFields: deriveLockedFields(record),
    badges: deriveBadges(record, now),
    images: record.imagesPublic.map((image) => ({
      alt: maskAltText(image.alt, isConfidential, masked.label),
      treatment: image.treatment,
      seed: image.seed,
    })),
    featured: record.featured,
    verified: record.verified,
    usageProfile: record.usageProfile,
    condition: record.condition,
    publishedAt: record.publishedAt ?? record.createdAt,
    updatedAt: record.updatedAt,
    createdAt: record.createdAt,
    indexable: isIndexable(record),
  };
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Apply any operational override an authorised admin has set. Overrides may
 * only ever tighten or toggle operational state — they cannot introduce a
 * confidential value or widen what is published beyond the record itself.
 */
function withOverrides(record: OpportunityRecord): OpportunityRecord {
  const override = getOverride(record.slug);
  if (!override) return record;
  return {
    ...record,
    status: override.status ?? record.status,
    featured: override.featured ?? record.featured,
    verified: override.verified ?? record.verified,
    priceVisibility: override.priceVisibility ?? record.priceVisibility,
    locationGranularity: override.locationGranularity ?? record.locationGranularity,
    confidentialityLevel: override.confidentialityLevel ?? record.confidentialityLevel,
    updatedAt: override.updatedAt ?? record.updatedAt,
  };
}

/** Every record with overrides applied — including drafts. Admin use only. */
export function getAllRecordsForAdmin(): OpportunityRecord[] {
  return OPPORTUNITY_RECORDS.map(withOverrides);
}

function publishedRecords(): OpportunityRecord[] {
  return OPPORTUNITY_RECORDS.map(withOverrides).filter((r) => r.status === "published");
}

export interface OpportunityQuery {
  type?: YachtType;
  types?: YachtType[];
  priceBand?: PriceBandKey;
  lengthBand?: LengthBandKey;
  country?: string;
  location?: CruisingArea;
  locationPrefix?: string;
  availabilityType?: AvailabilityType;
  buildRegion?: string;
  minYear?: number;
  featured?: boolean;
  /** Free-text search across published fields only. */
  q?: string;
  limit?: number;
  sort?: "recent" | "price-desc" | "price-asc" | "length-desc";
}

export function getOpportunities(query: OpportunityQuery = {}): PublicOpportunity[] {
  const now = new Date();
  let items = publishedRecords().map((r) => toPublicOpportunity(r, now));

  if (query.type) items = items.filter((o) => o.type === query.type);
  if (query.types?.length) items = items.filter((o) => query.types!.includes(o.type));
  if (query.country) items = items.filter((o) => o.country === query.country);
  if (query.location) items = items.filter((o) => o.locationPublic === query.location);
  if (query.locationPrefix) {
    const prefix = query.locationPrefix;
    items = items.filter((o) => o.locationPublic.includes(prefix));
  }
  if (query.availabilityType) {
    items = items.filter((o) => o.availabilityType === query.availabilityType);
  }
  if (query.buildRegion) items = items.filter((o) => o.buildRegion === query.buildRegion);
  if (query.minYear) items = items.filter((o) => (o.year ?? 0) >= query.minYear!);
  if (query.featured !== undefined) items = items.filter((o) => o.featured === query.featured);

  if (query.priceBand) {
    const band = PRICE_BANDS.find((b) => b.key === query.priceBand);
    if (band) {
      items = items.filter((o) => {
        const listed = priceBandFor(o.priceMin, o.priceMax);
        return listed?.key === band.key;
      });
    }
  }

  if (query.lengthBand) {
    const band = LENGTH_BANDS.find((b) => b.key === query.lengthBand);
    if (band) {
      items = items.filter(
        (o) => o.lengthFt >= band.min && (band.max === null || o.lengthFt < band.max)
      );
    }
  }

  if (query.q?.trim()) {
    const needle = query.q.trim().toLowerCase();
    items = items.filter((o) =>
      [
        o.titlePublic,
        o.type,
        o.buildRegion,
        o.locationPublic,
        o.country,
        o.reference,
        o.priceLabel,
        o.descriptionPublic,
        o.availabilityType,
        ...o.badges,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }

  switch (query.sort) {
    case "price-desc":
      items.sort((a, b) => (b.priceMax ?? b.priceMin ?? 0) - (a.priceMax ?? a.priceMin ?? 0));
      break;
    case "price-asc":
      items.sort((a, b) => (a.priceMin ?? a.priceMax ?? 0) - (b.priceMin ?? b.priceMax ?? 0));
      break;
    case "length-desc":
      items.sort((a, b) => b.lengthFt - a.lengthFt);
      break;
    case "recent":
    default:
      items.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
  }

  return query.limit ? items.slice(0, query.limit) : items;
}

export function getOpportunityBySlug(slug: string): PublicOpportunity | null {
  const record = publishedRecords().find((r) => r.slug === slug.toLowerCase());
  return record ? toPublicOpportunity(record, new Date()) : null;
}

export function getAllOpportunitySlugs(): { slug: string; indexable: boolean; updatedAt: string }[] {
  const now = new Date();
  return publishedRecords()
    .map((r) => toPublicOpportunity(r, now))
    .map((o) => ({ slug: o.slug, indexable: o.indexable, updatedAt: o.updatedAt }));
}

/** Real counts, used wherever the UI shows a number. Never estimated. */
export function getInventoryStats() {
  const now = new Date();
  const all = publishedRecords().map((r) => toPublicOpportunity(r, now));
  return {
    total: all.length,
    usa: all.filter((o) => o.country === "United States").length,
    florida: all.filter((o) => o.locationPublic.startsWith("Florida")).length,
    offMarket: all.filter((o) => o.availabilityType === "VERIFIED OFF-MARKET").length,
    newThisMonth: all.filter(
      (o) => Date.parse(o.createdAt) > now.getTime() - 30 * 86_400_000
    ).length,
  };
}

/**
 * Related opportunities for a detail page — same type first, then same
 * cruising area, excluding the current record.
 */
export function getRelatedOpportunities(
  current: PublicOpportunity,
  limit = 3
): PublicOpportunity[] {
  const pool = getOpportunities().filter((o) => o.slug !== current.slug);
  const scored = pool.map((o) => {
    let score = 0;
    if (o.type === current.type) score += 3;
    if (o.locationPublic === current.locationPublic) score += 2;
    if (o.country === current.country) score += 1;
    if (lengthBandFor(o.lengthFt).key === lengthBandFor(current.lengthFt).key) score += 2;
    return { o, score };
  });
  scored.sort((a, b) => b.score - a.score || Date.parse(b.o.createdAt) - Date.parse(a.o.createdAt));
  return scored.slice(0, limit).map((s) => s.o);
}
