"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import SponsorBadge from "./SponsorBadge";
import imgRefit from "../../public/c691b9_b155493f544b4beba7b6f42fdb3ac71b~mv2.jpeg";
import imgBuild from "../../public/79e4fc_40ad6acdc49d4d9db4eb420d0a884b96f000.jpeg";
import imgPm from "../../public/79e4fc_92c750cdefae454aa6ae575b3d452336~mv2.jpeg";

// Three editorial card variants
interface CardVariant {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition: string;
}

const VARIANTS: CardVariant[] = [
  {
    id: "refit",
    eyebrow: "Refit Excellence",
    headline: "Yacht Refit Experts",
    body: "Full refit coordination from concept to delivery. Antalya shipyard network access.",
    cta: "View Refit Services",
    image: imgRefit,
    imageAlt: "MOX YACHT refit craftsmanship — Antalya shipyard close-up",
    objectPosition: "object-center",
  },
  {
    id: "build",
    eyebrow: "New Construction",
    headline: "Build Your Next Yacht",
    body: "End-to-end production management for custom yacht builds in the Mediterranean.",
    cta: "Explore New Build",
    image: imgBuild,
    imageAlt: "MOX YACHT production and refit operations",
    objectPosition: "object-center",
  },
  {
    id: "pm",
    eyebrow: "Project Management",
    headline: "Owner Representation & PM",
    body: "Technical oversight, owner representation and project management for complex yacht projects.",
    cta: "Learn More",
    image: imgPm,
    imageAlt: "MOX YACHT technical infrastructure and project management",
    objectPosition: "object-top",
  },
];

export interface SponsoredCardProps {
  variantIndex?: number; // 0 | 1 | 2
}

export default function SponsoredCard({ variantIndex = 0 }: SponsoredCardProps) {
  const v = VARIANTS[variantIndex % VARIANTS.length];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#c9a96e]/15 bg-[#0a1628] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a96e]/35 hover:shadow-xl hover:shadow-[#c9a96e]/5">
      {/* Card image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a1628]">
        <Image
          src={v.image}
          alt={v.imageAlt}
          fill
          placeholder="blur"
          className={`object-cover ${v.objectPosition} transition-transform duration-500 group-hover:scale-105`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Dark overlay to maintain dark card aesthetic */}
        <div className="absolute inset-0 bg-[#060e1a]/55" />

        {/* Gold horizontal rule — cinematic accent */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

        {/* MOX wordmark */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.35em] text-white/80">MOX</span>
          <span className="text-[11px] text-[#c9a96e]/70">YACHT</span>
        </div>

        {/* Sponsor badge */}
        <div className="absolute right-4 top-4">
          <SponsorBadge />
        </div>

        {/* Eyebrow overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]/80">{v.eyebrow}</span>
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
