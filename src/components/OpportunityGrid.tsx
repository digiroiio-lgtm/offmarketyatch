import Link from "next/link";

import OpportunityCard from "@/components/OpportunityCard";
import type { PublicOpportunity } from "@/lib/types";

export default function OpportunityGrid({
  opportunities,
  columns = 3,
  priorityCount = 0,
  compact = false,
  emptyMessage = "No opportunities currently match this view. Tell us what you are looking for and we will search the private market directly.",
}: {
  opportunities: PublicOpportunity[];
  columns?: 2 | 3 | 4;
  /** How many cards are above the fold and should paint without a lazy hint. */
  priorityCount?: number;
  compact?: boolean;
  emptyMessage?: string;
}) {
  if (opportunities.length === 0) {
    return (
      <div className="border border-dashed border-line-strong px-6 py-14 text-center">
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-ink-muted">
          {emptyMessage}
        </p>
        <Link href="/request-private-access" className="btn-primary mt-6">
          Start a Private Search
        </Link>
      </div>
    );
  }

  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 gap-5 ${gridClass}`}>
      {opportunities.map((opportunity, index) => (
        <OpportunityCard
          key={opportunity.slug}
          opportunity={opportunity}
          priority={index < priorityCount}
          compact={compact}
        />
      ))}
    </div>
  );
}
