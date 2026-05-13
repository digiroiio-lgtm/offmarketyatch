"use client";

import Image from "next/image";
import Link from "next/link";
import SponsorBadge from "./SponsorBadge";
import heroImg from "../../public/DJI_0502_JPG.jpeg";

const CAPABILITIES = [
  "Antalya Freezone",
  "Refit Coordination",
  "Technical Oversight",
  "Owner Representation",
  "Shipyard Network",
];

export default function FeaturedSponsorBlock() {
  return (
    <section className="my-10 overflow-hidden rounded-2xl border border-[#E2DDD5] bg-[#F7F4EF]">
      {/* Top label */}
      <div className="flex items-center gap-3 border-b border-[#E2DDD5] bg-[#F7F4EF] px-8 py-3">
        <SponsorBadge />
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#7a7060]">
          Featured Marine Partner
        </span>
      </div>

      <div className="grid lg:grid-cols-[58%_42%]">
        {/* Left: cinematic visual */}
        <div className="relative min-h-[300px] overflow-hidden lg:min-h-[400px]">
          <Image
            src={heroImg}
            alt="MOX YACHT Antalya shipyard operations — aerial view"
            fill
            placeholder="blur"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {/* Gradient overlay — bleeds to ivory on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e1a]/90 via-[#060e1a]/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0d1420]/10 lg:to-[#F7F4EF]" />
          {/* MOX logo mark */}
          <div className="absolute bottom-8 left-8">
            <span className="block text-[38px] font-bold tracking-[0.38em] text-white/85">MOX</span>
            <span className="block text-[11px] uppercase tracking-[0.38em] text-[#c9a96e]">YACHT</span>
          </div>
          {/* Top-right location */}
          <div className="absolute right-6 top-6 text-right">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#c9a96e]/90">Antalya</p>
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/60">Mediterranean</p>
          </div>
        </div>

        {/* Right: content — warm ivory, dark text */}
        <div className="flex flex-col justify-center bg-[#F7F4EF] px-8 py-10 lg:px-12">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#8a6b3a]">
            Marine Infrastructure
          </p>
          <h2 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-[#0d1b2a] lg:text-3xl">
            Engineering Confidence at Sea
          </h2>
          <p className="mb-6 text-[14px] leading-relaxed text-[#4a5060]">
            From refit coordination to full-scale yacht production management, MOX YACHT supports
            complex yacht projects across the Mediterranean. Headquartered at Antalya Freezone with
            access to an extensive Turkish and European shipyard network.
          </p>

          {/* Capability list */}
          <ul className="mb-8 space-y-2.5">
            {CAPABILITIES.map((cap) => (
              <li key={cap} className="flex items-center gap-3 text-[13px] text-[#5a6070]">
                <span className="h-px w-5 shrink-0 bg-[#8a6b3a]/40" />
                {cap}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/partners/mox-yacht"
              className="inline-flex h-11 items-center rounded-xl bg-[#0d1b2a] px-7 text-[12px] font-semibold uppercase tracking-wider text-[#F3F1EC] transition-colors hover:bg-[#1e3052]"
            >
              View Capabilities
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-xl border border-[#8a6b3a]/30 px-7 text-[12px] font-semibold uppercase tracking-wider text-[#8a6b3a] transition-colors hover:bg-[#8a6b3a] hover:text-white"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
