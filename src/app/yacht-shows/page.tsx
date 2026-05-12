import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Global Yacht Shows & Yachting Events 2026–2028 | OffMarketYachts.com",
  description:
    "The world's most important yacht shows and yachting events for serious buyers and sellers. Monaco Yacht Show, FLIBS, Cannes, Dubai, Palm Beach — where private off-market deals are made.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/yacht-shows",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/yacht-shows",
    title: "Global Yacht Shows & Yachting Events 2026–2028 | OffMarketYachts.com",
    description:
      "Monaco Yacht Show, FLIBS, Cannes, Dubai, Palm Beach — where qualified buyers and off-market deal flow converge.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "OffMarketYachts.com" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Yacht Shows & Yachting Events 2026–2028 | OffMarketYachts.com",
    description:
      "Where global yacht deals, UHNW buyers, and off-market opportunities converge. Private deal flow runs ahead of the public event calendar.",
    images: ["/og-default.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Global Yacht Shows", item: "https://www.offmarketyachts.com/yacht-shows" },
  ],
};

const showsATier = [
  {
    flag: "🇺🇸",
    name: "Miami International Boat Show",
    date: "February (Annual)",
    startDate: "2026-02-12",
    endDate: "2026-02-16",
    location: "Miami, USA",
    note: "High volume, retail + mid/high segment buyers. Strong US east-coast buyer acquisition event.",
    url: "https://www.miamiboatshow.com",
    tier: "flagship" as const,
  },
  {
    flag: "🇺🇸",
    name: "Palm Beach International Boat Show",
    date: "March",
    startDate: "2026-03-19",
    endDate: "2026-03-22",
    location: "Florida, USA",
    note: "UHNW and serious superyacht buyers. Private deal discussions concentrated here.",
    url: "https://www.pbboatshow.com",
    tier: "flagship" as const,
  },
  {
    flag: "🇦🇪",
    name: "Dubai International Boat Show",
    date: "February – March",
    startDate: "2026-02-24",
    endDate: "2026-02-28",
    location: "Dubai, UAE",
    note: "High liquidity UHNW buyers. Gulf region principals and sovereign wealth adjacent mandates.",
    url: "https://www.boatshowdubai.com",
    tier: "flagship" as const,
  },
  {
    flag: "🇫🇷",
    name: "Cannes Yachting Festival",
    date: "September",
    startDate: "2026-09-08",
    endDate: "2026-09-13",
    location: "Cannes, France",
    note: "New launches and dealer ecosystem. Key broker acquisition event for European deal flow.",
    url: "https://www.cannesyachtingfestival.com",
    tier: "flagship" as const,
  },
  {
    flag: "🇲🇨",
    name: "Monaco Yacht Show",
    date: "September",
    startDate: "2026-09-23",
    endDate: "2026-09-26",
    location: "Monaco",
    note: "Ultra-high-end. €25M+ transactions closed through private networks during the show week.",
    url: "https://www.monacoyachtshow.com",
    tier: "flagship" as const,
  },
  {
    flag: "🇺🇸",
    name: "Fort Lauderdale International Boat Show",
    date: "October – November",
    startDate: "2026-10-28",
    endDate: "2026-11-01",
    location: "Florida, USA",
    note: "World's largest in-water yacht show. Significant off-market introductions occur around the event.",
    url: "https://www.flibs.com",
    tier: "flagship" as const,
  },
  {
    flag: "🇮🇹",
    name: "Genoa International Boat Show",
    date: "October",
    startDate: "2026-10-01",
    endDate: "2026-10-06",
    location: "Genoa, Italy",
    note: "Historic European marine hub. Strong Mediterranean owner and broker deal flow.",
    url: "https://www.salonenautico.com",
    tier: "standard" as const,
  },
  {
    flag: "🇩🇪",
    name: "boot Düsseldorf",
    date: "January",
    startDate: "2027-01-23",
    endDate: "2027-01-31",
    location: "Düsseldorf, Germany",
    note: "World's largest indoor marine exhibition. Opens Q1 deal flow across European markets.",
    url: "https://www.boot.com",
    tier: "standard" as const,
  },
  {
    flag: "🇶🇦",
    name: "Qatar Boat Show",
    date: "November",
    startDate: "2026-11-03",
    endDate: "2026-11-06",
    location: "Qatar",
    note: "Emerging ultra-rich buyer market. Strong acquisition appetite in the Gulf region.",
    url: "https://www.boatshowqatar.com",
    tier: "standard" as const,
  },
];

const showsBTier = [
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

const eventSchemas = showsATier.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: s.name,
  startDate: s.startDate,
  endDate: s.endDate,
  location: {
    "@type": "Place",
    name: s.location,
    address: { "@type": "PostalAddress", addressLocality: s.location },
  },
  url: s.url,
  description: s.note,
  organizer: { "@type": "Organization", name: s.name, url: s.url },
}));

export default function YachtShowsPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, ...eventSchemas]} />
      <Breadcrumb items={[{ label: "Global Yacht Shows" }]} />

      <PageHero
        h1="Global Yacht Shows & Yachting Events 2026–2028"
        subheadline="Where UHNW buyers, yacht owners, and off-market deal flow converge. Private transactions run parallel to — and often ahead of — the public event calendar."
        ctaLabel="Request Private Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Yacht"
        secondaryCtaHref="/submit-yacht"
      />

      {/* Core Deal Flow Events */}
      <section className="section bg-white" aria-labelledby="core-shows-heading" style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
        <div className="container-site">
          <div className="mb-6 flex items-center gap-4">
            <span className="shrink-0 rounded-full bg-[#c9a96e]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
              Core Deal Flow Events
            </span>
            <div className="h-px flex-1 bg-[#e8ecf0]" />
          </div>

          <h2 id="core-shows-heading" className="sr-only">
            Core Deal Flow Yacht Shows
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {showsATier.map((event) => (
              <div
                key={event.name}
                className="group flex flex-col rounded-xl border border-[#e8ecf0] bg-white p-5 shadow-sm transition hover:border-[#c9a96e] hover:shadow-md"
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
        </div>
      </section>

      {/* Annual Calendar */}
      <section className="section bg-[#f5f7fa]" aria-labelledby="calendar-heading" style={{ contentVisibility: "auto", containIntrinsicSize: "0 400px" }}>
        <div className="container-site">
          <h2
            id="calendar-heading"
            className="mb-8 text-center text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
          >
            Annual Event Calendar
          </h2>
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
              <div key={quarter} className="rounded-lg border border-[#e8ecf0] bg-white p-5">
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
      </section>

      {/* Other Shows */}
      <section className="section bg-white" aria-labelledby="other-shows-heading" style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}>
        <div className="container-site">
          <div className="mb-8 flex items-center gap-4">
            <span className="shrink-0 rounded-full border border-[#e8ecf0] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#4a5568]">
              Additional Events
            </span>
            <div className="h-px flex-1 bg-[#e8ecf0]" />
          </div>
          <h2 id="other-shows-heading" className="sr-only">
            Additional Yachting Events
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {showsBTier.map(({ flag, name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-3 rounded-lg border border-[#e8ecf0] px-4 py-3 text-sm transition hover:border-[#c9a96e]"
              >
                <span className="text-lg">{flag}</span>
                <span className="font-medium text-[#0a1628]">{name}</span>
                <span className="ml-auto text-xs text-[#c9a96e]">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic context */}
      <section className="section bg-[#0a1628]" aria-labelledby="strategy-heading" style={{ contentVisibility: "auto", containIntrinsicSize: "0 450px" }}>
        <div className="container-site">
          <div className="mb-10 text-center">
            <h2
              id="strategy-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Where Deals Actually Happen
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#8b97a5]">
              Public yacht shows surface marketed listings. The real off-market deal flow happens
              through private networks — before, during, and after each event.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { event: "Monaco", role: "Deal Closing", desc: "Ultra-high-end private transactions. €25M+ deals closed through private networks during show week." },
              { event: "Cannes", role: "Broker Acquisition", desc: "New vessel mandates and broker relationships established. Strong European acquisition pipeline." },
              { event: "FLIBS", role: "Buyer Profiling", desc: "World's largest in-water show. The best event to build qualified US buyer relationships." },
              { event: "Dubai", role: "Gulf Mandates", desc: "Gulf principals, sovereign wealth-adjacent buyers, and high-liquidity acquisition mandates." },
            ].map(({ event, role, desc }) => (
              <div key={event} className="rounded-xl border border-[#112040] bg-[#112040] p-5">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#c9a96e]/70">{role}</p>
                <h3 className="mb-3 text-base font-bold text-white">{event}</h3>
                <p className="text-xs leading-relaxed text-[#8b97a5]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-site text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl">
            Access Off-Market Opportunities Around Show Season
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#4a5568]">
            The most significant private transactions are made through established buyer profiles before
            public show season begins. Request access now to be positioned ahead of the calendar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/private-access" className="btn-gold text-base">
              Request Private Access
            </Link>
            <Link href="/submit-yacht" className="btn-outline-gold text-base">
              Submit a Yacht
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
