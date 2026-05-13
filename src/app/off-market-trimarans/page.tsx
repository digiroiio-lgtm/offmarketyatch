import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Off-Market Trimarans for Private Acquisition",
  description:
    "Specialist off-market trimaran and performance multihull acquisition. Private trimaran opportunities for qualified buyers through exclusive off-market channels.",
  keywords: ["off market trimaran", "trimaran for sale private", "performance multihull off market"],
  alternates: {
    canonical: "https://www.offmarketyachts.com/off-market-trimarans",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/off-market-trimarans",
    title: "Off-Market Trimarans for Private Acquisition",
    description: "Specialist off-market trimaran opportunities for qualified buyers.",
  },
};

const faqItems = [
  {
    question: "What types of trimarans are available off-market?",
    answer:
      "We handle cruising trimarans, performance racing trimarans, and expedition-configured multihulls. Our focus is on quality vessels suitable for extended offshore passages.",
  },
  {
    question: "Are foiling trimarans available through private channels?",
    answer:
      "Occasionally, yes. High-performance and foiling multihulls can be found through our network. Please indicate your interest in your buyer access request.",
  },
  {
    question: "Is the trimaran market active off-market?",
    answer:
      "The specialist nature of the trimaran market means many transactions occur privately between knowledgeable buyers and sellers. Our network is well positioned to facilitate these introductions.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Off-Market Trimarans", item: "https://www.offmarketyachts.com/off-market-trimarans" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Off-Market Trimaran Acquisition – Private Buyer Access",
  provider: { "@type": "Organization", name: "OffMarketYachts.com", url: "https://www.offmarketyachts.com" },
  description: "Specialist off-market trimaran and performance multihull acquisition. Private trimaran opportunities for qualified buyers through exclusive off-market channels.",
  url: "https://www.offmarketyachts.com/off-market-trimarans",
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

export default function TrimaransPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Off-Market Trimarans" }]} />
      <PageHero
        h1="Off-Market Trimarans for Private Acquisition"
        subheadline="Specialist trimaran and performance multihull acquisition through exclusive private channels. Not publicly listed."
        ctaLabel="Request Trimaran Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Trimaran"
        secondaryCtaHref="/submit-yacht"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Specialist Trimaran Acquisition
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#4a5568]">
                Trimarans represent a specialist segment of the yacht market,
                valued for their performance, stability, and offshore capability.
                Our network includes cruising, performance, and racing trimaran
                opportunities not available through conventional brokerages.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                We work with specialist trimaran brokers, builders, and owner
                networks to source private acquisition opportunities for
                qualified buyers.
              </p>
              <ul className="space-y-3">
                {[
                  "Blue-water cruising trimarans",
                  "High-performance racing trimarans",
                  "Expedition and offshore multihulls",
                  "Custom and semi-custom builds",
                  "Liveaboard and charter-ready vessels",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4a5568]">
                    <span className="mt-0.5 text-[#c9a96e]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <BuyerForm title="Request Trimaran Access" />
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Trimaran Buyer FAQs" />
    </>
  );
}
