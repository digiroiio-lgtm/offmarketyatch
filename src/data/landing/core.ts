import type { LandingPage } from "@/data/landing/types";

/** Core commercial-intent pages covering the head of the category. */
export const CORE_PAGES: LandingPage[] = [
  {
    slug: "off-market-yachts-for-sale",
    title: "Off-Market Yachts for Sale | Confidential Yacht Opportunities",
    metaDescription:
      "Off-market yachts for sale, presented confidentially. Browse privately available motor yachts, explorer yachts and superyachts in the USA, Caribbean and Mediterranean by private inquiry.",
    h1: "Off-Market Yachts for Sale",
    standfirst: "Yachts that are genuinely available and deliberately unadvertised.",
    intro: [
      "An off-market yacht for sale is a vessel whose owner is open to a transaction but has chosen not to place it on a public marketplace. The yacht is real, the willingness is real, and the absence from search results is a decision rather than an oversight.",
      "Each opportunity below is published in masked form. You can see class, approximate length, era, build region, cruising area and an estimated asking range — enough to judge whether it is worth a conversation. Identity, shipyard, exact price and current position are held back until a buyer has been qualified against the owner's terms.",
      "That asymmetry is the point. A public listing tells every broker, crew member and charter client that a yacht is for sale. A masked opportunity tells a serious buyer that something exists, and nothing more.",
    ],
    query: { sort: "recent" },
    inventoryHeading: "Currently published opportunities",
    emptyMessage:
      "No opportunities are currently published in this view. Submit your acquisition criteria and we will search the private market directly.",
    answers: [
      {
        question: "What does off-market mean when buying a yacht?",
        answer:
          "Off-market means the yacht is not advertised on public marketplaces or broker websites. The owner may be willing to sell, but has chosen to keep the vessel out of open circulation and discuss it only with buyers who are introduced privately and can demonstrate they are serious.",
      },
      {
        question: "Are off-market yachts cheaper than listed yachts?",
        answer:
          "Not automatically. What changes is the negotiating context rather than the price tag. An off-market yacht has no public listing history, so no price has been anchored and no assumption of desperation has built up over months on the market. Whether that produces a better number depends entirely on the individual owner's position.",
      },
      {
        question: "How many yachts are sold off-market?",
        answer:
          "There is no authoritative public figure, because unadvertised transactions are by definition not recorded in listing data. Brokers working at the larger end of the market widely report that a meaningful share of sales above roughly 100 feet begin as private conversations rather than public listings. Treat any precise percentage you see quoted with caution.",
      },
    ],
    faqs: [
      {
        question: "Can I see the yacht's name and shipyard before enquiring?",
        answer:
          "No. Identity and shipyard are the two attributes owners most consistently ask us to withhold, because together they identify the vessel to anyone in the industry. They are released after a person on our team has reviewed your request against the owner's disclosure terms.",
      },
      {
        question: "Is the estimated asking range the actual price?",
        answer:
          "It is the range within which the owner has indicated a transaction is realistic, published at the granularity they have authorised. It is not a quote, and it is not a valuation. The exact figure is part of the confidential detail.",
      },
      {
        question: "What happens after I submit a request?",
        answer:
          "A member of our team reviews it. If your criteria and position fit what the owner has authorised, we come back with the confidential detail under appropriate terms. If they do not, we say so — we do not send unrelated inventory to fill the silence.",
      },
      {
        question: "Do you charge buyers a fee?",
        answer:
          "Fee arrangements depend on the structure of the individual transaction and are agreed in writing before any engagement begins. Nothing on this site creates a fee obligation.",
      },
    ],
    detail: {
      heading: "Reading a masked opportunity",
      body: [
        "Every card carries a public reference such as OMY-1048. That reference is stable, so you can return to an opportunity, discuss it with an advisor, and enquire against it without ever needing the yacht's name.",
        "The availability label tells you what we actually know. 'Verified off-market' means a person has confirmed the seller position with the owner or their representative. 'Broker-sourced' means a cooperating broker holds the mandate. 'Potential opportunity' means we hold no mandate at all and the entry is research — we will investigate on your behalf, but nobody has said the yacht is for sale.",
        "Where a listing shows a profile study rather than photography, that is because no authorised imagery exists for publication. It is a drawing of the class, labelled as such. We do not use a stock photograph of a similar yacht and let you assume it is this one.",
      ],
    },
    related: [
      { href: "/private-yachts-for-sale", label: "Private Yachts for Sale" },
      { href: "/off-market-yachts-usa", label: "Off-Market Yachts USA" },
      { href: "/off-market-yachts-florida", label: "Off-Market Yachts Florida" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      {
        href: "/private-market-intelligence/what-is-an-off-market-yacht",
        label: "What Is an Off-Market Yacht?",
      },
      {
        href: "/private-market-intelligence/how-yacht-pocket-listings-work",
        label: "How Yacht Pocket Listings Work",
      },
    ],
    breadcrumb: [{ label: "Off-Market Yachts for Sale" }],
  },

  {
    slug: "private-yachts-for-sale",
    title: "Private Yachts for Sale | Confidential Yacht Sales",
    metaDescription:
      "Private yachts for sale through confidential channels. Explore privately available yachts across the USA, Bahamas, Caribbean and Mediterranean — masked listings, private inquiry only.",
    h1: "Private Yachts for Sale",
    standfirst: "Confidential sales, conducted between qualified parties.",
    intro: [
      "A private yacht sale is one conducted outside the public marketplace, between an owner who has decided not to advertise and a buyer who has been introduced rather than attracted. The mechanics of the transaction — offer, survey, sea trial, closing — are identical to a public sale. What differs is who knows it is happening.",
      "Owners choose this route for practical reasons more often than dramatic ones. A captain who reads that the yacht is for sale starts looking for another position. A charter broker who sees a listing stops placing bookings. A yard that knows an owner is exiting negotiates differently on the refit quote.",
      "The opportunities here are published at the level of detail each owner has authorised, with the identifying attributes held server-side until a request has been qualified.",
    ],
    query: { sort: "recent" },
    inventoryHeading: "Privately available opportunities",
    emptyMessage:
      "No private opportunities are currently published in this view. Tell us your criteria and we will approach the market directly on your behalf.",
    answers: [
      {
        question: "What is a private yacht sale?",
        answer:
          "A private yacht sale is a transaction conducted without public advertising. The vessel is not listed on marketplaces, its availability is communicated selectively to qualified buyers, and the identity of the yacht and its owner is disclosed only under agreed terms.",
      },
      {
        question: "Why would an owner sell a yacht privately?",
        answer:
          "Owners may prefer confidentiality, limited market exposure, operational continuity, or controlled discussions with qualified buyers. A public listing can unsettle crew, affect charter bookings, and anchor a price in the market's memory for as long as the yacht remains advertised.",
      },
      {
        question: "Is a private yacht sale legally different from a public one?",
        answer:
          "No. The contractual process is the same: an offer subject to survey and sea trial, a deposit held in escrow, an agreed acceptance period, and a closing with title transfer and registration. Confidentiality affects how a buyer is found, not how the transaction is documented.",
      },
    ],
    faqs: [
      {
        question: "How do I know the yacht is genuinely available?",
        answer:
          "Check the availability label on each opportunity. Entries marked verified off-market or private listing carry a confirmed seller position recorded against the record. Entries marked potential opportunity explicitly do not — availability is unconfirmed and we say so on the card.",
      },
      {
        question: "Will my interest be kept confidential from the seller?",
        answer:
          "Your identity is shared with an owner or their representative only when you have agreed that it should be. Confidentiality runs in both directions, and buyers at this level frequently have their own reasons for discretion.",
      },
      {
        question: "Can I be represented by my own broker?",
        answer:
          "Yes. Buyers regularly come to us through their existing broker or advisor, and cooperating arrangements are normal in this market.",
      },
      {
        question: "How long does a private yacht purchase take?",
        answer:
          "Once a buyer and seller agree terms, the process typically runs from a few weeks to a few months depending on survey scheduling, the yacht's location, and the complexity of the ownership structure. Finding the right yacht usually takes longer than transacting on it.",
      },
    ],
    related: [
      { href: "/off-market-yachts-for-sale", label: "Off-Market Yachts for Sale" },
      { href: "/sell-your-yacht-privately", label: "Sell Your Yacht Privately" },
      { href: "/yachts-for-sale-usa", label: "Yachts for Sale USA" },
      {
        href: "/private-market-intelligence/how-to-buy-a-yacht-privately",
        label: "How to Buy a Yacht Privately",
      },
    ],
    breadcrumb: [{ label: "Private Yachts for Sale" }],
  },

  {
    slug: "yachts-for-sale",
    title: "Yachts for Sale | Private & Off-Market Yacht Opportunities",
    metaDescription:
      "Yachts for sale through a private acquisition platform. Motor yachts, explorer yachts, sailing yachts and superyachts from $2M to $50M+, in the USA, Caribbean and Mediterranean.",
    h1: "Yachts for Sale",
    standfirst: "The inventory you can find publicly is not the whole market.",
    intro: [
      "Search any public marketplace and you will see the yachts whose owners have decided to advertise. That is a real market and a useful one, but it is a subset. Alongside it sits a quieter population of vessels whose owners would transact at the right number and have chosen not to be listed.",
      "This platform works in the second category. Every yacht for sale here is published in masked form — enough detail to assess fit, not enough to identify the vessel — with the confidential attributes released after a buyer has been qualified.",
      "Use the filters to narrow by price band, length, cruising area, class and build region. If nothing matches, that is worth knowing too: submit your criteria and we will search the private market rather than send you the closest available compromise.",
    ],
    query: { sort: "recent" },
    inventoryHeading: "All published opportunities",
    emptyMessage:
      "Nothing is currently published against this view. Submit your acquisition criteria and we will search beyond publicly advertised inventory.",
    answers: [
      {
        question: "What size yacht should I buy?",
        answer:
          "The practical dividing lines are crew and berth. Below roughly 80 feet most owners can run the boat themselves with occasional help. Between 80 and 130 feet permanent crew becomes normal. Above 130 feet you are operating a small business with payroll, class certification and a management structure, and the annual running cost typically lands somewhere around a tenth of the purchase price.",
      },
      {
        question: "How much does a yacht cost to run each year?",
        answer:
          "A widely used industry rule of thumb is roughly ten percent of the purchase price per year covering crew, dockage, insurance, fuel, maintenance and a refit reserve. It is a planning figure rather than a quote: usage pattern, crew size, cruising area and the yacht's age move it substantially in both directions.",
      },
      {
        question: "Should I buy a new yacht or a used one?",
        answer:
          "A new build gives you specification control and a warranty, at the cost of a delivery slot measured in years and a first-owner depreciation step. A recent used yacht gives you immediate availability and a survey you can act on. In the private market the most common sweet spot is a two-to-five-year-old vessel with warranty balance remaining and its commissioning faults already resolved.",
      },
    ],
    faqs: [
      {
        question: "Why don't the listings show the yacht's name?",
        answer:
          "Because these are off-market and privately available yachts. Publishing the name would identify the vessel and defeat the confidentiality the owner is relying on. Names are disclosed to qualified buyers under appropriate terms.",
      },
      {
        question: "Can you find a yacht that isn't on this site?",
        answer:
          "That is the larger part of what we do. Submit your criteria through the private search funnel and we approach owners, captains and cooperating brokers directly to find out what is genuinely available and unadvertised.",
      },
      {
        question: "Do you sell yachts under $2 million?",
        answer:
          "Our published inventory generally begins around $2 million, because below that level the public market is efficient and a private approach adds little. We can still take an acquisition brief at a lower level if the requirement is specific.",
      },
      {
        question: "Are prices in US dollars?",
        answer:
          "Yes. All pricing on this site is presented in USD and all lengths lead in feet, with metres shown secondarily. Transactions may be denominated in another currency depending on the vessel and the parties.",
      },
    ],
    related: [
      { href: "/luxury-yachts-for-sale", label: "Luxury Yachts for Sale" },
      { href: "/motor-yachts-for-sale", label: "Motor Yachts for Sale" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts for Sale" },
      { href: "/sailing-yachts-for-sale", label: "Sailing Yachts for Sale" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/yachts-for-sale-usa", label: "Yachts for Sale USA" },
    ],
    breadcrumb: [{ label: "Yachts for Sale" }],
  },

  {
    slug: "luxury-yachts-for-sale",
    title: "Luxury Yachts for Sale | Private Market Opportunities",
    metaDescription:
      "Luxury yachts for sale through private and off-market channels. Confidential opportunities from $5M to $50M+ across Florida, the USA, Caribbean and Mediterranean.",
    h1: "Luxury Yachts for Sale",
    standfirst: "Where the specification justifies a private conversation.",
    intro: [
      "Above roughly $5 million the yacht market stops behaving like a retail market. Comparable vessels are few, the buyer pool is small and well-connected, and both sides of a transaction usually have reasons to keep it quiet. That is the market these opportunities sit in.",
      "What distinguishes a genuinely luxury yacht from an expensive one is usually invisible in a listing photograph: the quality of the engineering behind the joinery, whether the yacht has been maintained to a schedule or to a budget, and whether the interior was specified by the owner or by a yard's standard package.",
      "Those are exactly the things a masked opportunity forces you to ask about rather than assume. The public description here tells you the class and the condition. The specification that supports it comes with qualification.",
    ],
    query: { priceBand: undefined, sort: "price-desc" },
    inventoryHeading: "Luxury opportunities by value",
    emptyMessage:
      "No opportunities in this bracket are currently published. Tell us what you are looking for and we will search the private market.",
    answers: [
      {
        question: "What counts as a luxury yacht?",
        answer:
          "There is no formal threshold. In practice the term is used for yachts with permanent professional crew, custom or semi-custom construction, and a specification driven by an owner rather than a production line — which in the current market generally means vessels above roughly 80 feet and $5 million.",
      },
      {
        question: "What should I check before buying a luxury yacht?",
        answer:
          "Maintenance records from delivery, the date and scope of the last major survey, any outstanding class or flag conditions, the engine and generator hours against their service intervals, and whether the yacht has been chartered. A chartered yacht has worked harder than a privately used one of the same age.",
      },
      {
        question: "How is a luxury yacht valued?",
        answer:
          "By comparison to recent transactions on similar hulls, adjusted for condition, refit history, specification and location. Because private transactions are not publicly recorded, comparable data at this level is imperfect, which is one reason valuations vary more widely than buyers expect.",
      },
    ],
    faqs: [
      {
        question: "Is a refit better than a newer yacht?",
        answer:
          "It depends on what the refit covered. Paint and interiors change how a yacht presents; machinery survey items, tankage and systems change what it costs to own. A well-documented technical refit on an older hull can be worth more to a buyer than a cosmetic refresh on a newer one.",
      },
      {
        question: "Do you handle yachts above $50 million?",
        answer:
          "Yes. At that level almost nothing is publicly listed, price is typically shown on request only, and the process is a structured, documented one conducted through representatives.",
      },
      {
        question: "Can I charter before I buy?",
        answer:
          "Sometimes, where the yacht operates commercially and the owner is willing. It is not usually possible on a privately used vessel, and it is never something we would promise before speaking to the owner's side.",
      },
      {
        question: "What is included in the sale?",
        answer:
          "Tenders, toys, spares and interior items vary from sale to sale and are itemised in the inventory schedule attached to the memorandum of agreement. Assume nothing is included until it appears on that schedule.",
      },
    ],
    related: [
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/mega-yachts-for-sale", label: "Mega Yachts for Sale" },
      { href: "/yachts-for-sale-10-million-25-million", label: "$10M – $25M Opportunities" },
      {
        href: "/private-market-intelligence/how-much-does-a-superyacht-cost",
        label: "How Much Does a Superyacht Cost?",
      },
    ],
    breadcrumb: [{ label: "Luxury Yachts for Sale" }],
  },

  {
    slug: "superyachts-for-sale",
    title: "Superyachts for Sale | Off-Market & Private Superyacht Opportunities",
    metaDescription:
      "Superyachts for sale through private channels. Confidential opportunities over 100 ft in Florida, the Caribbean, the Mediterranean and beyond — masked listings, qualified buyers only.",
    h1: "Superyachts for Sale",
    standfirst: "Above 100 feet, the private market is the market.",
    intro: [
      "Superyacht is used loosely, but the practical threshold most of the industry works to is around 100 feet — the point at which permanent crew, commercial-grade systems and formal class or flag oversight become standard rather than optional.",
      "At this size the confidentiality logic becomes compelling. A visible listing reaches a buyer pool small enough that most of them will hear about the yacht anyway through their broker, while simultaneously reaching the crew, the charter market and every yard the owner will negotiate with. The information asymmetry runs against the owner.",
      "The result is that a substantial share of superyacht transactions begin privately. The opportunities below are published at the granularity each owner has authorised, with identity, exact price and current position withheld.",
    ],
    query: { types: ["Superyacht", "Motor Yacht", "Explorer Yacht"], lengthBand: undefined, sort: "length-desc" },
    inventoryHeading: "Superyacht opportunities by length",
    emptyMessage:
      "No superyacht opportunities are currently published. Submit your criteria and we will approach the private market on your behalf.",
    answers: [
      {
        question: "What is a superyacht?",
        answer:
          "A superyacht is generally a professionally crewed yacht above roughly 100 feet, or about 30 metres. Above that length a yacht typically requires permanent crew, carries commercial-grade machinery and tankage, and falls under class society and flag state oversight that smaller vessels do not.",
      },
      {
        question: "How much does a superyacht cost?",
        answer:
          "Entry to the used superyacht market currently sits in the region of $5 million to $10 million for a well-maintained vessel in the 100 to 120 foot range. Above 150 feet, prices commonly run from the low tens of millions into the hundreds for recent custom builds. Annual running costs are conventionally estimated at around ten percent of value.",
      },
      {
        question: "How many crew does a superyacht need?",
        answer:
          "A rough guide is one crew member per ten feet of length, adjusted for the yacht's use. A 130 foot privately used yacht might run six to eight crew; a 200 foot yacht operating charter can require twenty or more, including a rotational engineering and interior team.",
      },
    ],
    faqs: [
      {
        question: "Does a superyacht need to be commercially registered?",
        answer:
          "Only if it will be chartered. Commercial registration brings additional survey and manning requirements but allows charter income and, in some jurisdictions, affects the VAT and import position. Many privately used yachts remain on a private registry deliberately.",
      },
      {
        question: "What is class and why does it matter?",
        answer:
          "Class societies certify that a vessel meets structural and machinery standards, and maintain that certification through a survey cycle. A yacht 'in class' with current certificates is materially easier to insure, finance and resell than one that has lapsed.",
      },
      {
        question: "Can a superyacht be bought without the name being disclosed?",
        answer:
          "The name is disclosed to a qualified buyer before any offer is made — you cannot survey a yacht you cannot identify. What confidentiality protects is disclosure to the market at large, not disclosure to the buyer who is transacting.",
      },
      {
        question: "How long does a superyacht sale take?",
        answer:
          "Typically two to four months from agreed terms to closing, driven mainly by survey and haul-out scheduling. Complex ownership structures, financing, or a yacht positioned far from a suitable yard can extend that considerably.",
      },
    ],
    related: [
      { href: "/mega-yachts-for-sale", label: "Mega Yachts for Sale" },
      { href: "/superyachts-for-sale-florida", label: "Superyachts for Sale Florida" },
      { href: "/superyachts-for-sale-over-25-million", label: "Superyachts Over $25M" },
      { href: "/yachts-for-sale-over-165-feet", label: "Yachts Over 165 ft" },
      {
        href: "/private-market-intelligence/how-to-buy-a-superyacht",
        label: "How to Buy a Superyacht",
      },
    ],
    breadcrumb: [{ label: "Superyachts for Sale" }],
  },

  {
    slug: "mega-yachts-for-sale",
    title: "Mega Yachts for Sale | Private Opportunities Over 165 ft",
    metaDescription:
      "Mega yachts for sale through confidential channels. Private opportunities over 165 ft / 50 m, presented to qualified buyers only. Price on request.",
    h1: "Mega Yachts for Sale",
    standfirst: "Above 165 feet, almost nothing is publicly listed.",
    intro: [
      "The term mega yacht has no formal definition, but it is generally applied above roughly 165 feet — the point at which a yacht is unambiguously a commercial-scale vessel with a crew complement in the teens or twenties and a management structure behind it.",
      "At this size the population of vessels is small enough to be individually known within the industry, and the population of credible buyers is smaller still. Public advertising serves almost no purpose: everyone who could buy the yacht is already reachable through three phone calls.",
      "So this is where the private market operates most completely. Most opportunities at this level carry price on request rather than a published range, and disclosure follows a structured process rather than a form submission.",
    ],
    query: { lengthBand: "165-plus", sort: "length-desc" },
    inventoryHeading: "Opportunities over 165 ft",
    emptyMessage:
      "No opportunities over 165 ft are currently published. At this level most inventory is never published at all — tell us your requirement and we will approach the market directly.",
    answers: [
      {
        question: "What is the difference between a superyacht and a mega yacht?",
        answer:
          "The terms overlap and neither is formally defined. In common industry use, superyacht covers vessels above roughly 100 feet, while mega yacht is reserved for the largest tier — commonly above 165 feet, or 50 metres. Some in the market use gigayacht above 300 feet.",
      },
      {
        question: "Why do mega yacht listings show price on request?",
        answer:
          "Because at this level the price is part of the negotiation rather than an advertised figure, and because publishing it would help identify the vessel. A published number also anchors expectations before either side has established what is included in the sale.",
      },
      {
        question: "How long does it take to buy a mega yacht?",
        answer:
          "Realistically three to six months from first contact to closing. Diligence at this size covers class and flag standing, crew contracts, management agreements, the refit history and often a corporate ownership structure that has to be examined in its own right.",
      },
    ],
    faqs: [
      {
        question: "Are mega yachts bought through companies?",
        answer:
          "Almost always. Vessels at this level are typically held in a special purpose company, and the transaction is frequently structured as a share sale rather than an asset sale. That materially changes the diligence required and should involve maritime counsel from the outset.",
      },
      {
        question: "What crew arrangements transfer with the yacht?",
        answer:
          "Crew contracts do not transfer automatically. Retaining an experienced captain and chief engineer through a sale is often valuable to a buyer, and it is a point to raise early rather than at closing.",
      },
      {
        question: "Can a mega yacht be viewed before an offer is made?",
        answer:
          "Viewings are arranged individually after qualification and are not open to browsing. Whether one happens before or after an offer depends on the owner's terms, but any offer is made subject to survey and sea trial.",
      },
      {
        question: "Do you work with family offices directly?",
        answer:
          "Yes. A significant share of activity at this size runs through family offices and their advisors rather than through principals directly.",
      },
    ],
    related: [
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/superyachts-for-sale-over-25-million", label: "Superyachts Over $25M" },
      { href: "/yachts-for-sale-over-165-feet", label: "Yachts Over 165 ft" },
      { href: "/family-offices", label: "Family Office Advisory" },
    ],
    breadcrumb: [{ label: "Mega Yachts for Sale" }],
  },
];
