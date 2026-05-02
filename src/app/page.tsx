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
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OffMarketYachts.com",
  url: "https://www.offmarketyachts.com",
  logo: "https://www.offmarketyachts.com/logo.png",
  description:
    "A private, high-trust platform for off-market yachts, superyachts, motor yachts, catamarans, and luxury marine assets not publicly listed.",
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

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={[organizationSchema, websiteSchema, faqSchema]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a1628] pb-24 pt-20 sm:pb-32 sm:pt-28">
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
            Private · Discreet · Qualified
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Off-Market Yachts for Private Buyers and Qualified Sellers
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#8b97a5]">
            A private, high-trust platform connecting qualified buyers, owners,
            family offices, and brokers with off-market yachts and superyachts
            not publicly listed anywhere else.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/private-access" className="btn-gold text-base">
              Request Private Access
            </Link>
            <Link href="/submit-yacht" className="btn-outline-gold text-base">
              Submit an Off-Market Yacht
            </Link>
          </div>
          <div className="mt-10">
            <TrustBadges dark />
          </div>
        </div>
      </section>

      {/* Buyer / Seller split */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-[#e8ecf0] p-8 shadow-sm">
              <div className="mb-4 text-3xl">🔍</div>
              <h2 className="mb-3 text-xl font-bold text-[#0a1628]">
                Looking to Buy Off-Market?
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-[#4a5568]">
                Gain private access to off-market yachts and superyachts before
                they reach the public. Qualified buyers receive discreet
                introductions, full vessel documentation under NDA, and direct
                access to owner representatives.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#4a5568]">
                {[
                  "Pre-market and off-market opportunities",
                  "NDA-governed information sharing",
                  "Discreet introductions to owners",
                  "Broker cooperation supported",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#c9a96e]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/buy-off-market-yachts" className="btn-gold">
                Explore Buyer Access
              </Link>
            </div>

            <div className="rounded-lg bg-[#0a1628] p-8 shadow-sm">
              <div className="mb-4 text-3xl">🛥</div>
              <h2 className="mb-3 text-xl font-bold text-white">
                Selling Privately?
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-[#8b97a5]">
                Represent your vessel confidentially, without public listing
                exposure. We facilitate discreet introductions to qualified
                buyers and family offices, maintaining full control of your
                information.
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
                Sell Privately
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Yacht Categories */}
      <section className="section bg-[#f5f7fa]" aria-labelledby="categories-heading">
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
                className="group rounded-lg border border-[#e8ecf0] bg-white p-6 shadow-sm transition hover:border-[#c9a96e] hover:shadow-md"
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

      {/* Why Off-Market */}
      <section className="section bg-white" aria-labelledby="why-heading">
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
                className="rounded-lg border border-[#e8ecf0] p-6"
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
      <section className="section bg-[#0a1628]" aria-labelledby="advisory-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="advisory-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              For Brokers &amp; Family Offices
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#8b97a5]">
              Specialist support for yacht brokers seeking private deal flow and
              family offices managing luxury marine asset acquisitions.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-[#112040] bg-[#112040] p-8">
              <div className="mb-4 text-3xl">📋</div>
              <h3 className="mb-3 text-lg font-bold text-white">
                Yacht Brokers
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[#8b97a5]">
                Access private off-market deal flow, co-brokerage opportunities,
                and a network of qualified buyer and seller introductions.
              </p>
              <Link href="/yacht-brokers" className="btn-gold text-sm">
                Broker Cooperation
              </Link>
            </div>
            <div className="rounded-lg border border-[#112040] bg-[#112040] p-8">
              <div className="mb-4 text-3xl">🏦</div>
              <h3 className="mb-3 text-lg font-bold text-white">
                Family Offices
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[#8b97a5]">
                Discreet yacht acquisition support for family offices and wealth
                managers. Private introductions, advisory, and full
                confidentiality maintained throughout.
              </p>
              <Link href="/family-offices" className="btn-gold text-sm">
                Family Office Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Discretion */}
      <section className="section bg-white" aria-labelledby="trust-heading">
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
      <section className="section bg-[#f5f7fa]" aria-labelledby="access-form-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2
                id="access-form-heading"
                className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
              >
                Request Private Buyer Access
              </h2>
              <p className="mt-3 text-[#4a5568]">
                Submit your details for a private review. Qualified buyers
                receive direct access to off-market opportunities.
              </p>
            </div>
            <BuyerForm title="Request Private Buyer Access" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Final CTA */}
      <section className="section bg-[#0a1628]">
        <div className="container-site text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to Explore Private Yacht Opportunities?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#8b97a5]">
            Whether you are looking to acquire a vessel privately or represent
            one discreetly, our team is available to assist qualified
            principals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/private-access" className="btn-gold text-base">
              Request Private Access
            </Link>
            <Link href="/submit-yacht" className="btn-outline-gold text-base">
              Submit an Off-Market Yacht
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
