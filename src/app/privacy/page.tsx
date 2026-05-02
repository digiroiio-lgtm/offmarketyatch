import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for OffMarketYachts.com — how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/privacy",
  },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <section className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold text-[#0a1628]">
              Privacy Policy
            </h1>
            <p className="mb-4 text-sm text-[#4a5568]">
              Last updated: {new Date().getFullYear()}
            </p>

            <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
              OffMarketYachts.com is committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your personal
              information when you use our platform.
            </p>

            {[
              {
                title: "1. Information We Collect",
                body: "We collect personal information that you voluntarily provide through our forms, including name, email address, phone number, and details relevant to yacht acquisition or sale enquiries. We do not collect payment information.",
              },
              {
                title: "2. How We Use Your Information",
                body: "Information you provide is used solely to facilitate private introductions and to respond to your enquiries. We do not use your information for marketing without consent, and we do not sell your data to third parties.",
              },
              {
                title: "3. Confidentiality",
                body: "All personal information submitted through our platform is treated as strictly confidential. Buyer and seller information is shared only with the relevant counterparty on an introduction basis, and only when appropriate confidentiality protections are in place.",
              },
              {
                title: "4. Data Retention",
                body: "We retain personal information for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. You may request deletion of your data at any time by contacting us.",
              },
              {
                title: "5. Third-Party Services",
                body: "Our website may use third-party services such as analytics providers. These services may collect anonymised usage data. We do not share identifiable personal information with analytics providers.",
              },
              {
                title: "6. Your Rights",
                body: "Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. To exercise these rights, please contact us through our Contact page.",
              },
              {
                title: "7. Cookies",
                body: "Our website may use cookies for functional and analytical purposes. You can control cookie settings through your browser. Strictly necessary cookies cannot be disabled as they are required for the website to function.",
              },
              {
                title: "8. Contact",
                body: "For privacy-related enquiries, please contact us through our Contact page at offmarketyachts.com/contact.",
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
