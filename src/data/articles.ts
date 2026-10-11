/**
 * Private Market Intelligence — the editorial cluster.
 *
 * Each article is written to be useful on its own and quotable out of context.
 * `answers` are the AI-citable units: short, factual, and true when lifted
 * away from the surrounding page. Where a figure is genuinely uncertain, the
 * copy says so rather than inventing precision.
 */

import { FLORIDA_TAX_SOURCES, DEPOSIT_NOTES, mergeSources, type SourceNotes } from "@/data/sources";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  standfirst: string;
  /** Grouping shown on the hub. */
  cluster: "Private Market" | "Buying" | "USA & Florida" | "Process";
  readingMinutes: number;
  published: string;
  updated: string;
  /** Lead paragraph, rendered above the answer blocks. */
  intro: string[];
  answers: { question: string; answer: string }[];
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  related: string[];
  /** Contextual links into inventory and funnels. */
  inventoryLinks: { href: string; label: string }[];
  /** References and caveats for tax, duty or contract claims in this article. */
  sources?: SourceNotes;
}

export const ARTICLES: Article[] = [
  {
    slug: "what-is-an-off-market-yacht",
    title: "What Is an Off-Market Yacht?",
    metaTitle: "What Is an Off-Market Yacht? | Definition & How They Work",
    metaDescription:
      "An off-market yacht is one whose owner may sell but has chosen not to advertise it publicly. How the category works, why it exists, and how buyers access it.",
    standfirst:
      "The definition, the reasons the category exists, and what it actually means for a buyer.",
    cluster: "Private Market",
    readingMinutes: 6,
    published: "2026-06-02",
    updated: "2026-09-01",
    intro: [
      "The phrase is used loosely across the industry, and that looseness costs buyers time. A broker saying they have off-market inventory might mean a yacht with a signed private mandate, or might mean a boat they think could be available if someone asked. Those are very different propositions.",
      "This is what the term means precisely, why owners choose it, and how to tell a genuine off-market opportunity from a speculative one.",
    ],
    answers: [
      {
        question: "What is an off-market yacht?",
        answer:
          "An off-market yacht is a yacht whose owner may be open to selling but has chosen not to publicly advertise the vessel. It does not appear on public yacht marketplaces or broker listing pages, and it is discussed selectively with buyers who are introduced privately.",
      },
      {
        question: "Why are yachts sold off-market?",
        answer:
          "Owners may prefer confidentiality, limited market exposure, operational continuity, or controlled discussions with qualified buyers. A public listing can unsettle crew, interrupt charter bookings, weaken the owner's negotiating position, and create a price history that follows the yacht for years.",
      },
      {
        question: "How do buyers find off-market yachts?",
        answer:
          "Off-market opportunities are typically discovered through broker relationships, private owner networks, industry contacts and targeted acquisition searches. Because they are not published, they cannot be found through search — they are reached through introduction.",
      },
    ],
    sections: [
      {
        heading: "What separates off-market from simply unsold",
        paragraphs: [
          "A yacht that has been publicly listed for eighteen months and quietly withdrawn is not off-market. It is a yacht the market has already seen and declined at the asking price. The distinction matters, because a listing history is public information that shapes every subsequent negotiation.",
          "A genuinely off-market yacht has never been exposed. There is no accumulated record of price reductions, no impression of a seller growing impatient, and no set of brokers who have already shown it to their clients.",
        ],
      },
      {
        heading: "The four categories you will encounter",
        paragraphs: [
          "In practice, what gets called off-market covers a spectrum of certainty, and the difference between the ends of that spectrum is the difference between a transaction and a wild goose chase.",
        ],
        bullets: [
          "Verified off-market — the owner or their representative has confirmed, in a form that can be recorded, that they will transact at the right number.",
          "Private listing — the owner has authorised a private sale process, with terms on disclosure agreed in advance.",
          "Broker-sourced — a cooperating broker holds a mandate but has not advertised the vessel. Often called a pocket listing.",
          "Potential opportunity — nobody has said the yacht is for sale. Someone has inferred it might be, from ownership patterns, usage, or a new build on order. This is research, not availability.",
        ],
      },
      {
        heading: "Why the owner's reasoning is usually mundane",
        paragraphs: [
          "Buyers sometimes assume confidentiality implies something dramatic — a distressed sale, a divorce, a legal problem. Occasionally it does. Far more often the reasoning is operational and quite boring.",
          "A captain who learns the yacht is listed starts applying for other positions, and a good captain is harder to replace than most owners expect. A charter broker who sees a listing stops placing bookings, because they cannot sell a week on a yacht that may have a new owner by then. A yard quoting for a refit prices differently when they know the owner is exiting.",
          "Set against those costs, a public listing buys the owner exposure to a buyer pool that, above a certain size of yacht, is already reachable through a handful of intermediaries.",
        ],
      },
      {
        heading: "What it means for the buyer",
        paragraphs: [
          "The advantage is not automatically price. It is a cleaner negotiating position, access to yachts that were never on your list because you could not see them, and a seller who has not spent a year being ground down.",
          "The disadvantage is information. Public listings come with photographs, full specifications and a price. An off-market opportunity gives you a masked description and requires you to engage before you know what you are looking at. That asymmetry is the cost of access.",
          "It also means diligence carries more weight. With less public information to triangulate against, the survey and sea trial do more of the work. Never waive them because a yacht came through a private channel.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are off-market yachts cheaper?",
        answer:
          "Not systematically. What changes is the negotiating context — no public listing history, no accumulated price reductions, no assumption of desperation. Whether that produces a better number depends on the individual owner's position.",
      },
      {
        question: "Can I trust an off-market listing is real?",
        answer:
          "Ask directly: has the seller position been confirmed, by whom, and when. A broker who cannot answer that is describing a possibility rather than an opportunity, and that is worth knowing before you spend time on it.",
      },
      {
        question: "Do off-market yachts still need surveys?",
        answer:
          "Yes, and arguably more rigorously than listed yachts, precisely because there is less public information to cross-check against.",
      },
      {
        question: "How do I get access to off-market yachts?",
        answer:
          "Register your acquisition criteria with someone who has genuine owner relationships, and be specific about budget, size and timeline. Vague criteria produce vague results, because a broker cannot approach an owner on behalf of a buyer who has not decided what they want.",
      },
    ],
    related: [
      "how-to-find-off-market-yachts-for-sale",
      "how-yacht-pocket-listings-work",
      "off-market-vs-public-yacht-listings",
    ],
    inventoryLinks: [
      { href: "/off-market-yachts", label: "Browse off-market opportunities" },
      { href: "/off-market-yachts-usa", label: "Off-market yachts in the USA" },
    ],
  },

  {
    slug: "how-to-find-off-market-yachts-for-sale",
    title: "How to Find Off-Market Yachts for Sale",
    metaTitle: "How to Find Off-Market Yachts for Sale | Four Routes That Work",
    metaDescription:
      "The four realistic routes into off-market yacht inventory, what each one costs you, and how to make an acquisition search actually produce results.",
    standfirst: "Four routes into private inventory, and what each one realistically delivers.",
    cluster: "Private Market",
    readingMinutes: 7,
    published: "2026-06-09",
    updated: "2026-09-02",
    intro: [
      "You cannot search for something that is not published. That sounds obvious, but it is the point most buyers take longest to accept — they keep refreshing listing sites hoping the yacht they want will appear.",
      "There are four routes into off-market inventory that actually work. They differ in cost, in speed, and in how much of the work falls on you.",
    ],
    answers: [
      {
        question: "How do you find yachts that are not publicly listed?",
        answer:
          "Through four routes: brokers with genuine owner relationships who hold unadvertised mandates, captains and yacht management companies who know which vessels are coming available, direct approaches to owners of specific yachts you have identified, and a retained acquisition search where someone conducts those approaches on your behalf.",
      },
      {
        question: "Can I approach a yacht owner directly?",
        answer:
          "You can, but it rarely works well. An unsolicited approach from an unknown individual is easy to dismiss and can be read as intrusive. An approach made through a representative, which establishes that the buyer is real and qualified without immediately naming them, gets a substantive answer far more often.",
      },
      {
        question: "What is a retained yacht acquisition search?",
        answer:
          "A retained acquisition search is an engagement in which a buyer instructs a broker or advisor to actively find a yacht matching defined criteria, including by approaching owners of vessels that are not for sale. It differs from browsing listings in that the search creates opportunities rather than selecting among existing ones.",
      },
    ],
    sections: [
      {
        heading: "Route one: brokers with real owner relationships",
        paragraphs: [
          "Every broker will tell you they have off-market access. The useful question is a different one: which owners do you personally have a relationship with, and when did you last speak to them?",
          "A broker who has managed a yacht's sale, its refit, or its crewing has a reason to call the owner. A broker who has only ever met them at a boat show does not. The distinction determines whether an approach on your behalf gets a real answer or a polite deflection.",
        ],
      },
      {
        heading: "Route two: captains and management companies",
        paragraphs: [
          "Captains know before brokers do. A captain is told the owner has ordered a new build, or that the family's usage has dropped to two weeks a year, months before any decision to sell is formalised.",
          "Yacht management companies occupy a similar position with better records. They see the maintenance spend, the usage logs and the budget conversations. Both are legitimate sources of intelligence, and both are why so much of this market moves before it is visible.",
        ],
      },
      {
        heading: "Route three: the direct approach",
        paragraphs: [
          "If you have identified a specific yacht you want, an approach can be made. It should be made through a representative, it should be discreet, and it should carry enough credibility that the owner takes it seriously.",
          "Expect most approaches to receive a no. That is not failure — it is the normal ratio, and the occasional yes is what makes the exercise worthwhile. Buyers who cannot tolerate that ratio are better served by waiting for inventory.",
        ],
      },
      {
        heading: "Route four: a retained search",
        paragraphs: [
          "A retained acquisition search formalises the third route. You define the criteria, someone systematically identifies every vessel that matches, and approaches are made on your behalf.",
          "It works best when the criteria are genuinely specific. 'A nice 130 footer' cannot be searched for. '130 to 150 feet, displacement, built after 2015 by a Northern European yard, under 6,000 hours, US-based, up to $22 million' can be turned into a list of about twenty vessels, and every one of them can be approached.",
        ],
      },
      {
        heading: "What makes a search fail",
        paragraphs: [
          "Three things, in order of frequency. Criteria too vague to act on. A budget the buyer has not genuinely committed to, which becomes obvious the moment an owner engages. And a timeline that does not survive contact with reality — private acquisitions take months, and a buyer who needs a yacht by June is buying a listed one.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does an off-market search take?",
        answer:
          "Typically three to nine months from brief to closing, depending on how specific the criteria are and how many matching vessels exist. A tightly defined search in a deep market like Florida moves faster than a broad one in a thin market.",
      },
      {
        question: "Do I pay for a retained search?",
        answer:
          "Arrangements vary. Some are commission-based on completion, some involve a retainer credited against commission. Whatever the structure, it should be agreed in writing before work begins.",
      },
      {
        question: "Should I use more than one broker?",
        answer:
          "For browsing listed inventory, it makes little difference. For a retained search it is counterproductive — multiple representatives approaching the same owners on behalf of the same buyer damages your credibility quickly.",
      },
      {
        question: "Can I search off-market and listed inventory at the same time?",
        answer:
          "Yes, and most buyers should. They are complementary: listed inventory tells you what the market looks like and what things cost, which makes you a better judge of a private opportunity when one appears.",
      },
    ],
    related: [
      "what-is-an-off-market-yacht",
      "how-yacht-pocket-listings-work",
      "private-yacht-acquisition-guide",
    ],
    inventoryLinks: [
      { href: "/request-private-access", label: "Register your acquisition criteria" },
      { href: "/off-market-yachts", label: "Browse current opportunities" },
    ],
  },

  {
    slug: "how-yacht-pocket-listings-work",
    title: "How Yacht Pocket Listings Work",
    metaTitle: "How Yacht Pocket Listings Work | Private Broker Inventory",
    metaDescription:
      "What a yacht pocket listing is, why brokers hold them, what it means for price discovery, and how a buyer gets access to unadvertised broker inventory.",
    standfirst: "The unadvertised mandate: who holds them, why, and what it costs you.",
    cluster: "Private Market",
    readingMinutes: 5,
    published: "2026-06-16",
    updated: "2026-08-28",
    intro: [
      "Borrowed from real estate, the term describes something that has existed in yacht brokerage for as long as yacht brokerage has existed: a vessel a broker is authorised to sell but has chosen not to advertise.",
      "It is entirely legitimate, extremely common, and has consequences for price discovery that buyers should understand.",
    ],
    answers: [
      {
        question: "What is a yacht pocket listing?",
        answer:
          "A pocket listing is a yacht that a broker has been authorised by the owner to sell, but has not publicly advertised. The broker keeps it 'in their pocket' and shows it selectively to buyers they judge to be qualified and genuinely interested.",
      },
      {
        question: "Why do brokers hold pocket listings?",
        answer:
          "Usually because the owner asked for confidentiality. Sometimes because the broker believes they can match the yacht to a known buyer without advertising, retaining the full commission rather than sharing it with a co-broker. Both motivations are ordinary and legal.",
      },
      {
        question: "How does a buyer see pocket listings?",
        answer:
          "By being known to the brokers who hold them. That means registering specific criteria, demonstrating you can transact at the level you claim, and being someone a broker will think of when a mandate arrives. Casual enquiries do not surface pocket inventory.",
      },
    ],
    sections: [
      {
        heading: "The commission incentive, stated plainly",
        paragraphs: [
          "In a conventional listing, a broker who brings the buyer shares commission with the listing broker. In a pocket listing matched to the listing broker's own client, no sharing occurs.",
          "That is a real incentive and it is worth understanding, because it means some pocket listings stay in a pocket longer than serves the owner. A broker holding a mandate and hoping to match it internally is optimising for their outcome as well as the owner's.",
        ],
      },
      {
        heading: "What it does to price discovery",
        paragraphs: [
          "Prices in the yacht market are already opaque. Asking prices are published, but transaction prices generally are not, and the gap between them varies enormously.",
          "Pocket listings widen that opacity. A vessel that never carried a public asking price gives you no anchor at all — which cuts both ways. You cannot tell whether you are being quoted well, and neither can the seller tell whether they are asking well.",
          "The practical response is to build your own comparable set from listed inventory before engaging on a private opportunity, so you arrive with an independent view of value.",
        ],
      },
      {
        heading: "How to become a buyer brokers call",
        paragraphs: [
          "Specificity and credibility, in that order. A broker matching a pocket listing needs to think of you, which requires that your criteria are memorable and narrow enough to trigger recognition.",
          "Credibility follows from responsiveness and consistency. A buyer who asked about a 120 foot displacement yacht last month and a 90 foot sportfish this month is not a buyer anyone can place.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are pocket listings legal?",
        answer:
          "Yes. A broker acting on an owner's instruction not to advertise is doing exactly what they have been engaged to do. The obligations that apply are the ordinary fiduciary ones — acting in the owner's interest and disclosing conflicts.",
      },
      {
        question: "Do pocket listings sell for less?",
        answer:
          "There is no reliable data either way, because neither pocket listing prices nor transaction prices are systematically published. The theoretical argument runs both directions: less competition may soften the price, but no listing history removes the downward drift that affects long-listed yachts.",
      },
      {
        question: "Can I ask a broker what pocket listings they hold?",
        answer:
          "You can ask, and a good broker will describe what fits your criteria without breaching a confidentiality instruction — usually in masked terms first, exactly as this platform publishes them.",
      },
      {
        question: "Is a pocket listing the same as off-market?",
        answer:
          "It is one type of off-market inventory. Off-market also covers owners who have not engaged a broker at all, which pocket listing by definition excludes.",
      },
    ],
    related: [
      "what-is-an-off-market-yacht",
      "how-to-find-off-market-yachts-for-sale",
      "off-market-vs-public-yacht-listings",
    ],
    inventoryLinks: [
      { href: "/off-market-yachts", label: "Browse broker-sourced opportunities" },
      { href: "/yacht-brokers", label: "Broker cooperation" },
    ],
  },

  {
    slug: "off-market-vs-public-yacht-listings",
    title: "Off-Market vs Public Yacht Listings",
    metaTitle: "Off-Market vs Public Yacht Listings | A Direct Comparison",
    metaDescription:
      "A direct comparison of off-market and publicly listed yachts across price, choice, information, speed, diligence and negotiating position.",
    standfirst: "Where each route genuinely wins, and where the received wisdom is wrong.",
    cluster: "Private Market",
    readingMinutes: 6,
    published: "2026-06-23",
    updated: "2026-08-30",
    intro: [
      "Most comparisons of these two routes are written by people who benefit from one of them. Here is a straight assessment of where each actually has the advantage.",
    ],
    answers: [
      {
        question: "Is it better to buy a yacht off-market or from a public listing?",
        answer:
          "Neither is better in general. Public listings win on choice, information and speed of assessment. Off-market wins on negotiating position, access to vessels that were never available to you, and seller quality. Most serious buyers work both routes simultaneously.",
      },
      {
        question: "Do off-market yachts sell for less than listed yachts?",
        answer:
          "There is no reliable evidence that they do systematically, because private transaction prices are not published. What is observable is that publicly listed yachts tend to accumulate price reductions over time, which off-market vessels avoid by never being exposed.",
      },
    ],
    sections: [
      {
        heading: "Where public listings win",
        paragraphs: [
          "Choice, obviously. You can see hundreds of vessels in an afternoon and build a genuine sense of the market — what a 110 foot flybridge from a particular era actually costs, and what condition looks like at that price.",
          "Information. A listing carries a full specification, photography, and an asking price. You can form a view before spending anyone's time.",
          "Speed. If you need a yacht for this season, the listed market is where you find one. Private acquisitions run on their own timetable.",
        ],
      },
      {
        heading: "Where off-market wins",
        paragraphs: [
          "Access. The most important advantage, and the one buyers underestimate. There are yachts you would buy tomorrow that you will never see listed, because their owners will never list them.",
          "Negotiating position. No public price history, no visible time-on-market, no accumulated reductions signalling that the seller has been waiting.",
          "Seller quality. Owners who transact privately are frequently doing so from a position of choice rather than pressure. That makes for a more straightforward process, if not necessarily a cheaper one.",
        ],
      },
      {
        heading: "Where the received wisdom is wrong",
        paragraphs: [
          "The claim that off-market yachts are systematically better value does not survive scrutiny. It is repeated because it is a useful thing for private brokers to say, and because the absence of public transaction data means nobody can disprove it either.",
          "The opposite claim — that off-market means something is wrong with the boat — is equally unfounded. The most common reason for confidentiality is that the owner has a functioning yacht, a good crew and no wish to disrupt either.",
        ],
      },
      {
        heading: "The practical approach",
        paragraphs: [
          "Use the listed market to educate yourself. Look at everything in your bracket, understand what condition and specification cost, and form an independent view of value.",
          "Then work the private channel with that knowledge, which is what lets you judge a masked opportunity quickly when one appears.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can the same yacht be both listed and off-market?",
        answer:
          "Not simultaneously in any meaningful sense. A yacht that was listed and withdrawn is sometimes re-presented as off-market, which is misleading — the listing history exists and a diligent buyer will find it.",
      },
      {
        question: "Which route is faster?",
        answer:
          "The listed market, for finding a yacht. Once terms are agreed, the transaction timeline is identical because the survey, sea trial and closing process is the same.",
      },
      {
        question: "Do I need a different broker for each?",
        answer:
          "No. Most brokers handle both, though not all have genuine off-market access. Ask specifically about owner relationships rather than accepting a general claim.",
      },
      {
        question: "Should a first-time buyer look off-market?",
        answer:
          "Look at listed inventory first, in volume. Without a working sense of the market you cannot evaluate a masked opportunity, and you will either overpay or hesitate on a good one.",
      },
    ],
    related: [
      "what-is-an-off-market-yacht",
      "how-yacht-pocket-listings-work",
      "how-to-buy-a-yacht-privately",
    ],
    inventoryLinks: [
      { href: "/off-market-yachts-for-sale", label: "Off-market yachts for sale" },
      { href: "/yachts-for-sale", label: "All yachts for sale" },
    ],
  },

  {
    slug: "how-to-buy-a-yacht-privately",
    sources: DEPOSIT_NOTES,
    title: "How to Buy a Yacht Privately",
    metaTitle: "How to Buy a Yacht Privately | The Confidential Purchase Process",
    metaDescription:
      "How a private yacht purchase works end to end: defining criteria, accessing unlisted inventory, making an approach, diligence, and closing confidentially.",
    standfirst: "The process end to end, from defining criteria to closing.",
    cluster: "Buying",
    readingMinutes: 8,
    published: "2026-06-30",
    updated: "2026-09-03",
    intro: [
      "A private purchase differs from a public one in how the yacht is found, not in how it is bought. The contractual machinery is identical. What changes is everything that happens before the offer.",
    ],
    answers: [
      {
        question: "How do you buy a yacht privately?",
        answer:
          "Define specific acquisition criteria, engage a representative with genuine owner relationships, review masked opportunities and approach owners of matching vessels, make an offer subject to survey and sea trial once a yacht is identified, complete diligence, and close through an escrow agent with maritime counsel on both sides.",
      },
      {
        question: "Is buying a yacht privately different legally?",
        answer:
          "No. A private purchase uses the same memorandum of agreement, the same deposit and escrow structure, the same survey and sea trial conditions, and the same closing and registration process as a publicly listed sale. Confidentiality affects the search, not the contract.",
      },
      {
        question: "Do I need a lawyer to buy a yacht?",
        answer:
          "For any significant purchase, yes. Maritime counsel handles title verification, the memorandum of agreement, lien searches, and the ownership structure. Above roughly $10 million, where transactions are frequently structured as company share sales, it is not optional.",
      },
    ],
    sections: [
      {
        heading: "Step one: make your criteria specific",
        paragraphs: [
          "This is where most private searches fail before they start. 'Something around 120 feet, maybe $12 million' cannot be acted on, because it does not distinguish between forty vessels that are wildly different propositions.",
          "Useful criteria specify length range, hull form, build era, build region, cruising intentions, crew tolerance and a budget you have actually committed to. That level of definition turns a vague brief into a list of specific yachts someone can approach.",
        ],
      },
      {
        heading: "Step two: get access",
        paragraphs: [
          "Register your criteria with someone who has real owner relationships, and be honest about your position. A representative who understands you are a genuine buyer at $12 million will approach owners differently from one who suspects you are exploring.",
        ],
      },
      {
        heading: "Step three: assess masked opportunities",
        paragraphs: [
          "You will be shown vessels described without identity. Judge them on what is published — class, proportion, era, build region, condition, cruising area and price band — and on whether the acquisition rationale makes sense.",
          "Where an opportunity looks worth pursuing, request the confidential detail. Expect to answer questions about your position first; that is the qualification step, and it exists because the owner asked for it.",
        ],
      },
      {
        heading: "Step four: the offer",
        paragraphs: [
          "Offers are made subject to survey and sea trial, with a deposit of typically ten percent held in escrow. The memorandum of agreement sets an acceptance period during which you complete diligence and may withdraw or renegotiate on the survey findings.",
          "Never make an unconditional offer. The conditionality is what protects the deposit, and no reputable seller will expect you to waive it.",
        ],
      },
      {
        heading: "Step five: diligence",
        paragraphs: [
          "A full condition and valuation survey, an engine and machinery survey, and a sea trial. On larger vessels, add a review of class and flag standing, crew contracts, management agreements and any outstanding survey conditions.",
          "Instruct your own surveyor. A surveyor recommended by the selling side is not independent, however competent they may be.",
        ],
        bullets: [
          "Condition and valuation survey, out of the water",
          "Engine, generator and machinery survey with oil analysis",
          "Sea trial covering full operating range, not a harbour run",
          "Title, lien and registration search through maritime counsel",
          "Class and flag standing, with any outstanding conditions listed",
        ],
      },
      {
        heading: "Step six: closing",
        paragraphs: [
          "Funds move through an escrow agent, title transfers, and registration is filed in the chosen jurisdiction. Where the yacht is held in a company, the transaction may transfer shares rather than the vessel itself, which changes the diligence and the tax position materially.",
          "Confidentiality provisions frequently survive closing, which is why private transactions rarely appear in market data afterwards.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a private yacht purchase take?",
        answer:
          "Finding the right yacht usually takes three to nine months. Once terms are agreed, closing typically takes four to eight weeks, driven mainly by survey and haul-out scheduling.",
      },
      {
        question: "What deposit is normal?",
        answer:
          "Around ten percent held in escrow on signing the memorandum of agreement is common practice, refundable according to the agreed survey acceptance terms. The amount and refund terms are set in the contract.",
      },
      {
        question: "Can I remain anonymous as a buyer?",
        answer:
          "To a degree. Your identity is generally required at closing for title and anti-money-laundering purposes, but it need not be disclosed to the owner during negotiation, and purchases through corporate structures are common.",
      },
      {
        question: "Should I use a buyer's broker?",
        answer:
          "For a private acquisition, strongly recommended. The seller's side is represented; without your own representation you are negotiating and conducting diligence alone against people who do this professionally.",
      },
    ],
    related: [
      "yacht-purchase-process-united-states",
      "yacht-survey-and-sea-trial-explained",
      "private-yacht-acquisition-guide",
    ],
    inventoryLinks: [
      { href: "/request-private-access", label: "Start a private search" },
      { href: "/private-yachts-for-sale", label: "Private yachts for sale" },
    ],
  },

  {
    slug: "how-to-buy-a-yacht-in-florida",
    sources: FLORIDA_TAX_SOURCES,
    title: "How to Buy a Yacht in Florida",
    metaTitle: "How to Buy a Yacht in Florida | Tax, Survey & Market Guide",
    metaDescription:
      "Buying a yacht in Florida: the sales tax position, where to survey, seasonal timing, hurricane insurance conditions, and why Florida is the deepest US market.",
    standfirst: "The deepest US market, and the practical questions specific to it.",
    cluster: "USA & Florida",
    readingMinutes: 7,
    published: "2026-07-07",
    updated: "2026-09-04",
    intro: [
      "More large yachts change hands in Florida than anywhere else in the United States, and the reasons are structural rather than accidental. Understanding them makes the process substantially easier.",
    ],
    answers: [
      {
        question: "How much is sales tax on a yacht in Florida?",
        answer:
          "Florida levies state sales tax on vessel purchases, with a cap of $18,000 on the total tax payable, including any county discretionary surtax, according to the Florida Department of Revenue. The cap is one of the main reasons high-value yachts are closed in Florida rather than in states that tax the full purchase price. Rates and thresholds change, so confirm the current position with a Florida marine tax attorney.",
      },
      {
        question: "Where should I survey a yacht in Florida?",
        answer:
          "Fort Lauderdale has the deepest concentration of haul-out facilities and specialist surveyors, with capacity for vessels well over 200 feet. Miami and Palm Beach both have full survey capability, and West Palm Beach yards handle large vessels.",
      },
      {
        question: "When is the best time to buy a yacht in Florida?",
        answer:
          "Listed inventory peaks around the Fort Lauderdale International Boat Show in late October and again in spring when yachts return from the Caribbean. Off-market opportunity is less seasonal, because it is not being positioned for a show.",
      },
    ],
    sections: [
      {
        heading: "Why Florida concentrates the market",
        paragraphs: [
          "The refit and repair capacity along Fort Lauderdale's New River is the largest in the Western Hemisphere. Where yachts go for work, the crew agencies, surveyors, brokers and management companies follow, and that professional density is self-reinforcing.",
          "The practical result for a buyer is that everything is local. You can survey, haul, negotiate and close within a few miles, and you can get genuinely independent second opinions on anything because the pool of specialists is deep enough to have real competition in it.",
        ],
      },
      {
        heading: "The tax question, handled properly",
        paragraphs: [
          "Florida's sales tax cap makes it an attractive closing jurisdiction for large vessels, and it is a significant part of why so many transactions are structured to close there. But the position depends on where the yacht is delivered, where it will be kept, and how it will subsequently be used.",
          "Use tax, county surtax and the treatment of a vessel that leaves and returns to Florida waters all interact. This is a question for a Florida marine tax attorney, and getting it wrong is expensive in a way that is hard to unwind afterwards.",
        ],
      },
      {
        heading: "Hurricane season and insurance",
        paragraphs: [
          "The Atlantic hurricane season runs from June through November, and it affects far more than weather planning. Insurance policies commonly impose named windstorm conditions restricting where the vessel may be kept during those months, and yard space becomes constrained.",
          "Confirm your insurer's requirements before closing, not after. Buyers regularly discover that the berth they arranged does not satisfy their policy.",
        ],
      },
      {
        heading: "Choosing between the three markets",
        paragraphs: [
          "Fort Lauderdale for the largest inventory above 100 feet and the deepest refit capacity. Miami for sport yachts and express cruisers, with a younger owner base and heavier usage. Palm Beach for privately used vessels with long single-owner histories and lighter hours.",
          "On the Gulf coast, Naples and Tampa serve a shallower-draft cruising market with different vessel profiles again.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need to register the yacht in Florida?",
        answer:
          "Not necessarily. Federal documentation through the US Coast Guard is common for larger vessels, and state registration requirements depend on where the yacht is kept and used. Your documentation agent will advise.",
      },
      {
        question: "Can a non-US buyer purchase a yacht in Florida?",
        answer:
          "Yes, routinely. The registration and duty position differs depending on whether the yacht will remain in US waters, and should be settled before closing.",
      },
      {
        question: "Is dockage hard to find in South Florida?",
        answer:
          "For vessels over 100 feet during the winter season, yes. Secure a berth arrangement before closing rather than assuming availability.",
      },
      {
        question: "Are there off-market yachts in Florida?",
        answer:
          "A great many. The concentration of the industry means owner intentions circulate professionally long before they become public listings.",
      },
    ],
    related: [
      "florida-yacht-sales-market",
      "fort-lauderdale-yacht-buying-guide",
      "best-places-to-buy-a-yacht-in-the-usa",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-florida", label: "Yachts for sale in Florida" },
      { href: "/off-market-yachts-florida", label: "Off-market yachts in Florida" },
    ],
  },

  {
    slug: "best-places-to-buy-a-yacht-in-the-usa",
    sources: FLORIDA_TAX_SOURCES,
    title: "Best Places to Buy a Yacht in the USA",
    metaTitle: "Best Places to Buy a Yacht in the USA | Market by Market",
    metaDescription:
      "Where to buy a yacht in the United States: South Florida, the Northeast, the West Coast and the Gulf compared on inventory, condition, tax and infrastructure.",
    standfirst: "Four US markets compared on what actually matters to a buyer.",
    cluster: "USA & Florida",
    readingMinutes: 6,
    published: "2026-07-14",
    updated: "2026-08-29",
    intro: [
      "Location affects a yacht purchase more than most buyers expect — not just what is available, but the condition it is in, the tax you pay, and how easily you can survey it.",
    ],
    answers: [
      {
        question: "Where is the best place to buy a yacht in the USA?",
        answer:
          "South Florida, and particularly Fort Lauderdale, has the largest inventory, the deepest refit and survey infrastructure, and a favourable sales tax position for high-value vessels. For buyers prioritising condition over choice, the West Coast and the Northeast often hold better-preserved yachts.",
      },
      {
        question: "Are yachts on the US West Coast in better condition?",
        answer:
          "Frequently, yes. Lower humidity, less intense UV exposure and no hurricane risk mean West Coast yachts of a given age often present better on survey than Florida equivalents. The trade-off is a much smaller inventory.",
      },
    ],
    sections: [
      {
        heading: "South Florida",
        paragraphs: [
          "The largest market by a wide margin, and the only one where you can realistically see multiple comparable vessels above 130 feet in the same week. Refit and survey capacity is unmatched, and the sales tax cap makes it the default closing jurisdiction for large yachts.",
          "The counterpoint is condition. Florida yachts see intense sun, high humidity and salt loading, and hurricane exposure adds risk. Maintenance history matters more here than anywhere else.",
        ],
      },
      {
        heading: "The Northeast",
        paragraphs: [
          "Newport, Annapolis and the Long Island Sound corridor hold a seasonal fleet of well-maintained yachts, with a strong bias toward sailing vessels and traditional motor yachts.",
          "Inventory largely disappears in winter as the fleet moves south, so timing matters. Yachts here typically see far fewer annual hours than Florida equivalents.",
        ],
      },
      {
        heading: "The West Coast",
        paragraphs: [
          "San Diego, Newport Beach and Marina del Rey. Much smaller inventory, materially better average condition, and a cruising pattern — Pacific Northwest in summer, Baja in winter — that favours long-range vessels.",
          "California's sales tax has no equivalent of Florida's cap, which makes the tax position on a large yacht substantially different and worth modelling before you commit to a location.",
        ],
      },
      {
        heading: "The Gulf Coast",
        paragraphs: [
          "Naples, Tampa and the Texas coast around Galveston and Kemah. A smaller market weighted toward sportfishing vessels and shallower-draft cruisers, with lower dockage costs and less competition for good boats.",
          "Survey and refit capacity for large yachts is limited compared with the Atlantic coast, which is a practical constraint rather than a minor inconvenience.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I buy where I intend to keep the yacht?",
        answer:
          "Not necessarily, but understand the tax consequence of the delivery location and the subsequent use before deciding. Yacht transport between coasts is routine and often cheaper than the tax difference.",
      },
      {
        question: "Does buying out of state complicate things?",
        answer:
          "It adds a use tax question in your home state and a delivery decision, both routine but both worth planning with a marine tax advisor.",
      },
      {
        question: "Which market has the most off-market inventory?",
        answer:
          "Florida in absolute terms, by a large margin. Proportionally, the West Coast and Newport Beach have more, because smaller broker communities mean a higher share of transactions happen through direct relationships.",
      },
      {
        question: "Is Texas a real yacht market?",
        answer:
          "For sportfishing and cruising vessels, yes, particularly around Galveston Bay and Kemah. For large motor yachts the inventory is thin and most buyers look to Florida.",
      },
    ],
    related: [
      "how-to-buy-a-yacht-in-florida",
      "florida-yacht-sales-market",
      "yacht-purchase-process-united-states",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-usa", label: "Yachts for sale in the USA" },
      { href: "/yachts-for-sale-california", label: "Yachts for sale in California" },
    ],
  },

  {
    slug: "fort-lauderdale-yacht-buying-guide",
    sources: FLORIDA_TAX_SOURCES,
    title: "Fort Lauderdale Yacht Buying Guide",
    metaTitle: "Fort Lauderdale Yacht Buying Guide | Yards, Dockage & Market",
    metaDescription:
      "Buying a yacht in Fort Lauderdale: the yards, dockage reality, survey logistics, boat show timing, and how the off-market network actually works.",
    standfirst: "The yachting capital, and how to use it as a buyer.",
    cluster: "USA & Florida",
    readingMinutes: 6,
    published: "2026-07-21",
    updated: "2026-08-31",
    intro: [
      "Fort Lauderdale earns its reputation on infrastructure. For a buyer, that infrastructure translates into practical advantages that are worth planning around.",
    ],
    answers: [
      {
        question: "Why is Fort Lauderdale the yachting capital of the world?",
        answer:
          "Because of infrastructure density. Fort Lauderdale has more than three hundred miles of navigable inland waterways, the largest concentration of yacht refit and repair capacity in the Western Hemisphere, and hosts the Fort Lauderdale International Boat Show, the largest in-water show anywhere.",
      },
      {
        question: "When is the Fort Lauderdale International Boat Show?",
        answer:
          "Annually in late October or early November. It functions as the effective start of the American yachting season and frequently drives owners' listing decisions on either side of it.",
      },
      {
        question: "Where are the main yacht yards in Fort Lauderdale?",
        answer:
          "The New River corridor holds the principal refit and repair yards, Port Everglades handles the largest vessels, and Las Olas and the Intracoastal are lined with private and commercial dockage.",
      },
    ],
    sections: [
      {
        heading: "The practical advantage of density",
        paragraphs: [
          "You can survey a yacht, haul it, get a second engineering opinion and meet three brokers in a single day. In a thinner market each of those steps costs you a week and a flight.",
          "It also means genuinely independent opinions are available. Where a market has two surveyors, both know the selling broker. Where it has fifty, you can find one who does not.",
        ],
      },
      {
        heading: "Dockage is the real constraint",
        paragraphs: [
          "Availability for vessels over 100 feet is tight through the winter season, and it is frequently the binding constraint on a purchase rather than the yacht itself.",
          "Arrange a berth before closing. Buyers routinely complete a purchase and then discover they have nowhere to put the yacht until spring.",
        ],
      },
      {
        heading: "How the off-market network operates here",
        paragraphs: [
          "The professional community around the New River is small enough that everyone knows everyone. When an owner decides to sell, the information reaches captains, managers, engineers and brokers within days.",
          "That is why a substantial share of Fort Lauderdale transactions never reach a listing. For a buyer, it means being known to that network is worth more than refreshing listing sites.",
        ],
      },
      {
        heading: "Timing your purchase",
        paragraphs: [
          "The weeks immediately after the boat show are often productive. Owners who listed for the show and did not achieve what they hoped become more open to a private conversation, and the market's attention has moved on.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a survey take in Fort Lauderdale?",
        answer:
          "The survey itself is typically one to three days depending on size. The constraint is haul-out scheduling, which can run weeks ahead in peak season, so build it into your offer's acceptance period.",
      },
      {
        question: "Is Fort Lauderdale expensive for dockage?",
        answer:
          "It is among the more expensive US markets, particularly in season, and availability is more of a problem than price for larger vessels.",
      },
      {
        question: "Should I attend the boat show as a buyer?",
        answer:
          "It is useful for meeting the market and seeing new models. Off-market inventory is not shown at boat shows, so it complements rather than replaces private access.",
      },
      {
        question: "Can I close a purchase in Fort Lauderdale?",
        answer:
          "Yes, and it is the most common closing location for large US yacht transactions, partly because of Florida's sales tax cap and partly because the escrow and legal infrastructure is well established.",
      },
    ],
    related: [
      "how-to-buy-a-yacht-in-florida",
      "miami-yacht-buying-guide",
      "florida-yacht-sales-market",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-fort-lauderdale", label: "Yachts for sale in Fort Lauderdale" },
      { href: "/off-market-yachts-fort-lauderdale", label: "Off-market Fort Lauderdale" },
    ],
  },

  {
    slug: "miami-yacht-buying-guide",
    title: "Miami Yacht Buying Guide",
    metaTitle: "Miami Yacht Buying Guide | Market, Dockage & Bahamas Access",
    metaDescription:
      "Buying a yacht in Miami: what the market holds, dockage realities, the Bahamas crossing, and what heavy year-round use means for diligence.",
    standfirst: "A faster market, a younger buyer, and boats that have worked.",
    cluster: "USA & Florida",
    readingMinutes: 5,
    published: "2026-07-28",
    updated: "2026-08-27",
    intro: [
      "Miami is not a smaller Fort Lauderdale. It is a different market with a different vessel profile, and the diligence emphasis shifts accordingly.",
    ],
    answers: [
      {
        question: "What kind of yachts are for sale in Miami?",
        answer:
          "Miami's inventory is weighted toward sport yachts, express cruisers and performance flybridge vessels between roughly 60 and 120 feet, reflecting an owner base that runs their boats frequently for day use and Bahamas trips.",
      },
      {
        question: "How far is the Bahamas from Miami?",
        answer:
          "Bimini is roughly fifty nautical miles east of Miami — about two to three hours at typical planing-yacht cruise speeds. That proximity is central to how Miami yachts are specified and used.",
      },
    ],
    sections: [
      {
        heading: "What year-round use does to a boat",
        paragraphs: [
          "A Miami yacht of a given age has usually accumulated more hours than an equivalent vessel in a seasonal market. That is not automatically negative — regularly used machinery often fares better than machinery that sits — but it changes what you are looking for.",
          "Check hours against the service schedule rather than against the calendar, and pay particular attention to generator hours, which are frequently overlooked and which run constantly on a boat used for day trips in Florida heat.",
        ],
      },
      {
        heading: "Dockage",
        paragraphs: [
          "Island Gardens Deep Harbour on Watson Island handles the largest vessels; Miami Beach Marina and Sunset Harbour serve the broader fleet. Private dockage along the Venetian Islands and Indian Creek is extensive but rarely available.",
          "As in Fort Lauderdale, secure a berth before closing.",
        ],
      },
      {
        heading: "The private market here",
        paragraphs: [
          "Miami owners change boats more often than the national average, which produces a steady flow of well-kept vessels that transact before anyone lists them.",
          "Confidentiality here is frequently personal rather than commercial — owners who simply prefer their circle not learn from a listing that they are selling.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Miami yachts overpriced?",
        answer:
          "No more than elsewhere. Comparable vessels price consistently across South Florida; what varies is condition and usage, which is where the diligence effort belongs.",
      },
      {
        question: "Is the Miami boat show worth attending?",
        answer:
          "For new models and meeting the market, yes. For used inventory it is less productive, and off-market opportunity is not represented at shows at all.",
      },
      {
        question: "Can I keep a yacht in Miami year-round?",
        answer:
          "Yes, subject to dockage availability and your insurer's hurricane season conditions.",
      },
      {
        question: "Should I look in Fort Lauderdale too?",
        answer:
          "For anything above roughly 100 feet, almost certainly. Fort Lauderdale holds the larger vessels and the refit capacity.",
      },
    ],
    related: [
      "fort-lauderdale-yacht-buying-guide",
      "how-to-buy-a-yacht-in-florida",
      "florida-yacht-sales-market",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-miami", label: "Yachts for sale in Miami" },
      { href: "/yachts-for-sale-bahamas", label: "Yachts for sale in the Bahamas" },
    ],
  },

  {
    slug: "florida-yacht-sales-market",
    title: "The Florida Yacht Sales Market",
    metaTitle: "The Florida Yacht Sales Market | Structure & Seasonality",
    metaDescription:
      "How the Florida yacht market works: its structure, seasonality, the role of the refit industry, and why so much of it transacts before anything is listed.",
    standfirst: "How the market is structured, and why so much of it is invisible.",
    cluster: "USA & Florida",
    readingMinutes: 6,
    published: "2026-08-04",
    updated: "2026-09-05",
    intro: [
      "Florida's yacht market behaves the way it does because of a specific industrial geography. Understanding that geography explains most of what buyers find puzzling about it.",
    ],
    answers: [
      {
        question: "How big is the Florida yacht market?",
        answer:
          "Florida is the largest yacht market in the United States and, by most measures, the largest concentration of large privately owned yachts anywhere. Precise transaction volumes are not published, because a substantial share of sales are private and go unrecorded in listing data.",
      },
      {
        question: "Why do so many yachts transact privately in Florida?",
        answer:
          "Because the industry is geographically concentrated enough that information about owner intentions circulates through professional relationships faster than it could through listings. By the time a decision to sell is formalised, credible buyers are frequently already aware of it.",
      },
    ],
    sections: [
      {
        heading: "The refit industry is the centre of gravity",
        paragraphs: [
          "Yachts come to Florida for work. That brings the vessels, and the vessels bring the crew, the surveyors, the brokers, the managers and the suppliers. The result is a market where the people selling yachts are the same people who maintain them.",
          "That has a direct consequence for information. A yard project manager knows the condition of every boat in the shed, and so, informally, does everyone they talk to.",
        ],
      },
      {
        heading: "Seasonality",
        paragraphs: [
          "The season runs from the Fort Lauderdale show in late October through to spring, when much of the fleet moves to the Bahamas and Caribbean before heading north or crossing to the Mediterranean.",
          "Listing activity clusters around the shows. Private activity is steadier, because it is not being timed for an audience.",
        ],
      },
      {
        heading: "What the listing data does not show",
        paragraphs: [
          "Public listing volumes are frequently quoted as though they represent the market. They represent the advertised market. The gap between advertised and available is real, and in Florida it is wider than anywhere else because the professional network substitutes so effectively for advertising.",
          "Anyone quoting a precise percentage for how much of the market is off-market is estimating. The honest position is that it is a significant share and that it is not measurable, because unadvertised transactions are not recorded.",
        ],
      },
      {
        heading: "Hurricane risk as a market factor",
        paragraphs: [
          "Insurance conditions during the June-to-November season affect where yachts can be kept, which affects when transactions are timed and where vessels are physically located when they change hands.",
          "It also affects value at the margin: a yacht with a documented history of being properly secured or moved during storms is a better proposition than one whose whereabouts during a major event are unclear.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the Florida market seasonal for buyers?",
        answer:
          "Listed inventory is. Private opportunity is much less so, which is one practical argument for working the private channel year-round.",
      },
      {
        question: "Do Florida yachts depreciate faster?",
        answer:
          "Environmental exposure is harder here, but depreciation tracks condition and maintenance rather than geography. A well-maintained Florida yacht holds value comparably.",
      },
      {
        question: "How many brokers are there in South Florida?",
        answer:
          "Several hundred firms, concentrated heavily around Fort Lauderdale. Quality varies enormously, and genuine owner relationships are far rarer than claims of off-market access.",
      },
      {
        question: "Is the Florida market competitive for buyers?",
        answer:
          "For good boats at realistic prices, very. Well-priced inventory moves quickly, which is exactly why private access matters here more than in thinner markets.",
      },
    ],
    related: [
      "how-to-buy-a-yacht-in-florida",
      "fort-lauderdale-yacht-buying-guide",
      "best-places-to-buy-a-yacht-in-the-usa",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-florida", label: "Yachts for sale in Florida" },
      { href: "/superyachts-for-sale-florida", label: "Florida superyachts" },
    ],
  },

  {
    slug: "how-much-does-a-superyacht-cost",
    title: "How Much Does a Superyacht Cost?",
    metaTitle: "How Much Does a Superyacht Cost? | Purchase & Running Costs",
    metaDescription:
      "What a superyacht costs to buy and to run, by size band, with the components of the annual operating budget broken down honestly.",
    standfirst: "Purchase price is the smaller question. Here is the whole picture.",
    cluster: "Buying",
    readingMinutes: 7,
    published: "2026-08-11",
    updated: "2026-09-02",
    intro: [
      "The purchase price of a superyacht is the number people ask about. The annual cost is the number that determines whether the ownership works, and it is far less widely understood.",
    ],
    answers: [
      {
        question: "How much does a superyacht cost?",
        answer:
          "Entry to the used superyacht market currently sits around $5 million to $10 million for a well-maintained vessel in the 100 to 120 foot range. From 130 to 165 feet, prices commonly run from roughly $10 million to $30 million. Above 165 feet, prices start in the tens of millions and extend into the hundreds for recent custom builds.",
      },
      {
        question: "How much does a superyacht cost to run per year?",
        answer:
          "A widely used industry rule of thumb is approximately ten percent of the purchase price per year. For a $20 million yacht that means roughly $2 million annually, covering crew, dockage, insurance, fuel, maintenance and a refit reserve. It is a planning figure, and actual costs vary substantially with usage and crew size.",
      },
      {
        question: "What is the biggest running cost on a superyacht?",
        answer:
          "Crew, in almost every case. Salaries, benefits, travel, training and rotation typically account for the largest share of the annual budget on a professionally crewed yacht, ahead of dockage, insurance, maintenance and fuel.",
      },
    ],
    sections: [
      {
        heading: "Purchase price by size band",
        paragraphs: [
          "These are broad current ranges for used vessels in reasonable condition. Age, builder, refit history and specification move any individual yacht considerably within its band.",
        ],
        bullets: [
          "100–130 ft: roughly $5M to $15M",
          "130–165 ft: roughly $10M to $30M",
          "165–200 ft: roughly $25M to $80M",
          "Over 200 ft: from around $50M, with recent custom builds well into the hundreds of millions",
        ],
      },
      {
        heading: "The annual budget, itemised",
        paragraphs: [
          "The ten percent rule is a useful planning heuristic and a poor substitute for a real budget. Here is roughly how the money divides on a professionally crewed yacht.",
        ],
        bullets: [
          "Crew: commonly 30–40% of the annual budget, including salaries, benefits, travel and training",
          "Dockage and berthing: 10–20%, heavily dependent on location and season",
          "Insurance: 5–10%, driven by value, cruising area and crew experience",
          "Fuel: 5–20%, entirely dependent on how much the yacht actually moves",
          "Maintenance and yard periods: 15–25%",
          "Refit reserve: a further allowance, typically several percent of value annually, for the major refit cycle",
        ],
      },
      {
        heading: "The costs buyers underestimate",
        paragraphs: [
          "Refit is the big one. A major refit on a 150 foot yacht — paint, interior, machinery survey items — comfortably reaches seven figures, and it arrives on a five-to-eight-year cycle whether or not it has been budgeted for.",
          "Crew turnover is the second. Recruiting, relocating and training a replacement chief engineer is expensive, and the disruption costs more than the fee.",
          "Depreciation is the third and largest. It does not appear in an operating budget, but on a recent-build yacht it typically exceeds every other cost combined in the early years.",
        ],
      },
      {
        heading: "Does charter offset it?",
        paragraphs: [
          "Partially, and rarely as much as owners hope. A commercially registered yacht in a good charter market can offset a meaningful share of running costs, but it increases wear, constrains the owner's own use, and brings certification and management obligations.",
          "Treat charter income as reducing the net cost, not as a business case for the purchase.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it cheaper to buy used or build new?",
        answer:
          "Used is cheaper in absolute terms and avoids the first-owner depreciation step. New build gives specification control and a warranty, at the cost of a multi-year delivery slot and a steeper early depreciation curve.",
      },
      {
        question: "Can superyachts be financed?",
        answer:
          "Yes. Marine finance is available at this level, typically requiring a substantial deposit, a satisfactory survey and acceptable flag and ownership structure. Terms vary widely with the vessel's age.",
      },
      {
        question: "Do superyachts hold their value?",
        answer:
          "They depreciate, and the curve is steepest in the first years after delivery. Well-maintained vessels from respected yards hold value better, and a documented refit history materially supports resale.",
      },
      {
        question: "What is the cheapest way to own a superyacht?",
        answer:
          "Buying a well-maintained yacht that is ten to fifteen years old, past its steepest depreciation and through a recent major refit, is generally the most cost-efficient entry to the class.",
      },
    ],
    related: [
      "how-to-buy-a-superyacht",
      "how-to-buy-a-10-million-dollar-yacht",
      "private-yacht-acquisition-guide",
    ],
    inventoryLinks: [
      { href: "/superyachts-for-sale", label: "Superyachts for sale" },
      { href: "/yachts-for-sale-10-million-25-million", label: "$10M – $25M opportunities" },
    ],
  },

  {
    slug: "how-to-buy-a-10-million-dollar-yacht",
    title: "How to Buy a $10 Million Yacht",
    metaTitle: "How to Buy a $10 Million Yacht | What to Expect at This Level",
    metaDescription:
      "What $10 million buys, what it costs to run, how the diligence differs from smaller purchases, and why this bracket transacts privately so often.",
    standfirst: "What the money buys, and what the ownership actually involves.",
    cluster: "Buying",
    readingMinutes: 6,
    published: "2026-08-18",
    updated: "2026-09-01",
    intro: [
      "Ten million dollars is a meaningful threshold. It is roughly where a yacht stops being a large boat and starts being an operation with staff, compliance obligations and a management structure.",
    ],
    answers: [
      {
        question: "What can you buy for $10 million?",
        answer:
          "Typically a yacht of 110 to 140 feet, depending heavily on age and builder. That might be a recent semi-custom flybridge, or a larger custom displacement yacht of ten to fifteen years old that has been through a substantial refit. Both come with permanent crew and class oversight.",
      },
      {
        question: "What does a $10 million yacht cost to run?",
        answer:
          "Around $1 million per year on the conventional ten percent estimate, with crew payroll typically the largest component, followed by dockage, insurance, maintenance and a refit reserve.",
      },
    ],
    sections: [
      {
        heading: "The choice you actually face",
        paragraphs: [
          "At this budget the real decision is newer and smaller against older and larger, and it is not a close-run thing once you know how you will use the yacht.",
          "Extended cruising and long passages reward volume, range and a displacement hull, which points to the older, larger option. Frequent short trips and a preference for warranty coverage and current systems point the other way.",
          "The mistake is choosing on presence. A yacht bought for how it looks at the dock and used for weekends will feel like a poor decision within two seasons.",
        ],
      },
      {
        heading: "Diligence steps up here",
        paragraphs: [
          "Below this level, a condition survey, an engine survey and a sea trial are broadly sufficient. At ten million and above, add class and flag standing with any outstanding conditions, crew contracts, management agreements, and a review of the ownership structure.",
          "If the yacht is held in a company and the transaction is structured as a share sale, the diligence extends to the company itself — its liabilities, its filings and its history. That is a legal exercise, not a marine one.",
        ],
      },
      {
        heading: "Why this bracket goes private so often",
        paragraphs: [
          "Because owners at this level are frequently trading up on a known timetable. A new build delivering in eighteen months creates a seller who has time, does not need to advertise, and has strong reasons not to unsettle a crew they may want to move to the new yacht.",
          "That produces a steady flow of well-maintained vessels that never reach a listing page.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many crew for a $10 million yacht?",
        answer:
          "Typically five to eight: captain, engineer, mate or bosun, chef, and one to three interior crew depending on guest numbers.",
      },
      {
        question: "Should I use a management company?",
        answer:
          "At this size, most owners do. Crew payroll, compliance, insurance and technical scheduling are a genuine ongoing function rather than an occasional task.",
      },
      {
        question: "How long does the purchase take?",
        answer:
          "Four to eight weeks from accepted offer to closing, dominated by survey and haul-out scheduling. Finding the right yacht takes considerably longer.",
      },
      {
        question: "Is a ten-year-old yacht at this price a risk?",
        answer:
          "Only if the refit and maintenance history is thin. A well-documented vessel through a recent major refit is frequently the better value at this budget than a newer, smaller boat.",
      },
    ],
    related: [
      "how-much-does-a-superyacht-cost",
      "how-to-buy-a-superyacht",
      "yacht-survey-and-sea-trial-explained",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-under-10-million", label: "Opportunities under $10M" },
      { href: "/yachts-for-sale-100-130-feet", label: "100–130 ft opportunities" },
    ],
  },

  {
    slug: "how-to-buy-a-superyacht",
    sources: DEPOSIT_NOTES,
    title: "How to Buy a Superyacht",
    metaTitle: "How to Buy a Superyacht | Process, Diligence & Structure",
    metaDescription:
      "The superyacht purchase process: representation, ownership structure, class and flag, diligence, negotiation and closing above 100 feet.",
    standfirst: "Above 100 feet the process changes shape. Here is how.",
    cluster: "Buying",
    readingMinutes: 8,
    published: "2026-08-25",
    updated: "2026-09-04",
    intro: [
      "Buying a superyacht is not buying a larger boat. It is acquiring an operating asset with staff, certification, a compliance calendar and, usually, a corporate structure around it.",
    ],
    answers: [
      {
        question: "How do you buy a superyacht?",
        answer:
          "Engage a buyer's broker and maritime counsel, define criteria and budget including running costs, review available and off-market inventory, make an offer subject to survey and sea trial with a deposit in escrow, complete technical and legal diligence covering class, flag and ownership, and close through an escrow agent with title transfer and registration.",
      },
      {
        question: "Do I need a broker to buy a superyacht?",
        answer:
          "It is strongly advisable. The seller is represented, and the buyer without representation is conducting negotiation, technical diligence and legal review alone against professionals. Buyer's brokers are standard practice at this level.",
      },
      {
        question: "What is the deposit on a superyacht purchase?",
        answer:
          "Around ten percent held in escrow on signing the memorandum of agreement is common practice, released or returned according to the survey acceptance terms agreed in the contract. The amount is a convention, not a legal requirement.",
      },
    ],
    sections: [
      {
        heading: "Assemble the team first",
        paragraphs: [
          "A buyer's broker, a maritime attorney, an independent surveyor and, for larger vessels, a technical advisor or superintendent. On yachts above roughly 130 feet, a management company should be identified before closing rather than after.",
          "Instruct your own surveyor. A surveyor recommended by the selling side may be perfectly competent and is still not independent.",
        ],
      },
      {
        heading: "Understand the ownership structure",
        paragraphs: [
          "Most superyachts are held in a special purpose company. That structure affects tax, liability, financing and registration, and it means the transaction may be a share sale rather than an asset sale.",
          "A share sale transfers the company's history along with the yacht — its liabilities, its contracts and its filings. The diligence is correspondingly broader, and it is a legal exercise your attorney leads, not your surveyor.",
        ],
      },
      {
        heading: "Class and flag",
        paragraphs: [
          "Class societies certify structural and machinery standards and maintain that certification on a survey cycle. Flag state determines the regulatory regime, manning requirements and, in some cases, the fiscal position.",
          "Check both are current, and check specifically for outstanding conditions or recommendations. A yacht carrying open class conditions has known work due, and the cost of that work is a negotiating point.",
        ],
      },
      {
        heading: "The survey",
        paragraphs: [
          "A full out-of-water condition survey, a machinery survey with oil analysis, and a sea trial covering the full operating range rather than a harbour run. On larger vessels this takes days rather than hours and costs a meaningful sum.",
          "The findings are your renegotiation lever. A survey that identifies significant work is not a reason to walk away automatically — it is information the seller now has to account for.",
        ],
      },
      {
        heading: "Crew",
        paragraphs: [
          "Crew contracts do not transfer automatically with the vessel. Retaining a captain and chief engineer who know the yacht is frequently valuable and should be raised early, because it affects both parties' planning and is awkward to introduce at closing.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does buying a superyacht take?",
        answer:
          "Typically two to four months from agreed terms to closing, and longer where the ownership structure or financing is complex. Finding the right vessel usually takes longer than the transaction.",
      },
      {
        question: "Can I negotiate after the survey?",
        answer:
          "Yes — that is the purpose of making the offer subject to survey. Findings are routinely used to renegotiate price or to require work before closing.",
      },
      {
        question: "What is a memorandum of agreement?",
        answer:
          "The contract governing a yacht sale, commonly on an industry-standard form. It sets the price, the deposit, the survey acceptance period, the closing date and the condition in which the vessel is to be delivered.",
      },
      {
        question: "Should I buy a charter yacht?",
        answer:
          "A charter yacht typically comes with commercial certification and thorough documentation, both genuine advantages, but has worked harder than a privately used vessel of the same age. Weigh the documentation against the hours.",
      },
    ],
    related: [
      "how-much-does-a-superyacht-cost",
      "yacht-purchase-process-united-states",
      "yacht-survey-and-sea-trial-explained",
    ],
    inventoryLinks: [
      { href: "/superyachts-for-sale", label: "Superyachts for sale" },
      { href: "/mega-yachts-for-sale", label: "Mega yachts for sale" },
    ],
  },

  {
    slug: "yacht-purchase-process-united-states",
    sources: mergeSources(FLORIDA_TAX_SOURCES, DEPOSIT_NOTES),
    title: "The Yacht Purchase Process in the United States",
    metaTitle: "Yacht Purchase Process in the USA | Step by Step",
    metaDescription:
      "The US yacht purchase process step by step: offer, deposit, escrow, survey, sea trial, acceptance, closing, documentation and registration.",
    standfirst: "Offer to closing, in the sequence it actually happens.",
    cluster: "Process",
    readingMinutes: 7,
    published: "2026-09-01",
    updated: "2026-09-05",
    intro: [
      "The American process is well-established and largely standardised. Knowing the sequence in advance makes the whole thing considerably less stressful.",
    ],
    answers: [
      {
        question: "What are the steps to buying a yacht in the USA?",
        answer:
          "Make a written offer subject to survey and sea trial, place a deposit of typically ten percent in escrow on signing the purchase agreement, conduct the survey and sea trial within the agreed acceptance period, accept the vessel or renegotiate on the findings, complete title and lien searches, then close through the escrow agent with title transfer and registration.",
      },
      {
        question: "What is the acceptance period in a yacht purchase?",
        answer:
          "The window defined in the purchase agreement during which the buyer completes survey and sea trial and either accepts the vessel, rejects it, or proposes a renegotiation based on the findings. It commonly runs two to four weeks and is the buyer's principal protection.",
      },
      {
        question: "Who holds the deposit in a yacht sale?",
        answer:
          "An independent escrow agent, frequently the listing brokerage's escrow account or a maritime title company. The deposit is not paid to the seller directly, and its release is governed by the terms of the purchase agreement.",
      },
    ],
    sections: [
      {
        heading: "1. The offer",
        paragraphs: [
          "Written, on a standard purchase and sale agreement, and always subject to survey and sea trial. The offer sets the price, the deposit, the acceptance period, the closing date and the delivery condition.",
        ],
      },
      {
        heading: "2. Deposit and escrow",
        paragraphs: [
          "Around ten percent is common, held by an independent escrow agent. It is refundable in accordance with the agreement's terms — typically if the buyer rejects the vessel within the acceptance period.",
        ],
      },
      {
        heading: "3. Survey and sea trial",
        paragraphs: [
          "The buyer arranges and pays for both. A condition and valuation survey out of the water, a machinery survey, and a sea trial covering the full operating range.",
          "Attend the sea trial personally if you can. A surveyor's report tells you the condition; being aboard tells you whether you actually want the boat.",
        ],
      },
      {
        heading: "4. Acceptance or renegotiation",
        paragraphs: [
          "Within the acceptance period, you accept the vessel, reject it, or propose a renegotiation based on the findings. Renegotiation is normal and expected — most surveys find something.",
          "A formal acceptance of vessel document is signed, at which point the deposit typically becomes non-refundable.",
        ],
      },
      {
        heading: "5. Title, liens and documentation",
        paragraphs: [
          "Maritime counsel or a documentation agent conducts title and lien searches. For US-flagged vessels this means an abstract of title from the Coast Guard's National Vessel Documentation Center.",
          "Undischarged liens are the classic problem here, and they follow the vessel rather than the seller. This step is not optional.",
        ],
      },
      {
        heading: "6. Closing",
        paragraphs: [
          "Funds move through escrow, the bill of sale is executed, title transfers, and registration or documentation is filed. Sales or use tax is addressed according to the delivery location and intended use.",
          "The yacht is delivered in the condition specified in the agreement, and the inventory schedule determines what comes with it.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does the US process take?",
        answer:
          "Typically four to eight weeks from accepted offer to closing, driven mainly by survey and haul-out scheduling.",
      },
      {
        question: "What is a vessel abstract of title?",
        answer:
          "A record from the US Coast Guard's National Vessel Documentation Center showing the ownership history and any recorded liens against a documented vessel. It is a standard part of diligence on a US-flagged yacht.",
      },
      {
        question: "Do I pay sales tax at closing?",
        answer:
          "It depends on the state, the delivery location and the intended use. Florida caps the total sales and use tax on a vessel sale at $18,000; the rules in other states differ. Take advice from a marine tax specialist before setting the closing location.",
      },
      {
        question: "Can I back out after the survey?",
        answer:
          "Yes, within the acceptance period and in accordance with the agreement's terms. That is exactly what the acceptance period is for.",
      },
    ],
    related: [
      "yacht-survey-and-sea-trial-explained",
      "how-long-does-it-take-to-buy-a-yacht",
      "how-to-buy-a-yacht-in-florida",
    ],
    inventoryLinks: [
      { href: "/yachts-for-sale-usa", label: "Yachts for sale in the USA" },
      { href: "/request-private-access", label: "Start a private search" },
    ],
  },

  {
    slug: "yacht-survey-and-sea-trial-explained",
    title: "Yacht Survey and Sea Trial Explained",
    metaTitle: "Yacht Survey and Sea Trial Explained | What to Expect",
    metaDescription:
      "What a yacht survey covers, what a sea trial should test, what each costs, how to choose a surveyor, and how to use the findings in negotiation.",
    standfirst: "What each one covers, what it costs, and how to use the findings.",
    cluster: "Process",
    readingMinutes: 6,
    published: "2026-09-02",
    updated: "2026-09-06",
    intro: [
      "The survey and sea trial are the buyer's protection, and they are the part of the process where the biggest sums are saved or lost. They deserve more attention than they usually get.",
    ],
    answers: [
      {
        question: "What does a yacht survey cover?",
        answer:
          "A condition and valuation survey covers hull structure, deck and superstructure, systems including electrical, plumbing and safety equipment, machinery condition, and an assessment of market value. It is conducted with the vessel hauled out so the underwater sections can be examined.",
      },
      {
        question: "What happens during a sea trial?",
        answer:
          "The vessel is run through its full operating range while the surveyor records engine performance, temperatures and pressures, checks steering and stabilisation, tests navigation and communication equipment, and observes handling. It should not be a short harbour run.",
      },
      {
        question: "How much does a yacht survey cost?",
        answer:
          "Costs scale with size and are commonly quoted per foot. For a large yacht, a full condition survey plus a separate machinery survey typically runs into the thousands or tens of thousands of dollars, plus haul-out fees. Against the purchase price it is a small fraction, and it routinely identifies issues worth many times its cost.",
      },
    ],
    sections: [
      {
        heading: "Choosing a surveyor",
        paragraphs: [
          "Instruct your own, and check accreditation — in the United States, SAMS and NAMS are the recognised bodies. Ask for a redacted sample report before engaging: report quality varies enormously and you are buying the analysis, not the visit.",
          "For a large yacht, engage a separate machinery specialist. General surveyors are not usually engine specialists, and the machinery is where the largest costs hide.",
        ],
      },
      {
        heading: "What the survey should include",
        paragraphs: [
          "Beyond the standard scope, ask specifically for moisture readings on the hull and deck, oil analysis on main engines and generators, thermal imaging on electrical panels where available, and an assessment of any previous repair work.",
        ],
        bullets: [
          "Hull moisture readings and, where relevant, ultrasonic thickness testing",
          "Oil analysis on main engines and generators",
          "Electrical panel inspection, ideally with thermal imaging",
          "Corrosion assessment and anode condition",
          "Safety equipment currency and life raft service dates",
          "Verification that previous repairs were properly executed",
        ],
      },
      {
        heading: "Making the sea trial count",
        paragraphs: [
          "Insist on a full-range trial rather than a run out of the channel and back. The engines should reach and hold their rated operating range, and the surveyor should record the numbers.",
          "Attend if you can. The report tells you the yacht's condition; being aboard at speed in some sea state tells you whether you want it.",
        ],
      },
      {
        heading: "Using the findings",
        paragraphs: [
          "Almost every survey finds something. The question is whether the findings are routine maintenance items or material defects, and a good surveyor will distinguish them clearly.",
          "Material findings are a renegotiation lever: a price adjustment, work completed before closing at the seller's cost, or an escrow holdback. Presenting them with contractor quotes rather than as a list of complaints gets a better result.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who pays for the survey?",
        answer:
          "The buyer, in almost all cases, including haul-out costs. It is the buyer's diligence and the buyer's report.",
      },
      {
        question: "Can I use the seller's recent survey?",
        answer:
          "Read it, certainly — it is useful context. But do not rely on it. It was commissioned by someone whose interests differ from yours, and insurers and lenders will generally want a current survey in the buyer's name.",
      },
      {
        question: "What if the survey finds major problems?",
        answer:
          "You can reject the vessel within the acceptance period and recover the deposit under the agreement's terms, or renegotiate. Serious findings are a reason to reassess, not automatically to walk.",
      },
      {
        question: "How long does a survey take?",
        answer:
          "One to three days for the condition survey depending on size, plus the sea trial. Haul-out scheduling is usually the constraint on timing rather than the surveyor's availability.",
      },
    ],
    related: [
      "yacht-purchase-process-united-states",
      "how-long-does-it-take-to-buy-a-yacht",
      "how-to-buy-a-superyacht",
    ],
    inventoryLinks: [
      { href: "/off-market-yachts", label: "Browse opportunities" },
      { href: "/request-private-access", label: "Register your criteria" },
    ],
  },

  {
    slug: "how-long-does-it-take-to-buy-a-yacht",
    title: "How Long Does It Take to Buy a Yacht?",
    metaTitle: "How Long Does It Take to Buy a Yacht? | Realistic Timelines",
    metaDescription:
      "Realistic timelines for buying a yacht, from search through offer, survey and closing, and what causes the delays buyers do not plan for.",
    standfirst: "Realistic timelines, and where the delays actually come from.",
    cluster: "Process",
    readingMinutes: 5,
    published: "2026-09-03",
    updated: "2026-09-06",
    intro: [
      "Buyers consistently underestimate the search and overestimate the transaction. The split is usually the reverse of what people expect.",
    ],
    answers: [
      {
        question: "How long does it take to buy a yacht?",
        answer:
          "Finding the right yacht typically takes three to nine months. Once terms are agreed, closing usually takes four to eight weeks, driven mainly by survey and haul-out scheduling. A private acquisition search sits at the longer end because opportunities are created rather than selected.",
      },
      {
        question: "What causes delays in a yacht purchase?",
        answer:
          "Most commonly haul-out scheduling for the survey, particularly in peak season. Other frequent causes are undischarged liens surfacing in the title search, complex corporate ownership structures requiring additional legal review, and financing approval.",
      },
    ],
    sections: [
      {
        heading: "The search: three to nine months",
        paragraphs: [
          "For listed inventory, a well-defined buyer can move faster — weeks, if the right yacht is already on the market. For a private search it is longer, because approaches take time and most receive a no.",
          "The single biggest determinant is how specific your criteria are. Buyers who know exactly what they want move quickly; buyers still deciding between a 90 foot sportfish and a 130 foot displacement yacht do not.",
        ],
      },
      {
        heading: "Offer to acceptance: two to four weeks",
        paragraphs: [
          "The acceptance period in the purchase agreement, during which survey and sea trial happen. Haul-out availability sets the pace, and in Florida during the season that can mean waiting.",
        ],
      },
      {
        heading: "Acceptance to closing: two to four weeks",
        paragraphs: [
          "Title and lien searches, documentation, funds transfer and registration. Straightforward on a US-flagged vessel with clean title; considerably longer where the yacht is held in an offshore company or carries financing.",
        ],
      },
      {
        heading: "What actually goes wrong",
        paragraphs: [
          "Liens are the classic. An undischarged lien from a yard invoice five years ago follows the vessel, not the seller, and clearing it takes time nobody budgeted for.",
          "Corporate structures are the second. A yacht held through two offshore entities requires diligence that is legal rather than marine, and legal diligence runs on its own timetable.",
          "The third is the buyer. Deals slow down most often because the buyer has not settled financing, ownership structure or berth arrangements, all of which could have been resolved during the search.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a yacht purchase close in under a month?",
        answer:
          "Occasionally, with a cash buyer, a clean US-flagged vessel and a survey slot already available. It is not the norm and should not be planned for.",
      },
      {
        question: "Is buying off-market slower?",
        answer:
          "The search is, because opportunities have to be created rather than selected. The transaction itself is identical, and sometimes faster, because both parties are motivated and pre-qualified.",
      },
      {
        question: "When should I start looking for a summer season?",
        answer:
          "The previous autumn. Starting in spring for a summer delivery means competing for the remaining inventory with everyone who started earlier.",
      },
      {
        question: "How can I speed things up?",
        answer:
          "Settle financing, ownership structure and berthing before you find the yacht, define criteria narrowly, and book your surveyor early rather than after the offer is accepted.",
      },
    ],
    related: [
      "yacht-purchase-process-united-states",
      "yacht-survey-and-sea-trial-explained",
      "how-to-buy-a-yacht-privately",
    ],
    inventoryLinks: [
      { href: "/request-private-access", label: "Start a private search" },
      { href: "/off-market-yachts", label: "Browse opportunities" },
    ],
  },

  {
    slug: "private-yacht-acquisition-guide",
    title: "Private Yacht Acquisition Guide",
    metaTitle: "Private Yacht Acquisition Guide | Buyer Representation",
    metaDescription:
      "A complete guide to private yacht acquisition: defining a brief, buyer representation, approaching owners, valuation without comparables, and closing.",
    standfirst: "The complete picture, for a buyer running a serious acquisition.",
    cluster: "Buying",
    readingMinutes: 9,
    published: "2026-09-04",
    updated: "2026-09-06",
    intro: [
      "Private acquisition is a different discipline from buying a listed yacht. It is closer to a corporate acquisition than a retail purchase: you define a target profile, identify the universe of matching assets, approach the owners, and negotiate without the anchor of a published price.",
    ],
    answers: [
      {
        question: "What is private yacht acquisition?",
        answer:
          "Private yacht acquisition is a buyer-led process in which a representative identifies vessels matching defined criteria — including yachts not offered for sale — and approaches their owners on the buyer's behalf. It creates opportunities rather than selecting among advertised ones.",
      },
      {
        question: "What is a yacht buyer's broker?",
        answer:
          "A buyer's broker represents the purchaser rather than the seller. They source vessels, conduct the approach, coordinate surveys and advise on value and negotiation, with a fiduciary duty to the buyer.",
      },
      {
        question: "How do you value a yacht with no comparables?",
        answer:
          "By triangulating: recent transactions on similar hulls where visibility exists, current asking prices adjusted for typical asking-to-transaction gaps, replacement cost less depreciation, and the documented cost of the yacht's refit history. None is definitive alone, and a valuation survey provides an independent view.",
      },
    ],
    sections: [
      {
        heading: "Write a brief that can be acted on",
        paragraphs: [
          "The brief is the whole exercise. It should specify length range, hull form, build era, acceptable build regions, cruising intentions, crew tolerance, guest requirements, and a budget separated into purchase and annual operating.",
          "It should also say what you will not accept. Excluding charter history, or hulls over fifteen years old, or anything requiring more than eight crew, narrows the universe faster than any positive criterion.",
        ],
        bullets: [
          "Length range and hull form, stated as a range not a number",
          "Build era and acceptable build regions",
          "Intended cruising grounds and passage requirements",
          "Maximum crew complement you are willing to operate",
          "Purchase budget and, separately, annual operating budget",
          "Explicit exclusions",
        ],
      },
      {
        heading: "Build the target universe",
        paragraphs: [
          "From the brief, a competent representative should be able to produce a list of every vessel worldwide that fits — typically between ten and fifty yachts for a well-defined brief.",
          "That list, not the listed inventory, is the search. Some of those yachts will be for sale. Most will not. All of them can be approached.",
        ],
      },
      {
        heading: "The approach",
        paragraphs: [
          "Made through a representative, discreetly, and structured so that it establishes the buyer is real without immediately naming them. It should give the owner an easy way to say no, because most will.",
          "Expect a response rate in the low tens of percent and a serious-engagement rate lower still. That is the arithmetic, and it is why the target list needs to be large enough to survive it.",
        ],
      },
      {
        heading: "Negotiating without an anchor",
        paragraphs: [
          "The absence of a published asking price cuts both ways. You have no reference, and neither does the owner — which means the first credible number carries disproportionate weight.",
          "Arrive with your own valuation work. A buyer who can explain why a number is what it is, referencing comparable transactions and the yacht's refit position, negotiates from a much stronger place than one making an offer.",
        ],
      },
      {
        heading: "Diligence and closing",
        paragraphs: [
          "Identical to any other purchase, with one addition: because there is less public information, the survey carries proportionally more weight. Budget for a more thorough survey than you would on a listed yacht, and instruct a machinery specialist separately.",
          "Confidentiality provisions frequently survive closing, which is why private transactions rarely appear in market data — and why the comparable set stays thin for the next buyer.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does buyer representation cost?",
        answer:
          "Structures vary: commission on completion, a retainer credited against commission, or a fixed fee for a defined search. Whatever the arrangement, it should be agreed in writing before work starts.",
      },
      {
        question: "Can I run a private acquisition myself?",
        answer:
          "You can approach owners directly, but the response rate is materially lower. An unsolicited approach from an unknown individual is easy to dismiss; one from an established representative establishes credibility before the conversation begins.",
      },
      {
        question: "What if the owner names an unrealistic price?",
        answer:
          "Common, and not the end of the conversation. An owner who has not considered selling has usually not thought about value either. A reasoned counter with supporting evidence frequently moves the number.",
      },
      {
        question: "How many yachts should I expect to see?",
        answer:
          "From a target list of twenty to forty vessels, expect meaningful engagement with perhaps three to eight, and physical inspection of two or three. That funnel is normal.",
      },
    ],
    related: [
      "how-to-buy-a-yacht-privately",
      "how-to-find-off-market-yachts-for-sale",
      "how-to-buy-a-superyacht",
    ],
    inventoryLinks: [
      { href: "/request-private-access", label: "Start a private search" },
      { href: "/owner-representation", label: "Owner representation" },
    ],
  },
];

const BY_SLUG = new Map(ARTICLES.map((article) => [article.slug, article]));

export function getArticle(slug: string): Article | undefined {
  return BY_SLUG.get(slug);
}

export function getArticlesByCluster(): { cluster: string; articles: Article[] }[] {
  const clusters: Article["cluster"][] = [
    "Private Market",
    "Buying",
    "USA & Florida",
    "Process",
  ];
  return clusters.map((cluster) => ({
    cluster,
    articles: ARTICLES.filter((article) => article.cluster === cluster),
  }));
}
