import Link from "next/link";

import AdminOpportunityRow from "@/components/admin/AdminOpportunityRow";
import { CONFIDENTIAL_KEYS } from "@/data/opportunities";
import { ADMIN_STORE_DURABLE, getAllOverrides } from "@/lib/admin-store";
import { compactUsd } from "@/lib/format";
import { IS_SAMPLE_INVENTORY } from "@/lib/inventory-mode";
import { leadCountsByListing } from "@/lib/leads";
import { getAllRecordsForAdmin } from "@/lib/opportunities";

export default function AdminOpportunitiesPage() {
  const records = getAllRecordsForAdmin();
  const leadCounts = leadCountsByListing();
  const overrides = getAllOverrides();

  const published = records.filter((r) => r.status === "published").length;
  const unverified = records.filter((r) => !r.verified).length;

  // Build the admin view field-by-field. Even inside the authenticated admin,
  // confidential columns are not shipped to the browser — the row component is
  // a Client Component, so anything passed to it would enter the RSC payload.
  const rows = records.map((record) => ({
    slug: record.slug,
    reference: record.publicReference,
    titlePublic: `${record.lengthFt} ft ${record.titlePublic}`,
    type: record.type,
    locationPublic: record.locationPublic,
    priceLabel:
      record.priceMin !== null && record.priceMax !== null
        ? `${compactUsd(record.priceMin)}–${compactUsd(record.priceMax)}`
        : "On request",
    availabilityType: record.availabilityType,
    status: record.status,
    featured: record.featured,
    verified: record.verified,
    priceVisibility: record.priceVisibility,
    locationGranularity: record.locationGranularity,
    confidentialityLevel: record.confidentialityLevel,
    /** How many confidential attributes this record holds back. Count only. */
    withheldCount: CONFIDENTIAL_KEYS.filter((key) => {
      const value = record[key];
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
    }).length,
    leadCount: leadCounts[record.publicReference] ?? 0,
    overridden: overrides.has(record.slug),
    updatedAt: record.updatedAt,
  }));

  return (
    <div>
      <h1 className="display text-[32px] text-ink">Opportunities</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
        Operational controls for published inventory. Editorial content — descriptions,
        specification, imagery — lives in the version-controlled record store and changes through
        a commit.
      </p>

      {!ADMIN_STORE_DURABLE && (
        <p className="mt-6 border-l-2 border-lock py-2 pl-4 text-[13.5px] leading-relaxed text-ink-muted">
          <span className="label-mono mr-2 text-lock">Ephemeral store</span>
          Changes made here are held in process memory. They survive navigation but not a restart,
          a redeploy, or a second serverless instance. Point <code>applyOverrides</code> in{" "}
          <code>src/lib/admin-store.ts</code> at a database to make them durable.
        </p>
      )}

      {IS_SAMPLE_INVENTORY && (
        <p className="mt-4 border-l-2 border-lock py-2 pl-4 text-[13.5px] leading-relaxed text-ink-muted">
          <span className="label-mono mr-2 text-lock">Sample inventory</span>
          This deployment is serving the sample record set and discloses that to visitors. Set{" "}
          <code>NEXT_PUBLIC_INVENTORY_MODE=live</code> once real verified records are in place.
        </p>
      )}

      <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-4">
        {[
          { term: "Total records", value: records.length },
          { term: "Published", value: published },
          { term: "Unverified", value: unverified },
          { term: "Session overrides", value: overrides.size },
        ].map((stat) => (
          <div key={stat.term} className="bg-paper-raised px-5 py-5">
            <dt className="label-mono text-ink-faint">{stat.term}</dt>
            <dd className="mt-2 font-mono text-[24px] tabular-nums text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 overflow-x-auto border border-line bg-paper-raised">
        <table className="w-full min-w-[1100px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {[
                "Reference",
                "Opportunity",
                "Availability",
                "Price",
                "Withheld",
                "Leads",
                "Controls",
              ].map((heading) => (
                <th key={heading} className="label-mono px-4 py-3 text-ink-faint">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <AdminOpportunityRow key={row.slug} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[13px] text-ink-faint">
        Lead counts are per public reference and reflect the current process only. Review
        submissions in{" "}
        <Link href="/admin/leads" className="underline decoration-accent underline-offset-4">
          Leads
        </Link>
        .
      </p>
    </div>
  );
}
