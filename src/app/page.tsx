import type { Metadata } from "next";
import Link from "next/link";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import TrustBadges from "@/components/TrustBadges";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title:
    "Off-Market Yachts for Private Buyers and Qualified Sellers | OffMarketYachts.com",
  description:
    "OffMarketYachts.com is a private platform for off-market yachts, superyachts, motor yachts, catamarans, and trimarans not publicly listed. Request private buyer access or submit a vessel confidentially.",
  alternates: {
    canonical: "https://www.offmarketyachts.com",
  },
};

const yachtCategories = [
  {
    href: "/off-market-superyachts",
    title: "Superyachts",
    description:
      "Off-market superyachts (30m+) available through private channels. Confidential introductions only.",
    icon: "⚓",
  },
  {
    href: "/off-market-motor-yachts",
    title: "Motor Yachts",
    description:
      "Private motor yacht opportunities sourced through owner relationships and broker networks.",
    icon: "🛥",
  },
  {
    href: "/off-market-catamarans",
    title: "Catamarans",
    description:
      "Luxury catamaran and multihull acquisitions. Off-market and pre-market opportunities.",
    icon: "⛵",
  },
  {
    href: "/off-market-trimarans",
    title: "Trimarans",
    description:
      "Specialist trimaran and performance multihull opportunities for discerning buyers.",
    icon: "🌊",
  },
];

const whyOffMarket = [
  {
    title: "No Public Exposure",
    body: "Many yacht owners require absolute discretion. Off-market transactions protect identity, pricing, and vessel information from market speculation.",
  },
  {
    title: "Pre-Market Access",
    body: "Qualified buyers gain access to opportunities before they reach the open market, often at more favourable terms.",
  },
  {
    title: "Owner-Side Advisory",
    body: "We work directly with owner representatives and advisors to facilitate discreet introductions and NDA-governed sharing.",
  },
  {
    title: "Broker Cooperation",
    body: "We cooperate with qualified brokers on a confidential co-brokerage basis. All introductions are managed professionally.",
  },
];

const dealFlowSnapshot = [
  {
    loa: "42m",
    region: "Western Med",
    priceRange: "€12M – €15M",
    status: "Under Review",
    statusClass: "border-yellow-400/25 bg-yellow-400/10 text-yellow-400",
    type: "Motor Yacht",
    note: "2022 refit · Owner-side discussion",
    masked: "Exact marina withheld",
  },
  {
    loa: "55m",
    region: "Caribbean",
    priceRange: "€25M – €30M",
    status: "NDA Required",
    statusClass: "border-[#c9a96e]/25 bg-[#c9a96e]/10 text-[#c9a96e]",
    type: "Superyacht",
    note: "Private seller · Crew-managed",
    masked: "Owner identity protected",
  },
  {
    loa: "33m",
    region: "Confidential",
    priceRange: "Price on Request",
    status: "Limited Circulation",
    statusClass: "border-sky-400/25 bg-sky-400/10 text-sky-400",
    type: "Trimaran",
    note: "Specialist multihull · Principal-only access",
    masked: "Vessel name withheld",
  },
  {
    loa: "68m",
    region: "Northern Europe",
    priceRange: "€45M+",
    status: "Owner Approval Required",
    statusClass: "border-orange-400/25 bg-orange-400/10 text-orange-400",
    type: "Superyacht",
    note: "Recent technical upgrades · No public listing",
    masked: "Specs released under NDA",
  },
  {
    loa: "29m",
    region: "UAE / Gulf",
    priceRange: "€6M – €9M",
    status: "Pre-Market",
    statusClass: "border-violet-400/25 bg-violet-400/10 text-violet-400",
    type: "Motor Yacht",
    note: "Low-hour vessel · Documentation pending",
    masked: "Flag details withheld",
  },
  {
    loa: "47m",
    region: "East Med",
    priceRange: "€18M – €22M",
    status: "Verified Representative",
    statusClass: "border-emerald-400/25 bg-emerald-400/10 text-emerald-400",
    type: "Displacement Yacht",
    note: "Commercially compliant · NDA standard",
    masked: "Exact location masked",
  },
  {
    loa: "24m",
    region: "Balearics",
    priceRange: "€3M – €5M",
    status: "Soft Availability",
    statusClass: "border-teal-400/25 bg-teal-400/10 text-teal-400",
    type: "Catamaran",
    note: "Charter-ready · Private approach only",
    masked: "Owner identity protected",
  },
  {
    loa: "74m",
    region: "Confidential",
    priceRange: "€60M+",
    status: "Principal Review Only",
    statusClass: "border-red-400/25 bg-red-400/10 text-red-400",
    type: "Superyacht",
    note: "Flag confidential · Family office channel",
    masked: "All details withheld",
  },
  {
    loa: "38m",
    region: "Florida / Bahamas",
    priceRange: "€10M – €14M",
    status: "Broker Cooperation",
    statusClass: "border-blue-400/25 bg-blue-400/10 text-blue-400",
    type: "Motor Yacht",
    note: "US buyer-ready · Co-brokerage possible",
    masked: "Vessel name withheld",
  },
  {
    loa: "52m",
    region: "Monaco / SOF",
    priceRange: "€28M – €35M",
    status: "Controlled Access",
    statusClass: "border-amber-400/25 bg-amber-400/10 text-amber-400",
    type: "Superyacht",
    note: "Survey package available under NDA",
    masked: "Exact marina withheld",
  },
];

const yachtShowsATier = [
  {
    flag: "🇺🇸",
    name: "Miami International Boat Show",
    date: "February (Annual)",
    location: "Miami, USA",
    note: "High volume, retail + mid/high segment buyers. Strong US east-coast buyer acquisition event.",
    url: "https://www.miamiboatshow.com",
    tier: "flagship",
  },
  {
    flag: "🇺🇸",
    name: "Palm Beach International Boat Show",
    date: "March",
    location: "Florida, USA",
    note: "UHNW and serious superyacht buyers. Private deal discussions concentrated here.",
    url: "https://www.pbboatshow.com",
    tier: "flagship",
  },
  {
    flag: "🇺🇸",
    name: "Fort Lauderdale International Boat Show",
    date: "October – November",
    location: "Florida, USA",
    note: "World's largest in-water yacht show. Significant off-market introductions occur around the event.",
    url: "https://www.flibs.com",
    tier: "flagship",
  },
  {
    flag: "🇫🇷",
    name: "Cannes Yachting Festival",
    date: "September",
    location: "Cannes, France",
    note: "New launches and dealer ecosystem. Key broker acquisition event for European deal flow.",
    url: "https://www.cannesyachtingfestival.com",
    tier: "flagship",
  },
  {
    flag: "🇲🇨",
    name: "Monaco Yacht Show",
    date: "September",
    location: "Monaco",
    note: "Ultra-high-end. €25M+ transactions closed through private networks during the show week.",
    url: "https://www.monacoyachtshow.com",
    tier: "flagship",
  },
  {
    flag: "🇮🇹",
    name: "Genoa International Boat Show",
    date: "October",
    location: "Genoa, Italy",
    note: "Historic European marine hub. Strong Mediterranean owner and broker deal flow.",
    url: "https://www.salonenautico.com",
    tier: "standard",
  },
  {
    flag: "🇩🇪",
    name: "boot Düsseldorf",
    date: "January",
    location: "Düsseldorf, Germany",
    note: "World's largest indoor marine exhibition. Opens Q1 deal flow across European markets.",
    url: "https://www.boot.com",
    tier: "standard",
  },
  {
    flag: "🇦🇪",
    name: "Dubai International Boat Show",
    date: "February – March",
    location: "Dubai, UAE",
    note: "High liquidity UHNW buyers. Gulf region principals and sovereign wealth adjacent mandates.",
    url: "https://www.boatshowdubai.com",
    tier: "flagship",
  },
  {
    flag: "🇶🇦",
    name: "Qatar Boat Show",
    date: "November",
    location: "Qatar",
    note: "Emerging ultra-rich buyer market. Strong acquisition appetite in the Gulf region.",
    url: "https://www.boatshowqatar.com",
    tier: "standard",
  },
];

const yachtShowsBTier = [
  { flag: "🇪🇸", name: "Palma International Boat Show", url: "https://www.palmainternationalboatshow.com" },
  { flag: "🇬🇷", name: "Mediterranean Yacht Show", url: "https://mediterraneanyachtshow.gr" },
  { flag: "🇬🇷", name: "TYBA Yacht Charter Show", url: "https://www.tybachartershow.com" },
  { flag: "🇬🇷", name: "East Med Multihull & Yacht Charter Show", url: "https://www.emmys.gr" },
  { flag: "🇬🇧", name: "Southampton International Boat Show", url: "https://www.southamptonboatshow.com" },
  { flag: "🇬🇧", name: "British Motor Yacht Show", url: "https://www.britishmotoryachtshow.com" },
  { flag: "🇦🇺", name: "Sanctuary Cove International Boat Show", url: "https://www.sanctuarycoveboatshow.com.au" },
  { flag: "🇺🇸", name: "Newport Charter Yacht Show", url: "https://www.newportchartershow.com" },
  { flag: "🌍", name: "International Charter Expo", url: "https://www.internationalcharterexpo.com" },
  { flag: "🌍", name: "MYBA Charter Show", url: "https://www.myba.org" },
  { flag: "🇸🇬", name: "Singapore Yachting Festival", url: "https://www.singaporeyachtingfestival.com" },
  { flag: "🇳🇱", name: "METSTRADE (B2B Marine)", url: "https://www.metstrade.com" },
  { flag: "🇹🇷", name: "Superyacht Summit Türkiye", url: "https://www.cnryachtdesign.com" },
  { flag: "🇦🇬", name: "Antigua Charter Yacht Show", url: "https://www.antiguayachtshow.com" },
];

const faqItems = [
  {
    question: "What is an off-market yacht?",
    answer:
      "An off-market yacht is a vessel available for sale or acquisition that is not publicly listed on brokerage websites, marketplaces, or databases. These opportunities are typically shared only with qualified buyers through private channels, broker networks, or owner-to-buyer introductions.",
  },
  {
    question: "Who can access off-market yacht opportunities?",
    answer:
      "Access is limited to qualified buyers, family offices, institutional investors, and verified yacht brokers. We conduct a brief private review of all access requests to ensure appropriate introductions.",
  },
  {
    question: "How do I submit a yacht for off-market sale?",
    answer:
      "Use our confidential submission form. We accept yachts from direct owners, owner representatives, and licensed brokers. All submissions are reviewed privately. No public listing exposure without your explicit consent.",
  },
  {
    question: "Is an NDA required to view vessel details?",
    answer:
      "For many opportunities, yes. We facilitate NDA-based information sharing to protect owner and vessel identity. Our team will advise on the appropriate process for each opportunity.",
  },
  {
    question: "Do you work with yacht brokers?",
    answer:
      "Yes. We cooperate with licensed and experienced yacht brokers on a confidential co-brokerage basis. Please visit our broker cooperation page or contact us directly.",
  },
  {
    question: "What types of yachts do you handle?",
    answer:
      "We specialise in superyachts (30m+), motor yachts, luxury catamarans, trimarans, explorer yachts, and other significant marine assets. Both power and sail vessels are considered.",
  },
  {
    question: "What are the best yacht shows in the world for serious buyers?",
    answer:
      "The Monaco Yacht Show, Fort Lauderdale International Boat Show (FLIBS), Cannes Yachting Festival, Palm Beach International Boat Show, and Dubai International Boat Show are the most significant global events for qualified yacht buyers. Serious private transactions and off-market introductions take place through broker and owner networks during — and often ahead of — these shows. Access to genuine off-market opportunities typically requires an established buyer profile before show season.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OffMarketYachts.com",
  url: "https://www.offmarketyachts.com",
  logo: "https://www.offmarketyachts.com/logo.png",
  description:
    "A private, high-trust platform for off-market yachts, superyachts, motor yachts, catamarans, and luxury marine assets not publicly listed.",
  sameAs: [
    "https://www.linkedin.com/company/offmarketyachts",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://www.offmarketyachts.com/contact",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OffMarketYachts.com",
  url: "https://www.offmarketyachts.com",
  description: "Private platform for off-market yachts and luxury marine assets.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const eventDateRanges: Record<string, { start: string; end: string }> = {
  "September": { start: "09-01", end: "09-30" },
  "October – November": { start: "10-01", end: "11-30" },
  "March": { start: "03-01", end: "03-31" },
  "February – March": { start: "02-01", end: "03-31" },
  "February (Annual)": { start: "02-01", end: "02-28" },
};

const eventSchemas = yachtShowsATier
  .filter((s) => s.tier === "flagship")
  .map((s) => {
    const range = eventDateRanges[s.date] ?? { start: "01-01", end: "01-31" };
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: s.name,
      startDate: `2026-${range.start}`,
      endDate: `2026-${range.end}`,
      location: {
        "@type": "Place",
        name: s.location,
        address: { "@type": "PostalAddress", addressLocality: s.location },
      },
      url: s.url,
      description: s.note,
      organizer: { "@type": "Organization", name: s.name, url: s.url },
    };
  });

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={[organizationSchema, websiteSchema, faqSchema, ...eventSchemas]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071421] pb-24 pt-20 sm:pb-32 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right,#c9a96e 1px,transparent 1px),linear-gradient(to bottom,#c9a96e 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container-site relative text-center">
          <div className="mb-5 inline-block rounded-full border border-[#c9a96e]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c9a96e]">
            Deal Flow · Private · Selective
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#F3F0EA] sm:text-5xl lg:text-6xl">
            Off-Market Yacht Deal Flow
            <span className="block mt-2 text-[#c9a96e]">For Qualified Principals Only</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#8b97a5]">
            Access vessels that are never listed.
            Introductions happen privately — or not at all.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/private-access" className="btn-gold text-base">
              Apply for Access
            </Link>
            <Link href="/submit-yacht" className="btn-outline-gold text-base">
              Submit Confidentially
            </Link>
          </div>
          <div className="mt-10">
            <TrustBadges dark />
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e]/50">
            Not Public. Not Indexed. Not Circulated.
          </p>
        </div>
      </section>

      {/* Access is Selective */}
      <section className="section bg-[#0C1B2D]" aria-labelledby="selective-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-block rounded-full border border-[#c9a96e]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c9a96e]">
              Access is Selective
            </div>
            <h2
              id="selective-heading"
              className="text-2xl font-bold tracking-tight text-[#F3F0EA] sm:text-3xl"
            >
              We do not accept all requests.
            </h2>
            <p className="mt-4 text-[#8b97a5]">
              Access is limited to qualified buyers, verified brokers, and
              authorised representatives. All applications are reviewed privately
              before any introduction is made.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { badge: "Pending Review", color: "text-yellow-400", bg: "border-yellow-400/20 bg-yellow-400/5" },
              { badge: "Under Consideration", color: "text-blue-400", bg: "border-blue-400/20 bg-blue-400/5" },
              { badge: "Approved", color: "text-green-400", bg: "border-green-400/20 bg-green-400/5" },
              { badge: "Invitation Only", color: "text-[#c9a96e]", bg: "border-[#c9a96e]/20 bg-[#c9a96e]/5" },
            ].map(({ badge, color, bg }) => (
              <div
                key={badge}
                className={`flex items-center justify-center rounded-lg border px-5 py-4 text-sm font-semibold tracking-wide ${bg} ${color}`}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-current opacity-70" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Deal Flow Snapshot */}
      <section className="section relative overflow-hidden bg-[#07111f]" aria-labelledby="snapshot-heading">
        {/* Dot-grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#c9a96e 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container-site relative">
          {/* Section header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-[#c9a96e]/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]/70">
              Not listed. Not indexed. Not publicly circulated.
            </div>
            <h2
              id="snapshot-heading"
              className="text-2xl font-bold tracking-tight text-[#F3F0EA] sm:text-3xl"
            >
              Private Deal Flow Snapshot
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#8b97a5]">
              A limited preview of confidential yacht opportunities currently reviewed through
              private owner-side, broker, and representative channels.{" "}
              Full details are shared only after qualification, NDA execution, and owner approval.
            </p>
          </div>

          {/* Cards grid */}
          <div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
            aria-hidden="true"
          >
            {dealFlowSnapshot.map((card, i) => (
              <div
                key={i}
                className="flex cursor-default select-none flex-col overflow-hidden rounded-xl border border-[#1e3052] bg-[#0D1B2A]"
              >
                {/* Gold gradient top line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a96e]/35 to-transparent" />

                {/* LOA + status */}
                <div className="flex items-start justify-between gap-2 px-4 pb-2 pt-4">
                  <span className="text-xl font-bold leading-none text-[#F3F0EA]">
                    {card.loa}
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${card.statusClass}`}
                  >
                    {card.status}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-1.5 px-4 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8b97a5]">{card.region}</span>
                    <span className="text-[10px] text-[#c9a96e]/50">🔒</span>
                  </div>
                  <p className="text-sm font-semibold text-[#c9a96e]">{card.priceRange}</p>
                  <p className="text-[11px] leading-relaxed text-[#8b97a5]">
                    {card.type} · {card.note}
                  </p>
                </div>

                {/* Masked footer */}
                <div className="border-t border-[#112040] bg-[#080f1c] px-4 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="shrink-0 text-[9px] text-[#c9a96e]/40">▪</span>
                    <span
                      className="pointer-events-none text-[10px] text-[#8b97a5]/70"
                      style={{ filter: "blur(4px)" }}
                    >
                      {card.masked} · Confidential
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Access Protocol bar */}
          <div className="mt-10 rounded-xl border border-[#1e3052] bg-[#0D1B2A] px-6 py-6">
            <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]/70">
              Access Protocol
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Buyer Qualification",
                "NDA Execution",
                "Owner-Side Approval",
                "Controlled Data Release",
                "Private Introduction",
              ].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c9a96e]/15 text-[9px] font-bold text-[#c9a96e]">
                      {i + 1}
                    </span>
                    <span className="text-xs text-[#8b97a5]">{step}</span>
                  </span>
                  {i < arr.length - 1 && (
                    <span className="hidden text-xs text-[#8b97a5]/30 sm:inline">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "NDA Standard",
              "Owner Approved Only",
              "No Public Listing",
              "Principal-Only Access",
              "Co-Brokerage Supported",
              "Family Office Ready",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#1e3052] px-3 py-1 text-[10px] font-medium tracking-wide text-[#8b97a5]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-[#8b97a5]/55">
            These examples are illustrative of the type of private opportunities reviewed through
            our network. No vessel information is publicly disclosed without written owner or
            representative consent.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/private-access" className="btn-gold">
              Apply for Private Access
            </Link>
            <Link href="/submit-yacht" className="btn-outline-gold">
              Submit a Confidential Opportunity
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-[#8b97a5]/50">
            Access is reviewed manually. Not all requests are accepted.
          </p>
        </div>
      </section>

      {/* Buyer / Seller split */}
      <section className="section bg-[#F4F1EB]">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-[#DDD8CE] bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">🔍</div>
              <h2 className="mb-3 text-xl font-bold text-[#0a1628]">
                Looking to Buy Off-Market?
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-[#4a5568]">
                We selectively introduce qualified principals to off-market yachts
                before they reach the public. Access is subject to review —
                qualified buyers receive discreet introductions under NDA.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#4a5568]">
                {[
                  "Qualification review required",
                  "NDA-governed information sharing",
                  "Discreet introductions to owners",
                  "Access subject to approval",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#c9a96e]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/buy-off-market-yachts" className="btn-gold">
                Apply for Buyer Access
              </Link>
            </div>

            <div className="rounded-lg bg-[#0C1B2D] p-8 shadow-sm">
              <div className="mb-4 text-3xl">🛥</div>
              <h2 className="mb-3 text-xl font-bold text-[#F3F0EA]">
                Selling Privately?
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-[#8b97a5]">
                We selectively introduce your vessel to qualified buyers — never
                publicly, never without your consent. Full control of information
                flow at every stage.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#8b97a5]">
                {[
                  "No public listing without consent",
                  "Confidential buyer introductions",
                  "Owner representative support",
                  "NDA-based information sharing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#c9a96e]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/sell-off-market-yacht" className="btn-gold">
                Submit Confidentially
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="who-heading">
        <div className="container-site">
          <div className="mb-10 text-center">
            <h2
              id="who-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Who We Work With
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              We selectively introduce qualified parties. Our network is
              invitation-based and professionally verified.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: "🏛", label: "Owner Representatives" },
              { icon: "⚓", label: "Yacht Management Firms" },
              { icon: "🚩", label: "Flag Administrators" },
              { icon: "📋", label: "Private Brokers" },
              { icon: "🏦", label: "Family Offices" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-lg border border-[#DDD8CE] bg-white p-5 text-center shadow-sm"
              >
                <span className="mb-3 text-2xl">{icon}</span>
                <span className="text-sm font-semibold text-[#0a1628]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Private Advisory Services */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="services-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-[#c9a96e]/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c9a96e]">
              Private Advisory
            </div>
            <h2
              id="services-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Our Private Advisory Services
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              Discreet, confidential support across every stage of private yacht
              ownership, acquisition, and transaction.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: "🏛",
                title: "Owner-Side Representation",
                body: "Confidential support for owners who want to explore a private sale without public exposure, uncontrolled circulation, or price speculation.",
                ctaLabel: "Explore Owner Representation",
                ctaHref: "/owner-representation",
              },
              {
                icon: "⚓",
                title: "Private Yacht Brokerage",
                body: "Controlled introductions between qualified buyers, verified brokers, and owner-side representatives. No public listing exposure.",
                ctaLabel: "Explore Private Brokerage",
                ctaHref: "/private-yacht-brokerage",
              },
              {
                icon: "📊",
                title: "Off-Market Deal Flow Advisory",
                body: "Buyer-side access strategy for principals seeking yachts before they reach public marketplaces.",
                ctaLabel: "Apply for Access",
                ctaHref: "/private-access",
              },
              {
                icon: "🏦",
                title: "Broker & Family Office Cooperation",
                body: "Structured cooperation for brokers, advisors, and family offices managing confidential yacht mandates for UHNW principals.",
                ctaLabel: "View Cooperation",
                ctaHref: "/yacht-brokers",
              },
            ].map(({ icon, title, body, ctaLabel, ctaHref }) => (
              <div
                key={title}
                className="group flex flex-col rounded-xl border border-[#DDD8CE] bg-white p-8 shadow-sm transition hover:border-[#c9a96e] hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EDE8E0] text-2xl">
                  {icon}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#0a1628] transition group-hover:text-[#c9a96e]">
                  {title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#4a5568]">{body}</p>
                <Link
                  href={ctaHref}
                  className="self-start text-xs font-semibold uppercase tracking-widest text-[#c9a96e] transition hover:text-[#0a1628]"
                >
                  {ctaLabel} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Principals Choose Us */}
      <section className="section bg-[#0C1B2D]" aria-labelledby="principals-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="principals-heading"
              className="text-2xl font-bold tracking-tight text-[#F3F0EA] sm:text-3xl"
            >
              Why Principals Choose OffMarketYachts
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#8b97a5]">
              Built for those who require discretion at every stage of a private
              yacht transaction.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Privacy",
                icon: "🔒",
                body: "No public listings, no open circulation, no unnecessary exposure of vessel or owner identity.",
              },
              {
                label: "Network",
                icon: "🌐",
                body: "Access through owner-side, broker, family office, and authorised representative channels.",
              },
              {
                label: "Security",
                icon: "🛡",
                body: "NDA-led information sharing and controlled release of vessel documentation at every stage.",
              },
              {
                label: "Guidance",
                icon: "🧭",
                body: "Transaction support from initial qualification through private introduction and completion.",
              },
            ].map(({ label, icon, body }) => (
              <div
                key={label}
                className="rounded-xl border border-[#1e3052] bg-[#112040] p-6"
              >
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="mb-2 text-base font-bold text-[#c9a96e]">{label}</h3>
                <p className="text-sm leading-relaxed text-[#8b97a5]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yacht Categories */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="categories-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="categories-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Off-Market Yacht Categories
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              Private acquisition opportunities across all major luxury yacht
              categories, available through exclusive off-market channels.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {yachtCategories.map(({ href, title, description, icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-lg border border-[#DDD8CE] bg-white p-6 shadow-sm transition hover:border-[#c9a96e] hover:shadow-md"
              >
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="mb-2 text-base font-bold text-[#0a1628] transition group-hover:text-[#c9a96e]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4a5568]">
                  {description}
                </p>
                <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="section bg-[#0C1B2D]" aria-labelledby="wdnd-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h2
                id="wdnd-heading"
                className="text-2xl font-bold tracking-tight text-[#F3F0EA] sm:text-3xl"
              >
                What We Don&apos;t Do
              </h2>
            </div>
            <div className="space-y-4">
              {[
                "We do not publicly list vessels",
                "We do not mass distribute opportunities",
                "We do not circulate blind listings",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-lg border border-[#112040] bg-[#112040] px-6 py-4"
                >
                  <span className="text-lg text-red-400/80">✕</span>
                  <span className="text-sm font-medium text-[#8b97a5]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Off-Market */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="why-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="why-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Why Off-Market Yachts?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              The most significant yacht transactions happen privately, before
              vessels ever reach public marketplaces.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {whyOffMarket.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-lg border border-[#DDD8CE] bg-white p-6"
              >
                <h3 className="mb-2 text-base font-bold text-[#0a1628]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broker & Family Office */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="advisory-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="advisory-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              For Brokers &amp; Family Offices
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              Specialist support for yacht brokers seeking private deal flow and
              family offices managing luxury marine asset acquisitions.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-[#DDD8CE] bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">📋</div>
              <h3 className="mb-3 text-lg font-bold text-[#0a1628]">
                Yacht Brokers
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[#4a5568]">
                Access private off-market deal flow, co-brokerage opportunities,
                and a network of qualified buyer and seller introductions.
              </p>
              <Link href="/yacht-brokers" className="btn-gold text-sm">
                Broker Cooperation
              </Link>
            </div>
            <div className="rounded-lg border border-[#DDD8CE] bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">🏦</div>
              <h3 className="mb-3 text-lg font-bold text-[#0a1628]">
                Family Offices
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[#4a5568]">
                Discreet yacht acquisition support for family offices and wealth
                managers. Principal identity protected. NDA-standard throughout.
              </p>
              <Link href="/family-offices" className="btn-gold text-sm">
                Family Office Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Discretion */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="trust-heading">
        <div className="container-site text-center">
          <h2
            id="trust-heading"
            className="mb-4 text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
          >
            Built on Discretion and Trust
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[#4a5568]">
            Every enquiry, every submission, and every introduction is handled
            with strict confidentiality. We do not share information without
            consent, and NDA-based processes are standard.
          </p>
          <TrustBadges />
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="section bg-[#F4F1EB]" aria-labelledby="access-form-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2
                id="access-form-heading"
                className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
              >
                Apply for Private Buyer Access
              </h2>
              <p className="mt-3 text-[#4a5568]">
                Submit your details for a private review. Access is subject to
                qualification — approved principals receive controlled introductions.
              </p>
            </div>
            <BuyerForm title="Apply for Private Buyer Access" />
          </div>
        </div>
      </section>

      {/* Private Yacht Market Insights */}
      <section id="insights" className="section bg-[#F4F1EB]" aria-labelledby="insights-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-[#c9a96e]/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c9a96e]">
              Insights
            </div>
            <h2
              id="insights-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Private Yacht Market Insights
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              Confidential acquisition, private sale strategy, and off-market
              yacht transaction guidance.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                category: "Off-Market Listings",
                title: "Off-Market Yacht Listings: Why Serious Buyers Look Before the Public Market",
                excerpt:
                  "The most significant yacht transactions never appear on public brokerage databases. Here is why qualified buyers prioritise private channels.",
              },
              {
                category: "Private Sale Strategy",
                title: "How to Sell a Yacht Privately Without Public Listing Exposure",
                excerpt:
                  "Owner-side representation, controlled introductions, and NDA-led information sharing allow discreet yacht sales without open-market exposure.",
              },
              {
                category: "Boat Shows",
                title: "Palm Beach Boat Show 2026: Private Buyer Opportunities",
                excerpt:
                  "Behind the public event, significant pre-market and off-market yacht discussions take place. What qualified principals should know.",
              },
              {
                category: "Boat Shows",
                title: "Monaco Yacht Show: How Off-Market Deal Flow Works",
                excerpt:
                  "The Monaco Yacht Show surfaces public listings — the real deal flow happens through private networks before and after the show.",
              },
              {
                category: "Owner Representation",
                title: "Owner Representation in Yacht Sales: What It Means",
                excerpt:
                  "Understanding the role of owner-side advisors and representatives in managing private yacht sale processes without public exposure.",
              },
              {
                category: "Family Offices",
                title: "Family Office Yacht Acquisition: Confidential Buying Process",
                excerpt:
                  "A structured, NDA-led acquisition process for family offices and UHNW advisors managing discreet yacht mandates.",
              },
            ].map(({ category, title, excerpt }) => (
              <div
                key={title}
                className="flex flex-col rounded-xl border border-[#DDD8CE] bg-white p-6 shadow-sm"
              >
                <span className="mb-3 self-start rounded-full bg-[#EDE8E0] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c9a96e]">
                  {category}
                </span>
                <h3 className="mb-3 flex-1 text-sm font-bold leading-snug text-[#0a1628]">
                  {title}
                </h3>
                <p className="mb-5 text-xs leading-relaxed text-[#4a5568]">{excerpt}</p>
                <span className="self-start text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
                  Read More →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Yacht Shows & Events */}
      <section id="yacht-shows" className="section bg-[#F4F1EB]" aria-labelledby="shows-heading" style={{ contentVisibility: "auto", containIntrinsicSize: "0 1200px" }}>
        <div className="container-site">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-[#c9a96e]/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c9a96e]">
              Events Calendar
            </div>
            <h2
              id="shows-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Global Yacht Shows &amp; Yachting Events (2026–2028)
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#4a5568]">
              Where global yacht deals, UHNW buyers, and off-market opportunities converge.
              Private deal flow runs parallel to — and often ahead of — the public event calendar.
            </p>
          </div>

          {/* A-tier label */}
          <div className="mb-6 flex items-center gap-4">
            <span className="shrink-0 rounded-full bg-[#c9a96e]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
              Core Deal Flow Events
            </span>
            <div className="h-px flex-1 bg-[#DDD8CE]" />
          </div>

          {/* A-tier event cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {yachtShowsATier.map((event) => (
              <div
                key={event.name}
                className="group flex flex-col rounded-xl border border-[#DDD8CE] bg-white p-5 shadow-sm transition hover:border-[#c9a96e] hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className="text-xl">{event.flag}</span>
                  {event.tier === "flagship" && (
                    <span className="shrink-0 rounded-full bg-[#c9a96e]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#c9a96e]">
                      Top Tier
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-sm font-bold text-[#0a1628] transition group-hover:text-[#c9a96e]">
                  {event.name}
                </h3>
                <p className="mb-0.5 text-xs text-[#4a5568]">📅 {event.date}</p>
                <p className="mb-3 text-xs text-[#4a5568]">📍 {event.location}</p>
                <p className="mb-4 flex-1 text-xs leading-relaxed text-[#8b97a5]">
                  {event.note}
                </p>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="self-start text-xs font-semibold uppercase tracking-widest text-[#c9a96e] transition hover:text-[#0a1628]"
                >
                  Visit Official Site →
                </a>
              </div>
            ))}
          </div>

          {/* Q1–Q4 Timeline */}
          <div className="mt-10 rounded-xl border border-[#DDD8CE] bg-[#ECE7DF] p-6">
            <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]/70">
              Annual Event Calendar
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  quarter: "Q1",
                  months: "Jan – Mar",
                  events: ["boot Düsseldorf", "Miami Boat Show", "Dubai Boat Show"],
                },
                {
                  quarter: "Q2",
                  months: "Apr – Jun",
                  events: ["Palma Boat Show", "Mediterranean Cluster", "MYBA Charter Show"],
                },
                {
                  quarter: "Q3",
                  months: "Jul – Sep",
                  events: ["Cannes Yachting Festival", "Monaco Yacht Show", "Southampton"],
                },
                {
                  quarter: "Q4",
                  months: "Oct – Dec",
                  events: ["Genoa Boat Show", "Fort Lauderdale (FLIBS)", "Qatar Boat Show"],
                },
              ].map(({ quarter, months, events }) => (
                <div key={quarter} className="rounded-lg border border-[#DDD8CE] bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-base font-bold text-[#c9a96e]">{quarter}</span>
                    <span className="text-xs text-[#8b97a5]">{months}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {events.map((e) => (
                      <li key={e} className="flex items-center gap-1.5 text-xs text-[#4a5568]">
                        <span className="text-[8px] text-[#c9a96e]">▶</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic callout */}
          <div className="mt-6 rounded-xl border border-[#1e3052] bg-[#0C1B2D] p-6">
            <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]/70">
              Where Deals Actually Happen
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  event: "Monaco",
                  role: "Deal Closing",
                  desc: "Ultra-high-end private transactions. €25M+ deals closed through private networks during show week.",
                },
                {
                  event: "Cannes",
                  role: "Broker Acquisition",
                  desc: "New launches, dealer ecosystem, and broker deal sourcing ahead of the open market.",
                },
                {
                  event: "Miami / FLIBS",
                  role: "Buyer Acquisition",
                  desc: "Largest buyer volume in North America. Mid to high segment qualified principals.",
                },
                {
                  event: "Dubai",
                  role: "Liquidity",
                  desc: "High liquidity UHNW buyers. Gulf region principals and sovereign wealth adjacent mandates.",
                },
              ].map(({ event, role, desc }) => (
                <div key={event} className="rounded-lg border border-[#1e3052] bg-[#112040] p-4">
                  <p className="mb-1 text-sm font-bold text-[#F3F0EA]">{event}</p>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#c9a96e]">
                    {role}
                  </p>
                  <p className="text-xs leading-relaxed text-[#8b97a5]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* B-tier label + pill list */}
          <div className="mt-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="shrink-0 rounded-full border border-[#DDD8CE] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#4a5568]">
                Network &amp; Niche Deal Flow Events
              </span>
              <div className="h-px flex-1 bg-[#DDD8CE]" />
            </div>
            <div className="flex flex-wrap gap-3">
              {yachtShowsBTier.map((show) => (
                <a
                  key={show.name}
                  href={show.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD8CE] bg-white px-4 py-2 text-xs font-medium text-[#4a5568] transition hover:border-[#c9a96e] hover:text-[#0a1628]"
                >
                  <span>{show.flag}</span>
                  {show.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Final CTA */}
      <section className="section bg-[#0C1B2D]">
        <div className="container-site text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#F3F0EA] sm:text-3xl">
            Ready to Enter the Private Network?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#8b97a5]">
            Whether you are looking to acquire a vessel privately or represent
            one discreetly, our team is available to assist qualified principals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/private-access" className="btn-gold text-base">
              Apply for Access
            </Link>
            <Link href="/submit-yacht" className="btn-outline-gold text-base">
              Submit Confidentially
            </Link>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e]/50">
            Not Public. Not Indexed. Not Circulated.
          </p>
        </div>
      </section>
    </>
  );
}
