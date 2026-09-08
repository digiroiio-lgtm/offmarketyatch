import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import SchemaOrg from "@/components/SchemaOrg";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Broker Cooperation | Off-Market Yacht Introductions",
  description:
    "Cooperation for yacht brokers holding unadvertised mandates or representing qualified buyers. Masked presentation, standard co-brokerage terms.",
  path: "/yacht-brokers",
});

const FAQS = [
  {
    question: "How does co-brokerage work here?",
    answer:
      "On standard industry terms, agreed in writing before any introduction. Where you hold the mandate, you remain the central agent and we represent the buyer; where we hold it, the reverse. Commission splits are settled before disclosure, not after.",
  },
  {
    question: "Will my mandate be published?",
    answer:
      "Only in the masked form you authorise, and only if you want it published at all. Many cooperating mandates are held privately and matched against registered buyer criteria without any public entry.",
  },
  {
    question: "Do you contact owners directly?",
    answer:
      "Not on a vessel where another broker holds a mandate. Where a buyer instructs a retained search and a target vessel turns out to be represented, we approach the broker rather than the owner.",
  },
  {
    question: "What buyer information will you share?",
    answer:
      "Enough to establish that the buyer is genuine and qualified — budget, size, timeline and position — without naming them until they agree to be named. The same discretion we extend to owners applies to buyers.",
  },
];

export default function BrokerCooperationPage() {
  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([{ name: "Broker Cooperation", path: "/yacht-brokers" }]),
          faqSchema(FAQS),
        ]}
      />
      <Breadcrumb items={[{ label: "Broker Cooperation" }]} />

      <PageHero
        eyebrow="For Brokers"
        h1="Cooperation, on standard terms."
        standfirst="For brokers holding unadvertised mandates, and those representing buyers."
        ctaLabel="Get in Touch"
        ctaHref="/contact"
        secondaryCtaLabel="Browse the Private Market"
        secondaryCtaHref="/off-market-yachts"
      />

      <section className="section">
        <div className="container-prose prose-editorial">
          <h2>If you hold a mandate</h2>
          <p>
            We maintain registered acquisition criteria from qualified buyers across the US,
            Caribbean and Mediterranean markets. If you are holding a vessel privately at the
            owner&rsquo;s request, we can match it against those criteria without publishing
            anything.
          </p>
          <p>
            Where you do want a public entry, it appears in masked form under a reference number,
            attributed as broker-sourced, with the disclosure boundary you specify.
          </p>

          <h2>If you represent a buyer</h2>
          <p>
            Enquire against any published reference on behalf of your client. Cooperation terms
            are agreed before disclosure, and your client relationship is yours — we do not
            approach a buyer introduced by another broker.
          </p>

          <h2>What we ask</h2>
          <ul>
            <li>
              That a mandate described as off-market genuinely is one, with the seller position
              confirmed and attributable.
            </li>
            <li>
              That availability claims are accurate. We label unconfirmed entries as potential
              opportunities and expect the same candour in return.
            </li>
            <li>
              That commission arrangements are settled in writing before an introduction, not
              renegotiated after one.
            </li>
          </ul>
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={FAQS} />
      </div>

      <FinalCTA
        title="Have a mandate that should not be advertised?"
        body="We can match it against registered buyer criteria without publishing anything at all."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
      />
    </>
  );
}
