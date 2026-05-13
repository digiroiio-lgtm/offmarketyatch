"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import imgHero from "../../../../public/79e4fc_88ac6abe180a48f29fe40286db74ee4a%7Emv2.jpeg";
import imgGallery0 from "../../../../public/DJI_0502_JPG.jpeg";
import imgGallery1 from "../../../../public/c691b9_b155493f544b4beba7b6f42fdb3ac71b~mv2.jpeg";
import imgGallery2 from "../../../../public/79e4fc_40ad6acdc49d4d9db4eb420d0a884b96f000.jpeg";
import imgGallery3 from "../../../../public/DJI_0499_edited.jpeg";
import imgAntalya from "../../../../public/Screenshot 2026-05-13 at 10.35.53.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "Yacht Refit Coordination",
    description:
      "Full lifecycle refit management from scoping and tendering to delivery and commissioning. Access to Antalya's best shipyards.",
    icon: "🔧",
  },
  {
    title: "New Build Production",
    description:
      "End-to-end project management for custom yacht construction. Builder selection, technical oversight, quality control.",
    icon: "⚓",
  },
  {
    title: "Owner Representation",
    description:
      "Independent representation protecting the owner's interest throughout production, refit, and technical surveys.",
    icon: "🎖",
  },
  {
    title: "Technical Project Management",
    description:
      "Specialist PM for complex retrofit and systems upgrade projects. Naval architecture, engineering, and regulatory compliance.",
    icon: "📐",
  },
  {
    title: "Shipyard Network Access",
    description:
      "Preferred access to vetted Turkish and Mediterranean shipyards with competitive rates and trusted relationships.",
    icon: "🌊",
  },
  {
    title: "Logistics & Transport",
    description:
      "Yacht transport coordination, customs management within Antalya Freezone, and international ferry oversight.",
    icon: "🧭",
  },
];

const HIGHLIGHTS = [
  { label: "Location", value: "Antalya Freezone, TR" },
  { label: "Coverage", value: "Mediterranean & Beyond" },
  { label: "Focus", value: "Superyacht & Luxury Segment" },
  { label: "Language", value: "EN / TR / IT" },
];

const GALLERY_ITEMS: {
  label: string;
  sub: string;
  image: StaticImageData;
  alt: string;
  objectPosition: string;
}[] = [
  { label: "Refit Operations", sub: "Antalya Shipyard", image: imgGallery0, alt: "Aerial drone view of MOX YACHT Antalya shipyard refit operations", objectPosition: "object-center" },
  { label: "Hull Engineering", sub: "Technical Infrastructure", image: imgGallery1, alt: "Yacht hull engineering and technical refit close-up", objectPosition: "object-center" },
  { label: "Production Operations", sub: "Production Facility", image: imgGallery2, alt: "MOX YACHT production and fit-out operations", objectPosition: "object-center" },
  { label: "Sea Trials", sub: "Mediterranean Waters", image: imgGallery3, alt: "Mediterranean sea trials — drone aerial view", objectPosition: "object-center" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MoxYachtClient() {
  return (
    <div className="min-h-screen bg-[#060e1a] text-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#112040] px-6 py-24 sm:px-10 sm:py-32">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={imgHero}
            alt="MOX YACHT — refit and production operations, Mediterranean"
            fill
            placeholder="blur"
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#060e1a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,transparent_40%,#000_100%)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Breadcrumb */}
          <p className="mb-8 flex items-center justify-center gap-2 text-[11px] text-[#4a5568]">
            <Link href="/marketplace" className="hover:text-[#c9a96e]">Marketplace</Link>
            <span>/</span>
            <span className="text-[#8b97a5]">Partners</span>
            <span>/</span>
            <span className="text-[#c9a96e]">MOX YACHT</span>
          </p>

          {/* Sponsor indicator */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/15 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#c9a96e]/70">Verified Marine Partner</span>
          </div>

          {/* MOX wordmark */}
          <div className="mb-6">
            <h1 className="text-[52px] font-bold tracking-[0.18em] text-white sm:text-[64px]">
              MOX
            </h1>
            <p className="text-[14px] uppercase tracking-[0.45em] text-[#c9a96e]">YACHT</p>
          </div>

          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#8b97a5]">
            Yacht Production · Refit · Project Management
          </p>
          <p className="mx-auto mb-10 max-w-xl text-[16px] leading-relaxed text-[#8b97a5]">
            Engineering confidence at sea. MOX YACHT supports complex yacht projects across the
            Mediterranean with uncompromising technical expertise.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-xl bg-[#c9a96e] px-8 text-[12px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
            >
              Schedule Consultation
            </Link>
            <a
              href="#services"
              className="inline-flex h-12 items-center rounded-xl border border-[#c9a96e]/30 px-8 text-[12px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
            >
              View Capabilities
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="border-b border-[#112040] bg-[#0a1628]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-y divide-[#112040] md:grid-cols-4 md:divide-y-0">
          {HIGHLIGHTS.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center py-8 text-center">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#4a5568]">{label}</p>
              <p className="mt-1 text-[14px] font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">What We Do</p>
          <h2 className="mb-12 text-2xl font-bold text-white">Core Capabilities</h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="rounded-xl border border-[#1e3052] bg-[#0a1628] p-7 transition-colors hover:border-[#c9a96e]/20"
              >
                <span className="mb-4 block text-3xl">{svc.icon}</span>
                <h3 className="mb-2 text-[16px] font-semibold text-white">{svc.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#8b97a5]">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#112040] bg-[#0a1628] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Operations</p>
          <h2 className="mb-10 text-2xl font-bold text-white">Yacht Project Gallery</h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALLERY_ITEMS.map((item) => (
              <div key={item.label} className="group overflow-hidden rounded-xl border border-[#1e3052]">
                <div className="aspect-square overflow-hidden">
                  {/* Video/cinematic placeholder */}
                  <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      placeholder="blur"
                      className={`object-cover ${item.objectPosition}`}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#060e1a]/40" />
                  </div>
                </div>
                <div className="border-t border-[#1e3052] bg-[#0a1628] px-4 py-3">
                  <p className="text-[12px] font-medium text-white">{item.label}</p>
                  <p className="text-[10px] text-[#4a5568]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Antalya section ──────────────────────────────────────────────── */}
      <section className="border-t border-[#112040] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Operational Base</p>
              <h2 className="mb-4 text-2xl font-bold text-white">Antalya Freezone Advantage</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-[#8b97a5]">
                Operating from Turkey's premier yacht hub, MOX YACHT leverages the Antalya
                Freezone for cost-efficient, high-quality yacht projects. The Freezone status enables
                VAT-exempt operations and streamlined international logistics.
              </p>
              <ul className="space-y-3">
                {[
                  "VAT-exempt zone for international vessel work",
                  "Access to 20+ vetted specialist shipyards",
                  "Skilled workforce at competitive rates",
                  "Year-round Mediterranean climate",
                  "Direct IALA maritime route access",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-[#8b97a5]">
                    <span className="mt-[5px] h-px w-5 shrink-0 bg-[#c9a96e]/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Antalya operations image */}
            <div className="relative overflow-hidden rounded-2xl border border-[#1e3052]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={imgAntalya}
                  alt="MOX YACHT Antalya Freezone operations overview"
                  fill
                  placeholder="blur"
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#060e1a]/40" />
                {/* Label */}
                <div className="absolute bottom-6 right-8 text-right">
                  <p className="text-[11px] font-medium text-[#c9a96e]/90">Antalya, TR</p>
                  <p className="text-[10px] text-white/60">Mediterranean Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-[#112040] bg-[#0a1628] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Work With Us</p>
          <h2 className="mb-4 text-2xl font-bold text-white">Start Your Yacht Project</h2>
          <p className="mb-8 text-[15px] leading-relaxed text-[#8b97a5]">
            Speak confidentially with the MOX YACHT team about your refit, production, or project
            management requirements.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-xl bg-[#c9a96e] px-8 text-[12px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors hover:bg-[#e2c99a]"
            >
              Contact MOX YACHT
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex h-12 items-center rounded-xl border border-[#c9a96e]/30 px-8 text-[12px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-[#0a1628]"
            >
              Back to Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
