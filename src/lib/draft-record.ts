import "server-only";

import type { OpportunityRecord } from "@/data/opportunities";
import { generaliseForPublication } from "@/lib/research-rules";
import type { BuildRegion, CruisingArea, YachtType } from "@/lib/types";

/**
 * The one place a private source (research candidate or intake submission) is
 * turned into an `OpportunityRecord`. It always produces a DRAFT, built from an
 * explicit allow-list: nothing private is copied across, availability is
 * always an unconfirmed potential opportunity, imagery is a silhouette, and
 * the exact year and any non-USD price are withheld.
 */

export const YACHT_TYPES: YachtType[] = [
  "Motor Yacht",
  "Superyacht",
  "Explorer Yacht",
  "Sailing Yacht",
  "Catamaran",
  "Sport Yacht",
  "Trimaran",
];

export const BUILD_REGIONS: BuildRegion[] = [
  "Northern European Build",
  "Italian Build",
  "Dutch Build",
  "German Build",
  "Turkish Build",
  "North American Build",
  "Asian Build",
];

export const CRUISING_AREAS: CruisingArea[] = [
  "Florida",
  "Florida / Bahamas",
  "Florida / Caribbean",
  "US East Coast",
  "US West Coast",
  "Caribbean",
  "Bahamas",
  "Mediterranean",
  "Middle East",
  "Northern Europe",
];

export interface DraftInput {
  id: string;
  slug: string;
  publicReference: string;
  nominalLengthFt: number;
  year: number | null;
  advertisedPublicly: boolean;
  currency: "USD" | "EUR";
  /** USD band approved for publication; ignored for non-USD sources. */
  priceBand: { min: number; max: number } | null;
  type: YachtType;
  buildRegion: BuildRegion;
  locationPublic: CruisingArea;
  country: string;
  descriptionPublic: string;
  opportunityNotes: string;
  sellerSignalSource: string;
}

export function buildDraftRecord(input: DraftInput): OpportunityRecord {
  const general = generaliseForPublication({
    year: input.year,
    nominalLengthFt: input.nominalLengthFt,
    advertisedPublicly: input.advertisedPublicly,
    currency: input.currency,
    priceBandApproved: input.priceBand !== null,
  });
  const band = general.priceVisibility === "band" ? input.priceBand : null;
  const now = new Date().toISOString();

  return {
    id: input.id,
    slug: input.slug,
    publicReference: input.publicReference,
    status: "draft",
    confidentialityLevel: "confidential",
    titlePublic: input.type,
    type: input.type,
    lengthFt: input.nominalLengthFt,
    lengthM: Math.round(input.nominalLengthFt * 0.3048),
    year: general.year,
    refitYear: null,
    builderPublic: null,
    buildRegion: input.buildRegion,
    hullMaterial: null,
    cabins: null,
    guests: null,
    crew: null,
    locationPublic: input.locationPublic,
    country: input.country,
    locationGranularity: "region",
    priceVisibility: general.priceVisibility,
    askingPrice: null,
    priceMin: band?.min ?? null,
    priceMax: band?.max ?? null,
    currency: "USD",
    availabilityType: "POTENTIAL OPPORTUNITY",
    descriptionPublic: input.descriptionPublic,
    opportunityNotes: input.opportunityNotes,
    usageProfile: null,
    condition: null,
    featured: false,
    verified: false,
    imagesPublic: [
      {
        alt: `Profile study of a ${input.type.toLowerCase()}`,
        treatment: "silhouette",
        seed: input.publicReference,
      },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    yachtNamePrivate: null,
    builderPrivate: null,
    locationPrivate: null,
    descriptionPrivate: null,
    sellerSignal: "unconfirmed",
    sellerSignalSource: input.sellerSignalSource,
    imagesPrivate: [],
    brokerContactPrivate: null,
    imoPrivate: null,
    mmsiPrivate: null,
    registrationPrivate: null,
  };
}
