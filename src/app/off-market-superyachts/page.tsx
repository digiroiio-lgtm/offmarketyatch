import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Off-Market Superyachts for Qualified Buyers",
  description:
    "Private access to off-market superyachts (30m+) not publicly listed. Discreet introductions, NDA-based information sharing, and owner representation for qualified UHNW buyers and family offices.",
  keywords: ["off market superyachts", "private superyacht sale", "superyacht acquisition", "off market superyacht for sale"],
  alternates: {
    canonical: "https://www.offmarketyachts.com/off-market-superyachts",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/off-market-superyachts",
    title: "Off-Market Superyachts for Qualified Buyers",
    description: "Private access to off-market superyachts for UHNW buyers and family offices.",
  },
};

const faqItems = [
  {
    question: "What defines a superyacht?",
    answer:
      "A superyacht is generally considered to be a professionally crewed yacht of 24 metres or longer. Our primary focus is vessels of 30 metres and above, including megayachts and gigayachts.",
  },
  {
    question: "Are off-market superyachts available at a lower price?",
    answer:
      "Not always — but off-market transactions often allow for more flexible negotiation as there is no competitive public bidding environment. Sellers may also be more willing to accommodate terms.",
  },
  {
    question: "Can I commission a new build through you?",
    answer:
      "We focus on existing vessels but can facilitate introductions for new-build advisory. Please contact us to discuss your specific requirements.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Off-Market Superyachts", item: "https://www.offmarketyachts.com/off-market-superyachts" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Off-Market Superyacht Acquisition – Private Buyer Access",
  provider: { "@type": "Organization", name: "OffMarketYachts.com", url: "https://www.offmarketyachts.com" },
  description: "Private access to off-market superyachts (30m+) for qualified UHNW buyers and family offices. Discreet introductions and NDA-based information sharing.",
  url: "https://www.offmarketyachts.com/off-market-superyachts",
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

export default function SuperyachtsPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Off-Market Superyachts" }]} />
      <PageHero
        h1="Off-Market Superyachts for Qualified Buyers"
        subheadline="Private access to 30m+ superyachts not publicly listed. Discreet introductions and NDA-governed transactions for UHNW principals and family offices."
        ctaLabel="Request Superyacht Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Superyacht"
        secondaryCtaHref="/submit-yacht"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Private Superyacht Acquisition
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#4a5568]">
                The superyacht market increasingly transacts off-market. Owners
                of significant vessels (30m–100m+) frequently prefer to sell
                privately to protect vessel identity, crew security, and pricing
                confidentiality.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                We maintain relationships with owner representatives, yacht
                management companies, flag administrators, and qualified brokers
                to source off-market superyacht opportunities for our verified
                buyer network.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "30m+", label: "Minimum LOA Focus" },
                  { stat: "UHNW", label: "Buyer Profile" },
                  { stat: "NDA", label: "Standard Process" },
                  { stat: "24hr", label: "Enquiry Response" },
                ].map(({ stat, label }) => (
                  <div key={label} className="rounded-lg border border-[#e8ecf0] p-4 text-center">
                    <div className="text-2xl font-bold text-[#c9a96e]">{stat}</div>
                    <div className="mt-1 text-xs text-[#4a5568]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <BuyerForm title="Request Superyacht Access" />
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Superyacht Buyer FAQs" />
    </>
  );
}
