import "server-only";

import type { ConfidentialityLevel, LocationGranularity, PriceVisibility } from "@/lib/types";

/**
 * Operational overrides applied on top of the committed opportunity records.
 *
 * The record store in `src/data/opportunities.ts` is version-controlled
 * content. Editorial changes to it belong in a commit. But the operational
 * switches an authorised user needs between deploys — publish, unpublish,
 * feature, verify, tighten confidentiality — should not require one.
 *
 * ── DURABILITY, STATED PLAINLY ───────────────────────────────────────────────
 * This store is in-process. Overrides survive navigation and hot reload, and
 * do NOT survive a restart, a redeploy, or a second serverless instance. It is
 * a working control surface, not a database. `ADMIN_STORE_DURABLE` reports the
 * state so the admin UI can say so rather than implying persistence it does
 * not have. Point `applyOverrides` at a real database to make it durable.
 */

export interface OpportunityOverride {
  status?: "draft" | "published" | "withdrawn";
  featured?: boolean;
  verified?: boolean;
  priceVisibility?: PriceVisibility;
  locationGranularity?: LocationGranularity;
  confidentialityLevel?: ConfidentialityLevel;
  updatedAt?: string;
  updatedBy?: string;
}

const globalStore = globalThis as unknown as {
  __omyOverrides?: Map<string, OpportunityOverride>;
};
const overrides: Map<string, OpportunityOverride> = (globalStore.__omyOverrides ??= new Map());

export const ADMIN_STORE_DURABLE = false;

export function getOverride(slug: string): OpportunityOverride | undefined {
  return overrides.get(slug);
}

export function getAllOverrides(): Map<string, OpportunityOverride> {
  return overrides;
}

export function setOverride(slug: string, patch: OpportunityOverride): OpportunityOverride {
  const next: OpportunityOverride = {
    ...(overrides.get(slug) ?? {}),
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  overrides.set(slug, next);
  console.info(JSON.stringify({ event: "opportunity_override", slug, patch: next }));
  return next;
}

export function clearOverride(slug: string): void {
  overrides.delete(slug);
  console.info(JSON.stringify({ event: "opportunity_override_cleared", slug }));
}
