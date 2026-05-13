"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LISTINGS,
  YACHT_TYPES,
  BUILDERS,
  LOCATIONS,
  PRICE_RANGES,
  CATEGORIES,
  type Listing,
} from "@/data/listings";

// ─── Auth helpers ─────────────────────────────────────────────────────────────

function clearAccess() {
  document.cookie = "mky_access=; path=/; max-age=0";
  localStorage.removeItem("mky_access");
}

// ─── AI search parser ─────────────────────────────────────────────────────────

interface ParsedQuery {
  builder?: string;
  type?: string;
  location?: string;
  region?: string;
  maxPrice?: number;
  minLength?: number;
  keyword?: string;
}

function parseAIQuery(query: string): ParsedQuery {
  const q = query.toLowerCase();
  const result: ParsedQuery = {};

  // Builder detection
  const builderMatch = BUILDERS.find((b) => q.includes(b.toLowerCase()));
  if (builderMatch) result.builder = builderMatch;

  // Yacht type detection
  const typeKeywords: Record<string, string> = {
    explorer: "Explorer Yacht",
    catamaran: "Catamaran",
    trimaran: "Trimaran",
    superyacht: "Superyacht",
    "motor yacht": "Motor Yacht",
    sport: "Sport Yacht",
    sailing: "Sailing Yacht",
  };
  for (const [kw, type] of Object.entries(typeKeywords)) {
    if (q.includes(kw)) { result.type = type; break; }
  }

  // Location detection
  const locationMatch = LOCATIONS.find((l) => q.includes(l.toLowerCase()));
  if (locationMatch) result.location = locationMatch;

  // Region detection
  if (q.includes("turkey") || q.includes("turkish") || q.includes("bodrum") || q.includes("antalya")) {
    result.region = "Turkey";
  } else if (q.includes("monaco") || q.includes("mediterranean") || q.includes("med ")) {
    result.region = "Mediterranean";
  } else if (q.includes("uae") || q.includes("dubai")) {
    result.region = "UAE";
  } else if (q.includes("miami") || q.includes("florida") || q.includes("americas")) {
    result.region = "Americas";
  }

  // Price detection (e.g. "under €5m", "under 10m", "€8M")
  const priceMatch = q.match(/under[^0-9€$]*[€$]?\s*(\d+)\s*m/i) ||
    q.match(/[€$](\d+)\s*m/i) ||
    q.match(/(\d+)\s*million/i);
  if (priceMatch) {
    result.maxPrice = parseInt(priceMatch[1], 10) * 1_000_000;
  }

  // Length detection (e.g. "over 40m", "45m")
  const lenMatch = q.match(/(?:over|above|min|minimum)?\s*(\d{2,3})\s*m\b/i);
  if (lenMatch) {
    const len = parseInt(lenMatch[1], 10);
    if (len > 10) result.minLength = len;
  }

  return result;
}

function applyParsedQuery(listings: Listing[], parsed: ParsedQuery): Listing[] {
  return listings.filter((l) => {
    if (parsed.builder && l.builder !== parsed.builder) return false;
    if (parsed.type && l.type !== parsed.type) return false;
    if (parsed.location && l.location !== parsed.location) return false;
    if (parsed.region && l.region !== parsed.region) return false;
    if (parsed.maxPrice && l.priceValue > parsed.maxPrice) return false;
    if (parsed.minLength && l.lengthM < parsed.minLength) return false;
    return true;
  });
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SparkleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.09 6.26L21 10l-6.91 1.74L12 18l-2.09-6.26L3 10l6.91-1.74L12 2z" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Listing card ─────────────────────────────────────────────────────────────

function ListingCard({ listing }: { listing: Listing }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#1e3052]/70 bg-[#0a1628] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a96e]/30 hover:shadow-xl hover:shadow-[#c9a96e]/5">
      {/* Card image / gradient hero */}
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${listing.gradient}`}>
        {/* Abstract yacht silhouette overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-20">
          <svg viewBox="0 0 240 80" className="w-3/4" fill={listing.accentColor}>
            <path d="M20 70 L30 40 L60 35 L120 30 L180 35 L210 40 L230 70 Z" />
            <path d="M80 35 L90 5 L110 10 L110 35 Z" />
          </svg>
        </div>

        {/* Builder watermark */}
        <div className="absolute left-4 top-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: listing.accentColor }}>
            {listing.builder}
          </span>
        </div>

        {/* Tag */}
        {listing.tag && (
          <div className="absolute right-4 top-4">
            <span className="rounded-full bg-[#0a1628]/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#c9a96e] backdrop-blur-sm">
              {listing.tag}
            </span>
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={() => setLiked((v) => !v)}
          className={`absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200 ${
            liked
              ? "border-red-400/60 bg-[#0a1628]/90 text-red-400"
              : "border-[#1e3052] bg-[#0a1628]/80 text-[#4a5568] hover:border-red-400/40 hover:text-red-400"
          }`}
          aria-label="Save listing"
        >
          <HeartIcon filled={liked} />
        </button>

        {/* Length badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded bg-[#060e1a]/80 px-2 py-0.5 text-[10px] font-medium text-[#8b97a5] backdrop-blur-sm">
            {listing.lengthM}m
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#8b97a5]">
              {listing.year} · {listing.type}
            </p>
            <h3 className="mt-0.5 text-[15px] font-semibold leading-snug text-white">
              {listing.builder} {listing.model}
            </h3>
          </div>
        </div>

        <p className="mb-4 text-[12px] text-[#8b97a5]">
          📍 {listing.location}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#4a5568]">Asking Price</p>
            <p className="text-lg font-bold tracking-tight text-[#c9a96e]">{listing.price}</p>
          </div>
          <button className="rounded-lg border border-[#c9a96e]/30 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-all duration-200 hover:bg-[#c9a96e] hover:text-[#0a1628]">
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#1e3052]/40 bg-[#0a1628]">
      <div className="aspect-[4/3] animate-pulse bg-[#112040]" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#112040]" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#112040]" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-[#112040]" />
        <div className="mt-4 flex justify-between">
          <div className="h-6 w-1/3 animate-pulse rounded bg-[#112040]" />
          <div className="h-8 w-1/4 animate-pulse rounded bg-[#112040]" />
        </div>
      </div>
    </div>
  );
}

// ─── Filter select ────────────────────────────────────────────────────────────

interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-[#1e3052] bg-[#060e1a] py-3 pl-4 pr-9 text-[13px] text-white transition-colors focus:border-[#c9a96e] focus:outline-none focus:ring-1 focus:ring-[#c9a96e]/20"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568]">
        <ChevronDown />
      </span>
    </div>
  );
}

// ─── Marketplace page ─────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const router = useRouter();

  // Search & filter state
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [builderFilter, setBuilderFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const queryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Computed filtered listings
  const filtered = useMemo(() => {
    let results = [...LISTINGS];

    // AI text query
    if (query.trim()) {
      const parsed = parseAIQuery(query);
      results = applyParsedQuery(results, parsed);
    }

    // Dropdown filters
    if (typeFilter) results = results.filter((l) => l.type === typeFilter);
    if (builderFilter) results = results.filter((l) => l.builder === builderFilter);
    if (locationFilter) results = results.filter((l) => l.location === locationFilter);
    if (priceFilter) {
      const range = PRICE_RANGES.find((r) => r.label === priceFilter);
      if (range) {
        results = results.filter((l) => {
          const above = range.min ? l.priceValue >= range.min : true;
          const below = range.max ? l.priceValue <= range.max : true;
          return above && below;
        });
      }
    }

    return results;
  }, [query, typeFilter, builderFilter, priceFilter, locationFilter]);

  const activeFilterCount = [typeFilter, builderFilter, priceFilter, locationFilter].filter(Boolean).length;

  const runSearch = useCallback(() => {
    if (loadingSearch) return;
    setLoadingSearch(true);
    setQuery(draftQuery);
    setTimeout(() => setLoadingSearch(false), 800);
  }, [draftQuery, loadingSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
      runSearch();
    }
  };

  // Debounced auto-search
  useEffect(() => {
    if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
    queryTimerRef.current = setTimeout(() => {
      setLoadingSearch(true);
      setQuery(draftQuery);
      setTimeout(() => setLoadingSearch(false), 600);
    }, 500);
    return () => { if (queryTimerRef.current) clearTimeout(queryTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftQuery]);

  const clearFilters = () => {
    setDraftQuery("");
    setQuery("");
    setTypeFilter("");
    setBuilderFilter("");
    setPriceFilter("");
    setLocationFilter("");
  };

  const handleLogout = () => {
    clearAccess();
    router.push("/access");
  };

  const handleCategoryClick = (cat: typeof CATEGORIES[0]) => {
    clearFilters();
    if ("filter" in cat && cat.filter) setTypeFilter(cat.filter as string);
    else if ("locationFilter" in cat && cat.locationFilter) setLocationFilter(cat.locationFilter as string);
    else if ("tagFilter" in cat) {
      // tag filters handled via special category logic
    }
    else if ("regionFilter" in cat && cat.regionFilter) {
      // region via AI query
      setDraftQuery(cat.regionFilter as string);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#060e1a] text-white">
      {/* ── Member bar ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#1e3052]/80 bg-[#0a1628]">
        <div className="mx-auto flex h-10 max-w-[1520px] items-center justify-between px-6 sm:px-10">
          <span className="flex items-center gap-2 text-[11px] text-[#8b97a5]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Private Member Area — Off-Market Inventory
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[11px] text-[#8b97a5] transition-colors hover:text-[#c9a96e]"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>

      {/* ── Marketplace nav ────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-[#112040] bg-[#0a1628]/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1520px] items-center justify-between gap-4 px-6 sm:px-10">
          <Link href="/" className="flex shrink-0 flex-col leading-none">
            <span className="text-[15px] font-bold tracking-wider text-white">
              OFFMARKET<span className="text-[#c9a96e]">YACHTS</span>
            </span>
            <span className="mt-[3px] text-[9px] uppercase tracking-[0.16em] text-[#8b97a5]">
              Member Marketplace
            </span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {["Listings", "Categories", "Locations", "Builders"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-[13px] font-medium text-[#8b97a5] transition-colors hover:text-[#c9a96e]"
              >
                {label}
              </a>
            ))}
          </div>
          <Link
            href="/submit-yacht"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-[#c9a96e]/40 px-4 text-[11px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
          >
            Submit a Yacht
          </Link>
        </div>
      </div>

      {/* ── Hero search ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#112040] bg-[#060e1a] px-6 py-14 sm:px-10 sm:py-20">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]/[0.05] blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
            Private Member Inventory
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Off-Market Yachts
          </h1>
          <p className="mb-10 text-[15px] leading-relaxed text-[#8b97a5]">
            Confidential opportunities not available on public brokerage channels.
          </p>

          {/* AI search bar */}
          <div className="relative mb-4">
            <div className="flex items-center overflow-hidden rounded-2xl border border-[#1e3052] bg-[#0a1628] transition-colors focus-within:border-[#c9a96e]/60 focus-within:shadow-lg focus-within:shadow-[#c9a96e]/5">
              <span className="flex shrink-0 items-center gap-1.5 pl-5 text-[#c9a96e]">
                <SparkleIcon />
                <span className="hidden text-[11px] font-semibold uppercase tracking-widest sm:block">AI</span>
              </span>
              <input
                type="search"
                value={draftQuery}
                onChange={(e) => setDraftQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder='Try: "45m explorer under €18M" or "Benetti Monaco"'
                className="flex-1 bg-transparent px-4 py-5 text-[14px] text-white placeholder-[#4a5568] focus:outline-none"
              />
              {draftQuery && (
                <button onClick={() => { setDraftQuery(""); setQuery(""); }} className="shrink-0 p-3 text-[#4a5568] hover:text-white">
                  <XIcon />
                </button>
              )}
              <button
                onClick={runSearch}
                className="m-2 flex shrink-0 items-center gap-2 rounded-xl bg-[#c9a96e] px-5 py-3 text-[12px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
              >
                <SearchIcon />
                <span className="hidden sm:block">Search</span>
              </button>
            </div>
          </div>

          {/* Query hints */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Italian yacht under €5M", "Explorer yacht Turkey", "Benetti over 40m", "New build catamaran"].map((hint) => (
              <button
                key={hint}
                onClick={() => setDraftQuery(hint)}
                className="rounded-full border border-[#1e3052] px-3 py-1.5 text-[11px] text-[#8b97a5] transition-colors hover:border-[#c9a96e]/30 hover:text-[#c9a96e]"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters bar ────────────────────────────────────────────────────── */}
      <section id="listings" className="border-b border-[#112040] bg-[#0a1628] px-6 py-4 sm:px-10">
        <div className="mx-auto max-w-[1520px]">
          {/* Toggle filters button (mobile) */}
          <div className="mb-3 flex items-center justify-between md:hidden">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-2 text-[13px] font-medium text-[#8b97a5]"
            >
              Filters {activeFilterCount > 0 && <span className="rounded-full bg-[#c9a96e] px-1.5 py-0.5 text-[10px] text-[#0a1628]">{activeFilterCount}</span>}
              <ChevronDown />
            </button>
            <p className="text-[12px] text-[#4a5568]">
              {filtered.length} {filtered.length === 1 ? "yacht" : "yachts"}
            </p>
          </div>

          {/* Desktop: always visible; Mobile: collapsible */}
          <div className={`gap-3 md:flex ${filtersOpen ? "flex flex-col" : "hidden md:flex"}`}>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
              <FilterSelect
                label="Yacht Type"
                options={YACHT_TYPES}
                value={typeFilter}
                onChange={setTypeFilter}
              />
              <FilterSelect
                label="Builder"
                options={BUILDERS}
                value={builderFilter}
                onChange={setBuilderFilter}
              />
              <FilterSelect
                label="Price Range"
                options={PRICE_RANGES.map((r) => r.label)}
                value={priceFilter}
                onChange={setPriceFilter}
              />
              <FilterSelect
                label="Location"
                options={LOCATIONS}
                value={locationFilter}
                onChange={setLocationFilter}
              />
            </div>

            {/* Result count + clear */}
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden text-[13px] text-[#8b97a5] md:block">
                {filtered.length} {filtered.length === 1 ? "yacht" : "yachts"}
              </span>
              {(activeFilterCount > 0 || query) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-[12px] text-[#c9a96e] hover:underline"
                >
                  <XIcon />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Listing grid ───────────────────────────────────────────────────── */}
      <section className="px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-[1520px]">
          {/* AI insight bar */}
          {query && !loadingSearch && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#c9a96e]/15 bg-[#0a1628] px-5 py-3">
              <span className="text-[#c9a96e]"><SparkleIcon /></span>
              <p className="text-[13px] text-[#8b97a5]">
                Showing <span className="text-white">{filtered.length} results</span> matching &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {loadingSearch ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="mb-2 text-[40px] opacity-20">⚓</p>
              <p className="text-lg font-semibold text-white">No listings found</p>
              <p className="mt-1 text-sm text-[#8b97a5]">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-[#c9a96e] hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Popular categories ─────────────────────────────────────────────── */}
      <section id="categories" className="border-t border-[#112040] px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1520px]">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Browse By</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat)}
                className="group flex flex-col items-center gap-3 rounded-xl border border-[#1e3052] bg-[#0a1628] px-4 py-6 text-center transition-all duration-200 hover:border-[#c9a96e]/30 hover:bg-[#0d1f35]"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-[12px] font-medium text-[#8b97a5] transition-colors group-hover:text-[#c9a96e]">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location browse ────────────────────────────────────────────────── */}
      <section id="locations" className="border-t border-[#112040] bg-[#0a1628] px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1520px]">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Global Reach</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Browse by Location</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {LOCATIONS.map((loc) => {
              const count = LISTINGS.filter((l) => l.location === loc).length;
              return (
                <button
                  key={loc}
                  onClick={() => { clearFilters(); setLocationFilter(loc); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group flex flex-col items-center gap-1.5 rounded-xl border border-[#1e3052] bg-[#060e1a] py-5 text-center transition-all duration-200 hover:border-[#c9a96e]/30"
                >
                  <span className="text-[13px] font-semibold text-white transition-colors group-hover:text-[#c9a96e]">
                    {loc}
                  </span>
                  <span className="text-[11px] text-[#4a5568]">
                    {count} {count === 1 ? "yacht" : "yachts"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Yacht builders ─────────────────────────────────────────────────── */}
      <section id="builders" className="border-t border-[#112040] px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1520px]">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">By Shipyard</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Yacht Builders</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
            {BUILDERS.map((builder) => {
              const count = LISTINGS.filter((l) => l.builder === builder).length;
              return (
                <button
                  key={builder}
                  onClick={() => { clearFilters(); setBuilderFilter(builder); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group flex flex-col items-center gap-1.5 rounded-xl border border-[#1e3052] bg-[#0a1628] py-5 text-center transition-all duration-200 hover:border-[#c9a96e]/30 hover:bg-[#0d1f35]"
                >
                  <span className="text-[12px] font-semibold text-white transition-colors group-hover:text-[#c9a96e]">
                    {builder}
                  </span>
                  {count > 0 && (
                    <span className="text-[10px] text-[#4a5568]">
                      {count} {count === 1 ? "listing" : "listings"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#112040] bg-[#060e1a] px-6 py-20 text-center sm:px-10">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Discreet Representation</p>
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Have a Yacht to Sell Off-Market?
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-[#8b97a5]">
            Submit your vessel confidentially. We match qualified buyers discreetly — no public listing required.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/submit-yacht"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#c9a96e] px-8 text-[12px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
            >
              Submit Confidentially
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#c9a96e]/30 px-8 text-[12px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
            >
              Contact Advisory
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#112040] bg-[#0a1628] px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-[1520px] flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex flex-col items-center gap-0.5 sm:items-start">
            <span className="text-[14px] font-bold tracking-wider text-white">
              OFFMARKET<span className="text-[#c9a96e]">YACHTS</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#4a5568]">Private Yacht Platform</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] text-[#4a5568] hover:text-[#8b97a5]">Privacy</Link>
            <Link href="/terms" className="text-[11px] text-[#4a5568] hover:text-[#8b97a5]">Terms</Link>
            <button onClick={handleLogout} className="flex items-center gap-1 text-[11px] text-[#4a5568] hover:text-[#c9a96e]">
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
