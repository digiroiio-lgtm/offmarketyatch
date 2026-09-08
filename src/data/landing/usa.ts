import type { LandingPage } from "@/data/landing/types";

/** USA-first geography pages. Florida carries the deepest intent. */
export const USA_PAGES: LandingPage[] = [
  {
    slug: "yachts-for-sale-usa",
    title: "Yachts for Sale USA | Private & Off-Market US Opportunities",
    metaDescription:
      "Yachts for sale in the USA through private channels. Off-market opportunities in Florida, the Northeast, California and the Bahamas — masked listings for qualified US buyers.",
    h1: "Yachts for Sale in the USA",
    standfirst: "The largest concentration of privately available yachts in the world.",
    intro: [
      "The United States has the deepest yacht market on the planet, and its private layer is correspondingly deep. Two things drive that: a very large population of domestic owners, and a service infrastructure — yards, crew, surveyors, management — concentrated tightly enough along a few coastlines that word travels before a listing ever appears.",
      "For an American buyer, a US-flagged and US-based yacht is also the simplest thing to buy. There is no import duty question, no cruising permit to arrange, no offshore closing to structure, and survey and haul-out can be scheduled at a yard you can drive to.",
      "The opportunities below are the US-based vessels currently published, masked to the level each owner has authorised.",
    ],
    query: { country: "United States", sort: "recent" },
    inventoryHeading: "US-based opportunities",
    emptyMessage:
      "No US opportunities are currently published in this view. Submit your criteria and we will approach the American private market directly.",
    answers: [
      {
        question: "Where are most yachts for sale in the USA?",
        answer:
          "South Florida dominates, with Fort Lauderdale as the centre of the brokerage and refit industry, followed by Miami and Palm Beach. Beyond Florida, the significant markets are the Northeast corridor from Newport to Annapolis in summer, and Southern California around San Diego and Newport Beach year-round.",
      },
      {
        question: "Do I pay sales tax when buying a yacht in the USA?",
        answer:
          "Sales or use tax is assessed by individual states, not federally, and both the rate and the treatment of out-of-state purchases vary considerably. Florida, for example, caps sales tax on vessels. The position depends on where the yacht is delivered, where it will be kept and how it will be used, so it is a question for a marine tax advisor rather than a broker.",
      },
      {
        question: "Can a foreign buyer purchase a yacht in the USA?",
        answer:
          "Yes. Foreign buyers routinely purchase US-based yachts. What changes is the registration and export position — a yacht that will remain in US waters under foreign ownership has a different duty and cruising status from one that will be exported, and that should be settled before closing.",
      },
    ],
    faqs: [
      {
        question: "Is it cheaper to buy a yacht in the USA or in Europe?",
        answer:
          "Neither market is systematically cheaper. What differs is the tax and duty overlay: European yachts carry a VAT status that materially affects value, while US yachts carry state sales and use tax exposure. Comparing headline prices without accounting for that is how buyers get caught out.",
      },
      {
        question: "When is the best time to buy a yacht in the USA?",
        answer:
          "The traditional pattern puts more inventory in the market from late spring after the Caribbean season ends, and again in autumn before the boat shows. Off-market opportunities do not follow that calendar as closely, because they are not being positioned for a show.",
      },
      {
        question: "Can you find yachts in states you don't have listings in?",
        answer:
          "Yes. Published inventory reflects what owners have currently authorised us to show. Submit an acquisition brief and we approach owners, captains and cooperating brokers in the market you need.",
      },
      {
        question: "Do you handle US documentation and registration?",
        answer:
          "We coordinate with the documentation agents and maritime attorneys who handle it. We do not provide legal or tax advice ourselves.",
      },
    ],
    related: [
      { href: "/off-market-yachts-usa", label: "Off-Market Yachts USA" },
      { href: "/yachts-for-sale-florida", label: "Florida" },
      { href: "/yachts-for-sale-california", label: "California" },
      { href: "/yachts-for-sale-bahamas", label: "Bahamas" },
      {
        href: "/private-market-intelligence/best-places-to-buy-a-yacht-in-the-usa",
        label: "Best Places to Buy a Yacht in the USA",
      },
      {
        href: "/private-market-intelligence/yacht-purchase-process-united-states",
        label: "The US Yacht Purchase Process",
      },
    ],
    breadcrumb: [{ label: "Yachts for Sale USA" }],
  },

  {
    slug: "off-market-yachts-usa",
    title: "Off-Market Yachts USA | Confidential US Yacht Opportunities",
    metaDescription:
      "Off-market yachts in the USA. Confidential, privately available American yacht opportunities not listed on public marketplaces. Qualified buyer access.",
    h1: "Off-Market Yachts in the USA",
    standfirst: "American yachts that are available and unadvertised.",
    intro: [
      "The American private yacht market has a specific texture. Because the industry is so geographically concentrated — a few square miles of Fort Lauderdale contain most of the country's large-yacht brokerage, refit and management capacity — information moves through relationships faster than it moves through listings.",
      "A US owner deciding to sell will frequently have the conversation with their captain, their manager and one or two brokers they trust before anything is advertised. Often the yacht transacts inside that circle. It never appears on a marketplace, and it never shows up in any public record of what sold.",
      "These are the US opportunities currently published to us, presented in masked form.",
    ],
    query: { country: "United States", availabilityType: "VERIFIED OFF-MARKET", sort: "recent" },
    inventoryHeading: "Verified off-market opportunities, USA",
    emptyMessage:
      "No verified off-market US opportunities are published right now. This category moves quickly and is often unpublished — tell us your requirement and we will search directly.",
    answers: [
      {
        question: "How do I find off-market yachts in the USA?",
        answer:
          "Through relationships rather than search. The practical routes are a broker with genuine owner relationships, captains and management companies who know which boats are coming available, and a retained acquisition search where someone approaches owners of matching yachts on your behalf.",
      },
      {
        question: "Are off-market yachts in the USA legitimate listings?",
        answer:
          "They should be, but the label is used loosely in the American market. Ask specifically whether the seller position has been confirmed, by whom, and when. On this platform each opportunity carries an availability label that distinguishes a confirmed mandate from an unconfirmed research entry.",
      },
      {
        question: "What is a pocket listing in yachting?",
        answer:
          "A pocket listing is a yacht a broker has been authorised to sell but has not advertised, keeping it 'in their pocket' and showing it selectively. It is common in US brokerage, and it means the available inventory in the market is always larger than the listed inventory.",
      },
    ],
    faqs: [
      {
        question: "Why would a US owner avoid a public listing?",
        answer:
          "Crew retention, charter bookings, and negotiating position. A US owner may also simply not want their business associates to draw conclusions from seeing their yacht advertised.",
      },
      {
        question: "Do off-market yachts still need a survey?",
        answer:
          "Absolutely, and if anything more rigorously. Without a listing history you have less public information to work from, so the survey and sea trial carry more of the diligence weight. Never waive them.",
      },
      {
        question: "Can I make an offer on an off-market yacht before seeing it?",
        answer:
          "Offers are routinely made subject to survey and sea trial, which preserves your ability to withdraw. Making an unconditional offer sight-unseen is not something we would recommend at any price level.",
      },
      {
        question: "How current is the inventory on this page?",
        answer:
          "Each card shows when the opportunity was added. Availability can change without notice, and we mark an entry as withdrawn rather than leaving it published once it is no longer live.",
      },
    ],
    related: [
      { href: "/off-market-yachts-florida", label: "Off-Market Yachts Florida" },
      { href: "/off-market-yachts-fort-lauderdale", label: "Off-Market Fort Lauderdale" },
      { href: "/off-market-yachts-miami", label: "Off-Market Miami" },
      {
        href: "/private-market-intelligence/how-yacht-pocket-listings-work",
        label: "How Yacht Pocket Listings Work",
      },
    ],
    breadcrumb: [{ label: "Off-Market Yachts USA" }],
  },

  {
    slug: "yachts-for-sale-florida",
    title: "Yachts for Sale Florida | Private & Off-Market Florida Yachts",
    metaDescription:
      "Yachts for sale in Florida through private channels. Off-market opportunities in Fort Lauderdale, Miami, Palm Beach, Naples and Tampa. Masked listings, private inquiry.",
    h1: "Yachts for Sale in Florida",
    standfirst: "The deepest private yacht market in the world, by some distance.",
    intro: [
      "Florida is not simply a large yacht market — it is the market's operating system. The refit yards, the crew agencies, the surveyors, the management companies and the majority of American large-yacht brokerage are concentrated along roughly a hundred miles of coastline from Palm Beach to Miami.",
      "That concentration has a specific consequence for buyers: information about which yachts are genuinely available circulates through the industry long before, and often instead of, a public listing. A captain mentions to a broker that the owner is building something bigger. That is the moment the yacht becomes available. It may never become listed.",
      "Florida yachts also carry practical advantages for a US buyer. Survey and haul-out capacity is unmatched, the Bahamas are an afternoon away, and the sales tax position is well-trodden ground for Florida marine attorneys.",
    ],
    query: { locationPrefix: "Florida", sort: "recent" },
    inventoryHeading: "Florida opportunities",
    emptyMessage:
      "No Florida opportunities are currently published in this view. Florida inventory moves quickly and much of it is never published — submit your criteria and we will search directly.",
    answers: [
      {
        question: "Why are so many yachts for sale in Florida?",
        answer:
          "Florida combines the largest concentration of US yacht owners with the country's dominant refit, crew and brokerage infrastructure. Yachts are physically present in Florida for maintenance and the winter season, and the industry that services them is the same industry that sells them.",
      },
      {
        question: "How much is sales tax on a yacht in Florida?",
        answer:
          "Florida charges state sales tax on vessel purchases with a statutory cap on the amount payable, plus potential county surtax. The cap is one of the reasons large vessels are frequently closed in Florida. Rates and thresholds change, so confirm the current position with a Florida marine tax attorney rather than relying on a general figure.",
      },
      {
        question: "Where in Florida should I look for a yacht?",
        answer:
          "Fort Lauderdale for the largest inventory and the refit industry, Miami for sport and performance yachts and a younger buyer profile, Palm Beach for privately used yachts with long single-owner histories, and Naples and Tampa on the Gulf coast for shallower-draft cruising boats.",
      },
    ],
    faqs: [
      {
        question: "Is it better to buy a yacht in Fort Lauderdale or Miami?",
        answer:
          "Fort Lauderdale has more inventory above 100 feet and far more refit capacity. Miami has a stronger market in sport yachts and express cruisers under 100 feet. For a large yacht purchase, Fort Lauderdale is usually the more practical base for survey and closing.",
      },
      {
        question: "What is hurricane season and does it affect buying?",
        answer:
          "The Atlantic hurricane season runs from June through November. It affects insurance terms, where a yacht may be kept under its policy, and the availability of yard space. Many buyers deliberately close before or after the season rather than during it.",
      },
      {
        question: "Can I keep the yacht in Florida after purchase?",
        answer:
          "Yes, subject to the state's use tax rules and your insurer's named windstorm conditions. Both are worth resolving before closing rather than after.",
      },
      {
        question: "Do Florida yachts hold their value?",
        answer:
          "Condition and maintenance history drive resale far more than location. A Florida yacht sees heavy sun and salt exposure, so a documented maintenance regime matters more here than in a cooler cruising ground.",
      },
    ],
    detail: {
      heading: "The Florida private market, in practice",
      body: [
        "A large share of Florida transactions above 100 feet begin as conversations rather than listings. That is not secrecy for its own sake — it reflects how tightly the industry is networked, and the fact that most credible buyers are already reachable through a handful of intermediaries.",
        "For a buyer, the practical implication is that searching public Florida listings gives you an incomplete picture of what you could actually buy this season. The yachts that never got listed are frequently the better-maintained ones, because owners with well-kept boats have less need to advertise.",
      ],
    },
    related: [
      { href: "/off-market-yachts-florida", label: "Off-Market Yachts Florida" },
      { href: "/superyachts-for-sale-florida", label: "Superyachts for Sale Florida" },
      { href: "/yachts-for-sale-fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/yachts-for-sale-miami", label: "Miami" },
      { href: "/yachts-for-sale-palm-beach", label: "Palm Beach" },
      { href: "/yachts-for-sale-bahamas", label: "Bahamas" },
      {
        href: "/private-market-intelligence/how-to-buy-a-yacht-in-florida",
        label: "How to Buy a Yacht in Florida",
      },
    ],
    breadcrumb: [{ label: "Yachts for Sale Florida" }],
  },

  {
    slug: "off-market-yachts-florida",
    title: "Off-Market Yachts Florida | Confidential Florida Opportunities",
    metaDescription:
      "Off-market yachts in Florida. Confidential, privately available Florida yacht opportunities never listed publicly. Fort Lauderdale, Miami, Palm Beach and the Bahamas.",
    h1: "Off-Market Yachts in Florida",
    standfirst: "The Florida yachts that never reach a listing page.",
    intro: [
      "If there is one market where the gap between available and visible is widest, it is Florida. The state has the largest population of large privately owned yachts in the world and the tightest professional network servicing them, which means most owners have a private route to a buyer before they ever need a public one.",
      "The pattern repeats constantly. An owner takes delivery of a new build in eighteen months and mentions it to their captain. The captain tells a broker. The broker has a client who has been looking. The yacht changes hands without a single photograph being published.",
      "What we publish here are the Florida opportunities where the owner has authorised us to say something — masked, but real, with the seller position confirmed and recorded.",
    ],
    query: { locationPrefix: "Florida", availabilityType: "VERIFIED OFF-MARKET", sort: "recent" },
    inventoryHeading: "Verified off-market Florida opportunities",
    emptyMessage:
      "No verified off-market Florida opportunities are published right now. This is the fastest-moving category we track — submit your criteria and we will approach the market directly.",
    answers: [
      {
        question: "How do I find off-market yachts in Florida?",
        answer:
          "The realistic routes are a broker with genuine owner relationships in South Florida, captains and yacht managers who know which vessels are coming available, and a retained acquisition search in which someone approaches owners of matching yachts on your behalf. Public search will not surface them, because they are not published.",
      },
      {
        question: "Are off-market Florida yachts better value?",
        answer:
          "Not by default. The advantage is a cleaner negotiating position rather than a lower price: no listing history, no accumulated price reductions, and no assumption that the owner has been trying to sell for a year. Whether that translates into value depends on the individual owner.",
      },
      {
        question: "What areas of Florida have the most off-market yachts?",
        answer:
          "Fort Lauderdale carries the largest volume, particularly along the New River and the Intracoastal where the refit yards are. Palm Beach has a concentration of long-held, privately used yachts, and Miami is stronger in sport and express vessels under 100 feet.",
      },
    ],
    faqs: [
      {
        question: "Can you approach a specific Florida yacht on my behalf?",
        answer:
          "Yes. If you have identified a vessel you would like to acquire, we can make a discreet, named approach to the ownership and report back — including when the answer is no. That is a retained acquisition search, not a listing.",
      },
      {
        question: "How quickly do off-market Florida yachts sell?",
        answer:
          "Faster than listed inventory, because the buyer pool is pre-qualified. It is common for a genuinely well-priced off-market yacht in South Florida to be under contract within weeks of the first introduction.",
      },
      {
        question: "Do you charge to be added to the buyer network?",
        answer:
          "No. There is no membership fee to submit acquisition criteria or to request detail against an opportunity.",
      },
      {
        question: "What if the yacht I want isn't for sale?",
        answer:
          "That is a normal starting point. A large share of private acquisitions begin with a buyer identifying a yacht that is not on the market, and an approach being made to find out whether the owner would consider a number.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-florida", label: "Yachts for Sale Florida" },
      { href: "/off-market-yachts-fort-lauderdale", label: "Off-Market Fort Lauderdale" },
      { href: "/off-market-yachts-miami", label: "Off-Market Miami" },
      { href: "/off-market-yachts-usa", label: "Off-Market Yachts USA" },
      {
        href: "/private-market-intelligence/florida-yacht-sales-market",
        label: "The Florida Yacht Sales Market",
      },
    ],
    breadcrumb: [{ label: "Off-Market Yachts Florida" }],
  },

  {
    slug: "superyachts-for-sale-florida",
    title: "Superyachts for Sale Florida | Private Florida Superyacht Market",
    metaDescription:
      "Superyachts for sale in Florida. Confidential opportunities over 100 ft in Fort Lauderdale, Miami and Palm Beach, presented to qualified buyers.",
    h1: "Superyachts for Sale in Florida",
    standfirst: "Over 100 feet, in the market that services them.",
    intro: [
      "Florida is where American superyachts spend their winters and their refit periods, which makes it where they are bought and sold. The state's yards can haul vessels most of the world cannot, and the depth of specialist crew, surveyors and engineers means diligence on a large yacht is simply easier to conduct here.",
      "It also means the market is unusually well-informed. Everyone servicing a 150-foot yacht in Fort Lauderdale has a view on its condition, and that view circulates. A superyacht with a poor maintenance reputation cannot hide behind good listing photography in this market.",
      "The opportunities below are Florida-based vessels above the superyacht threshold, published in masked form.",
    ],
    query: { locationPrefix: "Florida", lengthBand: undefined, sort: "length-desc" },
    inventoryHeading: "Florida superyacht opportunities",
    emptyMessage:
      "No Florida superyacht opportunities are currently published. Submit your criteria and we will approach owners and cooperating brokers in South Florida directly.",
    answers: [
      {
        question: "Where do superyachts dock in Florida?",
        answer:
          "The principal large-yacht facilities are along Fort Lauderdale's New River and Intracoastal, Port Everglades for the largest vessels, Miami's Island Gardens and Watson Island, and the Palm Beach and Rybovich basins to the north.",
      },
      {
        question: "Can superyachts be surveyed in Florida?",
        answer:
          "Yes, and it is one of the best places in the world to do it. Florida yards have travel-lift and dry-dock capacity for vessels well over 200 feet, and the concentration of specialist surveyors means you can get genuinely independent opinions rather than a single view.",
      },
      {
        question: "What is the Florida sales tax cap on large yachts?",
        answer:
          "Florida applies a statutory maximum to the sales tax payable on a vessel purchase, which makes closing in Florida attractive for high-value yachts compared with states that levy tax on the full price. The cap amount and its conditions change, so confirm the current position with a Florida marine tax attorney.",
      },
    ],
    faqs: [
      {
        question: "When is the Florida superyacht season?",
        answer:
          "The season runs roughly from the Fort Lauderdale International Boat Show in late October through to spring, when many yachts move to the Bahamas and Caribbean, and then north or across to the Mediterranean.",
      },
      {
        question: "Should I buy before or after the boat show?",
        answer:
          "Owners often time a public listing to the show. In the private market that matters less, though the weeks immediately after a show can surface owners who did not achieve what they hoped from the exposure.",
      },
      {
        question: "Do Florida superyachts come with crew?",
        answer:
          "Crew do not transfer automatically, but retaining a captain and engineer who know the vessel is frequently valuable and is negotiated as part of the transaction.",
      },
      {
        question: "Can I keep a superyacht in Florida year-round?",
        answer:
          "Yes, though insurance policies commonly impose named windstorm conditions during hurricane season that restrict where the vessel may be kept. Resolve that with your insurer before you commit to a berth.",
      },
    ],
    related: [
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/yachts-for-sale-florida", label: "Yachts for Sale Florida" },
      { href: "/yachts-for-sale-fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/superyachts-for-sale-over-25-million", label: "Superyachts Over $25M" },
    ],
    breadcrumb: [{ label: "Superyachts for Sale Florida" }],
  },

  {
    slug: "yachts-for-sale-fort-lauderdale",
    title: "Yachts for Sale Fort Lauderdale | Private Market Opportunities",
    metaDescription:
      "Yachts for sale in Fort Lauderdale through private channels. Off-market opportunities in the yachting capital of the world — masked listings, qualified buyer access.",
    h1: "Yachts for Sale in Fort Lauderdale",
    standfirst: "The centre of the American large-yacht market.",
    intro: [
      "Fort Lauderdale earns the phrase 'yachting capital of the world' on infrastructure rather than marketing. More than three hundred miles of navigable waterway, the largest concentration of refit and repair capacity in the Western Hemisphere, and a professional community deep enough that a 150-foot yacht can be surveyed, hauled, repainted and re-crewed inside a few square miles.",
      "For a buyer that has a direct, practical benefit. Every step of diligence happens locally and quickly. You can walk a yard, meet a surveyor, and see three comparable yachts in a day.",
      "It also concentrates information. Fort Lauderdale is where you hear that a yacht is coming available months before anyone advertises it.",
    ],
    query: { locationPrefix: "Florida", sort: "recent" },
    inventoryHeading: "Opportunities in and around Fort Lauderdale",
    emptyMessage:
      "Nothing is currently published for this area. Fort Lauderdale inventory is frequently unlisted — submit your requirement and we will search the local private market.",
    answers: [
      {
        question: "Why is Fort Lauderdale called the yachting capital of the world?",
        answer:
          "Because of the density of its marine infrastructure. Fort Lauderdale has over three hundred miles of inland waterways, the largest concentration of yacht refit and repair yards in the Western Hemisphere, and hosts the Fort Lauderdale International Boat Show, the largest in-water boat show anywhere.",
      },
      {
        question: "Where are yachts bought and sold in Fort Lauderdale?",
        answer:
          "The New River corridor holds the principal refit yards, Port Everglades handles the largest vessels, and Las Olas and the Intracoastal are lined with private dockage. Most large-yacht brokerages are based within a few miles of the New River.",
      },
      {
        question: "When is the Fort Lauderdale boat show?",
        answer:
          "The Fort Lauderdale International Boat Show is held annually in late October or early November. It functions as the effective start of the American yachting season and is a common trigger for owners to make listing decisions.",
      },
    ],
    faqs: [
      {
        question: "Is dockage available in Fort Lauderdale?",
        answer:
          "Availability is tight, particularly for vessels over 100 feet during the winter season. Secure a berth arrangement before closing rather than assuming one will be available afterwards.",
      },
      {
        question: "Can I have a yacht surveyed in Fort Lauderdale quickly?",
        answer:
          "Usually, though haul-out slots at the major yards can book out weeks ahead in peak season. Building survey scheduling into your offer's acceptance period is sensible.",
      },
      {
        question: "Are there off-market yachts in Fort Lauderdale?",
        answer:
          "A great many. The concentration of the industry means owner intentions circulate professionally well before they become public listings.",
      },
      {
        question: "How does Fort Lauderdale compare with Miami for buyers?",
        answer:
          "Fort Lauderdale has deeper inventory above 100 feet and vastly more refit capacity. Miami is stronger in sport yachts and express cruisers, and has a different buyer profile.",
      },
    ],
    related: [
      { href: "/off-market-yachts-fort-lauderdale", label: "Off-Market Fort Lauderdale" },
      { href: "/yachts-for-sale-florida", label: "Yachts for Sale Florida" },
      { href: "/yachts-for-sale-miami", label: "Miami" },
      { href: "/superyachts-for-sale-florida", label: "Florida Superyachts" },
      {
        href: "/private-market-intelligence/fort-lauderdale-yacht-buying-guide",
        label: "Fort Lauderdale Yacht Buying Guide",
      },
    ],
    breadcrumb: [{ label: "Yachts for Sale Fort Lauderdale" }],
  },

  {
    slug: "off-market-yachts-fort-lauderdale",
    title: "Off-Market Yachts Fort Lauderdale | Confidential Opportunities",
    metaDescription:
      "Off-market yachts in Fort Lauderdale. Confidential opportunities never publicly listed, in the largest concentration of large yachts in the United States.",
    h1: "Off-Market Yachts in Fort Lauderdale",
    standfirst: "Where availability is known long before it is advertised.",
    intro: [
      "Fort Lauderdale is the clearest illustration of why the off-market category exists. The professional community around the New River is small enough that everyone knows everyone, and large enough to contain most of the yachts in the American market at some point each year.",
      "In that environment, a yacht becoming available is a piece of information that travels through captains, managers, engineers and brokers within days. If the owner is willing to transact and a buyer is already known, there is no functional reason to publish anything.",
      "What we hold here are the Fort Lauderdale-area opportunities where the owner has confirmed their position and authorised a masked public description.",
    ],
    query: { locationPrefix: "Florida", availabilityType: "VERIFIED OFF-MARKET", sort: "recent" },
    inventoryHeading: "Confidential Fort Lauderdale opportunities",
    emptyMessage:
      "Nothing verified is published for this area right now. Tell us what you are looking for and we will approach the Fort Lauderdale network directly.",
    answers: [
      {
        question: "How do I find off-market yachts in Fort Lauderdale?",
        answer:
          "Through the professional network rather than through search. Captains, yacht managers, refit yard project managers and brokers with genuine owner relationships all know which vessels are coming available. A retained acquisition search gives a buyer structured access to that network.",
      },
      {
        question: "Do Fort Lauderdale brokers hold pocket listings?",
        answer:
          "Commonly, yes. A pocket listing is a yacht a broker is authorised to sell but has chosen not to advertise, showing it only to selected buyers. It is a normal feature of the South Florida market and means listed inventory always understates what is available.",
      },
      {
        question: "Is it worth approaching an owner whose yacht is not for sale?",
        answer:
          "It can be, if the approach is discreet and properly made. A significant share of private acquisitions begin exactly this way. It should be done through a representative rather than directly, and with the expectation that most approaches receive a polite no.",
      },
    ],
    faqs: [
      {
        question: "Will you tell me the yacht's name?",
        answer:
          "After qualification and under appropriate terms, yes — you cannot survey a yacht you cannot identify. Before that, the reference number is what identifies the opportunity in our discussions.",
      },
      {
        question: "How many off-market yachts are there in Fort Lauderdale?",
        answer:
          "Nobody knows, and anyone quoting a precise number is guessing. Unadvertised availability is not recorded anywhere, which is precisely what makes it off-market.",
      },
      {
        question: "Can I see the yacht before making an offer?",
        answer:
          "Viewings are arranged after qualification, subject to the owner's agreement and the yacht's programme. They are a normal part of the process at this level.",
      },
      {
        question: "Do you work with the buyer's own broker?",
        answer:
          "Yes. Cooperating arrangements with a buyer's existing broker are standard practice.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-fort-lauderdale", label: "Yachts for Sale Fort Lauderdale" },
      { href: "/off-market-yachts-florida", label: "Off-Market Yachts Florida" },
      { href: "/off-market-yachts-miami", label: "Off-Market Miami" },
      {
        href: "/private-market-intelligence/how-yacht-pocket-listings-work",
        label: "How Yacht Pocket Listings Work",
      },
    ],
    breadcrumb: [{ label: "Off-Market Yachts Fort Lauderdale" }],
  },

  {
    slug: "yachts-for-sale-miami",
    title: "Yachts for Sale Miami | Private & Off-Market Miami Opportunities",
    metaDescription:
      "Yachts for sale in Miami through private channels. Confidential opportunities from sport yachts to superyachts, with Bahamas cruising on the doorstep.",
    h1: "Yachts for Sale in Miami",
    standfirst: "A younger market, closer to the Bahamas, moving faster.",
    intro: [
      "Miami's yacht market has a distinct character from Fort Lauderdale's. The buyer profile skews younger, the boats skew faster, and a larger share of vessels are owner-operated rather than run by permanent crew. Sport yachts, express cruisers and performance flybridges are disproportionately represented.",
      "Geography drives a lot of that. Bimini is roughly fifty miles from Government Cut, which makes a Miami-based yacht a genuinely usable weekend proposition in a way that a yacht further north is not. Boats here are bought to be run frequently and hard.",
      "For a buyer, that means paying particular attention to hours, service intervals and how the vessel has actually been used — not just how it looks.",
    ],
    query: { locationPrefix: "Florida", sort: "recent" },
    inventoryHeading: "Miami-area opportunities",
    emptyMessage:
      "Nothing is currently published for the Miami area. Submit your criteria and we will search the local private market directly.",
    answers: [
      {
        question: "What kind of yachts are for sale in Miami?",
        answer:
          "Miami's market is weighted toward sport yachts, express cruisers and performance flybridge yachts between roughly 60 and 120 feet, alongside a smaller population of larger vessels. The profile reflects an owner base that runs their boats frequently for day use and Bahamas trips.",
      },
      {
        question: "How far is the Bahamas from Miami by yacht?",
        answer:
          "Bimini sits roughly fifty nautical miles east of Miami, which is a crossing of about two to three hours at typical cruising speeds for a planing yacht. That proximity is a central reason South Florida yachts are used as intensively as they are.",
      },
      {
        question: "Where do yachts dock in Miami?",
        answer:
          "The principal large-yacht facilities are Island Gardens Deep Harbour on Watson Island, Miami Beach Marina near Government Cut, and Sunset Harbour, with substantial private dockage along the Venetian Islands and Indian Creek.",
      },
    ],
    faqs: [
      {
        question: "Are Miami yachts used more heavily than others?",
        answer:
          "Generally yes. Year-round usable weather and short crossings mean Miami boats accumulate hours faster than equivalent yachts in seasonal markets. Check engine and generator hours against the yacht's age carefully.",
      },
      {
        question: "Is the Miami Boat Show worth attending as a buyer?",
        answer:
          "It is useful for seeing new models and meeting the market, less so for finding used inventory. Off-market opportunities are not shown at boat shows.",
      },
      {
        question: "Can I keep a yacht in Miami year-round?",
        answer:
          "Yes, subject to dockage availability, which is genuinely constrained for larger vessels, and your insurer's hurricane season conditions.",
      },
      {
        question: "Do Miami yachts have Bahamas cruising permits?",
        answer:
          "Cruising permits are obtained on arrival in the Bahamas and are not attached to the vessel permanently. Your captain or agent handles it per trip.",
      },
    ],
    related: [
      { href: "/off-market-yachts-miami", label: "Off-Market Yachts Miami" },
      { href: "/yachts-for-sale-florida", label: "Yachts for Sale Florida" },
      { href: "/yachts-for-sale-fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/yachts-for-sale-bahamas", label: "Bahamas" },
      {
        href: "/private-market-intelligence/miami-yacht-buying-guide",
        label: "Miami Yacht Buying Guide",
      },
    ],
    breadcrumb: [{ label: "Yachts for Sale Miami" }],
  },

  {
    slug: "off-market-yachts-miami",
    title: "Off-Market Yachts Miami | Confidential Miami Opportunities",
    metaDescription:
      "Off-market yachts in Miami. Confidential, privately available Miami yacht opportunities not listed on public marketplaces. Qualified buyer access only.",
    h1: "Off-Market Yachts in Miami",
    standfirst: "Privately available, and rarely on the market for long.",
    intro: [
      "The Miami private market moves quickly. Owners here tend to change boats more often than the national average — stepping up in size, switching from sport to flybridge, or simply refreshing every few seasons — which produces a steady flow of well-kept vessels that transact before anyone lists them.",
      "Because these owners are frequently active in the same social and business circles, discretion is also more valued than a buyer might expect. Several of the opportunities we handle in Miami are confidential not for commercial reasons but for personal ones.",
      "Published here are the Miami-area opportunities with a confirmed seller position and an authorised masked description.",
    ],
    query: { locationPrefix: "Florida", availabilityType: "PRIVATE LISTING", sort: "recent" },
    inventoryHeading: "Confidential Miami opportunities",
    emptyMessage:
      "Nothing is published for Miami right now. This category turns over fast — tell us what you are looking for and we will search directly.",
    answers: [
      {
        question: "How do I find off-market yachts in Miami?",
        answer:
          "Through brokers with active owner relationships in South Florida, through captains and management companies, and through a retained acquisition search that approaches owners of matching vessels on your behalf. Public listing sites will not show them.",
      },
      {
        question: "Why do Miami owners sell privately?",
        answer:
          "Commercial reasons — protecting negotiating position and crew stability — and frequently personal ones. Many owners simply prefer that their business and social circle not learn from a listing that they are selling.",
      },
      {
        question: "How quickly do off-market Miami yachts sell?",
        answer:
          "Faster than listed inventory. Where the buyer pool is pre-qualified and the yacht is realistically priced, weeks rather than months is normal.",
      },
    ],
    faqs: [
      {
        question: "Are off-market Miami yachts well maintained?",
        answer:
          "Not automatically, and the usage intensity in this market makes diligence more important rather than less. Survey and sea trial are non-negotiable regardless of how the yacht presents.",
      },
      {
        question: "Can I approach an owner directly?",
        answer:
          "It rarely works. An unsolicited direct approach is easy to dismiss; a properly made approach through a representative is far more likely to get a real answer.",
      },
      {
        question: "Do you cover Miami Beach and Key Biscayne?",
        answer:
          "Yes — the Miami market for our purposes covers the whole of Miami-Dade, including Miami Beach, Key Biscayne and the Venetian Islands.",
      },
      {
        question: "What size yachts do you see most in Miami?",
        answer:
          "The heaviest concentration of private opportunity sits between roughly 70 and 130 feet, though we handle vessels well above that.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-miami", label: "Yachts for Sale Miami" },
      { href: "/off-market-yachts-florida", label: "Off-Market Yachts Florida" },
      { href: "/off-market-yachts-fort-lauderdale", label: "Off-Market Fort Lauderdale" },
      { href: "/yachts-for-sale-bahamas", label: "Bahamas" },
    ],
    breadcrumb: [{ label: "Off-Market Yachts Miami" }],
  },

  {
    slug: "yachts-for-sale-palm-beach",
    title: "Yachts for Sale Palm Beach | Private Market Opportunities",
    metaDescription:
      "Yachts for sale in Palm Beach through private channels. Confidential opportunities from a market defined by long single-owner histories and private use.",
    h1: "Yachts for Sale in Palm Beach",
    standfirst: "Long ownerships, low hours, and a strong preference for discretion.",
    intro: [
      "Palm Beach has the most distinctive ownership profile of the three major South Florida markets. Yachts here are held longer, used less intensively, and maintained to a standard that reflects owners who are not counting the cost of a service interval.",
      "For a buyer, that combination is genuinely valuable. A Palm Beach yacht with a single owner from new and a full service history is a materially different proposition from an equivalent hull that has been through three owners and a charter programme.",
      "It is also the market where confidentiality expectations run highest. Owners in this community are frequently unwilling to have their vessel publicly advertised under any circumstances, which is precisely why a private channel exists.",
    ],
    query: { locationPrefix: "Florida", sort: "recent" },
    inventoryHeading: "Palm Beach area opportunities",
    emptyMessage:
      "Nothing is currently published for Palm Beach. Much of this market is never published at all — submit your requirement and we will approach it directly.",
    answers: [
      {
        question: "What is the Palm Beach yacht market like?",
        answer:
          "Palm Beach is characterised by longer ownership periods, lighter usage and higher maintenance standards than the Miami or Fort Lauderdale markets. Yachts are more often privately used than chartered, and owners place a high value on confidentiality.",
      },
      {
        question: "Where do yachts dock in Palm Beach?",
        answer:
          "The principal facilities are the Rybovich basin and Safe Harbor North Palm Beach for larger vessels, along with Palm Harbor Marina and extensive private dockage along the Intracoastal on both Palm Beach and Singer Island.",
      },
      {
        question: "Is Palm Beach a good place to buy a used yacht?",
        answer:
          "For a buyer prioritising condition and provenance over choice, yes. The inventory is smaller than Fort Lauderdale's but the average vessel has been better cared for and used less.",
      },
    ],
    faqs: [
      {
        question: "Are Palm Beach yachts more expensive?",
        answer:
          "Comparable vessels are not priced differently by location, but the yachts available here tend to be at the better end of their condition range, which is reflected in what they achieve.",
      },
      {
        question: "Is the Palm Beach boat show relevant to buyers?",
        answer:
          "It is a well-attended spring show, but as with any show it surfaces listed inventory rather than private opportunity.",
      },
      {
        question: "Can you source yachts in Palm Beach that aren't listed?",
        answer:
          "That is most of what the market here consists of. Retained acquisition searches are the normal route into it.",
      },
      {
        question: "Does the Palm Beach market slow in summer?",
        answer:
          "Yes. Many owners move north for the summer, and transaction activity concentrates in the winter season.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-florida", label: "Yachts for Sale Florida" },
      { href: "/yachts-for-sale-fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/off-market-yachts-florida", label: "Off-Market Yachts Florida" },
      { href: "/superyachts-for-sale-florida", label: "Florida Superyachts" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Palm Beach" }],
  },

  {
    slug: "yachts-for-sale-california",
    title: "Yachts for Sale California | Private West Coast Opportunities",
    metaDescription:
      "Yachts for sale in California through private channels. Confidential West Coast opportunities in San Diego, Newport Beach and Los Angeles.",
    h1: "Yachts for Sale in California",
    standfirst: "A smaller market, in materially better condition.",
    intro: [
      "California's yacht market is a fraction of Florida's by volume, and that shapes how it behaves. There are fewer comparable vessels, fewer brokers, and a much smaller pool of buyers for any given yacht — which means transactions here rely more heavily on relationships and take longer to assemble.",
      "The compensation is condition. West Coast yachts see lower humidity, less lightning exposure and gentler year-round temperatures than their Florida equivalents, and it shows in surveys. Corrosion, gelcoat degradation and electrical faults tend to be less advanced on a California boat of the same age.",
      "Cruising patterns run north to the Pacific Northwest and Alaska in summer, and south to Baja and mainland Mexico in winter, which favours vessels with genuine range.",
    ],
    query: { location: "US West Coast", sort: "recent" },
    inventoryHeading: "California and West Coast opportunities",
    emptyMessage:
      "No West Coast opportunities are currently published. The California private market is thin and relationship-driven — submit your criteria and we will approach it directly.",
    answers: [
      {
        question: "Where are yachts for sale in California?",
        answer:
          "The three main markets are San Diego, which has the largest concentration of large yachts and the best yard capacity; Newport Beach, which has the highest density of private ownership; and Marina del Rey and Long Beach serving greater Los Angeles.",
      },
      {
        question: "Are California yachts in better condition than Florida yachts?",
        answer:
          "Frequently, yes. Lower humidity, less intense sun and no hurricane exposure mean West Coast yachts of a given age often present better on survey than Florida equivalents. It is a genuine consideration when comparing two similar vessels.",
      },
      {
        question: "How does California sales tax work on a yacht purchase?",
        answer:
          "California levies sales or use tax on vessel purchases without the cap that Florida applies, which makes the tax position on a large yacht materially different between the two states. The rules on out-of-state delivery and subsequent use are detailed and change; take advice from a California marine tax specialist.",
      },
    ],
    faqs: [
      {
        question: "Is it worth shipping a yacht from Florida to California?",
        answer:
          "It can be, particularly for a specific vessel that does not have a West Coast equivalent. Yacht transport by ship is well established, though the cost and the tax implications of the delivery point both need to be modelled before deciding.",
      },
      {
        question: "What cruising is available from California?",
        answer:
          "The Pacific Northwest and Alaska in summer, and Baja California and mainland Mexico in winter. Both favour vessels with genuine range and capable systems rather than pure day boats.",
      },
      {
        question: "Is there off-market inventory in California?",
        answer:
          "Yes, and proportionally more than in Florida, because the smaller broker community means a higher share of transactions happen through direct relationships.",
      },
      {
        question: "Can yachts be surveyed on the West Coast?",
        answer:
          "Yes. San Diego in particular has full haul-out and survey capacity for large vessels.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-san-diego", label: "San Diego" },
      { href: "/yachts-for-sale-newport-beach", label: "Newport Beach" },
      { href: "/yachts-for-sale-usa", label: "Yachts for Sale USA" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
    ],
    breadcrumb: [{ label: "Yachts for Sale California" }],
  },

  {
    slug: "yachts-for-sale-san-diego",
    title: "Yachts for Sale San Diego | Private West Coast Opportunities",
    metaDescription:
      "Yachts for sale in San Diego through private channels. Confidential opportunities in California's principal large-yacht port, with Baja cruising on the doorstep.",
    h1: "Yachts for Sale in San Diego",
    standfirst: "California's working large-yacht port.",
    intro: [
      "San Diego is where the West Coast keeps its serious yachts. The bay offers genuinely protected deep water, the yards have haul-out capacity that nowhere else in California matches, and a substantial commercial and naval marine industry means specialist engineering support is available locally rather than flown in.",
      "It is also the natural departure point for Baja and mainland Mexico, which is the principal winter cruising ground for West Coast owners. Yachts based here are frequently specified for range and self-sufficiency rather than marina hopping.",
      "Inventory is thinner than Florida, and a higher proportion of it never reaches a public listing.",
    ],
    query: { location: "US West Coast", sort: "recent" },
    inventoryHeading: "San Diego and Southern California opportunities",
    emptyMessage:
      "Nothing is currently published for San Diego. Submit your criteria and we will approach the West Coast private market on your behalf.",
    answers: [
      {
        question: "Where do large yachts dock in San Diego?",
        answer:
          "The principal facilities are Shelter Island and Harbor Island, Marriott Marquis and the Embarcadero for larger vessels, and the yards on Shelter Island and along the Chula Vista waterfront for haul-out and refit.",
      },
      {
        question: "What cruising is available from San Diego?",
        answer:
          "Baja California and the Sea of Cortez in winter, the Channel Islands and Southern California bight year-round, and the Pacific Northwest run north in summer. Range and tankage matter more here than in the Bahamas-adjacent Florida market.",
      },
      {
        question: "Is San Diego a good place to survey a yacht?",
        answer:
          "Yes. It is the best-equipped survey and haul-out location on the US West Coast, with capacity for vessels well over 150 feet and a deep pool of specialist surveyors from the commercial and naval sectors.",
      },
    ],
    faqs: [
      {
        question: "Is dockage available in San Diego?",
        answer:
          "It is constrained, particularly for vessels over 100 feet. Waiting lists at the better facilities are real and should be addressed before purchase.",
      },
      {
        question: "How does Mexican cruising affect a purchase?",
        answer:
          "Yachts cruising Mexico require a temporary import permit and appropriate insurance. It is routine but should be planned, and it influences which vessels are practical.",
      },
      {
        question: "Are there off-market yachts in San Diego?",
        answer:
          "Yes. The small broker community means a high proportion of activity happens through direct relationships rather than listings.",
      },
      {
        question: "Do you cover Los Angeles and Long Beach?",
        answer:
          "Yes — Marina del Rey, Long Beach and the greater Los Angeles waterfront are covered within the California market.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-california", label: "Yachts for Sale California" },
      { href: "/yachts-for-sale-newport-beach", label: "Newport Beach" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
      { href: "/yachts-for-sale-usa", label: "Yachts for Sale USA" },
    ],
    breadcrumb: [{ label: "Yachts for Sale San Diego" }],
  },

  {
    slug: "yachts-for-sale-newport-beach",
    title: "Yachts for Sale Newport Beach | Private Market Opportunities",
    metaDescription:
      "Yachts for sale in Newport Beach through private channels. Confidential Orange County opportunities from a market of long-held, lightly used vessels.",
    h1: "Yachts for Sale in Newport Beach",
    standfirst: "High ownership density, low usage, strong preference for privacy.",
    intro: [
      "Newport Beach has one of the highest concentrations of private yacht ownership per capita anywhere in the United States. The harbour is small, the community is close, and a great many vessels are used for local day boating rather than extended cruising.",
      "That produces an unusual inventory profile: low hours, long ownerships, and yachts that have spent most of their lives in a slip in a mild climate. For a buyer prioritising condition, it is a market worth taking seriously despite its size.",
      "Harbour constraints matter. Newport's channel and slip dimensions limit what can realistically be based here, which shapes both what is available and what is practical to buy.",
    ],
    query: { location: "US West Coast", sort: "recent" },
    inventoryHeading: "Newport Beach and Orange County opportunities",
    emptyMessage:
      "Nothing is currently published for Newport Beach. This is a small, relationship-driven market — tell us your requirement and we will approach it directly.",
    answers: [
      {
        question: "What size yachts can Newport Beach accommodate?",
        answer:
          "Newport Harbor's slip and channel dimensions favour vessels up to roughly 100 feet, with limited accommodation above that. Larger yachts owned by Newport residents are frequently based in San Diego or Marina del Rey instead.",
      },
      {
        question: "What is the Newport Beach yacht market known for?",
        answer:
          "High ownership density, long holding periods and light usage. Many vessels are used for local harbour and Catalina trips rather than extended cruising, which keeps hours low and condition high.",
      },
      {
        question: "Is Catalina Island accessible from Newport Beach?",
        answer:
          "Yes — Avalon is roughly 30 nautical miles from Newport, a comfortable run for most cruising yachts and the single most common destination for Newport-based boats.",
      },
    ],
    faqs: [
      {
        question: "Are slips available in Newport Harbor?",
        answer:
          "Availability is very limited and slips are frequently held for years. Confirm a berth arrangement before purchase; it is often the binding constraint rather than the yacht.",
      },
      {
        question: "Do Newport yachts see much use?",
        answer:
          "Typically less than the national average, which is the main attraction for a buyer. Verify with engine hours and service records rather than assuming.",
      },
      {
        question: "Is inventory here mostly off-market?",
        answer:
          "A high proportion, yes. The community is small and owners often prefer a private sale to a listing their neighbours will see.",
      },
      {
        question: "Should I look in San Diego as well?",
        answer:
          "For anything above roughly 100 feet, almost certainly. San Diego carries the larger vessels and the yard capacity.",
      },
    ],
    related: [
      { href: "/yachts-for-sale-california", label: "Yachts for Sale California" },
      { href: "/yachts-for-sale-san-diego", label: "San Diego" },
      { href: "/yachts-for-sale-80-100-feet", label: "80–100 ft Opportunities" },
      { href: "/yachts-for-sale-usa", label: "Yachts for Sale USA" },
    ],
    breadcrumb: [{ label: "Yachts for Sale Newport Beach" }],
  },
];
