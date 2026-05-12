import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TrustBadges from "@/components/TrustBadges";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title:
    "Private Yacht Brokerage Without Public Market Exposure | OffMarketYachts.com",
  description:
    "A controlled brokerage environment for qualified buyers, verified brokers, and owner representatives seeking discreet yacht transactions without public listing exposure.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/private-yacht-brokerage",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/private-yacht-brokerage",
    title: "Private Yacht Brokerage Without Public Market Exposure | OffMarketYachts.com",
    description:
      "A controlled brokerage environment for qualified buyers, verified brokers, and owner representatives seeking discreet yacht transactions without public listing exposure.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "OffMarketYachts.com" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Yacht Brokerage Without Public Market Exposure | OffMarketYachts.com",
    description:
      "A controlled brokerage environment for qualified buyers, verified brokers, and owner representatives seeking discreet yacht transactions.",
    images: ["/og-default.jpg"],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Yacht Brokerage Without Public Market Exposure",
  provider: {
    "@type": "Organization",
    name: "OffMarketYachts.com",
    url: "https://www.offmarketyachts.com",
  },
  description:
    "A controlled brokerage environment for qualified buyers, verified brokers, and owner representatives seeking discreet yacht transactions.",
  url: "https://www.offmarketyachts.com/private-yacht-brokerage",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Private Yacht Brokerage", item: "https://www.offmarketyachts.com/private-yacht-brokerage" },
  ],
};

const brokerageFeatures = [
  {
    icon: "🔐",
    title: "Controlled Introductions",
    body: "Buyers and sellers are introduced only after qualification review, NDA execution, and owner-side approval. No blind introductions.",
  },
  {
    icon: "✅",
    title: "Qualified Buyers Only",
    body: "All buyer principals are reviewed for financial qualification and purchase intent before any vessel information is shared.",
  },
  {
    icon: "🤝",
    title: "Co-Brokerage Supported",
    body: "We cooperate with licensed yacht brokers on a confidential co-brokerage basis. Commission terms are agreed before any introduction.",
  },
  {
    icon: "🚫",
    title: "No Blind Circulation",
    body: "Vessel opportunities are never mass-distributed or posted to open databases. Every introduction is managed individually.",
  },
  {
    icon: "📋",
    title: "Commission Terms Agreed First",
    body: "Co-brokerage terms and commission structures are confirmed in writing before any buyer introduction or information release.",
  },
  {
    icon: "🏦",
    title: "Family Office & UHNW Ready",
    body: "Principal identity protection, multi-entity structures, and legal team coordination are standard in our brokerage process.",
  },
];

const cobrokerageSteps = [
  { step: "01", title: "Broker Registration", body: "Register your interest and credentials through our broker cooperation form. All registrations reviewed privately." },
  { step: "02", title: "NDA Execution", body: "A mutual NDA is executed before any vessel or buyer information is shared between parties." },
  { step: "03", title: "Commission Agreement", body: "Co-brokerage terms, commission split, and introduction protocol are agreed and confirmed in writing." },
  { step: "04", title: "Controlled Introduction", body: "Qualified introductions are made under agreed terms. All communication is managed through our confidential channels." },
];

export default function PrivateYachtBrokeragePage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, pageSchema]} />

      <PageHero
        h1="Private Yacht Brokerage Without Public Market Exposure"
        subheadline="A controlled brokerage environment for qualified buyers, verified brokers, and owner representatives seeking discreet yacht transactions."
        ctaLabel="Register Broker Interest"
        ctaHref="/yacht-brokers"
        secondaryCtaLabel="Apply for Buyer Access"
        secondaryCtaHref="/private-access"
      />

      {/* What we offer */}
      <section className="section bg-white" aria-labelledby="brokerage-features-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="brokerage-features-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Private Brokerage Without Public Exposure
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              A structured, confidential approach to yacht brokerage — designed
              for principals who require discretion throughout.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brokerageFeatures.map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-[#e8ecf0] p-6"
              >
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="mb-2 text-base font-bold text-[#0a1628]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't do */}
      <section className="section bg-[#0a1628]" aria-labelledby="brokerage-constraints-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h2
                id="brokerage-constraints-heading"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                How We Differ From Public Brokerage
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "No public MLS or marketplace listings", positive: false },
                { label: "No unqualified buyer enquiries forwarded", positive: false },
                { label: "No blind email or outreach campaigns", positive: false },
                { label: "No vessel details released without NDA", positive: false },
                { label: "Qualified introductions only", positive: true },
                { label: "Owner-approved at every stage", positive: true },
                { label: "Commission agreed before introduction", positive: true },
                { label: "Principal identity protected throughout", positive: true },
              ].map(({ label, positive }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-lg border border-[#112040] bg-[#112040] px-5 py-3"
                >
                  <span className={`text-lg ${positive ? "text-[#c9a96e]" : "text-red-400/80"}`}>
                    {positive ? "✓" : "✕"}
                  </span>
                  <span className="text-sm text-[#8b97a5]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Co-brokerage process */}
      <section className="section bg-white" aria-labelledby="cobrokerage-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="cobrokerage-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Co-Brokerage Process
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              A clear, professional framework for broker cooperation — built on
              mutual NDA, agreed commission, and controlled introduction.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cobrokerageSteps.map(({ step, title, body }) => (
              <div key={step} className="rounded-xl border border-[#e8ecf0] p-6">
                <div className="mb-4 text-2xl font-bold text-[#c9a96e]/40">{step}</div>
                <h3 className="mb-2 text-base font-bold text-[#0a1628]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section bg-[#f5f7fa]">
        <div className="container-site text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl">
            Built on Discretion and Professional Standards
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[#4a5568]">
            Every brokerage relationship is governed by mutual NDA, agreed terms,
            and a shared commitment to principal privacy.
          </p>
          <TrustBadges />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#0a1628]">
        <div className="container-site text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Register Your Broker Interest
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#8b97a5]">
            Licensed brokers and qualified buyer representatives are welcome to
            register for confidential co-brokerage cooperation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/yacht-brokers" className="btn-gold text-base">
              Register Broker Interest
            </Link>
            <Link href="/private-access" className="btn-outline-gold text-base">
              Apply for Buyer Access
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#8b97a5]/50">
            All broker registrations reviewed manually. Co-brokerage terms confirmed before introduction.
          </p>
        </div>
      </section>
    </>
  );
}
