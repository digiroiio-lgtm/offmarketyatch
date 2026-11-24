import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import BrokerIntakeForm from "@/components/forms/BrokerIntakeForm";
import BrokerRequirementForm from "@/components/forms/BrokerRequirementForm";
import PageHero from "@/components/PageHero";
import SchemaOrg from "@/components/SchemaOrg";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Broker Cooperation | Off-Market Yacht Introductions",
  description:
    "For yacht brokers: submit a client's requirement, share a yacht privately, or agree cooperation terms. Masked presentation, standard co-brokerage terms.",
  path: "/yacht-brokers",
});

const PATHS = [
  {
    label: "Submit a client requirement",
    body: "Your client wants a yacht that is not on the market. Send the brief — yard, size, real budget ceiling, timeline — and we match it privately.",
    href: "#requirement",
  },
  {
    label: "Share a yacht privately",
    body: "You hold a mandate or can reach an owner. Submit the vessel; nothing is published or shared until you approve it.",
    href: "#submit",
  },
  {
    label: "Discuss cooperation",
    body: "Agree how we work together before there is a specific deal: splits, representation and disclosure.",
    href: "/contact",
  },
];

const FAQS = [
  {
    question: "What happens after I submit a client requirement?",
    answer:
      "We review it against vessels held privately by us and by cooperating brokers, and against yachts the network knows to be quietly available. We reply to you, not to your client. Your client is not named and not contacted, and terms are agreed in writing before any vessel is identified.",
  },
  {
    question: "What happens after I submit a vessel?",
    answer:
      "Your submission is held privately and we verify your firm and your authority over the vessel. Nothing is published, matched or shared at that point. Internal matching, a masked public entry and disclosure of identity are each approved separately, with the evidence recorded, and each can be withdrawn.",
  },
  {
    question: "Does submitting a vessel give you permission to share it?",
    answer:
      "No. The permissions on the form are requests. We act on a permission only after we have verified your authority and recorded a separate approval for it.",
  },
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
        ctaLabel="Submit a Client Requirement"
        ctaHref="#requirement"
        secondaryCtaLabel="Share a Yacht Privately"
        secondaryCtaHref="#submit"
      />

      <section className="section-tight border-b border-line" aria-labelledby="broker-paths">
        <div className="container-site">
          <h2 id="broker-paths" className="label-mono mb-6 text-accent">
            Three ways to work with us
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {PATHS.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group flex flex-col border border-line-strong bg-paper-raised p-6 transition-colors hover:border-ink"
              >
                <span className="text-[18px] font-semibold text-ink group-hover:text-accent">
                  {path.label} →
                </span>
                <span className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                  {path.body}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
            Most of what we hold is never published, so the useful step is to{" "}
            <a href="#requirement">submit your client&rsquo;s requirement</a>: the yard if it is
            firm, the length, the real budget ceiling and the timeline. We match it privately
            and reply to you. You can also enquire against any{" "}
            <Link href="/off-market-yachts">published reference</Link> on your client&rsquo;s
            behalf.
          </p>
          <p>
            Cooperation terms are agreed before disclosure, and your client relationship is
            yours — we do not approach a buyer introduced by another broker.
          </p>

          <h2>What happens to a submission</h2>
          <ol>
            <li>
              It is held privately. Nothing is published, matched or shared because a form was
              submitted.
            </li>
            <li>
              We verify your firm and your authority over the vessel: credentials, representation
              status and mandate evidence.
            </li>
            <li>
              Three permissions are approved separately and recorded against your submission:
              private matching against registered buyer criteria, a masked public entry, and
              disclosure of identity to a qualified buyer. Each can be withdrawn.
            </li>
            <li>Terms are agreed in writing before any introduction.</li>
          </ol>

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

      <section className="section-tight bg-paper-sunken">
        <div className="container-site space-y-10">
          <BrokerRequirementForm />
          <BrokerIntakeForm />
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={FAQS} />
      </div>

      <FinalCTA
        title="A client brief, or a mandate that should not be advertised?"
        body="We match both privately, without publishing anything at all."
        primaryLabel="Submit a Client Requirement"
        primaryHref="#requirement"
        secondaryLabel="Share a Yacht Privately"
        secondaryHref="#submit"
      />
    </>
  );
}
