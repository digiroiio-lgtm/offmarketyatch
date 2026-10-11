import type { ResearchCandidate } from "@/data/research-candidates";

/**
 * Pure rules for research candidates: what blocks publication, and how a
 * publishable record's attributes are generalised. No data lives here and
 * nothing here is `server-only`, so the rules can be exercised directly by
 * `scripts/research-rules.test.mjs`.
 */

/** Everything still standing between a candidate and publication. */
export function publicationBlockers(candidate: ResearchCandidate): string[] {
  const blockers: string[] = [];
  const { verification, publication } = candidate;

  if (candidate.status !== "INTERNAL_RESEARCH") {
    blockers.push("Model reference: there is no individual vessel to publish");
  }
  if (candidate.modelOnly) blockers.push("Describes a model, not one vessel");
  if (verification.classMatch !== "luxury-yacht") {
    blockers.push("Outside the luxury-yacht class of this inventory");
  }
  if (verification.identity !== "confirmed") blockers.push("Vessel identity not confirmed");
  if (verification.duplicateOf) {
    blockers.push(`Duplicate of ${verification.duplicateOf}`);
  }
  if (!candidate.sources.some((source) => source.opened)) {
    blockers.push("No original source page opened and read");
  }

  const advertised = candidate.observedPrices.filter((p) => p.kind === "advertised-unverified");
  const distinct = new Set(advertised.map((p) => `${p.currency}:${p.amount}`));
  if (advertised.length === 0) blockers.push("No advertised price to rely on");
  if (distinct.size > 1) blockers.push("Source prices conflict");

  if (verification.availabilityEvidence === "none") {
    blockers.push("No evidence of availability");
  }
  if (!publication.approved) blockers.push("Reviewer sign-off missing");
  if (!publication.reviewer || !publication.reviewedOn) {
    blockers.push("Reviewer and review date not recorded");
  }
  if (!publication.lawfulBasisNote) {
    blockers.push("No lawful-basis note for publishing a masked research entry");
  }
  if (!publication.proposedPublic) blockers.push("No allow-listed public projection");

  return blockers;
}

/** "2017" -> "2015–2019". Mirrors `maskedYearRange` in `src/lib/format.ts`. */
export function yearRange(year: number): string {
  const lower = Math.floor(year / 5) * 5;
  return `${lower}–${lower + 4}`;
}

/** 15-ft band for yachts of 100 ft and over. Mirrors `maskedLengthRange`. */
export function lengthBand(ft: number): string {
  const width = ft >= 100 ? 15 : 10;
  const lower = Math.floor(ft / width) * width;
  return `${lower}–${lower + width} ft`;
}

export interface GeneralisationInput {
  year: number | null;
  nominalLengthFt: number;
  advertisedPublicly: boolean;
  currency: "USD" | "EUR";
  /** True only for a USD band a reviewer has approved. */
  priceBandApproved: boolean;
}

export interface GeneralisedAttributes {
  /** Null means the year is withheld entirely. */
  year: number | null;
  yearLabel: string;
  lengthLabel: string;
  priceVisibility: "band" | "on-request";
  reasons: string[];
}

/**
 * Combination-based masking. A publicly advertised vessel can be found again
 * from length, year, build and area together, so those are generalised and
 * the year is withheld; a price is published only as an approved USD band.
 * Non-USD prices are never converted and are always "on request".
 */
export function generaliseForPublication(input: GeneralisationInput): GeneralisedAttributes {
  const reasons: string[] = [];

  let year = input.year;
  let yearLabel = input.year === null ? "Year on request" : String(input.year);
  if (input.advertisedPublicly) {
    year = null;
    yearLabel = input.year === null ? "Year on request" : `Year on request (${yearRange(input.year)})`;
    reasons.push("Advertised publicly: exact year withheld");
  }

  let priceVisibility: "band" | "on-request" = "on-request";
  if (input.currency !== "USD") {
    reasons.push("Non-USD price: not converted, shown as price on request");
  } else if (!input.priceBandApproved) {
    reasons.push("No approved price band: shown as price on request");
  } else {
    priceVisibility = "band";
  }

  return {
    year,
    yearLabel,
    lengthLabel: lengthBand(input.nominalLengthFt),
    priceVisibility,
    reasons,
  };
}
