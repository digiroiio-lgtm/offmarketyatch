import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Private Yacht Acquisition Support for Family Offices",
  description:
    "Discreet yacht acquisition support for family offices and wealth management advisors. Private introductions, NDA-governed transactions, and full confidentiality for UHNW principals.",
  keywords: ["family office yacht acquisition", "UHNW yacht purchase", "private yacht advisory family office"],
  alternates: {
    canonical: "https://www.offmarketyachts.com/family-offices",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/family-offices",
    title: "Private Yacht Acquisition Support for Family Offices",
    description: "Discreet yacht acquisition for family offices and UHNW principals.",
  },
};

const faqItems = [
  {
    question: "How do you support family office yacht acquisitions?",
    answer:
      "We provide private access to off-market opportunities, coordinate with legal and advisory teams, facilitate NDA-based due diligence, and support confidential negotiations — all with full discretion.",
  },
  {
    question: "Can you work with our existing legal and advisory team?",
    answer:
      "Yes. We regularly coordinate with family office legal counsel, asset advisors, and management teams to ensure a smooth and discreet acquisition process.",
  },
  {
    question: "Do you handle superyacht acquisitions for family offices?",
    answer:
      "Yes. Our primary focus for family office clients is the superyacht and significant motor yacht segment (typically $5M+). All introductions are handled with full confidentiality.",
  },
  {
    question: "Is the identity of the purchasing principal protected?",
    answer:
      "Absolutely. Buyer identity protection is a priority for all family office clients. We never disclose principal identity without explicit authorisation.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Family Offices", item: "https://www.offmarketyachts.com/family-offices" },
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

export default function FamilyOfficesPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema, faqSchema]} />
      <Breadcrumb items={[{ label: "Family Offices" }]} />
      <PageHero
        h1="Private Yacht Acquisition Support for Family Offices"
        subheadline="Discreet, confidential yacht acquisition services for family offices and UHNW principals. Principal identity protected. NDA-standard process throughout."
        ctaLabel="Request Family Office Consultation"
        ctaHref="/private-access"
        secondaryCtaLabel="Contact Us"
        secondaryCtaHref="/contact"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Family Office Advisory Services
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#4a5568]">
                Family offices and wealth management advisors require a different
                level of discretion and service when managing luxury marine asset
                acquisitions. We understand the confidentiality requirements,
                legal structures, and principal protection protocols involved.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                Our team coordinates with family office legal counsel, asset
                managers, and advisors to facilitate private introductions,
                manage NDA processes, and support confidential negotiations
                without principal exposure.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Principal Identity Protection",
                    body: "Buyer identity is never disclosed without explicit authorisation. All principal information is handled under confidentiality protocols.",
                  },
                  {
                    title: "Legal Team Coordination",
                    body: "We coordinate directly with your legal counsel, trustees, and advisory team throughout the acquisition process.",
                  },
                  {
                    title: "Holding Structure Compatibility",
                    body: "We are experienced with acquisitions through BVI, Cayman, and other offshore holding structures. Compliance and flag registry guidance available.",
                  },
                  {
                    title: "Post-Acquisition Advisory",
                    body: "Introductions to management companies, crew agencies, and flag administrators available upon request.",
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="flex gap-4">
                    <span className="mt-1 shrink-0 text-[#c9a96e]">✓</span>
                    <div>
                      <h3 className="font-bold text-[#0a1628]">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <BuyerForm title="Request Family Office Consultation" />
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Family Office FAQs" />
    </>
  );
}
