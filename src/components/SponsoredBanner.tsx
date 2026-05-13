"use client";

import Image from "next/image";
import Link from "next/link";
import SponsorBadge from "./SponsorBadge";
import bannerImg from "../../public/DJI_0499_edited.jpeg";

export default function SponsoredBanner() {
  return (
    <article className="col-span-full my-3 overflow-hidden rounded-2xl border border-[#c9a96e]/15 transition-all duration-300 hover:border-[#c9a96e]/30 hover:shadow-2xl hover:shadow-[#c9a96e]/5">
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImg}
            alt="MOX YACHT Mediterranean drone view — Antalya shipyard"
            fill
            placeholder="blur"
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Heavy dark overlay — left heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/95 via-[#07111f]/80 to-[#07111f]/50" />

        {/* Gold top edge */}
        <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-[#c9a96e]/50 via-[#c9a96e]/20 to-transparent" />

        {/* Content */}
        <div className="relative flex flex-col gap-6 px-8 py-8 sm:flex-row sm:items-center sm:gap-10 lg:px-12 lg:py-10">
          {/* Left: text */}
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <SponsorBadge />
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#c9a96e]/60">
                Marine Infrastructure Partner
              </span>
            </div>

            <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#8b97a5]/70">
              MOX YACHT · Antalya, Mediterranean
            </p>
            <h2 className="mb-3 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
              Confidential Yacht Refit &amp; Production Solutions
            </h2>
            <p className="mb-6 max-w-2xl text-[14px] leading-relaxed text-[#8b97a5]">
              MOX YACHT delivers production, refit and technical project management services for
              discerning yacht owners and brokers. Antalya Freezone operations — Mediterranean reach.
            </p>

            {/* Feature pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {["Refit Coordination", "New Build PM", "Owner Representation", "Antalya Freezone", "Mediterranean Network"].map(
                (f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[#1e3052] px-3 py-1 text-[11px] text-[#8b97a5]"
                  >
                    {f}
                  </span>
                )
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/partners/mox-yacht"
                className="inline-flex h-10 items-center rounded-lg bg-[#c9a96e] px-6 text-[11px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
              >
                Explore MOX YACHT
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center rounded-lg border border-[#c9a96e]/30 px-6 text-[11px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>

          {/* Right: MOX wordmark block */}
          <div className="hidden shrink-0 flex-col items-end justify-center lg:flex">
            <div className="mb-1 text-right">
              <span className="block text-[32px] font-bold tracking-[0.3em] text-white/20">MOX</span>
              <span className="block text-[11px] uppercase tracking-[0.4em] text-[#c9a96e]/40">YACHT</span>
            </div>
            <p className="mt-3 text-right text-[10px] uppercase tracking-[0.2em] text-[#4a5568]">
              Engineering Confidence at Sea
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
