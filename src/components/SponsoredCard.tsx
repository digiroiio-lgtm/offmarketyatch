"use client";

import Link from "next/link";
import SponsorBadge from "./SponsorBadge";

// Three editorial card variants
const VARIANTS = [
  {
    id: "refit",
    eyebrow: "Refit Excellence",
    headline: "Yacht Refit Experts",
    body: "Full refit coordination from concept to delivery. Antalya shipyard network access.",
    cta: "View Refit Services",
    accent: "from-[#0a1628] via-[#0d1f35] to-[#112040]",
    // SVG abstract visual
    visual: "refit",
  },
  {
    id: "build",
    eyebrow: "New Construction",
    headline: "Build Your Next Yacht",
    body: "End-to-end production management for custom yacht builds in the Mediterranean.",
    cta: "Explore New Build",
    accent: "from-[#060e1a] via-[#0a1628] to-[#0d1a30]",
    visual: "build",
  },
  {
    id: "pm",
    eyebrow: "Project Management",
    headline: "Owner Representation & PM",
    body: "Technical oversight, owner representation and project management for complex yacht projects.",
    cta: "Learn More",
    accent: "from-[#0a1628] via-[#162030] to-[#0a1628]",
    visual: "pm",
  },
] as const;

// Abstract technical SVG visuals per variant
function VisualLayer({ type }: { type: "refit" | "build" | "pm" }) {
  if (type === "refit") {
    return (
      <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full opacity-10" fill="none">
        <rect x="20" y="80" width="160" height="8" rx="2" fill="#c9a96e" />
        <rect x="40" y="60" width="120" height="6" rx="2" fill="#c9a96e" />
        <rect x="60" y="40" width="80" height="4" rx="2" fill="#c9a96e" />
        <line x1="30" y1="80" x2="30" y2="130" stroke="#c9a96e" strokeWidth="2" />
        <line x1="170" y1="80" x2="170" y2="130" stroke="#c9a96e" strokeWidth="2" />
        <circle cx="100" cy="25" r="6" fill="#c9a96e" />
        <line x1="100" y1="31" x2="100" y2="40" stroke="#c9a96e" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "build") {
    return (
      <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full opacity-10" fill="none">
        <polygon points="100,20 160,120 40,120" fill="none" stroke="#c9a96e" strokeWidth="2" />
        <line x1="100" y1="20" x2="100" y2="120" stroke="#c9a96e" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="40" y1="120" x2="160" y2="120" stroke="#c9a96e" strokeWidth="2" />
        <circle cx="100" cy="20" r="4" fill="#c9a96e" />
        <circle cx="40" cy="120" r="4" fill="#c9a96e" />
        <circle cx="160" cy="120" r="4" fill="#c9a96e" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full opacity-10" fill="none">
      <circle cx="100" cy="75" r="50" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="100" cy="75" r="30" stroke="#c9a96e" strokeWidth="1" />
      <circle cx="100" cy="75" r="5" fill="#c9a96e" />
      <line x1="100" y1="25" x2="100" y2="45" stroke="#c9a96e" strokeWidth="1.5" />
      <line x1="100" y1="105" x2="100" y2="125" stroke="#c9a96e" strokeWidth="1.5" />
      <line x1="50" y1="75" x2="70" y2="75" stroke="#c9a96e" strokeWidth="1.5" />
      <line x1="130" y1="75" x2="150" y2="75" stroke="#c9a96e" strokeWidth="1.5" />
    </svg>
  );
}

export interface SponsoredCardProps {
  variantIndex?: number; // 0 | 1 | 2
}

export default function SponsoredCard({ variantIndex = 0 }: SponsoredCardProps) {
  const v = VARIANTS[variantIndex % VARIANTS.length];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#c9a96e]/15 bg-[#0a1628] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a96e]/35 hover:shadow-xl hover:shadow-[#c9a96e]/5">
      {/* Card image area */}
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${v.accent}`}>
        <VisualLayer type={v.visual} />

        {/* Gold horizontal rule — cinematic accent */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

        {/* MOX wordmark */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.35em] text-white/60">MOX</span>
          <span className="text-[11px] text-[#c9a96e]/50">YACHT</span>
        </div>

        {/* Sponsor badge */}
        <div className="absolute right-4 top-4">
          <SponsorBadge />
        </div>

        {/* Eyebrow overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]/70">{v.eyebrow}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-0.5 text-[11px] uppercase tracking-wider text-[#8b97a5]">
          Partner · MOX YACHT
        </p>
        <h3 className="mb-2 mt-0.5 text-[15px] font-semibold leading-snug text-white">
          {v.headline}
        </h3>
        <p className="mb-4 text-[12px] leading-relaxed text-[#8b97a5]">{v.body}</p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#4a5568]">Antalya, TR</p>
            <p className="text-[12px] font-medium text-[#c9a96e]/80">Mediterranean</p>
          </div>
          <Link
            href="/partners/mox-yacht"
            className="rounded-lg border border-[#c9a96e]/30 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-all duration-200 hover:bg-[#c9a96e] hover:text-[#0a1628]"
          >
            {v.cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
