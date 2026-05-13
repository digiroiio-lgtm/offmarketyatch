"use client";

import Link from "next/link";
import SponsorBadge from "./SponsorBadge";

const CAPABILITIES = [
  "Antalya Freezone",
  "Refit Coordination",
  "Technical Oversight",
  "Owner Representation",
  "Shipyard Network",
];

// Abstract cinematic hull cross-section SVG
function HullGraphic() {
  return (
    <svg viewBox="0 0 480 320" className="h-full w-full opacity-20" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Technical grid */}
      {[0, 80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="320" stroke="#c9a96e" strokeWidth="0.5" />
      ))}
      {[0, 80, 160, 240, 320].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} stroke="#c9a96e" strokeWidth="0.5" />
      ))}
      {/* Hull profile */}
      <path
        d="M30 240 Q100 180 240 170 Q380 180 450 240 L450 280 Q380 260 240 255 Q100 260 30 280 Z"
        fill="#c9a96e"
        opacity="0.15"
        stroke="#c9a96e"
        strokeWidth="1.5"
      />
      {/* Waterline */}
      <line x1="0" y1="260" x2="480" y2="260" stroke="#c9a96e" strokeWidth="1" strokeDasharray="16 8" opacity="0.6" />
      {/* Mast */}
      <line x1="240" y1="270" x2="240" y2="60" stroke="#c9a96e" strokeWidth="2" />
      <line x1="240" y1="60" x2="360" y2="120" stroke="#c9a96e" strokeWidth="1.5" />
      <line x1="240" y1="100" x2="340" y2="140" stroke="#c9a96e" strokeWidth="1" />
      {/* Crane arm */}
      <line x1="380" y1="320" x2="380" y2="80" stroke="#c9a96e" strokeWidth="2.5" />
      <line x1="380" y1="80" x2="460" y2="80" stroke="#c9a96e" strokeWidth="2" />
      <line x1="460" y1="80" x2="460" y2="160" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="6 4" />
      {/* Center cross */}
      <circle cx="240" cy="170" r="8" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="240" cy="170" r="2" fill="#c9a96e" />
    </svg>
  );
}

export default function FeaturedSponsorBlock() {
  return (
    <section className="my-8 overflow-hidden rounded-2xl border border-[#c9a96e]/15 bg-[#0a1628]">
      {/* Top label */}
      <div className="flex items-center gap-3 border-b border-[#112040] px-8 py-3">
        <SponsorBadge />
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#4a5568]">
          Featured Marine Partner
        </span>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Left: cinematic visual */}
        <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-[#060e1a] via-[#0a1628] to-[#112040] lg:min-h-[360px]">
          <HullGraphic />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e1a]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a1628]" />
          {/* MOX logo mark */}
          <div className="absolute bottom-6 left-8">
            <span className="block text-[28px] font-bold tracking-[0.35em] text-white/25">MOX</span>
            <span className="block text-[10px] uppercase tracking-[0.4em] text-[#c9a96e]/40">YACHT</span>
          </div>
          {/* Top-right location */}
          <div className="absolute right-6 top-6 text-right">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#c9a96e]/50">Antalya</p>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#4a5568]">Mediterranean</p>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-12">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
            Marine Infrastructure
          </p>
          <h2 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
            Engineering Confidence at Sea
          </h2>
          <p className="mb-6 text-[14px] leading-relaxed text-[#8b97a5]">
            From refit coordination to full-scale yacht production management, MOX YACHT supports
            complex yacht projects across the Mediterranean. Headquartered at Antalya Freezone with
            access to an extensive Turkish and European shipyard network.
          </p>

          {/* Capability list */}
          <ul className="mb-8 space-y-2.5">
            {CAPABILITIES.map((cap) => (
              <li key={cap} className="flex items-center gap-3 text-[13px] text-[#8b97a5]">
                <span className="h-px w-5 shrink-0 bg-[#c9a96e]/40" />
                {cap}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/partners/mox-yacht"
              className="inline-flex h-11 items-center rounded-xl bg-[#c9a96e] px-7 text-[12px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
            >
              View Capabilities
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-xl border border-[#c9a96e]/30 px-7 text-[12px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
