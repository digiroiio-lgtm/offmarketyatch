import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Off-Market Motor Yachts Available Through Private Channels",
  description:
    "Private motor yacht acquisition opportunities sourced through owner networks and broker relationships. Off-market motor yachts not publicly listed.",
  keywords: ["off market motor yacht", "private motor yacht sale", "luxury motor yacht for sale off market"],
  alternates: {
    canonical: "https://www.offmarketyachts.com/off-market-motor-yachts",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/off-market-motor-yachts",
    title: "Off-Market Motor Yachts Available Through Private Channels",
    description: "Private motor yacht acquisition opportunities not publicly listed.",
  },
};

const faqItems = [
  {
    question: "What size motor yachts do you handle off-market?",
    answer:
      "We consider motor yachts of all significant sizes, from 15m upward. Our primary focus is on quality vessels in the $1M+ range where off-market transactions provide the most value.",
  },
  {
    question: "How are off-market motor yachts typically priced?",
    answer:
      "Off-market pricing is generally based on comparable market values but may offer negotiation flexibility. We advise buyers on current market conditions and appropriate offer strategy.",
  },
  {
    question: "Can I request specific motor yacht brands or builders?",
    answer:
      "Yes. We can search our network for specific builders, hull types, or configurations. Please include this in your buyer access request form.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Off-Market Motor Yachts", item: "https://www.offmarketyachts.com/off-market-motor-yachts" },
  ],
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

export default function MotorYachtsPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Off-Market Motor Yachts" }]} />
      <PageHero
        h1="Off-Market Motor Yachts Available Through Private Channels"
        subheadline="Private motor yacht opportunities sourced through owner relationships, management companies, and broker networks. Not publicly listed."
        ctaLabel="Request Motor Yacht Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Motor Yacht"
        secondaryCtaHref="/submit-yacht"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Private Motor Yacht Acquisition
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#4a5568]">
                Many of the most desirable motor yachts available today never
                reach public marketplaces. Owners often prefer to sell privately
                to avoid price anchoring, unnecessary exposure, and speculative
                enquiries.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                Our buyer network receives access to motor yacht opportunities
                from 15m to 50m+, including new-specification vessels, recent
                refits, and long-term, well-maintained privately owned yachts.
              </p>
              <ul className="space-y-3">
                {[
                  "Power and displacement motor yachts",
                  "Planing and semi-displacement hulls",
                  "Recent refits and new-specification vessels",
                  "Owner-managed and professionally operated yachts",
                  "Private treaty and confidential negotiation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4a5568]">
                    <span className="mt-0.5 text-[#c9a96e]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <BuyerForm title="Request Motor Yacht Access" />
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Motor Yacht Buyer FAQs" />
    </>
  );
}
