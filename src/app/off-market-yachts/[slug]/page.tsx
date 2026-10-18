import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BadgeRow } from "@/components/Badge";
import Breadcrumb from "@/components/Breadcrumb";
import FinalCTA from "@/components/FinalCTA";
import LockedDetails from "@/components/LockedDetails";
import OpportunityGrid from "@/components/OpportunityGrid";
import OpportunityVisual from "@/components/OpportunityVisual";
import SampleInventoryNotice from "@/components/SampleInventoryNotice";
import SchemaOrg from "@/components/SchemaOrg";
import ListingInquiryForm from "@/components/forms/ListingInquiryForm";
import { relativeDayLabel } from "@/lib/format";
import {
  getAllOpportunitySlugs,
  getOpportunityBySlug,
  getRelatedOpportunities,
} from "@/lib/opportunities";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

/*
  `true` so a slug outside the build-time list is still resolved at request
  time. That matters for the admin's publish control: withdrawing a listing
  makes its page 404, and re-publishing it has to be able to bring the page
  back without a redeploy. With `false`, the 404 would be permanent until the
  next build. A slug the data layer does not recognise still 404s.
*/
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllOpportunitySlugs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/off-market-yachts/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const opportunity = getOpportunityBySlug(slug);
  if (!opportunity) return {};

  // Title and description are built from published fields only. Nothing
  // confidential can reach <title>, the meta description or OpenGraph.
  return pageMetadata({
    title: `${opportunity.titlePublic}, ${opportunity.locationPublic} — ${opportunity.reference}`,
    // Listing titles already carry the length, class, area and reference; the brand suffix would push them past ~60 characters.
    absoluteTitle: true,
    description: `Confidential ${opportunity.type.toLowerCase()} opportunity. ${
      opportunity.lengthDisplay
    }, ${opportunity.buildRegion}, ${opportunity.yearLabel}. ${
      opportunity.locationPublic
    }. ${opportunity.priceLabel}. Details released to qualified buyers.`,
    path: `/off-market-yachts/${opportunity.slug}`,
    // A masked record without enough unique public substance stays out of the
    // index rather than becoming a thin doorway page.
    noindex: !opportunity.indexable,
    modifiedTime: opportunity.updatedAt,
  });
}

export default async function OpportunityDetailPage(
  props: PageProps<"/off-market-yachts/[slug]">
) {
  const { slug } = await props.params;
  const opportunity = getOpportunityBySlug(slug);
  if (!opportunity) notFound();

  const related = getRelatedOpportunities(opportunity, 3);
  const isPotential = opportunity.availabilityType === "POTENTIAL OPPORTUNITY";

  // The H1 is built from published fields only (same sources as the spec table),
  // so listings in the same length band get distinct headings.
  const headingLength =
    opportunity.confidentialityLevel === "confidential"
      ? opportunity.lengthDisplay
      : `${opportunity.lengthFt} ft`;
  const heading = `${headingLength} ${opportunity.buildRegion.replace(/ Build$/, "")} ${opportunity.type}${
    opportunity.year !== null ? `, ${opportunity.year}` : ""
  } — ${opportunity.locationPublic}`;

  const specs = [
    { term: "Length", value: opportunity.lengthDisplay },
    { term: "Class", value: opportunity.type },
    { term: "Year", value: opportunity.yearLabel },
    { term: "Refit", value: opportunity.refitYear ? String(opportunity.refitYear) : null },
    { term: "Build Region", value: opportunity.buildRegion },
    { term: "Hull", value: opportunity.hullMaterial },
    { term: "Guests", value: opportunity.guests !== null ? String(opportunity.guests) : null },
    { term: "Cabins", value: opportunity.cabins !== null ? String(opportunity.cabins) : null },
    { term: "Crew", value: opportunity.crew !== null ? String(opportunity.crew) : null },
    { term: "Cruising Area", value: opportunity.locationPublic },
    { term: "Condition", value: opportunity.condition },
    { term: "Usage Profile", value: opportunity.usageProfile },
    { term: "Opportunity Type", value: opportunity.availabilityType },
  ].filter((row): row is { term: string; value: string } => Boolean(row.value));

  return (
    <>
      {/*
        Structured data is limited to BreadcrumbList. There is deliberately no
        Product or Offer markup: a masked opportunity has no published price,
        no identified product and no purchasable offer, so the schema
        requirements are not genuinely satisfied.
      */}
      <SchemaOrg
        schema={breadcrumbSchema([
          { name: "Off-Market Yachts", path: "/off-market-yachts" },
          {
            name: `${opportunity.reference} — ${opportunity.titlePublic}`,
            path: `/off-market-yachts/${opportunity.slug}`,
          },
        ])}
      />

      <Breadcrumb
        items={[
          { label: "Off-Market Yachts", href: "/off-market-yachts" },
          { label: opportunity.reference },
        ]}
      />

      {/* Hero */}
      <section className="bg-deal-room">
        <div className="container-wide grid gap-0 lg:grid-cols-2">
          <OpportunityVisual
            image={
              opportunity.images[0] ?? {
                alt: `Profile study of a ${opportunity.type.toLowerCase()}`,
                treatment: "silhouette",
                seed: opportunity.reference,
              }
            }
            type={opportunity.type}
            className="aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
            priority
          />

          <div className="flex flex-col justify-center px-0 py-12 lg:py-16 lg:pl-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="label-mono border border-white/20 px-2 py-1 text-white/70">
                {opportunity.reference}
              </span>
              <BadgeRow badges={opportunity.badges} limit={4} onDark />
            </div>

            <p className="label-mono mt-6 text-accent">
              {isPotential ? "Potential Opportunity" : "Confidential Yacht Opportunity"}
            </p>

            <h1 className="display mt-4 text-[36px] text-ink-inverse sm:text-[46px]">
              {heading}
            </h1>

            <p className="mt-3 text-[17px] text-ink-inverse-muted">
              {opportunity.locationPublic} · {opportunity.buildRegion} ·{" "}
              {opportunity.yearLabel}
            </p>

            <p className="mt-7 font-mono text-[30px] tabular-nums text-ink-inverse">
              {opportunity.priceLabel}
            </p>
            {opportunity.priceVisibility === "band" && (
              <p className="label-mono mt-2 text-ink-faint">Estimated asking range</p>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#request-details" className="btn-primary">
                {isPotential ? "Investigate Privately →" : "Request Confidential Details"}
              </Link>
              <Link href="/request-private-access" className="btn-onDark">
                Register Your Criteria
              </Link>
            </div>

            <p className="label-mono mt-7 text-ink-faint">
              {relativeDayLabel(opportunity.createdAt)}
              {opportunity.verified && (
                <span className="ml-3 text-signal">Seller position confirmed</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {isPotential && (
        <section className="border-b border-line bg-paper-sunken">
          <div className="container-site py-6">
            <p className="border-l-2 border-lock py-1 pl-4 text-[14.5px] leading-relaxed text-ink-muted">
              <span className="label-mono mr-2 text-lock">Availability not confirmed</span>
              We hold no seller mandate on this vessel and nobody has stated that it is for sale.
              This entry is market research. Our acquisition team can investigate privately on
              behalf of qualified buyers and will report back honestly, including when the answer
              is no.
            </p>
          </div>
        </section>
      )}

      {/* Why this matters + specification */}
      <section className="section">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 className="display text-[28px] text-ink sm:text-[34px]">
                Why this opportunity matters
              </h2>
              <p className="mt-5 text-[17px] leading-[1.75] text-ink-muted">
                {opportunity.opportunityNotes}
              </p>

              <h3 className="mt-11 text-[19px] font-semibold text-ink">
                About this yacht
              </h3>
              <p className="mt-4 text-[16.5px] leading-[1.75] text-ink-muted">
                {opportunity.descriptionPublic}
              </p>

              <div className="mt-10">
                <SampleInventoryNotice />
              </div>
            </div>

            <div>
              <h2 className="label-mono mb-5 text-accent">Published Specification</h2>
              <dl className="border-t border-line">
                {specs.map((row) => (
                  <div
                    key={row.term}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                  >
                    <dt className="text-[14px] text-ink-muted">{row.term}</dt>
                    <dd className="data-value text-right text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[12.5px] leading-relaxed text-ink-faint">
                Every value above is published with the owner&rsquo;s authorisation. Attributes
                not listed here are withheld server-side, not hidden on the page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locked block */}
      <section className="pb-16">
        <div className="container-site">
          <LockedDetails
            fields={opportunity.lockedFields}
            reference={opportunity.reference}
            href="#request-details"
          />
        </div>
      </section>

      {/* Listing-specific funnel */}
      <section className="section-tight border-y border-line bg-paper-sunken">
        <div className="container-site">
          <ListingInquiryForm opportunity={opportunity} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section defer-render" aria-labelledby="related-heading">
          <div className="container-wide">
            <h2
              id="related-heading"
              className="display mb-8 text-[28px] text-ink sm:text-[32px]"
            >
              Comparable opportunities
            </h2>
            <OpportunityGrid opportunities={related} columns={3} compact />
          </div>
        </section>
      )}

      <FinalCTA
        title="Not the right yacht?"
        body="Tell us what you are actually looking for. We will search the private market and come back with what is genuinely available."
        primaryLabel="Start a Private Search"
        secondaryLabel="Browse All Opportunities"
      />
    </>
  );
}
