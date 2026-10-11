import "server-only";

import {
  RESEARCH_BUILDERS,
  RESEARCH_CANDIDATES,
  RESEARCH_CLUSTERS,
  type ResearchCandidate,
} from "@/data/research-candidates";
import type { OpportunityRecord } from "@/data/opportunities";
import { buildDraftRecord } from "@/lib/draft-record";
import { publicationBlockers } from "@/lib/research-rules";

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

  return buildDraftRecord({
    id: `research-${candidate.id}`,
    slug: proposed.slug,
    publicReference: proposed.publicReference,
    nominalLengthFt: candidate.nominalLengthFt,
    year: candidate.year,
    advertisedPublicly: candidate.verification.advertisedPublicly,
    currency: candidate.suppliedPrice.currency,
    priceBand: proposed.priceBand,
    type: proposed.type,
    buildRegion: proposed.buildRegion,
    locationPublic: proposed.locationPublic,
    country: proposed.country,
    descriptionPublic: proposed.descriptionPublic,
    opportunityNotes: proposed.opportunityNotes,
    sellerSignalSource: "Research candidate; no contact with the seller",
  });
}
