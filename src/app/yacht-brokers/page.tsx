import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Private Off-Market Yacht Deal Flow for Brokers",
  description:
    "Yacht brokers: access private off-market deal flow, co-brokerage opportunities, and a qualified buyer and seller network. Confidential broker cooperation available.",
  keywords: ["yacht broker private listings", "yacht deal flow", "yacht broker co-brokerage", "off market yacht broker"],
  alternates: {
    canonical: "https://www.offmarketyachts.com/yacht-brokers",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/yacht-brokers",
    title: "Private Off-Market Yacht Deal Flow for Brokers",
    description: "Confidential co-brokerage and off-market deal flow for qualified yacht brokers.",
  },
};

const faqItems = [
  {
    question: "How does broker cooperation work?",
    answer:
      "We cooperate with qualified, licensed brokers on a confidential co-brokerage basis. Commission arrangements are agreed in advance of any introduction. Please contact us to discuss the specifics.",
  },
  {
    question: "Can I submit buyer or seller clients on their behalf?",
    answer:
      "Yes. Brokers may submit buyer access requests and seller/vessel submissions on behalf of their clients. Please indicate your broker status and relationship in the relevant form.",
  },
  {
    question: "Do you require broker accreditation or membership?",
    answer:
      "We prefer to work with brokers holding recognised industry accreditations (YBAA, ABYA, MYBA, etc.) but will consider all experienced professionals. A brief qualification discussion is standard.",
  },
  {
    question: "Is the deal flow exclusive to registered brokers?",
    answer:
      "Our off-market opportunities are shared based on matching requirements — brokers who register and are qualified receive relevant introductions for their buyer and seller clients.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Yacht Brokers", item: "https://www.offmarketyachts.com/yacht-brokers" },
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

export default function BrokersPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Yacht Brokers" }]} />
      <PageHero
        h1="Private Off-Market Yacht Deal Flow for Brokers"
        subheadline="Expand your off-market yacht pipeline. Access confidential deal flow, co-brokerage opportunities, and a qualified buyer and seller network — by invitation and approval only."
        ctaLabel="Apply for Broker Access"
        ctaHref="/private-access"
        secondaryCtaLabel="Submit a Client Listing"
        secondaryCtaHref="/submit-yacht"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Broker Cooperation Programme
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#4a5568]">
                OffMarketYachts.com works with qualified yacht brokers to expand
                off-market deal flow for both buyer and seller clients. We operate
                on a co-brokerage basis with transparent commission structures
                agreed before any introduction.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                Registered brokers benefit from access to off-market
                opportunities aligned with their client requirements, plus the
                ability to submit seller clients for confidential representation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Buyer Representation", desc: "Submit qualified buyer clients for off-market introductions" },
                  { title: "Seller Submission", desc: "Represent seller clients confidentially without public exposure" },
                  { title: "Co-Brokerage", desc: "Transparent commission arrangements agreed in advance" },
                  { title: "Confidential Process", desc: "All cooperation handled with full professional discretion" },
                ].map(({ title, desc }) => (
                  <div key={title} className="rounded-lg border border-[#e8ecf0] p-4">
                    <h3 className="mb-1.5 text-sm font-bold text-[#0a1628]">{title}</h3>
                    <p className="text-xs text-[#4a5568]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <BuyerForm title="Apply for Broker Access" />
            </div>
          </div>
        </div>
      </section>

      {/* Broker Protocol */}
      <section className="section bg-[#0a1628]" aria-labelledby="broker-protocol-heading">
        <div className="container-site">
          <div className="mb-10 text-center">
            <h2
              id="broker-protocol-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Broker Cooperation Protocol
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#8b97a5]">
              Our cooperation standards protect all parties and ensure
              professional, structured introductions.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "NDA Required Before Sharing",
                body: "No vessel information, pricing, or principal details are shared without a signed confidentiality agreement. This is non-negotiable.",
              },
              {
                step: "02",
                title: "Commission Agreed Pre-Introduction",
                body: "Co-brokerage commission arrangements are agreed in writing before any introduction is made. Transparent, documented, and enforceable.",
              },
              {
                step: "03",
                title: "Buyer Qualification Mandatory",
                body: "All buyer clients must be qualified and verified before receiving access. Unverified enquiries are not accepted regardless of claimed budget.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-lg border border-[#112040] bg-[#112040] p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a96e]/10 text-sm font-bold text-[#c9a96e]">
                  {step}
                </div>
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-[#8b97a5]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Broker Cooperation FAQs" />
    </>
  );
}
