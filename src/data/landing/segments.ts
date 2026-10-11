import type { LandingPage } from "@/data/landing/types";
import { EU_VAT_SOURCES, DEPOSIT_NOTES } from "@/data/sources";

/** International regions, budget bands, size bands and yacht classes. */
export const SEGMENT_PAGES: LandingPage[] = [
  // ── International regions ─────────────────────────────────────────────────
  {
    slug: "yachts-for-sale-bahamas",
    title: "Yachts for Sale Bahamas | Private Bahamas Opportunities",
    metaDescription:
      "Yachts for sale in the Bahamas through private channels. Confidential opportunities suited to Exumas and Abacos cruising, an afternoon from South Florida.",
    h1: "Yachts for Sale in the Bahamas",
    standfirst: "Where draft matters more than length.",
    intro: [
      "The Bahamas is the natural extension of the South Florida market and, for many American owners, the actual reason they bought the boat. Bimini is a couple of hours from Miami, and the Exumas open up an entire cruising ground that most of the Caribbean cannot match for protected anchorages.",
      "It is also a cruising ground with a hard technical constraint. Large parts of the Bahamian banks are genuinely shallow, and a yacht drawing much over seven feet spends its life planning around tides. Draft is frequently the single most important specification a Bahamas-focused buyer should check.",
      "Yachts based here tend to be specified accordingly — shallower draft, better tender provision, and systems capable of running for extended periods without shore support.",
    ],
    query: { locationPrefix: "Bahamas", sort: "recent" },
    inventoryHeading: "Bahamas-based opportunities",
    emptyMessage:
      "Nothing is currently published for the Bahamas. Many Bahamas-focused yachts are based in Florida — tell us your criteria and we will search both markets.",
    answers: [
      {
        question: "What draft do you need to cruise the Bahamas?",
        answer:
          "Under about six feet gives you effectively unrestricted access to the Exumas and the shallow banks. Between six and eight feet is workable with tide planning. Above roughly eight feet, significant areas become impractical and routing has to be planned around deep-water channels.",
      },
      {
        question: "How far is the Bahamas from Florida?",
        answer:
          "Bimini is roughly fifty nautical miles from Miami and around eighty from Fort Lauderdale. Nassau is approximately one hundred and eighty nautical miles from Fort Lauderdale. All are comfortable single-day passages for a cruising yacht in reasonable conditions.",
      },
      {
        question: "Do you need a permit to cruise the Bahamas?",
        answer:
          "Yes. Visiting vessels clear in at a designated port of entry and obtain a cruising permit, which is straightforward and typically handled by the captain or a local agent. Permits are per visit rather than attached permanently to the vessel.",
      },
    ],
    faqs: [
      {
        question: "Is it better to base a yacht in the Bahamas or Florida?",
        answer:
          "Most owners base in Florida and cruise the Bahamas. Florida gives you yard capacity, crew availability and parts; the Bahamas gives you the cruising. Basing permanently in the Bahamas means accepting longer lead times on any technical work.",
      },
      {
        question: "What is the best time of year to cruise the Bahamas?",
        answer:
          "December through May is the settled season. Summer brings both heat and hurricane risk, and most insurance policies restrict Bahamian cruising during the named windstorm period.",
      },
      {
        question: "Are Bahamas yachts subject to US import duty?",
        answer:
          "It depends on the vessel's flag, ownership and where it will be used after purchase. A yacht returning to US waters under US ownership has a different position from one remaining foreign-flagged. Take advice before closing.",
      },
      {
        question: "Do you have yachts specified for shallow-water cruising?",
        answer:
          "Where a published opportunity has a shallow-draft configuration, we note it in the public description. It is one of the attributes worth asking about specifically when you enquire.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-florida", label: "Yachts for Sale Florida" },
      { href: "/yachts-for-sale-miami", label: "Miami" },
      { href: "/yachts-for-sale-caribbean", label: "Caribbean" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Bahamas" }],
  },

  {
    slug: "yachts-for-sale-caribbean",
    title: "Yachts for Sale Caribbean | Private Caribbean Opportunities",
    metaDescription:
      "Yachts for sale in the Caribbean through private channels. Confidential opportunities across the Eastern Caribbean, BVI, Antigua and St Maarten.",
    h1: "Yachts for Sale in the Caribbean",
    standfirst: "Season-driven inventory, in a market that empties every spring.",
    intro: [
      "Caribbean yacht inventory follows the season rather than the calendar. Vessels arrive from Florida and the Mediterranean in late autumn, work through the winter, and by May the fleet has largely dispersed north or east. That rhythm shapes when yachts become available and where they physically are when they do.",
      "It is also a market where charter history matters more than elsewhere. A large share of Caribbean-based yachts operate commercially, which means better documentation and certification but harder use. A chartered yacht of a given age has usually run more hours and carried more guests than a privately used equivalent.",
      "St Maarten and Antigua carry the region's principal technical infrastructure; the BVI is the centre of the sailing and catamaran market.",
    ],
    query: { locationPrefix: "Caribbean", sort: "recent" },
    inventoryHeading: "Caribbean opportunities",
    emptyMessage:
      "Nothing is currently published for the Caribbean. Inventory here is highly seasonal — tell us your criteria and timing and we will approach the market directly.",
    answers: [
      {
        question: "When is the Caribbean yacht season?",
        answer:
          "Roughly December through April. Yachts arrive from Florida and the Mediterranean in November and December, and most leave by late May ahead of the hurricane season, heading north to New England or east to the Mediterranean.",
      },
      {
        question: "Where are yachts serviced in the Caribbean?",
        answer:
          "St Maarten holds the region's principal technical and refit capacity, with Antigua's English Harbour and Falmouth serving the large yacht fleet and the BVI supporting the sailing and catamaran market.",
      },
      {
        question: "Should I buy a yacht with charter history?",
        answer:
          "A charter yacht typically comes with commercial certification, thorough documentation and a maintenance regime driven by survey requirements — all genuine advantages. Against that, it has worked harder than a privately used vessel of the same age. Weigh the documentation quality against the accumulated hours.",
      },
    ],
    faqs: [
      {
        question: "Can I buy a yacht in the Caribbean and bring it to the USA?",
        answer:
          "Yes, and it is common. The import duty and documentation position depends on the vessel's build country, flag and ownership structure, so it should be settled with a maritime attorney before closing rather than on arrival.",
      },
      {
        question: "Is hurricane season a factor when buying?",
        answer:
          "Significantly. Insurance conditions restrict where a yacht may be kept between June and November, and many transactions are deliberately timed around it.",
      },
      {
        question: "Are Caribbean yachts VAT paid?",
        answer:
          "VAT is a European concept and does not apply in the Caribbean, but a European-built yacht's VAT status still matters if it may return to EU waters. Check it as part of diligence.",
      },
      {
        question: "Do you cover the BVI and St Barths?",
        answer:
          "Yes. The Eastern Caribbean including the BVI, St Maarten, St Barths and Antigua is within the region we cover.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-bahamas", label: "Bahamas" },
      { href: "/yachts-for-sale-florida", label: "Florida" },
      { href: "/sailing-yachts-for-sale", label: "Sailing Yachts" },
      { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Caribbean" }],
  },

  {
    slug: "yachts-for-sale-mediterranean",
    sources: EU_VAT_SOURCES,
    title: "Yachts for Sale Mediterranean | Private European Opportunities",
    metaDescription:
      "Yachts for sale in the Mediterranean through private channels. Confidential opportunities in Monaco, France, Italy, Spain, Greece and Turkey for US and international buyers.",
    h1: "Yachts for Sale in the Mediterranean",
    standfirst: "Deep inventory, and a tax position that has to be understood first.",
    intro: [
      "The Mediterranean holds the largest concentration of yachts above 130 feet anywhere in the world, and for an American buyer it is genuinely worth looking at. The choice at the top of the market is broader than Florida's, and the build quality of the European fleet reflects yards that have been doing this for a century.",
      "The complication is fiscal rather than technical. Every European yacht carries a VAT status — paid, unpaid, or held under a temporary admission regime — and it materially affects both value and what you can legally do with the vessel. Two otherwise identical yachts can differ materially in price on VAT status alone, because EU VAT rates run from roughly 17% to 27%.",
      "For a buyer intending to bring the yacht to the United States, that can work in your favour, but only if the export and import mechanics are planned before closing rather than discovered afterwards.",
    ],
    query: { locationPrefix: "Mediterranean", sort: "recent" },
    inventoryHeading: "Mediterranean opportunities",
    emptyMessage:
      "Nothing is currently published for the Mediterranean. Submit your criteria and we will approach the European private market directly.",
    answers: [
      {
        question: "What is VAT status on a yacht and why does it matter?",
        answer:
          "VAT status records whether European value added tax has been paid on a vessel. A VAT-paid yacht can circulate freely in EU waters; a VAT-unpaid yacht is restricted to temporary admission periods or non-EU ownership. Because standard EU VAT rates run from roughly 17% to 27% depending on the country, the status materially affects the price and the buyer pool.",
      },
      {
        question: "Can an American buy a yacht in the Mediterranean?",
        answer:
          "Yes, routinely. The practical questions are whether the yacht will remain in Europe or be exported to the United States, how the sale is structured for VAT purposes, and where the closing takes place. All three should be settled with maritime counsel before an offer is made.",
      },
      {
        question: "Where are the main Mediterranean yacht markets?",
        answer:
          "Monaco and the French Riviera for the largest vessels, the Italian coast around Viareggio and Genoa where much of the fleet is built and refitted, Palma de Mallorca as the principal refit and brokerage hub, and Greece and Turkey for the eastern charter market.",
      },
    ],
    faqs: [
      {
        question: "Is it cheaper to buy a yacht in Europe?",
        answer:
          "Headline prices can look lower, particularly on VAT-unpaid vessels, but the comparison is only meaningful once you have modelled VAT, import duty and delivery. Buyers regularly find the apparent saving disappears.",
      },
      {
        question: "How do I get a European yacht to the USA?",
        answer:
          "Either on her own bottom via the Atlantic, which is practical for suitable vessels with the right crew and season, or by yacht transport ship. Both are routine; the choice depends on the vessel, the timing and the cost.",
      },
      {
        question: "When is the Mediterranean season?",
        answer:
          "May through September, with the fleet in refit through the winter. Inventory decisions frequently follow the end of the season.",
      },
      {
        question: "Do you cover Turkey and the Eastern Mediterranean?",
        answer:
          "Yes. Turkish yards produce a significant share of the world's explorer yachts, and the Eastern Mediterranean charter fleet is within the market we cover.",
      },
    ],
    related: [
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/yachts-for-sale-caribbean", label: "Caribbean" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
      { href: "/mega-yachts-for-sale", label: "Mega Yachts" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Mediterranean" }],
  },

  // ── Budget bands ──────────────────────────────────────────────────────────
  {
    slug: "yachts-for-sale-under-5-million",
    title: "Yachts for Sale Under $5 Million | Private Opportunities",
    metaDescription:
      "Yachts for sale under $5 million through private channels. Confidential opportunities from 60 to 100 ft in Florida, the Bahamas and the USA.",
    h1: "Yachts for Sale Under $5 Million",
    standfirst: "The entry point to the private market.",
    intro: [
      "Under five million dollars you are generally looking at yachts between roughly 60 and 100 feet: production and semi-custom vessels, most of them owner-operable or running with one or two crew rather than a full complement.",
      "This is the most competitive segment of the public market, which is exactly why the private channel is useful here. Well-maintained boats in this bracket sell quickly when they are listed, so the ones that never get listed are frequently the better opportunities.",
      "The practical advice at this level is to weight condition and service history above age. A well-kept eight-year-old yacht with documented maintenance is a better proposition than a neglected four-year-old, and the price difference will not reflect that.",
    ],
    query: { priceBand: "under-5m", sort: "price-desc" },
    inventoryHeading: "Opportunities under $5M",
    emptyMessage:
      "Nothing is currently published in this bracket. This segment turns over fast — submit your criteria and we will search the private market for you.",
    answers: [
      {
        question: "What can you buy for under $5 million?",
        answer:
          "Typically a yacht between 60 and 100 feet — a recent production flybridge or sport yacht, or an older semi-custom vessel of greater length. Below about 80 feet many owners run the boat themselves; above that, one or two permanent crew becomes normal.",
      },
      {
        question: "What are the running costs on a yacht under $5 million?",
        answer:
          "Using the conventional rule of thumb of around ten percent of value annually, budget roughly $200,000 to $500,000 per year covering dockage, insurance, crew where applicable, fuel, maintenance and a refit reserve. Usage pattern moves that figure substantially.",
      },
      {
        question: "Is a survey necessary at this price level?",
        answer:
          "Yes, without exception. A full condition and valuation survey plus an engine survey and sea trial typically costs a small fraction of one percent of the purchase price and routinely identifies issues worth many times that.",
      },
    ],
    faqs: [
      {
        question: "Can I finance a yacht in this bracket?",
        answer:
          "Marine financing is well established at this level, typically requiring a substantial deposit and a satisfactory survey. Terms vary considerably with the vessel's age and flag.",
      },
      {
        question: "Do I need crew for a yacht under $5 million?",
        answer:
          "Below roughly 80 feet many owners operate without permanent crew, using a captain for longer passages. Above that, a permanent captain and often a mate or stewardess becomes the norm.",
      },
      {
        question: "Are there off-market yachts at this price?",
        answer:
          "Yes, though proportionally fewer than higher up the market. Owners in this bracket are more likely to list, so private opportunity here often comes from a captain or manager knowing a boat is about to change hands.",
      },
      {
        question: "What is the cheapest yacht you handle?",
        answer:
          "Our published inventory generally starts around $2 million. Below that the public market is efficient enough that a private approach adds little.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-under-10-million", label: "Under $10M" },
      { href: "/yachts-for-sale-80-100-feet", label: "80–100 ft" },
      { href: "/motor-yachts-for-sale", label: "Motor Yachts" },
      { href: "/yachts-for-sale-florida", label: "Florida" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Under $5 Million" }],
  },

  {
    slug: "yachts-for-sale-under-10-million",
    title: "Yachts for Sale Under $10 Million | Private Opportunities",
    metaDescription:
      "Yachts for sale under $10 million through private channels. Confidential opportunities from 90 to 130 ft with permanent crew, in the USA and internationally.",
    h1: "Yachts for Sale Under $10 Million",
    standfirst: "Where permanent crew and real range become standard.",
    intro: [
      "Between five and ten million dollars the market changes character. Vessels are typically 90 to 130 feet, permanent crew is standard, and the yacht becomes something you operate rather than something you drive.",
      "It is also the point at which build quality starts to separate meaningfully. The difference between a well-engineered semi-custom hull and a heavily specified production one is not obvious in photographs, but it is obvious in a survey and in the running costs five years later.",
      "This bracket sees a disproportionate amount of private activity, because owners here are frequently trading up on a known timetable — a new build delivering in eighteen months creates a seller who has time to be discreet.",
    ],
    query: { priceBand: "5m-10m", sort: "price-desc" },
    inventoryHeading: "Opportunities between $5M and $10M",
    emptyMessage:
      "Nothing is currently published in this bracket. Submit your criteria and we will search the private market directly.",
    answers: [
      {
        question: "What size yacht can you buy for under $10 million?",
        answer:
          "Typically 90 to 130 feet, depending heavily on age and builder. A recent 100 foot production flybridge and a fifteen-year-old 130 foot semi-custom displacement yacht can occupy the same price point while being entirely different propositions.",
      },
      {
        question: "How many crew does a yacht in this range need?",
        answer:
          "Generally four to seven: captain, engineer, mate or deckhand, chef and one or two interior crew. Crew salaries and benefits are usually the single largest line in the annual operating budget at this level.",
      },
      {
        question: "Should I buy newer and smaller or older and larger?",
        answer:
          "Larger and older gives you volume and presence; newer and smaller gives you lower maintenance risk and better systems. The deciding question is usually how you will actually use the yacht — extended cruising rewards volume and range, while heavy short-trip use rewards newer machinery.",
      },
    ],
    faqs: [
      {
        question: "What does a refit cost at this size?",
        answer:
          "A cosmetic refresh might be several hundred thousand dollars. A full paint, interior and machinery refit on a 120 foot yacht runs into the low millions. Refit history is therefore a major component of value.",
      },
      {
        question: "Is charter income realistic at this level?",
        answer:
          "It is possible with commercial registration and professional management, but it rarely covers running costs and it materially increases wear. Treat it as offsetting some expense, not as a business case.",
      },
      {
        question: "How long do yachts in this bracket take to sell?",
        answer:
          "Publicly listed vessels commonly sit for six to eighteen months. Private transactions move considerably faster because the buyer pool is pre-qualified.",
      },
      {
        question: "Do you cover both new and used at this level?",
        answer:
          "Our focus is on existing vessels. New build slots are a different market with different dynamics and are handled directly with yards.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-under-5-million", label: "Under $5M" },
      { href: "/yachts-for-sale-10-million-25-million", label: "$10M – $25M" },
      { href: "/yachts-for-sale-100-130-feet", label: "100–130 ft" },
      { href: "/luxury-yachts-for-sale", label: "Luxury Yachts" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Under $10 Million" }],
  },

  {
    slug: "yachts-for-sale-10-million-25-million",
    sources: DEPOSIT_NOTES,
    title: "Yachts for Sale $10M – $25M | Private Superyacht Opportunities",
    metaDescription:
      "Yachts for sale between $10 million and $25 million. Confidential superyacht opportunities from 120 to 165 ft, presented privately to qualified buyers.",
    h1: "Yachts for Sale $10M – $25M",
    standfirst: "Full superyacht operation, and a market that mostly transacts privately.",
    intro: [
      "Between ten and twenty-five million dollars you are firmly in superyacht territory: vessels of roughly 120 to 165 feet, operating with eight to twelve crew, subject to class and flag oversight, and requiring genuine management rather than an attentive owner.",
      "This is where the public market thins out noticeably. The population of credible buyers at this level is small enough that most of them are already known to the brokerage community, so the value of a public listing declines while its cost — in crew stability, charter positioning and negotiating leverage — stays high.",
      "Diligence also becomes more serious. Class standing, flag compliance, crew contracts and the refit history are all material, and the survey process itself typically takes several weeks rather than several days.",
    ],
    query: { priceBand: "10m-25m", sort: "price-desc" },
    inventoryHeading: "Opportunities between $10M and $25M",
    emptyMessage:
      "Nothing is currently published in this bracket. Much of it never is — submit your criteria and we will approach the market directly.",
    answers: [
      {
        question: "What do you get for $10 to $25 million?",
        answer:
          "Typically a 120 to 165 foot superyacht: a recent semi-custom vessel at the lower end, or a larger custom yacht of ten to fifteen years old at the upper end. Both come with permanent crew, class certification and a formal management structure.",
      },
      {
        question: "What are annual running costs in this bracket?",
        answer:
          "Conventionally around ten percent of value, so roughly $1 million to $2.5 million per year. Crew payroll typically accounts for the largest share, followed by dockage, insurance, maintenance and the refit reserve.",
      },
      {
        question: "Why are yachts at this level rarely publicly listed?",
        answer:
          "Because the buyer pool is small and already reachable through a handful of intermediaries, while the costs of publicity are high. A public listing tells the crew, the charter market and every counterparty that the owner is exiting, without materially widening the audience of real buyers.",
      },
    ],
    faqs: [
      {
        question: "How long does diligence take at this level?",
        answer:
          "Typically four to eight weeks from accepted offer to closing, dominated by survey scheduling, haul-out availability and review of class and flag documentation.",
      },
      {
        question: "Are these yachts held in companies?",
        answer:
          "Usually. Ownership through a special purpose vehicle is standard, and the transaction may be structured as a share sale, which changes the diligence required substantially.",
      },
      {
        question: "Can I retain the existing crew?",
        answer:
          "Frequently, and it is often desirable. Crew contracts do not transfer automatically, so it is a point to raise early in negotiation.",
      },
      {
        question: "What is a typical deposit?",
        answer:
          "A deposit of around ten percent held in escrow on signing the memorandum of agreement is common, released or returned according to the survey outcome and the agreed acceptance terms. The amount and refund terms are set in the contract.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-under-10-million", label: "Under $10M" },
      { href: "/superyachts-for-sale-over-25-million", label: "Over $25M" },
      { href: "/yachts-for-sale-130-165-feet", label: "130–165 ft" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
    ],
    breadcrumb: [{ label: "Yachts for Sale $10M – $25M" }],
  },

  {
    slug: "superyachts-for-sale-over-25-million",
    title: "Superyachts for Sale Over $25 Million | Private Market",
    metaDescription:
      "Superyachts for sale over $25 million. Confidential opportunities above 160 ft presented privately to qualified buyers. Price frequently on request.",
    h1: "Superyachts for Sale Over $25 Million",
    standfirst: "At this level, the private market is not an alternative — it is the market.",
    intro: [
      "Above twenty-five million dollars the assumptions that govern the rest of the yacht market stop applying. There is no meaningful comparable set, price is a matter of negotiation rather than advertisement, and the number of people who can transact at this level worldwide runs to the hundreds rather than the thousands.",
      "Public listings at this level exist, but they are the exception and they are often a signal in themselves — a yacht that has been visibly for sale for two years tells a buyer something the owner would rather it did not.",
      "Most of what we handle here carries price on request. Disclosure follows a structured process, usually involving representatives on both sides, and the timeline from first conversation to closing is measured in months.",
    ],
    query: { priceBand: "25m-50m", sort: "price-desc" },
    inventoryHeading: "Opportunities over $25M",
    emptyMessage:
      "Nothing is currently published above $25M. At this level most opportunity is never published — tell us your requirement and we will approach the market directly.",
    answers: [
      {
        question: "What does a $25 million superyacht look like?",
        answer:
          "Typically 150 to 200 feet, custom or high-end semi-custom, built by an established European yard, operating with twelve to twenty crew and full class certification. Age varies widely: a recent 150 footer and a fifteen-year-old 200 footer can occupy the same price point.",
      },
      {
        question: "Why is price shown on request at this level?",
        answer:
          "Because publishing a figure would help identify the vessel, and because at this size the number depends materially on what is included, how the transaction is structured, and the position of both parties. An advertised price anchors a negotiation before either side has established the terms.",
      },
      {
        question: "How are transactions at this level structured?",
        answer:
          "Frequently as a share sale of the company owning the vessel rather than an asset sale, which affects tax, liability and the scope of diligence. Maritime counsel is essential from the outset rather than at signing.",
      },
    ],
    faqs: [
      {
        question: "How long does a purchase at this level take?",
        answer:
          "Three to six months is typical from first substantive contact to closing, driven by diligence depth rather than survey scheduling alone.",
      },
      {
        question: "Do you deal directly with principals?",
        answer:
          "With principals, family offices and their advisors. A significant share of activity at this level runs through a family office rather than the principal directly.",
      },
      {
        question: "How are viewings arranged above $25 million?",
        answer:
          "By arrangement, after qualification, at a time that does not disrupt the vessel's programme. Each viewing is individual rather than scheduled.",
      },
      {
        question: "Is there a market above $100 million?",
        answer:
          "There is, and it is almost entirely private. Vessels at that level are individually known within the industry, and transactions are conducted through a very small number of intermediaries.",
      },
    ],
    related: [
      { href: "/mega-yachts-for-sale", label: "Mega Yachts for Sale" },
      { href: "/yachts-for-sale-over-165-feet", label: "Over 165 ft" },
      { href: "/yachts-for-sale-10-million-25-million", label: "$10M – $25M" },
      { href: "/family-offices", label: "Family Office Advisory" },
    ],
    breadcrumb: [{ label: "Superyachts for Sale Over $25 Million" }],
  },

  // ── Size bands ────────────────────────────────────────────────────────────
  {
    slug: "yachts-for-sale-80-100-feet",
    title: "Yachts for Sale 80–100 Feet | Private Opportunities",
    metaDescription:
      "Yachts for sale between 80 and 100 feet through private channels. Confidential opportunities in the most liquid segment of the large-yacht market.",
    h1: "Yachts for Sale 80–100 Feet",
    standfirst: "The most liquid segment of the large-yacht market.",
    intro: [
      "Eighty to a hundred feet is the broadest and most active part of the yacht market. It is large enough for genuine accommodation, full-beam owner cabins and real range, while remaining small enough to dock almost anywhere and to run with a compact crew.",
      "It is also the segment where the step to permanent crew usually happens. Most owners at 80 feet still run with a captain and perhaps a mate; by 100 feet a crew of three or four is normal, and the annual cost profile changes accordingly.",
      "Resale is stronger here than anywhere else in the large-yacht market, simply because the buyer pool is deeper. That cuts both ways: good boats sell quickly, so private access matters.",
    ],
    query: { lengthBand: "80-100", sort: "length-desc" },
    inventoryHeading: "Opportunities from 80 to 100 ft",
    emptyMessage:
      "Nothing is currently published in this size band. It is the fastest-moving segment we track — submit your criteria and we will search directly.",
    answers: [
      {
        question: "Do you need crew for an 80 to 100 foot yacht?",
        answer:
          "Most owners in this range run with at least a full-time captain. By 100 feet a crew of three or four — captain, mate or engineer, chef and stewardess — is typical, particularly for extended cruising rather than day use.",
      },
      {
        question: "What does an 80 to 100 foot yacht cost to run?",
        answer:
          "Broadly $300,000 to $900,000 per year, dominated by crew salaries, dockage and insurance, with maintenance and a refit reserve on top. Usage pattern and crew size move the figure substantially.",
      },
      {
        question: "Why is this size range so popular?",
        answer:
          "It combines full-beam owner accommodation and genuine range with dockage availability and manageable running costs. The result is the deepest buyer pool of any large-yacht segment, and correspondingly the strongest resale.",
      },
    ],
    faqs: [
      {
        question: "Can I dock a 100 foot yacht easily?",
        answer:
          "In most established yachting markets, yes, though it is worth confirming beam and draft against specific marinas. Above 100 feet availability tightens noticeably.",
      },
      {
        question: "Flybridge or sport yacht?",
        answer:
          "Flybridge gives you more usable outdoor living space and better all-round visibility; sport yachts give you speed and a lower profile. It is a usage question rather than a quality one.",
      },
      {
        question: "How long do these yachts take to sell publicly?",
        answer:
          "Well-priced boats in good condition move in months rather than years, which is exactly why the good ones often never get listed.",
      },
      {
        question: "Is this a good first large yacht?",
        answer:
          "For most buyers stepping up from a 50 or 60 footer, yes. It is a significant increase in capability without the operational complexity that begins above 130 feet.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-100-130-feet", label: "100–130 ft" },
      { href: "/yachts-for-sale-under-5-million", label: "Under $5M" },
      { href: "/motor-yachts-for-sale", label: "Motor Yachts" },
      { href: "/yachts-for-sale-florida", label: "Florida" },
    ],
    breadcrumb: [{ label: "Yachts for Sale 80–100 Feet" }],
  },

  {
    slug: "yachts-for-sale-100-130-feet",
    title: "Yachts for Sale 100–130 Feet | Private Superyacht Opportunities",
    metaDescription:
      "Yachts for sale between 100 and 130 feet through private channels. Confidential opportunities at the entry point to the superyacht market.",
    h1: "Yachts for Sale 100–130 Feet",
    standfirst: "The entry point to genuine superyacht operation.",
    intro: [
      "A hundred feet is the conventional threshold where a yacht becomes a superyacht, and it is a real dividing line rather than a marketing one. Above it, permanent crew is standard, class and flag oversight applies in earnest, and the yacht requires management rather than attention.",
      "The 100 to 130 foot band is where a lot of buyers make their most significant step. The gain in capability over an 80 to 100 foot vessel is substantial — separate crew accommodation, real range, stabilisation that works at anchor — and so is the increase in cost and complexity.",
      "It is also the band where the choice between production, semi-custom and full custom becomes meaningful, and where that choice shows up most clearly in a survey a decade later.",
    ],
    query: { lengthBand: "100-130", sort: "length-desc" },
    inventoryHeading: "Opportunities from 100 to 130 ft",
    emptyMessage:
      "Nothing is currently published in this size band. Submit your acquisition criteria and we will approach the private market on your behalf.",
    answers: [
      {
        question: "Is a 100 foot yacht a superyacht?",
        answer:
          "By the most widely used industry convention, yes — 100 feet, or roughly 30 metres, is the commonly cited threshold. Above it a yacht typically carries permanent professional crew, commercial-grade systems, and class society or flag state oversight.",
      },
      {
        question: "How many crew for a 100 to 130 foot yacht?",
        answer:
          "Usually five to eight: captain, engineer, mate or bosun, chef, and one to three interior crew depending on guest numbers and whether the yacht charters.",
      },
      {
        question: "What is the difference between semi-custom and production at this size?",
        answer:
          "A production yacht is built to a fixed platform with limited owner choices; semi-custom builds an owner-specified interior and layout onto an established hull and engineering package. Semi-custom typically costs more and, where the engineering is genuinely proven, holds condition better over time.",
      },
    ],
    faqs: [
      {
        question: "Does a yacht this size need to be in class?",
        answer:
          "Not always for private use, depending on flag, but being in class materially helps with insurance, financing and resale. A yacht that has lapsed is harder to place.",
      },
      {
        question: "What range should I expect?",
        answer:
          "Highly variable. A displacement hull in this band may offer three to four thousand nautical miles; a planing yacht of the same length may offer a few hundred at cruise. Range is a hull-form question, not a length question.",
      },
      {
        question: "Are stabilisers standard?",
        answer:
          "At this size, effectively yes, and zero-speed stabilisation for use at anchor is a common and worthwhile upgrade if the yacht does not already have it.",
      },
      {
        question: "How much does a refit cost in this range?",
        answer:
          "A cosmetic refresh runs into the high hundreds of thousands; a full paint, interior and machinery refit commonly reaches seven figures. Refit history is a major component of value.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-130-165-feet", label: "130–165 ft" },
      { href: "/yachts-for-sale-80-100-feet", label: "80–100 ft" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/yachts-for-sale-under-10-million", label: "Under $10M" },
    ],
    breadcrumb: [{ label: "Yachts for Sale 100–130 Feet" }],
  },

  {
    slug: "yachts-for-sale-130-165-feet",
    title: "Yachts for Sale 130–165 Feet | Private Superyacht Opportunities",
    metaDescription:
      "Yachts for sale between 130 and 165 feet through private channels. Confidential superyacht opportunities with full crew and ocean-crossing capability.",
    h1: "Yachts for Sale 130–165 Feet",
    standfirst: "Ocean capability, full crew, and a market that transacts quietly.",
    intro: [
      "Between 130 and 165 feet a yacht becomes genuinely ocean-capable in the ordinary course of its use rather than as an occasional undertaking. Displacement hulls in this band cross oceans routinely, carry the tankage and redundancy to do it safely, and support the crew complement required.",
      "It is also the band where the operational reality becomes unavoidable. Ten to fourteen crew means payroll, rotation, training and a management company. Class surveys run on a five-year cycle with intermediate inspections. The yacht has a compliance calendar.",
      "Buyers here are typically experienced, and the transactions reflect that: quieter, more structured, more heavily documented, and rarely advertised.",
    ],
    query: { lengthBand: "130-165", sort: "length-desc" },
    inventoryHeading: "Opportunities from 130 to 165 ft",
    emptyMessage:
      "Nothing is currently published in this size band. Submit your criteria and we will search the private market directly.",
    answers: [
      {
        question: "Can a 130 to 165 foot yacht cross an ocean?",
        answer:
          "A displacement or semi-displacement hull in this range routinely can, with range typically between three and five thousand nautical miles. A planing hull of the same length generally cannot without support, so hull form matters more than length for this question.",
      },
      {
        question: "How many crew does a 150 foot yacht carry?",
        answer:
          "Typically ten to fourteen, covering bridge, engineering, deck, galley and interior, with numbers rising if the yacht operates commercially and carries a full guest complement.",
      },
      {
        question: "What does it cost to run a 150 foot yacht?",
        answer:
          "Commonly $1.5 million to $3 million per year. Crew payroll is usually the largest single component, followed by dockage, insurance, scheduled maintenance and a refit reserve of several hundred thousand annually.",
      },
    ],
    faqs: [
      {
        question: "Do these yachts need a management company?",
        answer:
          "Almost always. Crew payroll, ISM compliance where applicable, insurance and technical scheduling at this size are a full-time function that most owners contract out.",
      },
      {
        question: "How often does a yacht this size need refit?",
        answer:
          "Yard periods run annually for maintenance, with a major refit typically every five to eight years aligned to the class survey cycle.",
      },
      {
        question: "Is charter viable at this size?",
        answer:
          "Yes, with commercial registration and professional management, and it can offset a meaningful share of running costs. It also increases wear and constrains the owner's own use.",
      },
      {
        question: "Why are so few of these publicly listed?",
        answer:
          "Because the buyer pool is small and already known to the brokerage community, while the reputational and operational cost of visible marketing is high.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-over-165-feet", label: "Over 165 ft" },
      { href: "/yachts-for-sale-100-130-feet", label: "100–130 ft" },
      { href: "/yachts-for-sale-10-million-25-million", label: "$10M – $25M" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
    ],
    breadcrumb: [{ label: "Yachts for Sale 130–165 Feet" }],
  },

  {
    slug: "yachts-for-sale-over-165-feet",
    title: "Yachts for Sale Over 165 Feet | Private Mega Yacht Opportunities",
    metaDescription:
      "Yachts for sale over 165 feet / 50 metres through private channels. Confidential mega yacht opportunities presented to qualified buyers. Price often on request.",
    h1: "Yachts for Sale Over 165 Feet",
    standfirst: "A small population of vessels, individually known.",
    intro: [
      "Above 165 feet — fifty metres — the global fleet is small enough that the industry knows the vessels individually. There is no anonymity at this size, which is precisely why the market operates the way it does.",
      "These yachts are commercial-scale operations. Crew complements run into the twenties, ownership is almost invariably corporate, and the yacht has a management company, a compliance calendar and an annual budget that would run a mid-sized business.",
      "Almost nothing at this level is publicly advertised. Opportunities are communicated through a small number of intermediaries, price is generally on request, and the process from first conversation to closing runs for months.",
    ],
    query: { lengthBand: "165-plus", sort: "length-desc" },
    inventoryHeading: "Opportunities over 165 ft",
    emptyMessage:
      "Nothing is currently published above 165 ft. At this size most opportunity never is — tell us your requirement and we will approach the market directly.",
    answers: [
      {
        question: "How many yachts over 165 feet exist?",
        answer:
          "The global fleet above fifty metres is generally understood to number in the low thousands, small enough that individual vessels are known within the industry. Precise figures vary by source depending on whether sailing yachts, conversions and vessels under construction are included.",
      },
      {
        question: "What crew does a yacht over 165 feet need?",
        answer:
          "Typically fifteen to twenty-five, including a rotational bridge and engineering team, a full interior department and a chef brigade. Crew management at this scale is a professional function, not an owner responsibility.",
      },
      {
        question: "Are yachts this size registered commercially?",
        answer:
          "Frequently, even when used privately, because commercial registration allows charter and in some structures affects the fiscal position. It brings additional survey, manning and ISM compliance obligations.",
      },
    ],
    faqs: [
      {
        question: "How is a vessel this size bought?",
        answer:
          "Usually through a share sale of the owning company, negotiated between representatives, with maritime counsel on both sides and a diligence process covering class, flag, crew, management agreements and the corporate structure itself.",
      },
      {
        question: "Can these yachts be surveyed anywhere?",
        answer:
          "No. Haul-out capacity above 165 feet is limited to a relatively small number of yards worldwide, which affects survey timing and sometimes the transaction timetable.",
      },
      {
        question: "Do these opportunities have published prices?",
        answer:
          "Rarely. Price on request is the norm, both because the figure depends on the structure of the deal and because publishing it would help identify the vessel.",
      },
      {
        question: "How long does the process take?",
        answer:
          "Three to six months is normal, occasionally longer where the ownership structure or financing is complex.",
      },
    ],
    related: [
      { href: "/mega-yachts-for-sale", label: "Mega Yachts for Sale" },
      { href: "/superyachts-for-sale-over-25-million", label: "Over $25M" },
      { href: "/yachts-for-sale-130-165-feet", label: "130–165 ft" },
      { href: "/family-offices", label: "Family Office Advisory" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Over 165 Feet" }],
  },

  // ── Yacht classes ─────────────────────────────────────────────────────────
  {
    slug: "motor-yachts-for-sale",
    title: "Motor Yachts for Sale | Private & Off-Market Opportunities",
    metaDescription:
      "Motor yachts for sale through private channels. Confidential opportunities from 60 to 200+ ft across the USA, Bahamas, Caribbean and Mediterranean.",
    h1: "Motor Yachts for Sale",
    standfirst: "The largest class in the market, and the widest range of hull forms.",
    intro: [
      "Motor yacht covers more ground than any other category, from a 70 foot planing flybridge to a 200 foot full-displacement tri-deck. The single most consequential distinction inside it is hull form, and it is the thing buyers most often overlook.",
      "A planing hull is fast, shallower, and burns fuel proportionate to speed. A displacement hull is slower, deeper, dramatically more efficient at range, and far more comfortable in a seaway. A semi-displacement hull attempts both and compromises on each.",
      "Which one is right follows entirely from how the yacht will be used — day trips and short hops reward planing; extended cruising and ocean passages reward displacement. Getting that wrong is the most expensive mistake available in this category.",
    ],
    query: { type: "Motor Yacht", sort: "length-desc" },
    inventoryHeading: "Motor yacht opportunities",
    emptyMessage:
      "No motor yacht opportunities are currently published. Submit your criteria and we will search the private market directly.",
    answers: [
      {
        question: "What is the difference between planing and displacement hulls?",
        answer:
          "A planing hull rises onto the water's surface at speed, delivering higher top speed and shallower draft at the cost of fuel consumption and seakeeping. A displacement hull pushes through the water at a speed limited by its waterline length, offering far greater range and comfort. Semi-displacement sits between the two.",
      },
      {
        question: "How fast do motor yachts go?",
        answer:
          "Displacement yachts typically cruise at 10 to 12 knots. Semi-displacement vessels cruise in the high teens. Planing yachts commonly cruise in the mid-twenties with top speeds above thirty knots. Fuel consumption rises steeply with speed in every case.",
      },
      {
        question: "What is a tri-deck motor yacht?",
        answer:
          "A tri-deck has three full decks above the waterline — typically main, upper and sun deck — which substantially increases interior volume and outdoor living space for a given length. It generally appears above about 130 feet.",
      },
    ],
    faqs: [
      {
        question: "Steel or fibreglass?",
        answer:
          "Steel and aluminium construction dominates above about 130 feet, offering strength and longevity at the cost of weight and corrosion management. GRP dominates below that, being lighter, faster and lower maintenance but less suited to very large hulls.",
      },
      {
        question: "How important are stabilisers?",
        answer:
          "Very, above about 80 feet. Underway stabilisation improves comfort substantially; zero-speed stabilisation, which works at anchor, is what most owners notice the difference from day to day.",
      },
      {
        question: "What engine hours are acceptable?",
        answer:
          "Judge hours against the yacht's age and its service history rather than in isolation. A well-maintained engine with 4,000 hours and full records is a better proposition than a neglected one with 1,200.",
      },
      {
        question: "Do you handle sport yachts and express cruisers?",
        answer:
          "Yes. They sit within the motor yacht category and are well represented in the Miami and Southern California markets.",
      },
    ],
    related: [
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
      { href: "/superyachts-for-sale", label: "Superyachts" },
      { href: "/yachts-for-sale-100-130-feet", label: "100–130 ft" },
      { href: "/yachts-for-sale-florida", label: "Florida" },
    ],
    breadcrumb: [{ label: "Motor Yachts for Sale" }],
  },

  {
    slug: "explorer-yachts-for-sale",
    title: "Explorer Yachts for Sale | Private Expedition Yacht Opportunities",
    metaDescription:
      "Explorer yachts for sale through private channels. Confidential expedition yacht opportunities with long range, heavy tankage and high-latitude capability.",
    h1: "Explorer Yachts for Sale",
    standfirst: "Built for range and self-sufficiency, not for the marina.",
    intro: [
      "Explorer yachts — expedition yachts, if you prefer — are designed around a different premise from the rest of the market. Where a conventional yacht optimises for time spent at anchor near infrastructure, an explorer optimises for time spent away from it.",
      "In practice that means heavy fuel and water tankage, redundant machinery, substantial storage, serious tender and crane provision, and frequently a commercial-derived steel hull. Some carry ice class, which opens up high-latitude cruising that is simply closed to conventional yachts.",
      "The category has grown quickly, which means the label is now applied to vessels that look the part without the underlying capability. The distinction between a genuine explorer and a styling exercise shows up in the tankage figures and the machinery specification, not in the profile.",
    ],
    query: { type: "Explorer Yacht", sort: "length-desc" },
    inventoryHeading: "Explorer yacht opportunities",
    emptyMessage:
      "No explorer yacht opportunities are currently published. This is a specialised segment — submit your criteria and we will search the private market directly.",
    answers: [
      {
        question: "What is an explorer yacht?",
        answer:
          "An explorer yacht is a vessel designed for extended-range, self-sufficient cruising. Typical characteristics include a steel displacement hull, fuel and water capacity for several thousand nautical miles, redundant machinery, substantial dry stores, and heavy-lift crane and tender provision.",
      },
      {
        question: "What range does an explorer yacht have?",
        answer:
          "Genuine explorer yachts commonly offer four to six thousand nautical miles at economical cruise, with some designs exceeding that. Range is the defining specification of the category and is the first figure to check against any vessel claiming the label.",
      },
      {
        question: "What is ice class and do I need it?",
        answer:
          "Ice class certifies that a hull is reinforced to operate in specified ice conditions. It matters only for high-latitude cruising — Arctic, Antarctic, Greenland, Svalbard. If those are not in your plans it adds weight and cost without benefit; if they are, it is not optional.",
      },
    ],
    faqs: [
      {
        question: "Are explorer yachts slower?",
        answer:
          "Yes. Displacement hulls optimised for range typically cruise at 10 to 12 knots. That is the trade for the range, efficiency and seakeeping.",
      },
      {
        question: "Can an explorer yacht be used conventionally?",
        answer:
          "Certainly, and many are — the volume, stability and storage make them comfortable in conventional cruising grounds. The cost is speed and, in tight marinas, manoeuvrability.",
      },
      {
        question: "Which yards build explorer yachts?",
        answer:
          "Turkish and Dutch yards dominate the current market, with a growing number of Italian and Northern European builders entering the category. Build region is published on each opportunity; the specific yard is part of the confidential detail.",
      },
      {
        question: "Are explorer yachts good value used?",
        answer:
          "They can be, because the buyer pool is narrower than for conventional motor yachts. That cuts both ways on resale — plan to hold rather than to trade.",
      },
    ],
    related: [
      { href: "/motor-yachts-for-sale", label: "Motor Yachts" },
      { href: "/yachts-for-sale-130-165-feet", label: "130–165 ft" },
      { href: "/yachts-for-sale-california", label: "California" },
      { href: "/superyachts-for-sale", label: "Superyachts" },
    ],
    breadcrumb: [{ label: "Explorer Yachts for Sale" }],
  },

  {
    slug: "sailing-yachts-for-sale",
    title: "Sailing Yachts for Sale | Private Sailing & Catamaran Opportunities",
    metaDescription:
      "Sailing yachts and luxury catamarans for sale through private channels. Confidential opportunities in the Caribbean, Mediterranean and USA.",
    h1: "Sailing Yachts for Sale",
    standfirst: "A smaller market, with a more committed buyer.",
    intro: [
      "The large sailing yacht market is a fraction of the motor yacht market by volume, and its buyers are almost always people who actually sail. That has a useful consequence: sailing yachts tend to be bought by owners who understand what they are looking at, and maintained accordingly.",
      "The two significant sub-markets are performance-cruising monohulls, where carbon construction and lifting keels have transformed what is achievable short-handed, and luxury catamarans, which have grown rapidly on the strength of interior volume and shallow draft.",
      "Rig condition is the specification that dominates value. Standing rigging has a service life, sails have a service life, and a yacht approaching the end of both carries a six-figure liability that does not appear in the listing price.",
    ],
    query: { types: ["Sailing Yacht", "Catamaran", "Trimaran"], sort: "length-desc" },
    inventoryHeading: "Sailing yacht and catamaran opportunities",
    emptyMessage:
      "No sailing opportunities are currently published. Submit your criteria and we will search the private market directly.",
    answers: [
      {
        question: "How often does standing rigging need replacing?",
        answer:
          "Most insurers and riggers work to a replacement interval of roughly ten years for stainless standing rigging, sometimes shorter for yachts in the tropics. It is a major cost item on a large yacht, so establish the rigging date early in any diligence.",
      },
      {
        question: "What is a lifting keel and why does it matter?",
        answer:
          "A lifting keel raises to reduce draft, allowing a deep-draft performance yacht to enter shallow cruising grounds it would otherwise be excluded from — notably the Bahamas and the US Intracoastal. It adds mechanical complexity but substantially widens where the yacht can go.",
      },
      {
        question: "Are catamarans better than monohulls?",
        answer:
          "They are different. Catamarans offer far greater interior volume for a given length, shallow draft and level sailing. Monohulls offer better upwind performance, a more traditional motion, and easier marina berthing at a lower cost per foot.",
      },
    ],
    faqs: [
      {
        question: "Do large sailing yachts need crew?",
        answer:
          "Above roughly 80 feet, yes, though modern furling and powered winch systems mean the crew requirement is lower than it once was for a given size.",
      },
      {
        question: "How long do sails last?",
        answer:
          "Cruising sails in regular use typically last five to ten years depending on material, use and care. A full wardrobe for a large yacht is a significant expense.",
      },
      {
        question: "Is a carbon rig a liability on resale?",
        answer:
          "Not inherently, but it demands documented inspection history. Buyers are rightly cautious about carbon structures with no inspection record.",
      },
      {
        question: "Where is the best market for large catamarans?",
        answer:
          "The Caribbean, particularly the BVI, where the charter fleet and the private market overlap and inventory turns over regularly.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-caribbean", label: "Caribbean" },
      { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
      { href: "/yachts-for-sale", label: "All Yachts for Sale" },
      { href: "/yachts-for-sale-80-100-feet", label: "80–100 ft" },
    ],
    breadcrumb: [{ label: "Sailing Yachts for Sale" }],
  },
];
