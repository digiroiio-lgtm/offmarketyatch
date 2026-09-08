"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import OpportunityGrid from "@/components/OpportunityGrid";
import { track } from "@/lib/analytics";
import { LENGTH_BANDS, PRICE_BANDS, priceBandFor } from "@/lib/format";
import type { PublicOpportunity, YachtType } from "@/lib/types";

/**
 * Client-side browsing over an already-masked set of opportunities. The array
 * this receives is the public DTO — filtering here cannot expose anything the
 * server did not already publish.
 */

type FilterKey = "q" | "price" | "length" | "location" | "type" | "region" | "availability";

const QUICK_CHIPS: { label: string; filter: FilterKey; value: string }[] = [
  { label: "Under $5M", filter: "price", value: "under-5m" },
  { label: "$5M–$10M", filter: "price", value: "5m-10m" },
  { label: "$10M–$25M", filter: "price", value: "10m-25m" },
  { label: "$25M+", filter: "price", value: "25m-50m" },
  { label: "Florida", filter: "location", value: "Florida" },
  { label: "Bahamas", filter: "location", value: "Bahamas" },
  { label: "USA", filter: "location", value: "USA" },
  { label: "Mediterranean", filter: "location", value: "Mediterranean" },
  { label: "100+ ft", filter: "length", value: "100-130" },
  { label: "150+ ft", filter: "length", value: "165-plus" },
  { label: "Explorer", filter: "type", value: "Explorer Yacht" },
  { label: "Motor Yacht", filter: "type", value: "Motor Yacht" },
  { label: "Off-Market", filter: "availability", value: "VERIFIED OFF-MARKET" },
  { label: "Private Sale", filter: "availability", value: "PRIVATE LISTING" },
];

interface Filters {
  q: string;
  price: string;
  length: string;
  location: string;
  type: string;
  region: string;
  availability: string;
}

const EMPTY: Filters = {
  q: "",
  price: "",
  length: "",
  location: "",
  type: "",
  region: "",
  availability: "",
};

function matchesLocation(opportunity: PublicOpportunity, value: string): boolean {
  if (!value) return true;
  if (value === "USA") return opportunity.country === "United States";
  return (
    opportunity.locationPublic.includes(value) || opportunity.country.includes(value)
  );
}

export default function MarketExplorer({
  opportunities,
  initialFilters,
  showChips = true,
}: {
  opportunities: PublicOpportunity[];
  initialFilters?: Partial<Filters>;
  showChips?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, ...initialFilters });
  const [searchInput, setSearchInput] = useState(filters.q);
  const searchStarted = useRef(false);

  // Debounce the free-text query so we filter (and fire analytics) once the
  // visitor pauses rather than on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => (prev.q === searchInput ? prev : { ...prev, q: searchInput }));
    }, 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const types = useMemo(
    () => Array.from(new Set(opportunities.map((o) => o.type))).sort() as YachtType[],
    [opportunities]
  );
  const regions = useMemo(
    () => Array.from(new Set(opportunities.map((o) => o.buildRegion))).sort(),
    [opportunities]
  );
  const locations = useMemo(
    () => Array.from(new Set(opportunities.map((o) => o.locationPublic))).sort(),
    [opportunities]
  );

  const results = useMemo(() => {
    return opportunities.filter((o) => {
      if (filters.type && o.type !== filters.type) return false;
      if (filters.region && o.buildRegion !== filters.region) return false;
      if (filters.availability && o.availabilityType !== filters.availability) return false;
      if (!matchesLocation(o, filters.location)) return false;

      if (filters.price) {
        const band = priceBandFor(o.priceMin, o.priceMax);
        if (band?.key !== filters.price) return false;
      }
      if (filters.length) {
        const band = LENGTH_BANDS.find((b) => b.key === filters.length);
        if (!band) return false;
        if (o.lengthFt < band.min || (band.max !== null && o.lengthFt >= band.max)) return false;
      }
      if (filters.q.trim()) {
        const needle = filters.q.trim().toLowerCase();
        const haystack = [
          o.titlePublic,
          o.type,
          o.buildRegion,
          o.locationPublic,
          o.country,
          o.reference,
          o.priceLabel,
          o.descriptionPublic,
          o.availabilityType,
          ...o.badges,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [opportunities, filters]);

  // Report the completed search once the debounced query settles.
  useEffect(() => {
    if (!filters.q.trim()) return;
    track("search_completed", { query: filters.q, result_count: results.length });
  }, [filters.q, results.length]);

  function updateFilter(key: FilterKey, value: string) {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
    if (key !== "q") {
      track("filter_used", { filter_name: key, filter_value: value });
    }
  }

  const activeCount = (Object.keys(filters) as FilterKey[]).filter(
    (key) => key !== "q" && filters[key]
  ).length;

  return (
    <div>
      <div className="border border-line bg-paper-raised">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <svg
            className="h-4 w-4 shrink-0 text-ink-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
          </svg>
          <label htmlFor="market-search" className="sr-only">
            Search private yacht opportunities
          </label>
          <input
            id="market-search"
            type="search"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              if (!searchStarted.current && event.target.value) {
                searchStarted.current = true;
                track("search_started", {});
              }
            }}
            placeholder="Search private yacht opportunities..."
            className="w-full bg-transparent py-1.5 text-[16px] text-ink outline-none placeholder:text-ink-faint"
          />
          {(searchInput || activeCount > 0) && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setFilters(EMPTY);
              }}
              className="label-mono shrink-0 text-ink-faint transition-colors hover:text-accent"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            label="Price"
            value={filters.price}
            onChange={(v) => updateFilter("price", v)}
            options={PRICE_BANDS.map((b) => ({ value: b.key, label: b.label }))}
          />
          <FilterSelect
            label="Length"
            value={filters.length}
            onChange={(v) => updateFilter("length", v)}
            options={LENGTH_BANDS.map((b) => ({ value: b.key, label: b.label }))}
          />
          <FilterSelect
            label="Location"
            value={filters.location}
            onChange={(v) => updateFilter("location", v)}
            options={[
              { value: "USA", label: "United States" },
              ...locations.map((l) => ({ value: l, label: l })),
            ]}
          />
          <FilterSelect
            label="Type"
            value={filters.type}
            onChange={(v) => updateFilter("type", v)}
            options={types.map((t) => ({ value: t, label: t }))}
          />
          <FilterSelect
            label="Build Region"
            value={filters.region}
            onChange={(v) => updateFilter("region", v)}
            options={regions.map((r) => ({ value: r, label: r }))}
          />
        </div>
      </div>

      {showChips && (
        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_CHIPS.map((chip) => {
            const active = filters[chip.filter] === chip.value;
            return (
              <button
                key={chip.label}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilter(chip.filter, chip.value)}
                className={`label-mono border px-3 py-2 transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-line-strong text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex items-baseline justify-between border-b border-line pb-4">
        <p className="label-mono text-ink-faint">
          {results.length} {results.length === 1 ? "opportunity" : "opportunities"}
          {activeCount > 0 || filters.q ? " matching" : " published"}
        </p>
        <p className="label-mono text-ink-faint">
          Confidential · Masked until qualification
        </p>
      </div>

      <div className="mt-8">
        <OpportunityGrid opportunities={results} priorityCount={3} />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="bg-paper-raised px-4 py-3">
      <label className="label-mono block text-ink-faint">
        {label}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full cursor-pointer bg-transparent text-[14px] font-normal normal-case tracking-normal text-ink outline-none"
        >
          <option value="">Any</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
