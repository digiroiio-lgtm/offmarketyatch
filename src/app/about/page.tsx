import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "A Private Marketplace for Off-Market Yacht Opportunities",
  description:
    "About OffMarketYachts.com — a private, high-trust platform connecting qualified buyers, owners, and brokers with off-market yacht and superyacht opportunities.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/about",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/about",
    title: "About OffMarketYachts.com",
    description: "A private, high-trust platform for off-market yacht opportunities.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.offmarketyachts.com/about" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OffMarketYachts.com",
  url: "https://www.offmarketyachts.com",
  description: "A private, high-trust platform for off-market yachts, superyachts, motor yachts, catamarans, and luxury marine assets not publicly listed.",
  sameAs: [
    "https://www.linkedin.com/company/offmarketyachts",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://www.offmarketyachts.com/contact",
  },
};

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, organizationSchema]} />
      <Breadcrumb items={[{ label: "About" }]} />
      <PageHero
        h1="A Private Marketplace for Off-Market Yacht Opportunities"
        subheadline="Built for discretion, trust, and qualified introductions. We connect serious buyers, owners, and advisors away from the noise of public markets."
        ctaLabel="Request Private Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Yacht"
        secondaryCtaHref="/submit-yacht"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-[#0a1628]">
              Our Mission
            </h2>
            <p className="mb-4 text-base leading-relaxed text-[#4a5568]">
              OffMarketYachts.com was created to serve a specific need in the
              yacht market: connecting qualified buyers and serious sellers
              through private, confidential channels — without the exposure,
              speculation, and inefficiency of public marketplaces.
            </p>
            <p className="mb-4 text-base leading-relaxed text-[#4a5568]">
              A significant proportion of the world&apos;s most desirable yachts
              and superyachts are acquired and sold privately, through owner
              networks, broker relationships, and confidential introductions.
              We exist to facilitate these transactions professionally.
            </p>
            <p className="mb-10 text-base leading-relaxed text-[#4a5568]">
              We are not a listing platform. We are a private, high-trust
              introduction service for qualified principals. All information
              shared through our platform is handled with strict
              confidentiality, and NDA-based processes are standard for
              significant transactions.
            </p>

            <h2 className="mb-6 text-2xl font-bold text-[#0a1628]">
              Who We Serve
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  title: "Qualified Buyers",
                  body: "UHNW individuals, family offices, and institutional investors seeking private access to premium yacht acquisitions.",
                },
                {
                  title: "Owners & Representatives",
                  body: "Yacht owners, owner advisors, and legal representatives who require discreet, qualified buyer introductions.",
                },
                {
                  title: "Yacht Brokers",
                  body: "Licensed brokers seeking off-market deal flow, buyer introductions, and co-brokerage cooperation.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-lg border border-[#e8ecf0] p-5">
                  <h3 className="mb-2 font-bold text-[#0a1628]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-[#c9a96e]/30 bg-[#f5f7fa] p-6 text-sm leading-relaxed text-[#4a5568]">
              <strong className="text-[#0a1628]">Disclaimer:</strong>{" "}
              OffMarketYachts.com is a private lead-generation and advisory
              platform. Yacht availability, pricing, and specifications are
              subject to verification and owner approval. We do not claim
              ownership of any listed or represented vessels. All enquiries
              are handled in confidence.
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/private-access" className="btn-gold">
                Request Private Access
              </Link>
              <Link href="/contact" className="btn-outline-gold">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
