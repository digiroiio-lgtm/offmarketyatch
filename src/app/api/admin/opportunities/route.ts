import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { LANDING_PAGES } from "@/data/landing";
import { checkAdminAuth } from "@/lib/admin-auth";
import { clearOverride, setOverride, type OpportunityOverride } from "@/lib/admin-store";
import { getAllRecordsForAdmin } from "@/lib/opportunities";

/**
 * Admin mutations. Reachable only behind the Basic auth gate in `src/proxy.ts`,
 * which matches `/admin/:path*` — this route lives under `/api/admin`, so it
 * enforces the same credentials itself rather than relying on the proxy.
 */
export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  return checkAdminAuth(request.headers.get("authorization")) === "ok";
}

const ALLOWED_FIELDS = [
  "status",
  "featured",
  "verified",
  "priceVisibility",
  "locationGranularity",
  "confidentialityLevel",
] as const;

/**
 * Opportunity pages are statically generated, so an override has no visible
 * effect until the affected pages are rebuilt. Without this, withdrawing a
 * listing would return a success response while the page stayed live — the
 * control would look like it worked and would not have.
 *
 * The paths are enumerated deliberately rather than invalidating the tree with
 * `revalidatePath("/", "layout")`. That broader call also invalidates the
 * dynamic landing and article routes, and any route whose params it clears has
 * to be able to regenerate them on demand or it is left permanently 404.
 * Naming the inventory-bearing paths keeps the blast radius to what actually
 * reads the opportunity store.
 */
function revalidateAffectedPaths(slug: string): void {
  revalidatePath(`/off-market-yachts/${slug}`);
  revalidatePath("/off-market-yachts");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  // Landing pages all query the same store, so their inventory changes too.
  for (const page of LANDING_PAGES) {
    revalidatePath(`/${page.slug}`);
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const input = body as { slug?: string; reset?: boolean } & Record<string, unknown>;
  const slug = typeof input.slug === "string" ? input.slug : "";
  if (!slug || !getAllRecordsForAdmin().some((record) => record.slug === slug)) {
    return NextResponse.json({ ok: false, error: "Unknown opportunity." }, { status: 404 });
  }

  if (input.reset) {
    clearOverride(slug);
    revalidateAffectedPaths(slug);
    return NextResponse.json({ ok: true, reset: true });
  }

  // Only operational switches are settable. There is no path here that could
  // publish a confidential value or widen disclosure beyond the record itself.
  const patch: OpportunityOverride = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in input) {
      patch[field] = input[field] as never;
    }
  }
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: "No settable fields." }, { status: 422 });
  }

  const saved = setOverride(slug, patch);
  revalidateAffectedPaths(slug);
  return NextResponse.json({ ok: true, override: saved });
}
