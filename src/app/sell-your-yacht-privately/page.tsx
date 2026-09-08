import type { Metadata } from "next";
import Link from "next/link";

import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import SchemaOrg from "@/components/SchemaOrg";
import SellPrivatelyForm from "@/components/forms/SellPrivatelyForm";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sell Your Yacht Privately | Confidential Yacht Sales",
  description:
    "Sell your yacht quietly. Explore buyer demand confidentially before placing your yacht on the public market. Private sale exploration and confidential buyer matching.",
  path: "/sell-your-yacht-privately",
});

const FAQS = [
  {
    question: "Will my yacht be listed publicly?",
    answer:
      "No. Nothing is published, circulated or advertised as a result of contacting us. If we later agree that a public listing is the right route, that is a separate decision you make explicitly.",
  },
  {
    question: "Will you tell me what my yacht is worth?",
    answer:
      "Not from a form. Any view we give on value comes from a person, after seeing the specification, the maintenance history and the recent comparable transactions we have visibility of. We will not put a number on a yacht we have not examined.",
  },
  {
    question: "Do you already have a buyer for my yacht?",
    answer:
      "We will only say we have a buyer if we genuinely do. Frequently the honest answer is that we hold criteria from buyers whose parameters your yacht fits, which is not the same thing, and we will describe it in those terms.",
  },
  {
    question: "What does a private sale cost?",
    answer:
      "Commission arrangements are agreed in writing before any engagement, and depend on the vessel and the scope of work. There is no cost to have the initial conversation.",
  },
  {
    question: "Can I test the private market and still list publicly later?",
    answer:
      "Yes, and it is a common sequence. Testing privately first costs you nothing in market exposure, because nothing has been exposed. Doing it the other way round is not reversible — once a yacht has been listed, that listing history exists.",
  },
  {
    question: "Will my crew find out?",
    answer:
      "Not from us. We do not contact your captain, crew, marina or management company without your explicit instruction.",
  },
];

export default function SellPrivatelyPage() {
  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([
            { name: "Sell Your Yacht Privately", path: "/sell-your-yacht-privately" },
          ]),
          faqSchema(FAQS),
        ]}
      />
      <Breadcrumb items={[{ label: "Sell Your Yacht Privately" }]} />

      <section className="relative overflow-hidden bg-deal-room">
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <div className="container-site relative py-16 lg:py-24">
          <p className="label-mono text-accent">Considering Selling Your Yacht?</p>
          <h1 className="display mt-6 max-w-3xl text-[44px] text-ink-inverse sm:text-[60px]">
            Sell quietly.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-inverse-muted">
            Explore buyer demand without immediately placing your yacht on the public market.
          </p>
          <Link href="#enquiry" className="btn-primary mt-9">
            Discuss a Private Sale
          </Link>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-site">
          <div className="max-w-[760px] prose-editorial">
            <p>
              A public listing is not a neutral act. The moment a yacht appears on a marketplace,
              the information reaches people who are not buyers: the crew, who start considering
              their next position; the charter brokers, who stop placing bookings on a vessel that
              may change hands; and every yard and supplier you will negotiate with for the rest
              of the ownership.
            </p>
            <p>
              It also starts a clock. A listing that sits for eight months tells the market
              something, whether or not it is true, and that impression follows the yacht into
              every subsequent negotiation.
            </p>
            <p>
              Testing the private market first costs you none of that. Your yacht is described to
              a defined set of qualified buyers rather than advertised to everyone, and if nothing
              comes of it you have lost nothing — no listing history, no price reductions, no
              market memory.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight border-y border-line bg-paper-sunken">
        <div className="container-site">
          <div className="grid gap-9 lg:grid-cols-3">
            {[
              {
                title: "Private sale exploration",
                body: "We establish whether there is genuine demand at a level you would transact at, before you commit to anything public.",
              },
              {
                title: "Confidential buyer matching",
                body: "Your yacht is presented in masked form to buyers whose registered criteria it fits. Identity is released on your terms.",
              },
              {
                title: "No unnecessary public exposure",
                body: "No portal listing, no advertised price, no public price history. Nothing that outlives the conversation.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h2 className="text-[18px] font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="section">
        <div className="container-site">
          <SellPrivatelyForm />
        </div>
      </section>

      <section className="section-tight defer-render bg-paper-sunken">
        <div className="container-site">
          <h2 className="display mb-9 text-[30px] text-ink sm:text-[34px]">
            What owners ask first
          </h2>
          <div className="grid gap-9 lg:grid-cols-2">
            <AnswerBlock
              as="h3"
              question="How do you sell a yacht without listing it?"
              answer="By describing the vessel in masked form to buyers whose registered acquisition criteria it matches, and disclosing its identity only to those who qualify and agree to appropriate terms. The transaction itself — offer, survey, sea trial, closing — is identical to a public sale."
            />
            <AnswerBlock
              as="h3"
              question="Is a private sale slower than a public listing?"
              answer="Not necessarily. A public listing reaches more people, but most of them are not buyers. A private approach reaches fewer people, all of whom have stated a matching requirement. Where the price is realistic, private sales frequently move faster."
            />
            <AnswerBlock
              as="h3"
              question="Do private sales achieve lower prices?"
              answer="There is no evidence that they systematically do. What a private sale avoids is the downward pressure that builds when a yacht has been visibly unsold for months, which is where a large share of public-listing price erosion actually comes from."
            />
            <AnswerBlock
              as="h3"
              question="What do you need from me to start?"
              answer="Type, length, year, builder, current location, and a realistic view of value and timing. That is enough for a first conversation. Full specification, survey history and imagery come later, once you have decided to proceed."
            />
          </div>
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={FAQS} heading="Selling privately — common questions" />
      </div>
    </>
  );
}
