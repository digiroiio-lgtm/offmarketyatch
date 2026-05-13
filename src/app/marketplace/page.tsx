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
import SponsoredCard from "@/components/SponsoredCard";
import SponsoredBanner from "@/components/SponsoredBanner";
import FeaturedSponsorBlock from "@/components/FeaturedSponsorBlock";

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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1e3052]/60 bg-[#0a1628] transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a96e]/25 hover:shadow-2xl hover:shadow-[#c9a96e]/8">
      {/* Card image */}
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${listing.gradient}`}>
        {/* Silhouette — zooms on hover */}
        <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-[0.18] transition-transform duration-700 group-hover:scale-110">
          <svg viewBox="0 0 240 80" className="w-3/4" fill={listing.accentColor}>
            <path d="M20 70 L30 40 L60 35 L120 30 L180 35 L210 40 L230 70 Z" />
            <path d="M80 35 L90 5 L110 10 L110 35 Z" />
          </svg>
        </div>

        {/* Dark bottom gradient for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#060e1a]/70 to-transparent" />

        {/* Builder watermark */}
        <div className="absolute left-4 top-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: listing.accentColor }}>
            {listing.builder}
          </span>
        </div>

        {/* Tag */}
        {listing.tag && (
          <div className="absolute right-4 top-4">
            <span className="rounded-full border border-[#c9a96e]/30 bg-[#060e1a]/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#c9a96e] backdrop-blur-sm">
              {listing.tag}
            </span>
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={() => setLiked((v) => !v)}
          className={`absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 ${
            liked
              ? "border-[#c9a96e]/60 bg-[#0a1628]/90 text-[#c9a96e]"
              : "border-[#1e3052]/80 bg-[#060e1a]/60 text-[#4a5568] hover:border-[#c9a96e]/40 hover:text-[#c9a96e]/70"
          }`}
          aria-label="Save listing"
        >
          <HeartIcon filled={liked} />
        </button>

        {/* Length badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-lg bg-[#060e1a]/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm">
            {listing.lengthM}m
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b97a5]/70">
            {listing.year} · {listing.type}
          </p>
          <h3 className="text-[17px] font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#f0e6d3]">
            {listing.builder} {listing.model}
          </h3>
        </div>

        <p className="mb-5 flex items-center gap-1.5 text-[12px] text-[#8b97a5]">
          <svg className="h-3 w-3 shrink-0 text-[#c9a96e]/50" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {listing.location}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="mb-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#4a5568]">Asking Price</p>
            <p className="text-[22px] font-bold leading-none tracking-tight text-[#c9a96e]">{listing.price}</p>
          </div>
          <button className="rounded-xl border border-[#c9a96e]/25 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#c9a96e] transition-all duration-200 hover:border-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a1628] active:scale-95">
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
    <div className="overflow-hidden rounded-2xl border border-[#1e3052]/40 bg-[#0a1628]">
      <div className="aspect-[16/10] animate-pulse bg-[#112040]" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#112040]" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-[#112040]" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-[#112040]" />
        <div className="mt-6 flex justify-between">
          <div className="h-7 w-1/3 animate-pulse rounded bg-[#112040]" />
          <div className="h-9 w-1/4 animate-pulse rounded bg-[#112040]" />
        </div>
      </div>
    </div>
  );
}

// ─── Listing grid with ad injection ──────────────────────────────────────────

// Inserts: SponsoredCard every ~9 listings, SponsoredBanner every 6 listings (full-row)
const BANNER_AFTER = 6;               // insert horizontal banner after every N listings
const CARD_INSERTION_INTERVAL = 9;    // insert a sponsor card every N listings (in-grid)

function ListingGridWithAds({ listings }: { listings: Listing[] }) {
  // Build a mixed array of listing nodes + sponsor nodes
  type GridItem =
    | { kind: "listing"; listing: Listing }
    | { kind: "card"; variantIndex: number }
    | { kind: "banner" };

  const items: GridItem[] = [];
  let cardVariant = 0;
  let cardCounter = 0;

  listings.forEach((listing, i) => {
    items.push({ kind: "listing", listing });
    cardCounter++;

    // Inline banner after every BANNER_AFTER listings
    if ((i + 1) % BANNER_AFTER === 0) {
      items.push({ kind: "banner" });
      cardCounter = 0; // reset card counter after banner
    } else if (cardCounter % CARD_INSERTION_INTERVAL === 0 && i > 0) {
      // Sponsored card instead of banner
      items.push({ kind: "card", variantIndex: cardVariant++ % 3 });
    }
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item, idx) => {
        if (item.kind === "listing") {
          return <ListingCard key={`l-${item.listing.id}`} listing={item.listing} />;
        }
        if (item.kind === "banner") {
          return (
            // Banner spans full row — use col-span-full trick inside the grid
            <div key={`banner-${idx}`} className="sm:col-span-2 lg:col-span-3">
              <SponsoredBanner />
            </div>
          );
        }
        // Sponsored card — same grid cell as a listing
        return <SponsoredCard key={`sc-${idx}`} variantIndex={item.variantIndex} />;
      })}
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
        className="w-full appearance-none rounded-xl border border-[#1e3052] bg-[#060e1a]/80 py-[18px] pl-5 pr-10 text-[13px] font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-[#c9a96e]/30 hover:shadow-[0_0_16px_rgba(201,169,110,0.06)] focus:border-[#c9a96e]/70 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/10"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c9a96e]/50">
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

  // Debounced auto-search — only draftQuery is an external dep;
  // state setters (setLoadingSearch, setQuery) are guaranteed stable by React.
  useEffect(() => {
    if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
    const timer = setTimeout(() => {
      setLoadingSearch(true);
      setQuery(draftQuery);
      setTimeout(() => setLoadingSearch(false), 600);
    }, 500);
    queryTimerRef.current = timer;
    return () => clearTimeout(timer);
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
              OFFMARKET<span className="text-[#c9a96e]">YACHT</span>
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
      <section className="relative overflow-hidden bg-[#060e1a] px-6 pb-12 pt-14 sm:px-10 sm:pb-16 sm:pt-20">
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

        {/* Bottom fade — visually blends into filter bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1628] to-transparent" />
      </section>

      {/* ── Filters bar ────────────────────────────────────────────────────── */}
      <section id="listings" className="border-b border-[#112040] bg-[#0a1628] px-6 py-5 sm:px-10 sm:py-6">
        <div className="mx-auto max-w-[1520px]">
          {/* Toggle filters button (mobile) */}
          <div className="mb-4 flex items-center justify-between md:hidden">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-2 text-[13px] font-medium text-[#8b97a5]"
            >
              Filters {activeFilterCount > 0 && <span className="rounded-full bg-[#c9a96e] px-1.5 py-0.5 text-[10px] text-[#0a1628]">{activeFilterCount}</span>}
              <ChevronDown />
            </button>
            <div className="flex items-center gap-1.5 rounded-full border border-[#1e3052]/80 bg-[#060e1a]/60 px-3 py-1.5">
              <span className="text-[13px] font-bold text-white">{filtered.length}</span>
              <span className="text-[11px] text-[#8b97a5]">{filtered.length === 1 ? "yacht" : "yachts"}</span>
            </div>
          </div>

          {/* Desktop: always visible; Mobile: collapsible */}
          <div className={`gap-4 md:flex ${filtersOpen ? "flex flex-col" : "hidden md:flex"}`}>
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

            {/* Result count pill + clear */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden items-center gap-1.5 rounded-full border border-[#1e3052]/80 bg-[#060e1a]/60 px-4 py-2.5 md:flex">
                <span className="text-[15px] font-bold leading-none text-white">{filtered.length}</span>
                <span className="text-[11px] leading-none text-[#8b97a5]">{filtered.length === 1 ? "yacht" : "yachts"}</span>
              </div>
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
      <section className="px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1520px]">
          {/* AI insight bar */}
          {query && !loadingSearch && (
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-[#c9a96e]/15 bg-[#0a1628] px-5 py-3">
              <span className="text-[#c9a96e]"><SparkleIcon /></span>
              <p className="text-[13px] text-[#8b97a5]">
                Showing <span className="text-white">{filtered.length} results</span> matching &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {/* Featured sponsor block — below search/filter area */}
          {!query && activeFilterCount === 0 && <FeaturedSponsorBlock />}

          {loadingSearch ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <ListingGridWithAds listings={filtered} />
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
      <section id="categories" className="border-t border-[#112040] bg-[#060e1a] px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1520px]">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Browse By</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat)}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[#1e3052]/80 bg-[#0a1628] px-4 py-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a96e]/25 hover:bg-[#0d1f35] hover:shadow-lg hover:shadow-[#c9a96e]/5"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-[12px] font-medium tracking-wide text-[#8b97a5] transition-colors group-hover:text-[#c9a96e]">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location browse ────────────────────────────────────────────────── */}
      <section id="locations" className="border-t border-[#112040] bg-[#0a1628] px-6 py-16 sm:px-10 sm:py-20">
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
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[#1e3052]/80 bg-[#060e1a] py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a96e]/25 hover:shadow-md hover:shadow-[#c9a96e]/5"
                >
                  <span className="text-[13px] font-semibold text-white transition-colors group-hover:text-[#c9a96e]">
                    {loc}
                  </span>
                  <span className="text-[10px] text-[#4a5568]">
                    {count} {count === 1 ? "yacht" : "yachts"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Yacht builders ─────────────────────────────────────────────────── */}
      <section id="builders" className="border-t border-[#112040] bg-[#07111f] px-6 py-16 sm:px-10 sm:py-20">
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
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[#1e3052]/80 bg-[#0a1628] py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a96e]/25 hover:bg-[#0d1f35] hover:shadow-md hover:shadow-[#c9a96e]/5"
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
      <section className="relative overflow-hidden border-t border-[#112040] bg-[#060e1a] px-6 py-24 text-center sm:px-10">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]/[0.05] blur-[120px]" />
        <div className="relative mx-auto max-w-xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Discreet Representation</p>
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Have a Yacht to Sell Off-Market?
          </h2>
          <p className="mb-7 text-[15px] leading-relaxed text-[#8b97a5]">
            Submit your vessel confidentially. We match qualified buyers discreetly — no public listing required.
          </p>

          {/* Trust signals */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { mark: "◈", label: "NDA-Protected" },
              { mark: "—", label: "Principal-Only" },
              { mark: "◇", label: "Confidential Process" },
            ].map(({ mark, label }) => (
              <div key={label} className="flex items-center gap-2 text-[11px] text-[#8b97a5]">
                <span className="text-[#c9a96e]/60">{mark}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/submit-yacht"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-[#c9a96e] px-10 text-[12px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
            >
              Submit Confidentially
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#c9a96e]/30 px-10 text-[12px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
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
              OFFMARKET<span className="text-[#c9a96e]">YACHT</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#4a5568]">Confidential Yacht Network</span>
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
