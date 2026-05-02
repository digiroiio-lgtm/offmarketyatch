import type { Metadata } from "next";
import Link from "next/link";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import TrustBadges from "@/components/TrustBadges";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Buy Off-Market Yachts Before They Reach the Public Market",
  description:
    "Access off-market yachts and superyachts before public listing. Qualified buyers receive private introductions, NDA-governed documentation, and discreet access to owner representatives.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/buy-off-market-yachts",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/buy-off-market-yachts",
    title: "Buy Off-Market Yachts Before They Reach the Public Market",
    description:
      "Access off-market yachts and superyachts before public listing. Qualified buyer access.",
  },
};

const faqItems = [
  {
    question: "How do I access off-market yacht listings?",
    answer:
      "Submit a buyer access request through our form. We conduct a brief review to qualify buyers, then facilitate private introductions based on your stated requirements and budget.",
  },
  {
    question: "What budget range do off-market yachts typically cover?",
    answer:
      "Our off-market yacht opportunities range from approximately $500K to over $50M. The majority of our opportunities are in the $2M–$25M range, with regular superyacht opportunities above $10M.",
  },
  {
    question: "How long does the buyer qualification process take?",
    answer:
      "Typically 24–48 hours. Once qualified, you will receive private introductions to relevant opportunities matching your stated requirements.",
  },
  {
    question: "Can I bring my own broker?",
    answer:
      "Yes. We support broker-represented buyers and facilitate co-brokerage arrangements where applicable. Please indicate in your access request if you are represented.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Buy Off-Market Yachts", item: "https://www.offmarketyachts.com/buy-off-market-yachts" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Buyer Access – Off-Market Yachts",
  provider: { "@type": "Organization", name: "OffMarketYachts.com", url: "https://www.offmarketyachts.com" },
  description: "Private access to off-market yachts and superyachts for qualified buyers. NDA-governed introductions and owner-side representation.",
  url: "https://www.offmarketyachts.com/buy-off-market-yachts",
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

export default function BuyPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Buy Off-Market Yachts" }]} />
      <PageHero
        h1="Buy Off-Market Yachts Before They Reach the Public Market"
        subheadline="Access private yacht opportunities not available through public brokerages. Qualified buyer introductions, NDA-governed documentation, and discreet transactions."
        ctaLabel="Request Buyer Access"
        ctaHref="/private-access"
        secondaryCtaLabel="View Yacht Types"
        secondaryCtaHref="/off-market-superyachts"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                How Buyer Access Works
              </h2>
              <ol className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Submit Your Requirements",
                    body: "Complete the private buyer access form with your budget range, yacht type preferences, region, and timeline.",
                  },
                  {
                    step: "02",
                    title: "Private Qualification Review",
                    body: "Our team reviews your request within 24 hours. This step ensures appropriate and qualified introductions for all parties.",
                  },
                  {
                    step: "03",
                    title: "Receive Private Introductions",
                    body: "Qualified buyers receive introductions to off-market opportunities matching their requirements. NDA-based documentation sharing is standard.",
                  },
                  {
                    step: "04",
                    title: "Discreet Transaction Support",
                    body: "We support the transaction process from introduction through to completion, coordinating with owner representatives and brokers.",
                  },
                ].map(({ step, title, body }) => (
                  <li key={step} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a96e]/10 text-sm font-bold text-[#c9a96e]">
                      {step}
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-[#0a1628]">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <BuyerForm title="Request Private Buyer Access" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f5f7fa]">
        <div className="container-site">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#0a1628]">
              What You Can Access Off-Market
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/off-market-superyachts", title: "Superyachts", desc: "30m+ superyachts through private channels" },
              { href: "/off-market-motor-yachts", title: "Motor Yachts", desc: "Private motor yacht acquisition opportunities" },
              { href: "/off-market-catamarans", title: "Catamarans", desc: "Luxury multihull and catamaran opportunities" },
              { href: "/off-market-trimarans", title: "Trimarans", desc: "Specialist trimaran and performance multihulls" },
            ].map(({ href, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-lg border border-[#e8ecf0] bg-white p-5 shadow-sm transition hover:border-[#c9a96e]"
              >
                <h3 className="mb-1.5 font-bold text-[#0a1628] transition group-hover:text-[#c9a96e]">
                  {title}
                </h3>
                <p className="text-sm text-[#4a5568]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-narrow bg-[#0a1628]">
        <div className="container-site text-center">
          <TrustBadges dark />
        </div>
      </section>

      <FAQSection items={faqItems} title="Buyer Access FAQs" />
    </>
  );
}
