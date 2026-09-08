"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

/**
 * Every field here is public or operational. No confidential value is passed
 * into this component, because a Client Component's props travel to the
 * browser in the RSC payload — the same rule that governs the public site
 * applies inside the admin.
 */
export interface AdminRow {
  slug: string;
  reference: string;
  titlePublic: string;
  type: string;
  locationPublic: string;
  priceLabel: string;
  availabilityType: string;
  status: "draft" | "published" | "withdrawn";
  featured: boolean;
  verified: boolean;
  priceVisibility: "exact" | "band" | "on-request";
  locationGranularity: "region" | "country" | "area";
  confidentialityLevel: "open" | "restricted" | "confidential";
  withheldCount: number;
  leadCount: number;
  overridden: boolean;
  updatedAt: string;
}

export default function AdminOpportunityRow({ row }: { row: AdminRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function patch(body: Record<string, unknown>) {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: row.slug, ...body }),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!result.ok) {
        setError(result.error ?? "Update failed.");
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSaving(false);
    }
  }

  const busy = saving || pending;

  return (
    <tr className="border-b border-line align-top last:border-b-0">
      <td className="px-4 py-4">
        <Link
          href={`/off-market-yachts/${row.slug}`}
          className="data-value text-ink underline decoration-accent underline-offset-4"
        >
          {row.reference}
        </Link>
        {row.overridden && (
          <span className="label-mono mt-1.5 block text-lock">Session override</span>
        )}
      </td>

      <td className="px-4 py-4">
        <p className="text-[14px] font-medium text-ink">{row.titlePublic}</p>
        <p className="mt-1 text-[13px] text-ink-muted">
          {row.type} · {row.locationPublic}
        </p>
      </td>

      <td className="px-4 py-4">
        <p className="label-mono text-ink-muted">{row.availabilityType}</p>
        <p className="label-mono mt-1.5 text-ink-faint">{row.confidentialityLevel}</p>
      </td>

      <td className="px-4 py-4">
        <p className="data-value text-ink">{row.priceLabel}</p>
        <label className="label-mono mt-2 block text-ink-faint">
          Visibility
          <select
            value={row.priceVisibility}
            disabled={busy}
            onChange={(event) => patch({ priceVisibility: event.target.value })}
            className="mt-1 block w-full border border-line bg-paper px-2 py-1.5 text-[12px] font-normal normal-case tracking-normal text-ink"
          >
            <option value="exact">Exact</option>
            <option value="band">Band</option>
            <option value="on-request">On request</option>
          </select>
        </label>
      </td>

      <td className="px-4 py-4">
        <p className="data-value text-ink">{row.withheldCount}</p>
        <p className="label-mono mt-1 text-ink-faint">fields</p>
        <label className="label-mono mt-2 block text-ink-faint">
          Location
          <select
            value={row.locationGranularity}
            disabled={busy}
            onChange={(event) => patch({ locationGranularity: event.target.value })}
            className="mt-1 block w-full border border-line bg-paper px-2 py-1.5 text-[12px] font-normal normal-case tracking-normal text-ink"
          >
            <option value="region">Region</option>
            <option value="country">Country</option>
            <option value="area">Area</option>
          </select>
        </label>
      </td>

      <td className="px-4 py-4">
        <p className="data-value text-ink">{row.leadCount}</p>
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          <label className="label-mono text-ink-faint">
            Status
            <select
              value={row.status}
              disabled={busy}
              onChange={(event) => patch({ status: event.target.value })}
              className="mt-1 block w-full border border-line bg-paper px-2 py-1.5 text-[12px] font-normal normal-case tracking-normal text-ink"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </label>

          <label className="label-mono text-ink-faint">
            Confidentiality
            <select
              value={row.confidentialityLevel}
              disabled={busy}
              onChange={(event) => patch({ confidentialityLevel: event.target.value })}
              className="mt-1 block w-full border border-line bg-paper px-2 py-1.5 text-[12px] font-normal normal-case tracking-normal text-ink"
            >
              <option value="confidential">Confidential</option>
              <option value="restricted">Restricted</option>
              <option value="open">Open</option>
            </select>
          </label>

          <div className="mt-1 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              aria-pressed={row.featured}
              onClick={() => patch({ featured: !row.featured })}
              className={`label-mono border px-2.5 py-1.5 transition-colors disabled:opacity-50 ${
                row.featured
                  ? "border-accent bg-accent text-white"
                  : "border-line-strong text-ink-muted"
              }`}
            >
              Featured
            </button>
            <button
              type="button"
              disabled={busy}
              aria-pressed={row.verified}
              onClick={() => patch({ verified: !row.verified })}
              className={`label-mono border px-2.5 py-1.5 transition-colors disabled:opacity-50 ${
                row.verified
                  ? "border-signal bg-signal text-white"
                  : "border-line-strong text-ink-muted"
              }`}
            >
              Verified
            </button>
            {row.overridden && (
              <button
                type="button"
                disabled={busy}
                onClick={() => patch({ reset: true })}
                className="label-mono border border-line-strong px-2.5 py-1.5 text-ink-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
              >
                Reset
              </button>
            )}
          </div>

          {error && (
            <p role="alert" className="text-[11px] text-accent">
              {error}
            </p>
          )}
        </div>
      </td>
    </tr>
  );
}
