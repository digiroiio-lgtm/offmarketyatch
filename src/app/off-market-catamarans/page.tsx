import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Off-Market Catamarans and Luxury Multihulls",
  description:
    "Private catamaran and luxury multihull acquisition opportunities not publicly listed. Off-market catamarans sourced through owner networks and specialist brokers.",
  keywords: ["off market catamaran", "luxury catamaran for sale", "private catamaran sale", "off market multihull"],
  alternates: {
    canonical: "https://www.offmarketyachts.com/off-market-catamarans",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/off-market-catamarans",
    title: "Off-Market Catamarans and Luxury Multihulls",
    description: "Private catamaran and luxury multihull acquisition not publicly listed.",
  },
};

const faqItems = [
  {
    question: "What types of catamarans do you handle?",
    answer:
      "We focus on luxury sailing catamarans, power catamarans, and expedition catamarans from 12m upward. Our primary interest is in premium-specification vessels in the $500K+ range.",
  },
  {
    question: "Are there off-market power catamarans available?",
    answer:
      "Yes. Power catamaran opportunities are increasingly common in our off-market network, particularly in the 12m–24m range. Please specify your preference in the buyer access form.",
  },
  {
    question: "Can I access charter-ready catamarans off-market?",
    answer:
      "Yes. We occasionally have charter-ready and charter-managed catamarans available through private channels. Please indicate this requirement in your access request.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Off-Market Catamarans", item: "https://www.offmarketyachts.com/off-market-catamarans" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Off-Market Catamaran Acquisition – Private Buyer Access",
  provider: { "@type": "Organization", name: "OffMarketYachts.com", url: "https://www.offmarketyachts.com" },
  description: "Private catamaran and luxury multihull acquisition opportunities not publicly listed. Off-market catamarans sourced through owner networks and specialist brokers.",
  url: "https://www.offmarketyachts.com/off-market-catamarans",
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

export default function CatamaransPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Off-Market Catamarans" }]} />
      <PageHero
        h1="Off-Market Catamarans and Luxury Multihulls"
        subheadline="Private catamaran acquisition opportunities — sailing, power, and expedition catamarans not publicly listed. Qualified buyer introductions only."
        ctaLabel="Request Catamaran Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Catamaran"
        secondaryCtaHref="/submit-yacht"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Private Catamaran Acquisition
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#4a5568]">
                The luxury catamaran segment has seen significant growth in
                demand from qualified buyers seeking blue-water capable,
                low-maintenance vessels. Many premium catamarans are sold
                privately before reaching public marketplaces.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                Our network includes luxury sailing catamarans, performance
                racing multihulls, power catamarans, and expedition-configured
                vessels from leading builders worldwide.
              </p>
              <ul className="space-y-3">
                {[
                  "Luxury sailing catamarans (12m–30m+)",
                  "High-performance racing multihulls",
                  "Power and expedition catamarans",
                  "Charter-ready and charter-managed vessels",
                  "Blue-water and liveaboard configurations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4a5568]">
                    <span className="mt-0.5 text-[#c9a96e]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <BuyerForm title="Request Catamaran Access" />
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Catamaran Buyer FAQs" />
    </>
  );
}
