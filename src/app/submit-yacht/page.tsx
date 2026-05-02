import type { Metadata } from "next";
import SellerForm from "@/components/SellerForm";
import TrustBadges from "@/components/TrustBadges";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Submit an Off-Market Yacht Opportunity",
  description:
    "Submit your yacht for confidential off-market review. No public listing exposure. Accepted from direct owners, owner representatives, and licensed brokers.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/submit-yacht",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/submit-yacht",
    title: "Submit an Off-Market Yacht Opportunity",
    description: "Confidential yacht submission. No public listing exposure.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Submit Yacht", item: "https://www.offmarketyachts.com/submit-yacht" },
  ],
};

export default function SubmitYachtPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema]} />
      <Breadcrumb items={[{ label: "Submit Yacht" }]} />
      <PageHero
        h1="Submit an Off-Market Yacht Opportunity"
        subheadline="Submit your vessel for confidential review. No public listing exposure without your explicit consent. Accepted from owners, owner representatives, and licensed brokers."
        ctaLabel="Submit Now"
        ctaHref="#submit-form"
      />

      <section id="submit-form" className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 rounded-lg border border-[#e8ecf0] bg-[#f5f7fa] p-5 text-sm text-[#4a5568]">
              <strong className="font-semibold text-[#0a1628]">Accepted Submissions:</strong>{" "}
              We accept vessel submissions from direct owners, owner
              representatives (attorneys, advisors), licensed yacht brokers,
              and authorised family office representatives. All submissions
              are reviewed privately.
            </div>
            <SellerForm title="Submit an Off-Market Yacht" />
          </div>
        </div>
      </section>

      <section className="section-narrow bg-[#f5f7fa]">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-xl font-bold text-[#0a1628]">
              What Happens After Submission?
            </h2>
            <ol className="space-y-4 text-left">
              {[
                "Your submission is received and reviewed privately within 24 hours.",
                "Our team verifies the submission and may request additional documentation.",
                "If suitable, we match your vessel with qualified buyers from our network.",
                "Introductions are made under NDA. No public exposure at any stage.",
                "You maintain full control over pricing, terms, and information sharing.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-[#4a5568]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a96e]/10 text-xs font-bold text-[#c9a96e]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-narrow bg-white">
        <div className="container-site text-center">
          <TrustBadges />
        </div>
      </section>
    </>
  );
}
