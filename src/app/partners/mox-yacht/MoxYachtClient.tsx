"use client";

import Link from "next/link";

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

const GALLERY_ITEMS = [
  { label: "Refit Operations", sub: "Antalya Shipyard", gradient: "from-[#0a1628] via-[#112040] to-[#162840]" },
  { label: "Hull Engineering", sub: "Technical Infrastructure", gradient: "from-[#060e1a] via-[#0a1628] to-[#0d1f35]" },
  { label: "Interior Fit-Out", sub: "Owner Specification", gradient: "from-[#0d1f35] via-[#0a1628] to-[#060e1a]" },
  { label: "Sea Trials", sub: "Mediterranean Waters", gradient: "from-[#0a1628] via-[#162030] to-[#0a1628]" },
];

// ─── Abstract SVG visuals ──────────────────────────────────────────────────────

function HeroSVG() {
  return (
    <svg viewBox="0 0 1200 400" className="absolute inset-0 h-full w-full opacity-[0.06]" fill="none" preserveAspectRatio="xMidYMid slice">
      {[0, 150, 300, 450, 600, 750, 900, 1050, 1200].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#c9a96e" strokeWidth="0.8" />
      ))}
      {[0, 100, 200, 300, 400].map((y) => (
        <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#c9a96e" strokeWidth="0.8" />
      ))}
      <path d="M100 300 Q300 220 600 210 Q900 205 1100 300 L1100 360 Q900 310 600 305 Q300 310 100 360 Z" fill="#c9a96e" opacity="0.15" />
      <line x1="0" y1="330" x2="1200" y2="330" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="20 10" />
      <line x1="600" y1="310" x2="600" y2="40" stroke="#c9a96e" strokeWidth="2.5" />
      <line x1="600" y1="40" x2="800" y2="120" stroke="#c9a96e" strokeWidth="2" />
      <line x1="600" y1="80" x2="760" y2="140" stroke="#c9a96e" strokeWidth="1.5" />
      <line x1="1000" y1="400" x2="1000" y2="60" stroke="#c9a96e" strokeWidth="3" />
      <line x1="1000" y1="60" x2="1150" y2="60" stroke="#c9a96e" strokeWidth="2.5" />
      <line x1="1150" y1="60" x2="1150" y2="160" stroke="#c9a96e" strokeWidth="2" strokeDasharray="8 6" />
      <circle cx="600" cy="210" r="12" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="600" cy="210" r="3" fill="#c9a96e" />
    </svg>
  );
}

function GalleryCardSVG({ gradient }: { gradient: string }) {
  return (
    <div className={`h-full w-full bg-gradient-to-br ${gradient} relative overflow-hidden`}>
      <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full opacity-10" fill="none">
        <rect x="10" y="130" width="280" height="6" rx="2" fill="#c9a96e" />
        <rect x="30" y="110" width="240" height="4" rx="2" fill="#c9a96e" />
        <rect x="60" y="90" width="180" height="4" rx="2" fill="#c9a96e" />
        <line x1="20" y1="130" x2="20" y2="180" stroke="#c9a96e" strokeWidth="2" />
        <line x1="280" y1="130" x2="280" y2="180" stroke="#c9a96e" strokeWidth="2" />
        <circle cx="150" cy="60" r="10" stroke="#c9a96e" strokeWidth="1.5" />
        <circle cx="150" cy="60" r="3" fill="#c9a96e" />
        <line x1="150" y1="70" x2="150" y2="90" stroke="#c9a96e" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MoxYachtClient() {
  return (
    <div className="min-h-screen bg-[#060e1a] text-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#112040] bg-[#060e1a] px-6 py-24 sm:px-10 sm:py-32">
        <HeroSVG />
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
                    <GalleryCardSVG gradient={item.gradient} />
                    {/* Play/cinema overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a96e]/30 bg-[#060e1a]/60 text-[#c9a96e]/60 backdrop-blur-sm">
                        <svg className="h-4 w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
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

            {/* Abstract map visual */}
            <div className="relative overflow-hidden rounded-2xl border border-[#1e3052] bg-gradient-to-br from-[#060e1a] via-[#0a1628] to-[#112040]">
              <div className="aspect-[4/3] p-8">
                <svg viewBox="0 0 400 300" className="h-full w-full opacity-20" fill="none">
                  {/* Mediterranean outline — abstract */}
                  <path d="M10 150 Q100 100 200 120 Q300 140 390 110" stroke="#c9a96e" strokeWidth="2" fill="none" />
                  <path d="M10 170 Q100 130 200 150 Q300 170 390 140" stroke="#c9a96e" strokeWidth="1" fill="none" strokeDasharray="8 4" />
                  {/* Antalya marker */}
                  <circle cx="270" cy="130" r="8" stroke="#c9a96e" strokeWidth="2" />
                  <circle cx="270" cy="130" r="3" fill="#c9a96e" />
                  <line x1="270" y1="138" x2="270" y2="165" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* Monaco marker */}
                  <circle cx="140" cy="115" r="4" stroke="#c9a96e" strokeWidth="1.5" />
                  <circle cx="140" cy="115" r="1.5" fill="#c9a96e" />
                  {/* Viareggio marker */}
                  <circle cx="110" cy="125" r="4" stroke="#c9a96e" strokeWidth="1.5" />
                  <circle cx="110" cy="125" r="1.5" fill="#c9a96e" />
                  {/* Route lines */}
                  <line x1="140" y1="115" x2="270" y2="130" stroke="#c9a96e" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
                  <line x1="110" y1="125" x2="270" y2="130" stroke="#c9a96e" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
                </svg>
                {/* Label */}
                <div className="absolute bottom-6 right-8 text-right">
                  <p className="text-[11px] font-medium text-[#c9a96e]/70">Antalya, TR</p>
                  <p className="text-[10px] text-[#4a5568]">Mediterranean Hub</p>
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
