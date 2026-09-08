import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import MarketExplorer from "@/components/MarketExplorer";
import OpportunityGrid from "@/components/OpportunityGrid";
import OpportunityTicker from "@/components/OpportunityTicker";
import SampleInventoryNotice from "@/components/SampleInventoryNotice";
import SchemaOrg from "@/components/SchemaOrg";
import SectionHeading from "@/components/SectionHeading";
import PrivateSearchForm from "@/components/forms/PrivateSearchForm";
import { getInventoryStats, getOpportunities } from "@/lib/opportunities";
import { faqSchema, opportunityListSchema } from "@/lib/seo";

const HOME_FAQS = [
  {
    question: "What is an off-market yacht?",
    answer:
      "An off-market yacht is a yacht whose owner may be open to selling but has chosen not to publicly advertise the vessel. It does not appear on public yacht marketplaces, and it is usually discussed only with buyers who have been introduced privately.",
  },
  {
    question: "Why are yachts sold off-market?",
    answer:
      "Owners may prefer confidentiality, limited market exposure, operational continuity, or controlled discussions with qualified buyers. A visible listing can affect crew retention, charter positioning and the owner's negotiating position, so many prefer a private approach.",
  },
  {
    question: "How do buyers find off-market yachts?",
    answer:
      "Off-market opportunities are typically discovered through broker relationships, private owner networks, industry contacts and targeted acquisition searches. They are not indexed on public marketplaces, so they are reached through introduction rather than search.",
  },
  {
    question: "Why are the listings on this site masked?",
    answer:
      "Owners of off-market yachts authorise a limited public description only. We publish class, approximate length, era, build region, cruising area and a price band, and hold identity, shipyard, exact price and current location server-side until a buyer has been qualified.",
  },
  {
    question: "Do I have to be a qualified buyer to enquire?",
    answer:
      "Anyone can submit a request. Confidential information is released only after a person on our team has reviewed the request against the owner's terms, so submitting a form does not automatically disclose a yacht's identity or exact price.",
  },
];

export default function HomePage() {
  const recent = getOpportunities({ sort: "recent", limit: 8 });
  const featured = getOpportunities({ featured: true, limit: 3 });
  const usa = getOpportunities({ country: "United States", limit: 6 });
  const all = getOpportunities();
  const stats = getInventoryStats();

  return (
    <>
      <SchemaOrg
        schema={[
          faqSchema(HOME_FAQS),
          opportunityListSchema(recent, "Recently Added Private Opportunities"),
        ]}
      />

      {/* ── 2. Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deal-room">
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <div className="container-wide relative py-12 lg:py-16">
          {/*
            Two columns from `lg` up so the live counts sit beside the headline
            rather than below it. That keeps the hero to roughly half the
            viewport, which is what puts the first opportunity cards near the
            fold — the inventory is the hero (§4), not this block.
          */}
          <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="signal-dot h-1.5 w-1.5 rounded-full bg-signal"
                />
                <p className="label-mono text-ink-inverse-muted">Private Market — Active</p>
              </div>

              <h1 className="display mt-6 max-w-3xl text-[38px] text-ink-inverse sm:text-[52px] lg:text-[60px]">
                Discover yachts
                <br />
                before they reach the market.
              </h1>

              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-inverse-muted">
                Explore confidential, off-market and privately available yacht opportunities
                sourced through our international network.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/off-market-yachts" className="btn-primary">
                  Explore Private Opportunities
                </Link>
                <Link href="/request-private-access" className="btn-onDark">
                  Tell Us What You&rsquo;re Looking For
                </Link>
              </div>

              <p className="mt-6 text-[13px] text-ink-inverse-muted">
                Confidential inquiries · Private buyer matching · Global sourcing
              </p>
            </div>

            {/* Real counts only. Nothing here is estimated or inflated. */}
            <div>
              {stats.total > 0 && (
                <dl className="grid grid-cols-2 gap-px border border-deal-room-line bg-deal-room-line">
                  {[
                    { term: "Private Opportunities", value: stats.total },
                    { term: "United States", value: stats.usa },
                    { term: "Florida & Bahamas", value: stats.florida },
                    { term: "Verified Off-Market", value: stats.offMarket },
                  ].map((stat) => (
                    <div key={stat.term} className="bg-deal-room px-5 py-4">
                      <dt className="label-mono text-ink-faint">{stat.term}</dt>
                      <dd className="mt-2 font-mono text-[24px] tabular-nums text-ink-inverse">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-5">
                <SampleInventoryNotice onDark />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Opportunity ticker ───────────────────────────────────────── */}
      <OpportunityTicker opportunities={recent} />

      {/* ── 4. Recently added ───────────────────────────────────────────── */}
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16" aria-labelledby="recent-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Recently Added"
            title="Private opportunities, newly published."
            intro="Each entry is masked to the level the owner has authorised. Class, proportion, era and price band are published; identity and exact position are held back."
            linkHref="/off-market-yachts"
            linkLabel="View all opportunities"
          />
          <div id="recent-heading" className="sr-only">
            Recently added private opportunities
          </div>
          <OpportunityGrid opportunities={recent} columns={4} priorityCount={4} compact />
        </div>
      </section>

      {/* ── 5. Private market search ────────────────────────────────────── */}
      <section
        className="section border-y border-line bg-paper-sunken"
        aria-labelledby="search-heading"
      >
        <div className="container-wide">
          <SectionHeading
            eyebrow="Private Market Search"
            title="Search the private market."
            intro="Filter by price band, length, cruising area, class and build region. Every result is a masked opportunity — the detail is released after qualification."
          />
          <div id="search-heading" className="sr-only">
            Private market search
          </div>
          <MarketExplorer opportunities={all} />
        </div>
      </section>

      {/* ── 6. Why off-market ───────────────────────────────────────────── */}
      <section className="section" aria-labelledby="why-heading">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="label-mono mb-4 text-accent">Why Off-Market</p>
              <h2 id="why-heading" className="display text-[34px] text-ink sm:text-[44px]">
                The best opportunity may never hit the public market.
              </h2>
            </div>
            <div className="prose-editorial">
              <p>
                A public listing is an event with consequences. It signals intent to charter
                clients, unsettles crew, invites brokers who have no buyer, and anchors a price
                the market will remember for as long as the yacht is on it.
              </p>
              <p>
                So a significant share of large yachts that could be bought are never advertised.
                Their owners are open to the right conversation and closed to a public one. That
                gap — between what is available and what is visible — is the market this platform
                works in.
              </p>
              <p>
                For a buyer, the practical effect is a shorter list of better-matched vessels, a
                seller who has not been worn down by six months of unqualified viewings, and a
                price that has not been publicly anchored. For an owner, it is controlled
                exposure: a defined set of qualified buyers rather than an open invitation.
              </p>
              <p>
                <Link href="/private-market-intelligence/what-is-an-off-market-yacht">
                  Read the full explanation of how off-market yacht sales work →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. USA opportunities ────────────────────────────────────────── */}
      <section className="section defer-render bg-paper-sunken" aria-labelledby="usa-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="United States"
            title="USA opportunities."
            intro="Florida is the deepest private market in the world for yachts over 80 ft. These are the US-based opportunities currently published."
            linkHref="/yachts-for-sale-usa"
            linkLabel="All USA opportunities"
          />
          <div id="usa-heading" className="sr-only">
            USA opportunities
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {[
              { label: "Florida", href: "/yachts-for-sale-florida" },
              { label: "Fort Lauderdale", href: "/yachts-for-sale-fort-lauderdale" },
              { label: "Miami", href: "/yachts-for-sale-miami" },
              { label: "Palm Beach", href: "/yachts-for-sale-palm-beach" },
              { label: "California", href: "/yachts-for-sale-california" },
              { label: "San Diego", href: "/yachts-for-sale-san-diego" },
              { label: "Newport Beach", href: "/yachts-for-sale-newport-beach" },
              { label: "Bahamas", href: "/yachts-for-sale-bahamas" },
              { label: "Caribbean", href: "/yachts-for-sale-caribbean" },
            ].map((market) => (
              <Link
                key={market.href}
                href={market.href}
                className="label-mono border border-line-strong px-3 py-2 text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                {market.label}
              </Link>
            ))}
          </div>

          <OpportunityGrid opportunities={usa} columns={3} compact />
        </div>
      </section>

      {/* ── 8. Private yacht matching ───────────────────────────────────── */}
      <section
        className="section defer-render relative overflow-hidden bg-deal-room"
        aria-labelledby="matching-heading"
      >
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <div className="container-site relative">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label-mono mb-4 text-accent">
                Can&rsquo;t find what you&rsquo;re looking for?
              </p>
              <h2
                id="matching-heading"
                className="display text-[34px] text-ink-inverse sm:text-[44px]"
              >
                Tell us the yacht.
                <br />
                We&rsquo;ll search the private market.
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-inverse-muted">
                Not every yacht available for purchase appears online. Submit your acquisition
                criteria and let our network search beyond publicly advertised inventory.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] text-ink-inverse-muted">
                {[
                  "Targeted approaches to owners who have not listed",
                  "Cooperating brokers holding pocket listings",
                  "Captains and managers who know a boat is coming available",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-deal-room-line bg-deal-room-raised p-6 sm:p-8">
              <PrivateSearchForm onDark />
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. How it works ─────────────────────────────────────────────── */}
      <section className="section defer-render" aria-labelledby="how-heading">
        <div className="container-site">
          <SectionHeading eyebrow="How It Works" title="Four steps, one conversation." />
          <div id="how-heading" className="sr-only">
            How it works
          </div>
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Search",
                body: "Browse available private opportunities. Every listing is masked to the level its owner has authorised.",
              },
              {
                step: "02",
                title: "Request Access",
                body: "Tell us what you are looking for, or request detail against a specific reference.",
              },
              {
                step: "03",
                title: "Qualify",
                body: "We verify buyer requirements against the owner's terms. A person reviews every request.",
              },
              {
                step: "04",
                title: "Connect",
                body: "Relevant confidential information or introductions can be provided where authorized.",
              },
            ].map((item) => (
              <li key={item.step} className="bg-paper-raised p-7">
                <span className="label-mono text-accent">{item.step}</span>
                <h3 className="mt-4 text-[19px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 10. Sell privately ──────────────────────────────────────────── */}
      <section
        className="section defer-render border-y border-line bg-paper-sunken"
        aria-labelledby="sell-heading"
      >
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="label-mono mb-4 text-accent">Considering Selling Your Yacht?</p>
              <h2 id="sell-heading" className="display text-[34px] text-ink sm:text-[44px]">
                Sell quietly.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">
                Explore buyer demand without immediately placing your yacht on the public market.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                Nothing is published, circulated or listed without your instruction. We will not
                value your yacht from a form, and we will not tell you a buyer exists unless one
                does.
              </p>
              <Link href="/sell-your-yacht-privately" className="btn-primary mt-8">
                Discuss a Private Sale
              </Link>
            </div>

            <div className="border border-line bg-paper-raised">
              {[
                {
                  term: "Private sale exploration",
                  detail: "Test the market before committing to a public listing.",
                },
                {
                  term: "Confidential buyer matching",
                  detail: "Your yacht is described to qualified buyers, not advertised.",
                },
                {
                  term: "No unnecessary public exposure",
                  detail: "No portal listing, no price history, no market memory.",
                },
              ].map((row) => (
                <div key={row.term} className="border-b border-line p-6 last:border-b-0">
                  <h3 className="text-[16px] font-semibold text-ink">{row.term}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                    {row.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Private market intelligence ─────────────────────────────── */}
      <section className="section defer-render" aria-labelledby="intel-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Private Market Intelligence"
            title="How the private yacht market actually works."
            intro="Written for buyers who want to understand the mechanics before they commit capital."
            linkHref="/private-market-intelligence"
            linkLabel="All intelligence"
          />
          <div id="intel-heading" className="sr-only">
            Private market intelligence
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/private-market-intelligence/what-is-an-off-market-yacht",
                title: "What Is an Off-Market Yacht?",
                body: "The definition, why the category exists, and how it differs from an unsold public listing.",
              },
              {
                href: "/private-market-intelligence/how-to-find-off-market-yachts-for-sale",
                title: "How to Find Off-Market Yachts for Sale",
                body: "The four routes into private inventory, and which of them are realistically open to a buyer.",
              },
              {
                href: "/private-market-intelligence/how-yacht-pocket-listings-work",
                title: "How Yacht Pocket Listings Work",
                body: "What a pocket listing is, who holds them, and what it means for price discovery.",
              },
              {
                href: "/private-market-intelligence/off-market-vs-public-yacht-listings",
                title: "Off-Market vs Public Yacht Listings",
                body: "A direct comparison across price, choice, speed, diligence and negotiating position.",
              },
              {
                href: "/private-market-intelligence/how-to-buy-a-yacht-in-florida",
                title: "How to Buy a Yacht in Florida",
                body: "Sales tax, cruising permits, survey season and why Florida is the deepest US market.",
              },
              {
                href: "/private-market-intelligence/yacht-purchase-process-united-states",
                title: "The Yacht Purchase Process in the USA",
                body: "From offer and deposit through survey, sea trial, closing and registration.",
              },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group bg-paper-raised p-7 transition-colors hover:bg-paper-sunken"
              >
                <h3 className="text-[18px] font-semibold leading-snug text-ink">
                  {article.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                  {article.body}
                </p>
                <span className="label-mono mt-5 inline-block text-accent">Read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Trust / confidentiality ─────────────────────────────────── */}
      <section
        className="section defer-render border-t border-line bg-paper-sunken"
        aria-labelledby="trust-heading"
      >
        <div className="container-site">
          <SectionHeading
            eyebrow="Discretion by Design"
            title="Confidentiality is the architecture, not a promise."
            intro="Masking happens on the server. Withheld attributes are absent from the page source, the structured data, the sitemap and every API response — not hidden with CSS."
          />
          <div id="trust-heading" className="sr-only">
            Discretion by design
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Server-side masking",
                body: "Identity, shipyard, exact price and berth never enter the response. There is nothing to reveal in the page source because it was never sent.",
              },
              {
                title: "Honest status labels",
                body: "Verified off-market, private listing, broker-sourced and potential opportunity mean different things, and we label which one applies.",
              },
              {
                title: "No manufactured urgency",
                body: "No countdowns, no viewer counts, no 'seller motivated'. If we cannot evidence a claim from the record, we do not make it.",
              },
              {
                title: "Qualification before disclosure",
                body: "A form submission does not unlock a yacht's identity. A person reviews each request against the owner's terms first.",
              },
              {
                title: "Owner-controlled exposure",
                body: "Each owner sets what may be published — down to the granularity of the location and whether a price appears at all.",
              },
              {
                title: "Labelled imagery",
                body: "Where a listing carries no authorised photography, the card shows a generated profile study, labelled as such. Never a stock photo passed off as the vessel.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-paper-raised p-7">
                <h3 className="text-[17px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="mt-16">
              <SectionHeading eyebrow="Featured" title="Currently under mandate." />
              <OpportunityGrid opportunities={featured} columns={3} />
            </div>
          )}
        </div>
      </section>

      <div className="defer-render">
        <FAQSection faqs={HOME_FAQS} heading="Off-Market Yachts — Common Questions" />
      </div>

      {/* ── 13. Final CTA ───────────────────────────────────────────────── */}
      <FinalCTA />
    </>
  );
}
