"use client";

import Link from "next/link";

import { BadgeRow } from "@/components/Badge";
import OpportunityVisual from "@/components/OpportunityVisual";
import { track } from "@/lib/analytics";
import { lengthBandFor, priceBandFor, relativeDayLabel } from "@/lib/format";
import type { PublicOpportunity } from "@/lib/types";

/**
 * The opportunity card carries enough to create genuine interest — class,
 * proportion, era, cruising area, price band — and stops short of anything
 * that would let an anonymous visitor identify the vessel. Everything it
 * renders has already been masked server-side; there is nothing withheld
 * hiding in the props.
 */
export default function OpportunityCard({
  opportunity,
  priority = false,
  compact = false,
}: {
  opportunity: PublicOpportunity;
  priority?: boolean;
  compact?: boolean;
}) {
  const href = `/off-market-yachts/${opportunity.slug}`;
  const priceBand = priceBandFor(opportunity.priceMin, opportunity.priceMax);
  const isPotential = opportunity.availabilityType === "POTENTIAL OPPORTUNITY";

  function onOpen() {
    track("listing_view", {
      listing_id: opportunity.reference,
      price_band: priceBand?.key ?? "on-request",
      length_band: lengthBandFor(opportunity.lengthFt).key,
      location: opportunity.locationPublic,
      type: opportunity.type,
    });
  }

  return (
    <article className="group relative flex flex-col border border-line bg-paper-raised transition-colors hover:border-line-strong">
      <div className="relative">
        <OpportunityVisual
          image={
            opportunity.images[0] ?? {
              alt: `Profile study of a ${opportunity.type.toLowerCase()}`,
              treatment: "silhouette",
              seed: opportunity.reference,
            }
          }
          type={opportunity.type}
          className={compact ? "aspect-[16/9]" : "aspect-[16/10]"}
          priority={priority}
        />
        {/*
          The reference and the badges share one row, so the badge count has to
          drop in the narrow 4-up grid or the two collide. `flex-wrap` plus a
          shrinking badge row keeps them apart at every width.
        */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <BadgeRow badges={opportunity.badges} limit={compact ? 1 : 2} onDark />
          <span className="label-mono shrink-0 border border-white/20 px-2 py-1 text-white/70">
            {opportunity.reference}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="label-mono text-ink-faint">
          {opportunity.availabilityType}
          {opportunity.verified && (
            <span className="ml-2 text-signal">· Seller position confirmed</span>
          )}
        </p>

        <h3 className="mt-2.5 text-[19px] font-semibold leading-snug tracking-tight text-ink">
          <Link href={href} onClick={onOpen} className="after:absolute after:inset-0">
            {opportunity.titlePublic}
          </Link>
        </h3>

        <p className="mt-1.5 text-[13.5px] text-ink-muted">
          {opportunity.buildRegion} · {opportunity.yearLabel}
          {opportunity.refitYear ? ` · Refit ${opportunity.refitYear}` : ""}
        </p>
        <p className="text-[13.5px] text-ink-muted">{opportunity.locationPublic}</p>

        <p className="mt-4 font-mono text-[20px] tabular-nums tracking-tight text-ink">
          {opportunity.priceLabel}
        </p>
        {opportunity.priceVisibility === "band" && (
          <p className="label-mono mt-1 text-ink-faint">Estimated asking range</p>
        )}

        {!compact && (
          <dl className="mt-4 grid grid-cols-3 gap-x-3 gap-y-2 border-t border-line pt-4">
            {[
              { term: "Guests", value: opportunity.guests },
              { term: "Cabins", value: opportunity.cabins },
              { term: "Crew", value: opportunity.crew },
            ]
              .filter((row) => row.value !== null)
              .map((row) => (
                <div key={row.term}>
                  <dt className="label-mono text-ink-faint">{row.term}</dt>
                  <dd className="data-value mt-1 text-ink">{row.value}</dd>
                </div>
              ))}
            {opportunity.hullMaterial && (
              <div className="col-span-3">
                <dt className="label-mono text-ink-faint">Hull</dt>
                <dd className="data-value mt-1 text-ink">{opportunity.hullMaterial}</dd>
              </div>
            )}
          </dl>
        )}

        {isPotential && (
          <p className="mt-4 border-l-2 border-lock/60 pl-3 text-[12.5px] leading-relaxed text-ink-muted">
            Availability not confirmed. Our acquisition team can investigate privately on behalf
            of qualified buyers.
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <span className="label-mono text-ink-faint">
            {relativeDayLabel(opportunity.createdAt)}
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent transition-transform group-hover:translate-x-0.5">
            {isPotential ? "Investigate →" : "Request Details →"}
          </span>
        </div>
      </div>
    </article>
  );
}
