import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import SchemaOrg from "@/components/SchemaOrg";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About | The Private Side of the Yacht Market",
  description:
    "OffMarketYacht is a private acquisition platform for confidential and off-market yacht opportunities, built for qualified buyers in the United States and internationally.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <Breadcrumb items={[{ label: "About" }]} />

      <PageHero
        eyebrow="About"
        h1="The private side of the yacht market."
        standfirst="A confidential acquisition platform, not a listing site."
        secondaryCtaLabel="Contact Us"
        secondaryCtaHref="/contact"
      />

      <section className="section">
        <div className="container-prose prose-editorial">
          <p>
            {SITE.legalName} exists because the yacht market has two layers and only one of them
            is visible. Public marketplaces show the yachts whose owners have decided to
            advertise. Alongside that sits a larger, quieter population of vessels whose owners
            would transact at the right number and have chosen not to be listed.
          </p>

          <h2>What we do</h2>
          <p>
            We source confidential and privately available yacht opportunities through a network
            of owners, captains, managers and cooperating brokers, and present them to qualified
            buyers in masked form. Where a buyer&rsquo;s requirement is not met by what is
            available, we run retained acquisition searches — approaching the owners of matching
            vessels directly, on the buyer&rsquo;s behalf.
          </p>
          <p>
            On the sell side, we help owners test buyer demand privately before deciding whether
            a public listing is warranted at all.
          </p>

          <h2>How we handle confidentiality</h2>
          <p>
            Masking on this platform is architectural rather than cosmetic. Identity, shipyard,
            exact asking price, full specification and current position are held server-side and
            never enter a page, a structured-data block, a sitemap entry or an API response. There
            is nothing hidden in the source to uncover, because it was never sent.
          </p>
          <p>
            Disclosure follows qualification. A form submission does not release confidential
            information; a person reviews every request against the terms the owner has set.
          </p>

          <h2>What we will not do</h2>
          <ul>
            <li>
              Present an inferred opportunity as a confirmed seller. Entries where availability is
              unconfirmed are labelled <strong>Potential Opportunity</strong> and say so plainly.
            </li>
            <li>
              Manufacture urgency. No countdowns, no viewer counts, no &ldquo;seller
              motivated&rdquo; unless the record genuinely supports it.
            </li>
            <li>
              Use a photograph of a similar yacht and let a buyer assume it is the vessel. Where
              no authorised imagery exists, the card carries a generated profile study, labelled.
            </li>
            <li>
              Value a yacht from a web form, or tell an owner a buyer exists when one does not.
            </li>
          </ul>

          <h2>Who we work with</h2>
          <p>
            Principals, family offices and their advisors, and cooperating brokers representing
            buyers. Most of what we handle is in the United States — Florida in particular — with
            secondary inventory in the Bahamas, the Caribbean, the Mediterranean and the Gulf.
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
