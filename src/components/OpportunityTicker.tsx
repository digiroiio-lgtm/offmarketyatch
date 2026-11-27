import Link from "next/link";

import type { PublicOpportunity } from "@/lib/types";

/**
 * A running strip of what is actually published. Every cell is drawn from a
 * real record — there is no synthetic activity feed, no view counters and no
 * countdown. If inventory is empty the strip does not render at all.
 */
export default function OpportunityTicker({
  opportunities,
}: {
  opportunities: PublicOpportunity[];
}) {
  if (opportunities.length === 0) return null;

  // Duplicated once so the CSS translate(-50%) loop is seamless.
  const cells = [...opportunities, ...opportunities];

  return (
    <div className="ticker-viewport overflow-hidden border-y border-deal-room-line bg-deal-room py-0">
      <div className="flex w-max ticker-track" aria-hidden="true">
        {cells.map((opportunity, index) => (
          <TickerCell key={`${opportunity.slug}-${index}`} opportunity={opportunity} />
        ))}
      </div>

      {/* Accessible, non-animated equivalent of the same information. */}
      <ul className="sr-only">
        {opportunities.map((opportunity) => (
          <li key={opportunity.slug}>
            <Link href={`/off-market-yachts/${opportunity.slug}`}>
              {opportunity.reference}: {opportunity.titlePublic}, {opportunity.locationPublic},{" "}
              {opportunity.priceLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TickerCell({ opportunity }: { opportunity: PublicOpportunity }) {
  const headline =
    opportunity.availabilityType === "VERIFIED OFF-MARKET"
      ? "OFF-MARKET"
      : opportunity.availabilityType === "PRIVATE LISTING"
        ? "PRIVATE SALE"
        : opportunity.availabilityType === "POTENTIAL OPPORTUNITY"
          ? "POTENTIAL"
          : "BROKER-SOURCED";

  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-deal-room-line px-6 py-3.5">
      <span className="label-mono text-accent">{headline}</span>
      <span className="label-mono text-white/40">{opportunity.reference}</span>
      <span className="text-[13px] text-ink-inverse-muted">{opportunity.titlePublic}</span>
      <span className="text-[13px] text-white/35">{opportunity.locationPublic}</span>
      <span className="font-mono text-[13px] tabular-nums text-white/75">
        {opportunity.priceLabel}
      </span>
    </div>
  );
}
