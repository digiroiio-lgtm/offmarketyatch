import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import SchemaOrg from "@/components/SchemaOrg";
import PrivateAccessForm from "@/components/forms/PrivateAccessForm";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Family Offices | Yacht Acquisition Advisory",
  description:
    "Yacht acquisition advisory for family offices: confidential sourcing, structured diligence, ownership structure considerations and discreet execution.",
  path: "/family-offices",
});

const FAQS = [
  {
    question: "Do you work with the family office rather than the principal?",
    answer:
      "Routinely. A significant share of activity above $10 million runs through a family office or its advisors, and the principal is frequently not involved until a shortlist exists.",
  },
  {
    question: "Can the principal remain unnamed during a search?",
    answer:
      "Through the search and initial negotiation, yes. Identity is generally required at closing for title and anti-money-laundering purposes, and purchases through corporate structures are standard.",
  },
  {
    question: "What ongoing costs should be modelled?",
    answer:
      "Plan on roughly ten percent of purchase price annually as a starting figure — crew, dockage, insurance, fuel, maintenance and a refit reserve — then refine it against the specific vessel, crew complement and usage pattern. Depreciation sits outside that figure and typically exceeds it in the early years.",
  },
  {
    question: "Do you advise on ownership structure?",
    answer:
      "We coordinate with maritime counsel and tax advisors who do. Vessels above roughly $10 million are commonly held in a special purpose company, and transactions are frequently structured as share sales, which changes the diligence materially.",
  },
];

export default function FamilyOfficesPage() {
  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([{ name: "Family Offices", path: "/family-offices" }]),
          faqSchema(FAQS),
        ]}
      />
      <Breadcrumb items={[{ label: "Family Offices" }]} />

      <PageHero
        eyebrow="Family Offices"
        h1="Yacht acquisition, run as an acquisition."
        standfirst="A defined brief, a target universe, structured diligence and discreet execution."
        secondaryCtaLabel="Private Market Intelligence"
        secondaryCtaHref="/private-market-intelligence"
      />

      <section className="section">
        <div className="container-prose prose-editorial">
          <p>
            A yacht purchase above ten million dollars has more in common with a private company
            acquisition than a consumer transaction. There is an asset with staff, a compliance
            calendar, a corporate wrapper, an annual operating budget and a resale market with
            almost no public price data.
          </p>

          <h2>How we structure a mandate</h2>
          <ul>
            <li>
              <strong>Brief.</strong> Length range, hull form, build era and region, cruising
              intent, crew tolerance, purchase budget and — separately — annual operating budget.
            </li>
            <li>
              <strong>Target universe.</strong> Every vessel worldwide that fits, typically ten to
              fifty yachts, whether or not any of them are for sale.
            </li>
            <li>
              <strong>Approach.</strong> Discreet, representative-led contact with owners, giving
              each an easy way to decline. Most will.
            </li>
            <li>
              <strong>Diligence.</strong> Independent survey and machinery specialist, class and
              flag standing, crew contracts, management agreements and — on a share sale — the
              corporate entity itself.
            </li>
            <li>
              <strong>Execution.</strong> Offer subject to survey, deposit in escrow, negotiation
              on findings, closing through counsel.
            </li>
          </ul>

          <h2>Reporting</h2>
          <p>
            Every approach is reported, including the declines. A search that produces three
            serious engagements from thirty approaches has worked as intended, and the record of
            who said no is itself useful — it tells you where the market genuinely is.
          </p>

          <h2>Where we are candid</h2>
          <p>
            Comparable transaction data at this level is poor, because private sales are not
            published. Any valuation is a triangulation, and we will show you the working rather
            than present a number as settled fact.
          </p>
        </div>
      </section>

      <section className="section border-y border-line bg-paper-sunken">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="display text-[30px] text-ink sm:text-[36px]">
                Register an acquisition brief.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
                Five questions to open the file. The detailed brief follows in conversation.
              </p>
            </div>
            <PrivateAccessForm />
          </div>
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={FAQS} />
      </div>

      <FinalCTA />
    </>
  );
}
