import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TrustBadges from "@/components/TrustBadges";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title:
    "Owner-Side Representation for Private Yacht Sales | OffMarketYachts.com",
  description:
    "Confidential support for yacht owners and their representatives who want to explore private sale opportunities without public listing exposure, uncontrolled circulation, or price speculation.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/owner-representation",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Owner-Side Representation for Private Yacht Sales",
  provider: {
    "@type": "Organization",
    name: "OffMarketYachts.com",
    url: "https://www.offmarketyachts.com",
  },
  description:
    "Confidential support for yacht owners and their representatives exploring private sale opportunities without public listing exposure.",
  url: "https://www.offmarketyachts.com/owner-representation",
};

const whyChoose = [
  {
    title: "No Public Listing Exposure",
    body: "Your vessel is never circulated on public brokerage databases, marketplaces, or open search engines. Information is shared only with pre-qualified, NDA-confirmed principals.",
    icon: "🔒",
  },
  {
    title: "Controlled Buyer Introductions",
    body: "All buyer introductions are managed under strict qualification and confidentiality standards. No cold outreach, no blind circulation, no unsolicited enquiries.",
    icon: "🤝",
  },
  {
    title: "NDA-Based Information Sharing",
    body: "Vessel documentation, specifications, and financial information are released only under signed NDA to approved, qualified buyers.",
    icon: "📄",
  },
  {
    title: "Advisor, Attorney, and Broker Cooperation",
    body: "We work alongside your existing advisors, legal counsel, yacht management firms, and brokers. No displacement of your current structure.",
    icon: "⚖️",
  },
];

const process = [
  { step: "01", title: "Confidential Submission", body: "Submit vessel details through our secure confidential form. No public exposure at any stage." },
  { step: "02", title: "Private Review", body: "Our team reviews the submission and contacts you discreetly to discuss parameters, objectives, and timeline." },
  { step: "03", title: "Representation Structure", body: "We agree a representation framework — including NDA requirements, buyer qualification criteria, and information release protocol." },
  { step: "04", title: "Controlled Introductions", body: "Qualified buyers are introduced only after NDA execution and owner-side approval at each stage." },
];

export default function OwnerRepresentationPage() {
  return (
    <>
      <SchemaOrg schema={pageSchema} />

      <PageHero
        h1="Owner-Side Representation for Private Yacht Sales"
        subheadline="Confidential support for yacht owners and their representatives who want to explore private sale opportunities without public listing exposure."
        ctaLabel="Submit Confidentially"
        ctaHref="/submit-yacht"
        secondaryCtaLabel="Speak With Our Team"
        secondaryCtaHref="/contact"
      />

      {/* Why owners choose private representation */}
      <section className="section bg-white" aria-labelledby="why-rep-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="why-rep-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Why Owners Choose Private Representation
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              Selling a significant yacht privately requires absolute control over
              information, buyer access, and timing.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {whyChoose.map(({ title, body, icon }) => (
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

      {/* What we do not do */}
      <section className="section bg-[#0a1628]" aria-labelledby="rep-constraints-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h2
                id="rep-constraints-heading"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Our Representation Commitments
              </h2>
              <p className="mt-3 text-[#8b97a5]">
                What you can expect from owner-side representation through our network.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "No public vessel listing without written consent",
                "No blind circulation to unqualified enquirers",
                "No disclosure of owner identity without approval",
                "No release of vessel documentation without NDA",
                "No introduction without pre-agreed buyer qualification",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-lg border border-[#112040] bg-[#112040] px-6 py-4"
                >
                  <span className="text-lg text-[#c9a96e]">✓</span>
                  <span className="text-sm font-medium text-[#8b97a5]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white" aria-labelledby="rep-process-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <h2
              id="rep-process-heading"
              className="text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
            >
              Private Representation Process
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#4a5568]">
              A structured, confidential process from initial enquiry to private introduction.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, body }) => (
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
            Discretion and Trust at Every Stage
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[#4a5568]">
            Every owner submission is handled in strict confidence. No information
            is shared without consent, and NDA-based processes are standard.
          </p>
          <TrustBadges />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#0a1628]">
        <div className="container-site text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Submit Your Vessel for Confidential Review
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#8b97a5]">
            Owner submissions are reviewed privately. No public exposure without
            written consent. Co-operation with existing brokers and advisors is standard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit-yacht" className="btn-gold text-base">
              Submit Confidentially
            </Link>
            <Link href="/contact" className="btn-outline-gold text-base">
              Speak With Our Team
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#8b97a5]/50">
            All submissions reviewed privately. No public listing without consent.
          </p>
        </div>
      </section>
    </>
  );
}
