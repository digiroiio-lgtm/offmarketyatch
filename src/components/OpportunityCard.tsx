"use client";

import LocaleLink from "@/components/LocaleLink";
import { useLocale } from "@/components/LocaleProvider";
import { displayYachtText, t } from "@/lib/i18n";

import { BadgeRow } from "@/components/Badge";
import OpportunityVisual from "@/components/OpportunityVisual";
import { relativeDayLabel } from "@/lib/format";
import type { PublicOpportunity } from "@/lib/types";

/**
 * The opportunity card carries enough to create genuine interest — class,
 * proportion, era, cruising area, price band — and stops short of anything
 * that would let an anonymous visitor identify the vessel. Everything it
 * renders has already been masked server-side; there is nothing withheld
 * hiding in the props.
 */
function localizedAddedLabel(locale: ReturnType<typeof useLocale>, label: string): string {
  const days = label.match(/^Added (\d+) days ago$/);
  if (days) return t(locale, "Added {days} days ago").replace("{days}", days[1]);
  return t(locale, label);
}

export default function OpportunityCard({
  opportunity,
  priority = false,
  compact = false,
}: {
  opportunity: PublicOpportunity;
  priority?: boolean;
  compact?: boolean;
}) {
  const locale = useLocale();
  const href = `/off-market-yachts/${opportunity.slug}`;
  const isPotential = opportunity.availabilityType === "POTENTIAL OPPORTUNITY";

  return (
    <article className="group relative flex flex-col border border-line bg-paper-raised transition-colors hover:border-line-strong">
      <div className="relative">
        <OpportunityVisual
          image={
            opportunity.images[0] ?? {
              alt: t(locale, "Profile study") + " — " + displayYachtText(locale, opportunity.type),
              treatment: "silhouette",
              seed: opportunity.reference,
            }
          }
          type={opportunity.type}
          className={compact ? "aspect-[16/9]" : "aspect-[16/10]"}
          priority={priority}
          locale={locale}
        />
        {/*
          The reference and the badges share one row, so the badge count has to
          drop in the narrow 4-up grid or the two collide. `flex-wrap` plus a
          shrinking badge row keeps them apart at every width.
        */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <BadgeRow badges={opportunity.badges} limit={compact ? 1 : 2} onDark locale={locale} />
          <span className="label-mono shrink-0 border border-white/20 px-2 py-1 text-white/70">
            {opportunity.reference}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="label-mono text-ink-faint">
          {t(locale, opportunity.availabilityType)}
          {opportunity.verified && (
            <span className="ml-2 text-signal">· {t(locale, "Seller position confirmed")}</span>
          )}
        </p>

        <h3 className="mt-2.5 text-[19px] font-semibold leading-snug tracking-tight text-ink">
          <LocaleLink href={href} className="after:absolute after:inset-0">
            {displayYachtText(locale, opportunity.titlePublic)}
          </LocaleLink>
        </h3>

        <p className="mt-1.5 text-[13.5px] text-ink-muted">
          {displayYachtText(locale, opportunity.buildRegion)} · {opportunity.yearLabel}
          {opportunity.refitYear ? ` · ${t(locale, "Refit")} ${opportunity.refitYear}` : ""}
        </p>
        <p className="text-[13.5px] text-ink-muted">{t(locale, opportunity.locationPublic)}</p>

        <p className="mt-4 font-mono text-[20px] tabular-nums tracking-tight text-ink">
          {opportunity.priceLabel}
        </p>
        {opportunity.priceVisibility === "band" && (
          <p className="label-mono mt-1 text-ink-faint">{t(locale, "Estimated asking range")}</p>
        )}

        {!compact && (
          <dl className="mt-4 grid grid-cols-3 gap-x-3 gap-y-2 border-t border-line pt-4">
            {[
              { term: t(locale, "Guests"), value: opportunity.guests },
              { term: t(locale, "Cabins"), value: opportunity.cabins },
              { term: t(locale, "Crew"), value: opportunity.crew },
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
                <dt className="label-mono text-ink-faint">{t(locale, "Hull")}</dt>
                <dd className="data-value mt-1 text-ink">{opportunity.hullMaterial}</dd>
              </div>
            )}
          </dl>
        )}

        {isPotential && (
          <p className="mt-4 border-l-2 border-lock/60 pl-3 text-[12.5px] leading-relaxed text-ink-muted">
            {t(locale, "Availability not confirmed. Our acquisition team can investigate privately on behalf of qualified buyers.")}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <span className="label-mono text-ink-faint">
            {localizedAddedLabel(locale, relativeDayLabel(opportunity.createdAt))}
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent transition-transform group-hover:translate-x-0.5">
            {t(locale, isPotential ? "Investigate Privately →" : "Request Details →")}
          </span>
        </div>
      </div>
    </article>
  );
}
