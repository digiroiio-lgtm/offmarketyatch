import type { Metadata } from "next";
import BuyerForm from "@/components/BuyerForm";
import TrustBadges from "@/components/TrustBadges";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Apply for Access to Private Yacht Opportunities",
  description:
    "Apply for private access to off-market yacht opportunities. Qualified buyers, family offices, and yacht brokers can apply for consideration. Access is selective and subject to review.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/private-access",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/private-access",
    title: "Apply for Access to Private Yacht Opportunities",
    description: "Apply for private access to off-market yacht opportunities. Access subject to approval.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Private Access", item: "https://www.offmarketyachts.com/private-access" },
  ],
};

export default function PrivateAccessPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema]} />
      <Breadcrumb items={[{ label: "Private Access" }]} />
      <PageHero
        h1="Apply for Access to Private Yacht Opportunities"
        subheadline="Apply for consideration. Access is selective — we do not accept all requests. Approved principals receive controlled introductions to off-market opportunities."
        ctaLabel="Apply Below"
        ctaHref="#access-form"
      />

      <section id="access-form" className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 rounded-lg border border-[#c9a96e]/20 bg-[#0a1628] px-5 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
                Access is Selective — Not All Applications are Approved
              </p>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: "🔍", label: "Qualified Buyers", desc: "UHNW individuals and family offices" },
                { icon: "📋", label: "Yacht Brokers", desc: "Licensed and accredited professionals" },
                { icon: "🏦", label: "Family Offices", desc: "Institutional and wealth management" },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="rounded-lg border border-[#e8ecf0] bg-[#f5f7fa] p-4 text-center">
                  <div className="mb-2 text-2xl">{icon}</div>
                  <div className="text-sm font-bold text-[#0a1628]">{label}</div>
                  <div className="text-xs text-[#4a5568]">{desc}</div>
                </div>
              ))}
            </div>
            <BuyerForm title="Apply for Private Access" />
          </div>
        </div>
      </section>

      <section className="section-narrow bg-[#f5f7fa]">
        <div className="container-site text-center">
          <TrustBadges />
        </div>
      </section>
    </>
  );
}
