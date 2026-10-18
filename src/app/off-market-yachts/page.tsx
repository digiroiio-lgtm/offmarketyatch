import type { Metadata } from "next";
import Link from "next/link";

import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import MarketExplorer from "@/components/MarketExplorer";
import OpportunityTicker from "@/components/OpportunityTicker";
import SampleInventoryNotice from "@/components/SampleInventoryNotice";
import SchemaOrg from "@/components/SchemaOrg";
import { getInventoryStats, getOpportunities } from "@/lib/opportunities";
import {
  breadcrumbSchema,
  faqSchema,
  opportunityListSchema,
  pageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Off-Market Yachts | Private Marketplace",
  description:
    "Browse confidential off-market yacht opportunities. Masked listings across the USA, Florida, Bahamas, Caribbean and Mediterranean; detail for qualified buyers.",
  path: "/off-market-yachts",
});

const FAQS = [
  {
    question: "Why can't I see the yacht's name?",
    answer:
      "Because these yachts are off-market. Publishing the name would identify the vessel to the industry and defeat the confidentiality the owner is relying on. The name is disclosed to qualified buyers under appropriate terms before any offer is made.",
  },
  {
    question: "What does the reference number mean?",
    answer:
      "Each opportunity carries a stable public reference such as OMY-1048. It lets you return to an opportunity, discuss it with an advisor and enquire against it without ever needing the yacht's identity.",
  },
  {
    question: "What is the difference between the availability labels?",
    answer:
      "Verified off-market means a person has confirmed the seller position with the owner or their representative. Private listing means the owner has authorised a private sale. Broker-sourced means a cooperating broker holds the mandate. Potential opportunity means no mandate exists and availability is unconfirmed.",
  },
  {
    question: "Is the price band the asking price?",
    answer:
      "It is the range within which the owner has indicated a transaction is realistic, published at the granularity they have authorised. It is not a quote and not a valuation. Where no range appears, the owner has asked that price be discussed rather than published.",
  },
  {
    question: "Do the images show the actual yacht?",
    answer:
      "Only where the card says so. Where no authorised photography exists for publication, we render a generated profile study of the class and label it as such. We never present a stock photograph of a similar yacht as though it were the vessel.",
  },
];

export default function MarketplacePage() {
  const all = getOpportunities({ sort: "recent" });
  const stats = getInventoryStats();

  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([{ name: "Off-Market Yachts", path: "/off-market-yachts" }]),
          faqSchema(FAQS),
          opportunityListSchema(all, "Off-Market Yacht Opportunities"),
        ]}
      />

      <Breadcrumb items={[{ label: "Off-Market Yachts" }]} />

      <section className="relative overflow-hidden bg-deal-room">
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <div className="container-wide relative py-12 lg:py-16">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="signal-dot h-1.5 w-1.5 rounded-full bg-signal" />
            <p className="label-mono text-ink-inverse-muted">Private Market — Active</p>
          </div>

          <h1 className="display mt-5 max-w-4xl text-[38px] text-ink-inverse sm:text-[54px]">
            The private market, in full.
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-inverse-muted">
            Every confidential opportunity currently published, masked to the level each owner has
            authorised. Filter by price band, length, cruising area, class and build region.
          </p>

          {stats.total > 0 && (
            <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-px border border-deal-room-line bg-deal-room-line sm:grid-cols-4">
              {[
                { term: "Published", value: stats.total },
                { term: "United States", value: stats.usa },
                { term: "Florida & Bahamas", value: stats.florida },
                { term: "Added this month", value: stats.newThisMonth },
              ].map((stat) => (
                <div key={stat.term} className="bg-deal-room px-5 py-5">
                  <dt className="label-mono text-ink-faint">{stat.term}</dt>
                  <dd className="mt-2 font-mono text-[26px] tabular-nums text-ink-inverse">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 max-w-3xl">
            <SampleInventoryNotice onDark />
          </div>
        </div>
      </section>

      <OpportunityTicker opportunities={all.slice(0, 8)} />

      <section className="section" aria-labelledby="explore-heading">
        <div className="container-wide">
          <h2 id="explore-heading" className="sr-only">
            Search and filter opportunities
          </h2>
          <MarketExplorer opportunities={all} />
        </div>
      </section>

      <section
        className="section-tight defer-render border-t border-line bg-paper-sunken"
        aria-labelledby="reading-heading"
      >
        <div className="container-site">
          <h2 id="reading-heading" className="display mb-9 text-[30px] text-ink sm:text-[34px]">
            How to read a masked opportunity
          </h2>
          <div className="grid gap-9 lg:grid-cols-2">
            <AnswerBlock
              as="h3"
              question="What is published, and what is held back?"
              answer="Published: class, approximate length, year, refit year, build region, hull material, guest and cabin count, cruising area and an estimated asking range. Held back: yacht name, shipyard, exact asking price, full specification, current position, additional photography and broker or seller contact."
            />
            <AnswerBlock
              as="h3"
              question="Why is the length shown as a range on some listings?"
              answer="Because an exact length identifies a vessel almost as reliably as its name. Where an owner has requested full confidentiality, we publish a band such as 150–165 ft instead of the precise figure, and the exact number stays on the server."
            />
            <AnswerBlock
              as="h3"
              question="What does 'potential opportunity' mean?"
              answer="It means we hold no seller mandate on that vessel and availability is not confirmed. The entry is market research, not a listing. Our acquisition team can investigate privately on behalf of a qualified buyer, and will report back honestly on the answer."
            />
            <AnswerBlock
              as="h3"
              question="Does submitting a request unlock the details?"
              answer="No. A person reviews every request against the owner's disclosure terms before anything confidential is shared. An email address alone does not release a yacht's identity, price or position."
            />
          </div>

          <p className="mt-10 text-[15px] text-ink-muted">
            More on how this market works in{" "}
            <Link
              href="/private-market-intelligence"
              className="text-ink underline decoration-accent underline-offset-4 hover:text-accent"
            >
              Private Market Intelligence
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={FAQS} heading="Questions about masked listings" />
      </div>

      <FinalCTA />
    </>
  );
}
