import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for OffMarketYachts.com — a private lead-generation and advisory platform.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/terms",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Terms of Use", item: "https://www.offmarketyachts.com/terms" },
  ],
};

export default function TermsPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema]} />
      <Breadcrumb items={[{ label: "Terms of Use" }]} />
      <section className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold text-[#0a1628]">
              Terms of Use
            </h1>
            <p className="mb-4 text-sm text-[#4a5568]">
              Last updated: {new Date().getFullYear()}
            </p>

            <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
              These Terms of Use govern your access to and use of the
              OffMarketYachts.com website and services. By accessing or using
              our platform, you agree to be bound by these terms.
            </p>

            {[
              {
                title: "1. Platform Description",
                body: 'OffMarketYachts.com is a private lead-generation and advisory platform. We facilitate private introductions between qualified buyers, yacht owners, owner representatives, and licensed brokers. We are not a licensed yacht brokerage. Yacht availability, pricing, and specifications are subject to verification and owner approval.',
              },
              {
                title: "2. Eligibility",
                body: "Access to our platform and services is limited to individuals and entities who represent qualified buyers, vessel owners, owner representatives, licensed yacht brokers, or family office advisors. We reserve the right to deny access to any request at our sole discretion.",
              },
              {
                title: "3. Confidentiality",
                body: "All information shared through our platform — including vessel details, buyer profiles, and transaction discussions — is considered confidential. Users agree not to share, publish, or distribute any information received through our platform without explicit written consent.",
              },
              {
                title: "4. No Warranty",
                body: "OffMarketYachts.com makes no representations or warranties regarding the accuracy, completeness, or availability of any yacht opportunity, vessel specification, or pricing information shared through our platform. All information is provided for introductory purposes only.",
              },
              {
                title: "5. Limitation of Liability",
                body: "To the maximum extent permitted by applicable law, OffMarketYachts.com shall not be liable for any direct, indirect, incidental, or consequential damages arising from use of our platform or reliance on information provided therein.",
              },
              {
                title: "6. Changes to Terms",
                body: "We reserve the right to update these Terms of Use at any time. Continued use of the platform following any changes constitutes acceptance of the updated terms.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="mb-6">
                <h2 className="mb-2 text-base font-bold text-[#0a1628]">
                  {title}
                </h2>
                <p className="text-sm leading-relaxed text-[#4a5568]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
