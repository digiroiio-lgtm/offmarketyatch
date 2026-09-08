import type { LengthBandKey, PriceBandKey } from "@/lib/types";

/**
 * US-first formatting. USD is the default currency and feet lead every
 * length; metres follow as a secondary unit ("164 ft / 50 m", never the
 * reverse).
 */

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** "$28M", "$4.2M", "$950K" — the compact form used across cards. */
export function compactUsd(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const rounded = millions >= 10 ? Math.round(millions) : Math.round(millions * 10) / 10;
    return `$${rounded}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return USD.format(value);
}

export function exactUsd(value: number): string {
  return USD.format(value);
}

/** "164 ft / 50 m" */
export function lengthDisplay(ft: number, m: number): string {
  return `${ft} ft / ${m} m`;
}

export function ftToM(ft: number): number {
  return Math.round(ft * 0.3048);
}

// ─── Price bands ─────────────────────────────────────────────────────────────

export interface PriceBand {
  key: PriceBandKey;
  label: string;
  shortLabel: string;
  min: number;
  max: number | null;
}

export const PRICE_BANDS: PriceBand[] = [
  { key: "under-5m", label: "Under $5M", shortLabel: "Under $5M", min: 0, max: 5_000_000 },
  { key: "5m-10m", label: "$5M – $10M", shortLabel: "$5M–$10M", min: 5_000_000, max: 10_000_000 },
  { key: "10m-25m", label: "$10M – $25M", shortLabel: "$10M–$25M", min: 10_000_000, max: 25_000_000 },
  { key: "25m-50m", label: "$25M – $50M", shortLabel: "$25M–$50M", min: 25_000_000, max: 50_000_000 },
  { key: "50m-plus", label: "$50M+", shortLabel: "$50M+", min: 50_000_000, max: null },
];

/**
 * Which band a listing sits in, judged on the midpoint of its published
 * range. Returns null when no price may be published at all.
 */
export function priceBandFor(min: number | null, max: number | null): PriceBand | null {
  if (min === null && max === null) return null;
  const midpoint = min !== null && max !== null ? (min + max) / 2 : (min ?? max)!;
  return (
    PRICE_BANDS.find((b) => midpoint >= b.min && (b.max === null || midpoint < b.max)) ?? null
  );
}

// ─── Length bands ────────────────────────────────────────────────────────────

export interface LengthBand {
  key: LengthBandKey;
  label: string;
  min: number;
  max: number | null;
}

export const LENGTH_BANDS: LengthBand[] = [
  { key: "under-80", label: "Under 80 ft", min: 0, max: 80 },
  { key: "80-100", label: "80–100 ft", min: 80, max: 100 },
  { key: "100-130", label: "100–130 ft", min: 100, max: 130 },
  { key: "130-165", label: "130–165 ft", min: 130, max: 165 },
  { key: "165-plus", label: "165 ft+", min: 165, max: null },
];

export function lengthBandFor(ft: number): LengthBand {
  return (
    LENGTH_BANDS.find((b) => ft >= b.min && (b.max === null || ft < b.max)) ??
    LENGTH_BANDS[LENGTH_BANDS.length - 1]
  );
}

/**
 * Narrower public band used to describe a confidential yacht without
 * publishing its exact length — "150–165 ft" rather than "164 ft".
 */
export function maskedLengthRange(ft: number): { label: string; midpoint: number } {
  const width = ft >= 150 ? 15 : ft >= 100 ? 15 : 10;
  const lower = Math.floor(ft / width) * width;
  const upper = lower + width;
  return { label: `${lower}–${upper} ft`, midpoint: Math.round((lower + upper) / 2) };
}

/** "2018" or, where the year must be generalised, "2015–2019". */
export function maskedYearRange(year: number): string {
  const lower = Math.floor(year / 5) * 5;
  return `${lower}–${lower + 4}`;
}

export function relativeDayLabel(iso: string, now: Date = new Date()): string {
  const days = Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Added today";
  if (days === 1) return "Added yesterday";
  if (days < 7) return `Added ${days} days ago`;
  if (days < 14) return "Added last week";
  if (days < 60) return `Added ${Math.floor(days / 7)} weeks ago`;
  return `Added ${Math.floor(days / 30)} months ago`;
}
