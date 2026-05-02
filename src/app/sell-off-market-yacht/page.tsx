import type { Metadata } from "next";
import SellerForm from "@/components/SellerForm";
import FAQSection from "@/components/FAQSection";
import TrustBadges from "@/components/TrustBadges";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Sell Your Yacht Privately Without Public Listing Exposure",
  description:
    "Sell your yacht discreetly without public listing exposure. Confidential buyer introductions, NDA-governed information sharing, and owner representative support.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/sell-off-market-yacht",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/sell-off-market-yacht",
    title: "Sell Your Yacht Privately Without Public Listing Exposure",
    description:
      "Confidential yacht sale without public listing. Discreet buyer introductions and NDA-based information sharing.",
  },
};

const faqItems = [
  {
    question: "Will my yacht be publicly listed?",
    answer:
      "No. Your vessel will never be publicly listed without your explicit written consent. All information is handled under strict confidentiality.",
  },
  {
    question: "Who will see information about my yacht?",
    answer:
      "Only pre-qualified buyers or family offices who have signed or agreed to NDA terms. We control the information flow at every stage.",
  },
  {
    question: "Do you work with owner representatives?",
    answer:
      "Yes. We regularly work with owner representatives, advisors, and legal counsel. Please indicate this in your submission and we will coordinate accordingly.",
  },
  {
    question: "Can I submit on behalf of an owner?",
    answer:
      "Yes. Brokers, owner representatives, family office advisors, and legal representatives may submit on behalf of an owner. Please indicate your relationship to the vessel in the submission form.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Sell Off-Market Yacht", item: "https://www.offmarketyachts.com/sell-off-market-yacht" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Yacht Sale – Confidential Off-Market Representation",
  provider: { "@type": "Organization", name: "OffMarketYachts.com", url: "https://www.offmarketyachts.com" },
  description: "Discreet yacht sale without public listing. Confidential buyer introductions and NDA-based information sharing for yacht owners and owner representatives.",
  url: "https://www.offmarketyachts.com/sell-off-market-yacht",
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

export default function SellPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Sell Off-Market Yacht" }]} />
      <PageHero
        h1="Sell Your Yacht Privately Without Public Listing Exposure"
        subheadline="Represent your vessel confidentially. No public listing, no speculation — qualified buyer introductions and NDA-governed information sharing only."
        ctaLabel="Submit Your Yacht"
        ctaHref="/submit-yacht"
        secondaryCtaLabel="Request Access"
        secondaryCtaHref="/private-access"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Confidential Seller Representation
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                We provide a private, discreet channel for yacht owners,
                owner representatives, and brokers to present vessels to
                qualified buyers without public listing exposure. Our process
                is built on confidentiality, professionalism, and qualified
                introductions.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "No Public Listing Exposure",
                    body: "Your vessel will never appear in public databases, listing platforms, or search results without explicit consent.",
                  },
                  {
                    title: "Qualified Buyer Introductions",
                    body: "All prospective buyers are pre-qualified before receiving any vessel information. Speculative or unverified enquiries are filtered out.",
                  },
                  {
                    title: "NDA-Based Information Sharing",
                    body: "Detailed vessel specifications, surveys, and financial information are shared only under NDA protection.",
                  },
                  {
                    title: "Owner Representative Cooperation",
                    body: "We work seamlessly with your existing legal counsel, advisors, and representative team.",
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="flex gap-4">
                    <span className="mt-1 text-[#c9a96e]">✓</span>
                    <div>
                      <h3 className="font-bold text-[#0a1628]">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SellerForm title="Submit Your Yacht for Confidential Review" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-narrow bg-[#f5f7fa]">
        <div className="container-site text-center">
          <TrustBadges />
        </div>
      </section>

      <FAQSection items={faqItems} title="Seller FAQs" />
    </>
  );
}
