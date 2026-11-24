import type { LandingPage } from "@/data/landing/types";
import { EU_VAT_SOURCES } from "@/data/sources";

/**
 * International markets and builders beyond the core Mediterranean and
 * Caribbean pages. Builder pages never claim a masked profile is from that
 * yard: builder identities are withheld, so inventory is shown by build region
 * with that caveat stated on the page.
 */
export const INTERNATIONAL_PAGES: LandingPage[] = [
  // ── United Kingdom ────────────────────────────────────────────────────────
  {
    slug: "yachts-for-sale-uk",
    title: "Yachts for Sale UK | Private & Off-Market Yacht Opportunities",
    metaDescription:
      "Yachts for sale in the UK through private channels. Confidential motor and sailing yacht opportunities for UK buyers, at home and in the Mediterranean.",
    h1: "Yachts for Sale in the UK",
    standfirst: "A British buyer's market that mostly happens abroad.",
    intro: [
      "The United Kingdom is one of the world's main yacht-building and yacht-owning nations, with a long tradition of British-built motor yachts and a large population of owners who keep their yachts in the Mediterranean rather than at home.",
      "That shapes the market. A British buyer looking for a yacht above around 25 metres is usually looking at vessels based in France, Spain or Italy, and the questions that matter most are flag, VAT status and where the yacht will be used, not where it is today.",
      "Below are opportunities based in the UK and in Northern Europe. If nothing fits, register your criteria and we will search the private market, including yachts held by UK owners abroad.",
    ],
    query: { countries: ["United Kingdom"], sort: "recent" },
    inventoryHeading: "UK-based opportunities",
    emptyMessage:
      "Nothing is currently published in the UK. Most UK owners keep larger yachts in the Mediterranean — register your criteria and we will search there too.",
    answers: [
      {
        question: "Where do UK buyers buy yachts?",
        answer:
          "Smaller yachts are commonly bought and kept in the UK. Above around 25 metres, most British-owned yachts are based in the Mediterranean, so UK buyers frequently purchase a yacht that is already there and keep it there.",
      },
      {
        question: "Does VAT apply when a UK buyer purchases a yacht?",
        answer:
          "It depends on where the yacht is, where it will be used and its existing VAT position. Since the UK left the EU, a yacht's UK and EU VAT positions are separate questions, so both should be confirmed with specialist advisers before an offer.",
      },
      {
        question: "What flag do British-owned yachts use?",
        answer:
          "Many fly the Red Ensign, through the UK or a Red Ensign Group register such as the Cayman Islands or the Isle of Man. The choice affects crewing, survey, charter permissions and cost, and is usually made with the yacht's manager.",
      },
    ],
    faqs: [
      {
        question: "Can I buy a yacht based in the Mediterranean from the UK?",
        answer:
          "Yes, routinely. The survey and handover take place where the yacht is, and the purchase is managed remotely with a closing agent. Plan for a trip to see the yacht and for the sea trial.",
      },
      {
        question: "Are British-built yachts easier to resell?",
        answer:
          "British production and semi-custom yachts have a large and liquid secondhand market with good dealer support, which helps resale. As with any yacht, condition and maintenance records matter more than origin.",
      },
      {
        question: "Do you handle yachts for UK sellers too?",
        answer:
          "Yes. UK owners can sell privately through our owner representation, with the yacht presented in masked form to qualified buyers only.",
      },
      {
        question: "What size of yacht do you cover in the UK?",
        answer:
          "Our focus is on larger yachts, typically above 25 metres, where a private, confidential process adds the most value.",
      },
    ],
    related: [
      { href: "/sunseeker-yachts-for-sale", label: "Sunseeker Yachts for Sale" },
      { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
      { href: "/yachts-for-sale-monaco", label: "Monaco & French Riviera" },
      { href: "/motor-yachts-for-sale", label: "Motor Yachts" },
      { href: "/sell-your-yacht-privately", label: "Sell Your Yacht Privately" },
    ],
    breadcrumb: [{ label: "Yachts for Sale UK" }],
  },

  // ── Monaco & the French Riviera ───────────────────────────────────────────
  {
    slug: "yachts-for-sale-monaco",
    title: "Yachts for Sale Monaco & French Riviera | Private Superyacht Opportunities",
    metaDescription:
      "Yachts for sale in Monaco, Cannes, Antibes and the French Riviera through private channels. Confidential superyacht opportunities for qualified buyers.",
    h1: "Yachts for Sale in Monaco & the French Riviera",
    standfirst: "The densest superyacht market in the world, and one of the quietest.",
    intro: [
      "Monaco and the stretch of French coast from Antibes to Cannes hold one of the largest concentrations of superyachts anywhere, and many of the industry's brokerages are based there. In September the Monaco Yacht Show and the Cannes Yachting Festival bring the market together in person.",
      "Much of what changes hands here is never advertised. Owners at this level often prefer to test interest among a short list of buyers before deciding whether to list at all, and a yacht berthed in a small harbour is easily identified from a single photograph.",
      "The opportunities below are presented in masked form. If nothing fits, register your criteria and we will approach the Riviera market directly.",
    ],
    query: { countries: ["Monaco", "France"], sort: "length-desc" },
    inventoryHeading: "Monaco and French Riviera opportunities",
    emptyMessage:
      "Nothing is currently published for Monaco or the French Riviera. Register your criteria and we will approach the Riviera market directly.",
    answers: [
      {
        question: "Why buy a yacht in Monaco or on the French Riviera?",
        answer:
          "Because the supply is there. The Riviera holds a large share of the world's superyacht fleet in season, with the brokers, yards and service companies that support it, which makes viewing, survey and handover straightforward.",
      },
      {
        question: "When is the best time to buy on the Riviera?",
        answer:
          "Many conversations start around the September shows, when owners, brokers and buyers are in the same place, and transactions often complete over the autumn and winter, after the charter season and before the next one.",
      },
      {
        question: "Does a yacht's VAT status matter in Monaco and France?",
        answer:
          "Yes. A yacht's EU VAT status affects its value and how it can be used in EU waters. Monaco applies French VAT rules in this respect, so the position should be confirmed with maritime counsel before an offer.",
      },
    ],
    faqs: [
      {
        question: "Can I view a yacht during the Monaco Yacht Show?",
        answer:
          "Yachts exhibited at the show can be viewed there. Private, unadvertised yachts are viewed separately, by arrangement, once a buyer is qualified and the owner has agreed.",
      },
      {
        question: "Are Riviera yachts more expensive?",
        answer:
          "Not inherently. Price depends on the yacht, its tax status and its condition. Berthing on the Riviera is expensive, which is one reason owners sometimes sell rather than renew a berth.",
      },
      {
        question: "Can a yacht in the South of France be bought by a non-EU buyer?",
        answer:
          "Yes. The structure of the purchase, the flag and the VAT position should be settled with counsel before an offer, particularly if the yacht will be used in EU waters.",
      },
      {
        question: "Do you represent sellers on the Riviera?",
        answer:
          "Yes. Owners can present a yacht privately to qualified buyers through our owner representation, without a public listing.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/benetti-yachts-for-sale", label: "Benetti Yachts for Sale" },
      { href: "/yacht-shows", label: "Yacht Shows" },
      {
        href: "/private-market-intelligence/mediterranean-vs-caribbean-yacht-purchase",
        label: "Mediterranean vs Caribbean",
      },
    ],
    breadcrumb: [{ label: "Yachts for Sale Monaco & French Riviera" }],
    sources: EU_VAT_SOURCES,
  },

  // ── Greece ────────────────────────────────────────────────────────────────
  {
    slug: "yachts-for-sale-greece",
    title: "Yachts for Sale Greece | Private Motor & Sailing Yacht Opportunities",
    metaDescription:
      "Yachts for sale in Greece through private channels. Confidential motor and sailing yacht opportunities in the Eastern Mediterranean for qualified buyers.",
    h1: "Yachts for Sale in Greece",
    standfirst: "An Eastern Mediterranean market built around the summer season.",
    intro: [
      "Greece has one of the busiest yacht seasons in the Mediterranean, with thousands of islands and a large charter fleet. Many yachts based there divide their year between private use and charter.",
      "For a buyer that brings opportunities and questions. A yacht with a charter history may come with a long maintenance record, but also with heavier use; and the rules for operating commercially in Greek waters differ from those for private use.",
      "The opportunities below are presented in masked form. If nothing fits, register your criteria and we will search the Eastern Mediterranean market directly.",
    ],
    query: { countries: ["Greece"], sort: "recent" },
    inventoryHeading: "Opportunities in Greece",
    emptyMessage:
      "Nothing is currently published in Greece. Register your criteria and we will search the Eastern Mediterranean market directly.",
    answers: [
      {
        question: "Is Greece a good place to buy a yacht?",
        answer:
          "It can be, particularly for a buyer who will cruise the Eastern Mediterranean. Yachts based there are often well used and well maintained, and the long season makes it easier to see a yacht in operation before buying.",
      },
      {
        question: "What should I check on a yacht that has chartered in Greece?",
        answer:
          "Its charter history and hours, how it was maintained between seasons, and whether it holds the certifications and permissions it needs for the use you intend. A yacht's commercial status affects both its running costs and what you can do with it.",
      },
      {
        question: "Does EU VAT apply to yachts in Greece?",
        answer:
          "Greece is in the EU, so a yacht's VAT status matters there as it does elsewhere in Europe. Confirm it, and how it interacts with any charter use, with maritime counsel before an offer.",
      },
    ],
    faqs: [
      {
        question: "Can I keep a yacht bought in Greece elsewhere in the Mediterranean?",
        answer:
          "Yes. Yachts move freely around the Mediterranean, subject to their flag, VAT status and any local rules on commercial use.",
      },
      {
        question: "Are sailing yachts common in the Greek market?",
        answer:
          "Yes. The Aegean's summer winds suit sailing yachts, and both sailing and motor yachts are well represented.",
      },
      {
        question: "When is the best time to view a yacht in Greece?",
        answer:
          "Outside the peak summer weeks, when the yacht is not in use and yards are available for a survey.",
      },
      {
        question: "Do you also cover Turkey and Croatia?",
        answer:
          "Yes. Searches for the Eastern Mediterranean usually include Turkey and Croatia; tell us where you are open to buying.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
      { href: "/sailing-yachts-for-sale", label: "Sailing Yachts" },
      { href: "/catamarans-for-sale", label: "Catamarans" },
      { href: "/yachts-for-sale-monaco", label: "Monaco & French Riviera" },
      {
        href: "/private-market-intelligence/buying-a-refitted-superyacht",
        label: "Buying a Refitted Yacht",
      },
    ],
    breadcrumb: [{ label: "Yachts for Sale Greece" }],
    sources: EU_VAT_SOURCES,
  },

  // ── Builders ──────────────────────────────────────────────────────────────
  {
    slug: "sunseeker-yachts-for-sale",
    title: "Sunseeker Yachts for Sale | Private Search for Sunseeker Motor Yachts",
    metaDescription:
      "Looking for a Sunseeker yacht for sale? Register a confidential, builder-specific search for Sunseeker flybridge and performance motor yachts.",
    h1: "Sunseeker Yachts for Sale",
    standfirst: "British motor yachts with one of the deepest secondhand markets.",
    intro: [
      "Sunseeker is a British motor yacht builder based in Poole, on England's south coast, known for performance sports yachts and flybridge models, with larger yachts at the top of its range.",
      "Because many Sunseekers have been built, the secondhand market is unusually deep: buyers can compare several examples of the same model, and specification, engine hours and maintenance history do much of the work in separating them.",
      "If a Sunseeker is firm for you or your client, a builder-specific search lets us look beyond what is advertised, including yachts whose owners are open to selling but have not listed.",
    ],
    query: { buildRegion: "British Build", sort: "recent" },
    inventoryHeading: "British-built opportunities",
    emptyMessage:
      "No British-built opportunities are currently published. Register a builder-specific search and we will approach the private market directly.",
    answers: [
      {
        question: "Are the yachts listed here Sunseekers?",
        answer:
          "Not necessarily. Builder names are withheld on masked profiles. The list shows British-built opportunities; the builder is disclosed to a qualified buyer under the owner's terms.",
      },
      {
        question: "What should I compare between two Sunseekers of the same model?",
        answer:
          "Engine hours and service history, the generator and stabiliser specification, how the yacht has been used and kept, and any warranty still in force. Two examples of the same model can differ widely on these points.",
      },
      {
        question: "Can you search for a specific Sunseeker model?",
        answer:
          "Yes. Give us the model or length range, the build year range, the budget ceiling and where you want the yacht, and we will search beyond advertised listings.",
      },
    ],
    faqs: [
      {
        question: "Can a broker register a Sunseeker search for a client?",
        answer:
          "Yes, through the client requirement form on our broker cooperation page. The client is not named or contacted.",
      },
      {
        question: "Where are secondhand Sunseekers usually based?",
        answer:
          "In the UK and widely across the Mediterranean, with a significant number in the United States.",
      },
      {
        question: "Does a dealer service history matter?",
        answer:
          "It helps. A documented service record from an authorised dealer or yard makes a yacht easier to survey, insure and resell.",
      },
      {
        question: "Do you also search for other British builders?",
        answer:
          "Yes. A builder-specific search works the same way for any yard; name the builders that are firm and those that are acceptable alternatives.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-uk", label: "Yachts for Sale UK" },
      { href: "/motor-yachts-for-sale", label: "Motor Yachts" },
      { href: "/yachts-for-sale-under-10-million", label: "Under $10M" },
      { href: "/benetti-yachts-for-sale", label: "Benetti Yachts for Sale" },
      { href: "/yacht-brokers", label: "Broker Cooperation" },
    ],
    breadcrumb: [{ label: "Sunseeker Yachts for Sale" }],
  },

  {
    slug: "benetti-yachts-for-sale",
    title: "Benetti Yachts for Sale | Private Search for Benetti Superyachts",
    metaDescription:
      "Looking for a Benetti yacht for sale? Register a confidential, builder-specific search for Benetti semi-custom and custom superyachts.",
    h1: "Benetti Yachts for Sale",
    standfirst: "Italian superyachts, from semi-custom to full custom.",
    intro: [
      "Benetti is an Italian shipyard based in Viareggio and part of the Azimut-Benetti Group. It builds semi-custom and full-custom superyachts, and many of its yachts are above 40 metres.",
      "Italian-built yachts make up a large share of the secondhand superyacht market, so a buyer looking for a Benetti will often have several candidates to compare, and refit history and how the yacht has been run will separate them.",
      "If a Benetti is firm for you or your client, a builder-specific search lets us approach owners and brokers holding relevant mandates, rather than waiting for one to be listed.",
    ],
    query: { buildRegion: "Italian Build", sort: "length-desc" },
    inventoryHeading: "Italian-built opportunities",
    emptyMessage:
      "No Italian-built opportunities are currently published. Register a builder-specific search and we will approach the private market directly.",
    answers: [
      {
        question: "Are the yachts listed here Benettis?",
        answer:
          "Not necessarily. Builder names are withheld on masked profiles. The list shows Italian-built opportunities; the builder is disclosed to a qualified buyer under the owner's terms.",
      },
      {
        question: "Semi-custom or full custom?",
        answer:
          "A semi-custom yacht shares a platform with others of its series, which makes comparison and maintenance easier. A full-custom yacht is unique, which can mean a better fit for its owner and a narrower resale market.",
      },
      {
        question: "Can you search for a specific Benetti size and budget?",
        answer:
          "Yes. Give us the length range, the build year range, the real budget ceiling and the timeline, and we will tell you what is realistically available, including when the answer is nothing yet.",
      },
    ],
    faqs: [
      {
        question: "Can a broker register a Benetti search for a client?",
        answer:
          "Yes, through the client requirement form on our broker cooperation page. The client is not named or contacted.",
      },
      {
        question: "What should be checked on a used Benetti?",
        answer:
          "Class status and survey cycle, machinery hours and overhaul history, refit records, flag and commercial registration, and management and crew arrangements, as on any large yacht.",
      },
      {
        question: "Where are secondhand Benettis usually based?",
        answer:
          "Largely in the Mediterranean, with others in Florida, the Caribbean and the Middle East.",
      },
      {
        question: "Do you search for other Italian builders?",
        answer:
          "Yes. A builder-specific search works the same way for any yard; name the builders that are firm and those that are acceptable alternatives.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-monaco", label: "Monaco & French Riviera" },
      { href: "/lurssen-yachts-for-sale", label: "Lürssen Yachts for Sale" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
      {
        href: "/private-market-intelligence/60-metre-superyacht-buying-guide",
        label: "Buying a 60 m Superyacht",
      },
    ],
    breadcrumb: [{ label: "Benetti Yachts for Sale" }],
  },
];
