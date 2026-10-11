import "server-only";

import {
  RESEARCH_BUILDERS,
  RESEARCH_CANDIDATES,
  RESEARCH_CLUSTERS,
  type ResearchCandidate,
} from "@/data/research-candidates";
import type { OpportunityRecord } from "@/data/opportunities";
import { generaliseForPublication, publicationBlockers } from "@/lib/research-rules";

export { publicationBlockers };

/**
 * Admin-only view of the research pipeline. Names, sources and exact prices
 * stay in the data file: the overview carries only what a reviewer needs to
 * decide what is missing, and it is never reachable from a public route.
 */
export interface ResearchOverviewRow {
  id: string;
  status: string;
  builder: string;
  builderRegion: string | null;
  year: number | null;
  suppliedPrice: string;
  sourcesOpened: string;
  blockers: string[];
}

function formatSupplied(candidate: ResearchCandidate): string {
  const { amount, amountHigh, currency } = candidate.suppliedPrice;
  const fmt = (value: number) => `${currency} ${value.toLocaleString("en-US")}`;
  return amountHigh ? `${fmt(amount)} – ${fmt(amountHigh)}` : fmt(amount);
}

export function getResearchOverview(): {
  rows: ResearchOverviewRow[];
  clusters: readonly { name: string; note: string }[];
} {
  const builders = new Map(RESEARCH_BUILDERS.map((b) => [b.key, b]));
  const rows = RESEARCH_CANDIDATES.map((candidate) => {
    const builder = builders.get(candidate.builderKey);
    return {
      id: candidate.id,
      status: candidate.status,
      builder: builder?.name ?? candidate.builderKey,
      builderRegion: builder?.region ?? null,
      year: candidate.year,
      suppliedPrice: formatSupplied(candidate),
      sourcesOpened: `${candidate.sources.filter((s) => s.opened).length} of ${candidate.sources.length}`,
      blockers: publicationBlockers(candidate),
    };
  });
  return { rows, clusters: RESEARCH_CLUSTERS };
}

/**
 * The only bridge from research into the public inventory, and it produces a
 * DRAFT record, never a published one. It refuses while any blocker remains,
 * builds the record from the reviewer's allow-listed projection only, and
 * always labels it an unconfirmed potential opportunity. Publishing the draft
 * is a separate, deliberate step.
 */
export function promoteToDraftRecord(candidate: ResearchCandidate): OpportunityRecord {
  const blockers = publicationBlockers(candidate);
  const proposed = candidate.publication.proposedPublic;
  if (blockers.length > 0 || !proposed) {
    throw new Error(`${candidate.id} cannot be promoted: ${blockers.join("; ")}`);
  }

  const general = generaliseForPublication({
    year: candidate.year,
    nominalLengthFt: candidate.nominalLengthFt,
    advertisedPublicly: candidate.verification.advertisedPublicly,
    currency: candidate.suppliedPrice.currency,
    priceBandApproved: proposed.priceBand !== null,
  });
  const band = general.priceVisibility === "band" ? proposed.priceBand : null;
  const now = new Date().toISOString();

  return {
    id: `research-${candidate.id}`,
    slug: proposed.slug,
    publicReference: proposed.publicReference,
    status: "draft",
    confidentialityLevel: "confidential",
    titlePublic: proposed.type,
    type: proposed.type,
    lengthFt: candidate.nominalLengthFt,
    lengthM: Math.round(candidate.nominalLengthFt * 0.3048),
    year: general.year,
    refitYear: null,
    builderPublic: null,
    buildRegion: proposed.buildRegion,
    hullMaterial: null,
    cabins: null,
    guests: null,
    crew: null,
    locationPublic: proposed.locationPublic,
    country: proposed.country,
    locationGranularity: "region",
    priceVisibility: general.priceVisibility,
    askingPrice: null,
    priceMin: band?.min ?? null,
    priceMax: band?.max ?? null,
    currency: "USD",
    availabilityType: "POTENTIAL OPPORTUNITY",
    descriptionPublic: proposed.descriptionPublic,
    opportunityNotes: proposed.opportunityNotes,
    usageProfile: null,
    condition: null,
    featured: false,
    verified: false,
    imagesPublic: [
      {
        alt: `Profile study of a ${proposed.type.toLowerCase()}`,
        treatment: "silhouette",
        seed: proposed.publicReference,
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
    sellerSignalSource: "Research candidate; no contact with the seller",
    imagesPrivate: [],
    brokerContactPrivate: null,
    imoPrivate: null,
    mmsiPrivate: null,
    registrationPrivate: null,
  };
}
