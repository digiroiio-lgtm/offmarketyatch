import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import SchemaOrg from "@/components/SchemaOrg";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Owner Representation | Yacht Sale Advisory",
  description:
    "Owner representation for confidential yacht sales. Test buyer demand privately, control disclosure, and decide whether a public listing is warranted at all.",
  path: "/owner-representation",
});

const FAQS = [
  {
    question: "What does owner representation involve?",
    answer:
      "Acting for the owner throughout a sale: establishing a realistic view of value, deciding what may be disclosed and to whom, qualifying buyers before disclosure, managing viewings and survey access, and negotiating terms. On a private sale it also means controlling who learns the yacht is available.",
  },
  {
    question: "Do I have to commit to selling to engage you?",
    answer:
      "No. A common first step is a private demand assessment: we describe the yacht in masked form to buyers whose registered criteria it matches and report back on genuine interest. Nothing is published and you are free to do nothing with the result.",
  },
  {
    question: "Will you value my yacht?",
    answer:
      "We will give you a considered view once we have seen the specification, the maintenance history and the refit position. We will not put a number on a yacht from a form, and where a formal valuation is needed, an accredited surveyor provides it.",
  },
  {
    question: "How is confidentiality maintained during a sale?",
    answer:
      "By controlling disclosure in stages. The yacht is described without identifying attributes, buyers are qualified before the name is released, and where required, disclosure is made under written terms. Your crew, marina and management are not contacted without your instruction.",
  },
];

export default function OwnerRepresentationPage() {
  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([{ name: "Owner Representation", path: "/owner-representation" }]),
          faqSchema(FAQS),
        ]}
      />
      <Breadcrumb items={[{ label: "Owner Representation" }]} />

      <PageHero
        eyebrow="For Owners"
        h1="Owner representation, without the public listing."
        standfirst="Control who learns your yacht is available, and when."
        ctaLabel="Discuss a Private Sale"
        ctaHref="/sell-your-yacht-privately"
        secondaryCtaLabel="Contact Us"
        secondaryCtaHref="/contact"
      />

      <section className="section">
        <div className="container-prose prose-editorial">
          <p>
            Most owners come to a sale decision privately and then face a binary choice: list the
            yacht publicly, or do nothing. Representation exists to give you a third option — find
            out what the market would actually pay before anyone knows you are asking.
          </p>

          <h2>The sequence we recommend</h2>
          <ul>
            <li>
              <strong>Establish a realistic view of value.</strong> Comparable transactions,
              current asking prices adjusted for the typical gap to completion, and the yacht&rsquo;s
              refit position.
            </li>
            <li>
              <strong>Define disclosure.</strong> What may be published, at what granularity, and
              what is withheld until a buyer qualifies. You set this, not us.
            </li>
            <li>
              <strong>Test demand privately.</strong> The yacht is described in masked form to
              buyers whose criteria it matches. Interest is reported back to you.
            </li>
            <li>
              <strong>Decide.</strong> Proceed privately with the interest that exists, hold, or
              move to a public listing having lost nothing.
            </li>
          </ul>

          <h2>What a public listing costs you</h2>
          <p>
            It is not only the commission. A visible listing tells your captain to start looking
            for another position, tells charter brokers to stop placing bookings, and tells every
            yard and supplier you negotiate with that you are exiting.
          </p>
          <p>
            It also creates a record. A yacht that has been visibly for sale for eight months
            carries that history into every subsequent conversation, whatever the reason for the
            delay.
          </p>

          <h2>What we will not promise</h2>
          <p>
            That we have a buyer, unless we do. That your yacht is worth a figure we have not
            justified. That a private sale will achieve more than a public one — there is no
            reliable evidence either way, and anyone claiming otherwise is selling you something.
          </p>
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={FAQS} />
      </div>

      <FinalCTA
        title="Test the private market first."
        body="Nothing is published, circulated or listed as a result of a conversation."
        primaryLabel="Discuss a Private Sale"
        primaryHref="/sell-your-yacht-privately"
        secondaryLabel="Browse the Private Market"
      />
    </>
  );
}
