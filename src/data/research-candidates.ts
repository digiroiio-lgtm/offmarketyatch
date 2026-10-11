import "server-only";

import type { BuildRegion, CruisingArea, YachtType } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INTERNAL RESEARCH CANDIDATES — SERVER ONLY, NEVER PUBLISHED FROM HERE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  These are unverified research leads, not opportunities. They are kept in a
 *  separate store from `OPPORTUNITY_RECORDS` on purpose:
 *
 *   • they cannot appear in search, filters, the sitemap, llms.txt, JSON-LD,
 *     featured or "recently added" sections;
 *   • they never count toward `getInventoryStats()`;
 *   • the only route into the public inventory is
 *     `promoteToDraftRecord()` in `src/lib/research.ts`, which refuses while
 *     any publication blocker remains.
 *
 *  A name, price, location or builder in a broker advertisement is a research
 *  input. It is not evidence of seller authorisation, current availability or
 *  off-market status.
 *
 *  ── HOW THE SOURCE NOTES WERE GATHERED ──────────────────────────────────────
 *  Checked 2026-10-11 through search-engine result summaries. The broker pages
 *  themselves could not be opened from the research environment, so every
 *  source below carries `opened: false` and no price is treated as a current,
 *  confirmed asking price.
 */

export type ResearchStatus = "INTERNAL_RESEARCH" | "MODEL_REFERENCE";

export type ResearchCurrency = "USD" | "EUR";

export interface ObservedPrice {
  amount: number;
  currency: ResearchCurrency;
  /**
   * `advertised-unverified`: shown on a broker page, currency and status not
   * confirmed. `historical`: an earlier or reduced price. `model-range`: a
   * spread across hulls of one model, not the price of any vessel.
   */
  kind: "advertised-unverified" | "historical" | "model-range";
  sourceUrl: string | null;
  checkedOn: string;
  note?: string;
}

export interface ResearchSource {
  url: string;
  label: string;
  checkedOn: string;
  /** True only when the page itself was opened and read. */
  opened: boolean;
}

/**
 * The only attributes a reviewer may propose for publication. Everything else
 * on a candidate is private by construction.
 */
export interface ProposedPublic {
  publicReference: string;
  slug: string;
  type: YachtType;
  buildRegion: BuildRegion;
  locationPublic: CruisingArea;
  country: string;
  descriptionPublic: string;
  opportunityNotes: string;
  /** USD band approved for publication; ignored for non-USD candidates. */
  priceBand: { min: number; max: number } | null;
}

export interface ResearchCandidate {
  id: string;
  status: ResearchStatus;
  /** Nominal class from the research brief; not a surveyed length. */
  nominalLengthFt: number;
  year: number | null;
  /** Taxonomy key into `RESEARCH_BUILDERS`. */
  builderKey: string;
  /** Private: vessel or model name as it appears in the research input. */
  namePrivate: string | null;
  modelPrivate: string;
  /** True when the input describes a model rather than one hull. */
  modelOnly: boolean;
  /** The price exactly as supplied, in its own currency. */
  suppliedPrice: { amount: number; amountHigh?: number; currency: ResearchCurrency };
  observedPrices: ObservedPrice[];
  sources: ResearchSource[];
  verification: {
    identity: "unconfirmed" | "probable" | "confirmed" | "not-applicable";
    /** Other record this one duplicates, if any. */
    duplicateOf: string | null;
    /** Other broker pages found for the same hull (not separate records). */
    sameHullListingCount: number;
    advertisedPublicly: boolean;
    availabilityEvidence: "none" | "public-advertisement-unverified" | "broker-confirmed";
    sellerPosition: "unconfirmed";
    classMatch: "luxury-yacht" | "scope-mismatch" | "not-applicable";
    gaps: string[];
  };
  publication: {
    approved: boolean;
    reviewer: string | null;
    reviewedOn: string | null;
    /** Why the platform may lawfully publish a masked research entry. */
    lawfulBasisNote: string | null;
    /** Allow-listed attributes proposed for publication. Null until reviewed. */
    proposedPublic: ProposedPublic | null;
  };
}

/**
 * Builder research taxonomy. These are internal attributes only: a builder
 * never becomes a public vessel detail, and a region is recorded only where a
 * source for it has been seen.
 */
export interface ResearchBuilder {
  key: string;
  name: string;
  region: string | null;
  regionEvidence: string | null;
}

export const RESEARCH_BUILDERS: ResearchBuilder[] = [
  { key: "benetti", name: "Benetti", region: null, regionEvidence: null },
  { key: "majesty", name: "Majesty Yachts", region: null, regionEvidence: null },
  {
    key: "numarine",
    name: "Numarine",
    region: "Turkey",
    regionEvidence: "Broker summaries describe a Turkish shipyard (checked 2026-10-11).",
  },
  { key: "sanlorenzo", name: "Sanlorenzo", region: null, regionEvidence: null },
  {
    key: "ocean-alexander",
    name: "Ocean Alexander",
    region: "Taiwan",
    regionEvidence: "One broker summary states the OA 120 was completed at a Kaohsiung yard.",
  },
  { key: "crescent", name: "Crescent", region: null, regionEvidence: null },
  {
    key: "rmk-marine",
    name: "RMK Marine",
    region: "Turkey",
    regionEvidence: "Broker summaries state the 120 was built at Tuzla, Turkey.",
  },
  {
    key: "isa",
    name: "ISA",
    region: "Italy",
    regionEvidence: "Broker summary states the ISA 120 Sport is built in Italy.",
  },
  { key: "alia", name: "Alia Yachts", region: null, regionEvidence: null },
  { key: "naval-yachts", name: "Naval Yachts", region: null, regionEvidence: null },
  { key: "bering", name: "Bering Yachts", region: null, regionEvidence: null },
  { key: "louisbourg-custom", name: "Louisbourg / Custom", region: null, regionEvidence: null },
  { key: "stardust", name: "Stardust", region: null, regionEvidence: null },
];

/**
 * Regional yacht-building clusters worth researching. Recorded as context
 * only; membership of any named builder is not inferred.
 */
export const RESEARCH_CLUSTERS = [
  {
    name: "Antalya Free Zone",
    note: "Regional yacht-building research cluster. Whether any builder above operates there is unverified.",
  },
] as const;

const CHECKED = "2026-10-11";

export const RESEARCH_CANDIDATES: ResearchCandidate[] = [
  {
    id: "RC-001",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2025,
    builderKey: "crescent",
    namePrivate: "MAXIMUS III",
    modelPrivate: "Crescent 120",
    modelOnly: false,
    suppliedPrice: { amount: 20_995_000, currency: "USD" },
    observedPrices: [
      {
        amount: 21_695_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl:
          "https://www.ngyachting.com/yacht-sales/2025-crescent-trideck-maximus-iii-anacortes-washington-for-sale/190579",
        checkedOn: CHECKED,
        note: "Marked active on the broker page per search summary.",
      },
      {
        amount: 20_995_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://www.denisonyachtsales.com/yachts-for-sale/?state=WA",
        checkedOn: CHECKED,
        note: "Second broker; the two prices conflict.",
      },
    ],
    sources: [
      {
        url: "https://www.ngyachting.com/yacht-sales/2025-crescent-trideck-maximus-iii-anacortes-washington-for-sale/190579",
        label: "Next Generation Yachting",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.denisonyachtsales.com/yachts-for-sale/?state=WA",
        label: "Denison Yacht Sales",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 2,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Two brokers show different asking prices",
        "Builder region not evidenced",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-002",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2024,
    builderKey: "majesty",
    namePrivate: "Optimism",
    modelPrivate: "Majesty 120",
    modelOnly: false,
    suppliedPrice: { amount: 17_900_000, currency: "USD" },
    observedPrices: [
      {
        amount: 17_900_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://uk.boats.com/power-boats/2024-majesty-120-9956568",
        checkedOn: CHECKED,
        note: "Same price on several broker pages; GBP/AUD pages are conversions, not separate asks.",
      },
    ],
    sources: [
      {
        url: "https://uk.boats.com/power-boats/2024-majesty-120-9956568",
        label: "boats.com (Terraglio Yacht Group listing)",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.denisonyachtsales.com/yachts-for-sale/optimism-120-majesty-I",
        label: "Denison Yacht Sales",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.ngyachting.com/yacht-sales/2024-majesty-120-optimism-palm-beach-florida-for-sale/184075",
        label: "Next Generation Yachting (Palm Beach page, marked active)",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.ngyachting.com/yacht-sales/2024-majesty-120-optimism-miami-florida-for-sale/179339",
        label: "Next Generation Yachting (Miami page, marked removed)",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 4,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Broker pages disagree on whether the listing is active",
        "Vessel name inferred from year and price, not supplied",
        "Builder region not evidenced",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-003",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2024,
    builderKey: "numarine",
    namePrivate: "One Zero",
    modelPrivate: "Numarine 120",
    modelOnly: false,
    suppliedPrice: { amount: 15_500_000, currency: "EUR" },
    observedPrices: [
      {
        amount: 15_500_000,
        currency: "EUR",
        kind: "advertised-unverified",
        sourceUrl: "https://www.yachtbuyer.com/en-gb/fleet/one-zero-121-numarine",
        checkedOn: CHECKED,
        note: "Listed in euros; keep EUR, do not convert.",
      },
    ],
    sources: [
      {
        url: "https://www.yachtbuyer.com/en-gb/fleet/one-zero-121-numarine",
        label: "Yachtbuyer",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://boatinternational.com/yachts-for-sale/one-zero-numarine-2024",
        label: "Boat International",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 4,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Broker specs disagree on length, range and engines",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-004",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2024,
    builderKey: "rmk-marine",
    namePrivate: "Seven Seas",
    modelPrivate: "RMK Marine Explorer 120",
    modelOnly: false,
    suppliedPrice: { amount: 13_635_793, currency: "USD" },
    observedPrices: [
      {
        amount: 16_150_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl:
          "https://www.ngyachting.com/yacht-sales/2024-rmk-marine-120-seven-seas-tuzla-for-sale/183787",
        checkedOn: CHECKED,
        note: "Page marked removed.",
      },
      {
        amount: 16_250_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://www.jamesedition.com/yachts/rmk_marine/120/rmk-marine-120-17885137",
        checkedOn: CHECKED,
      },
      {
        amount: 20_200_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://denisonyachtsales.com/yachts-for-sale/seven-seas-121-rmk-marine",
        checkedOn: CHECKED,
      },
      {
        amount: 13_900_000,
        currency: "EUR",
        kind: "advertised-unverified",
        sourceUrl: "https://www.yachtbuyer.com/en-us/rmk-marine/for-sale/seven-seas-989c18e6",
        checkedOn: CHECKED,
        note: "Page headed 'Listing Ended (March 2026)'.",
      },
    ],
    sources: [
      {
        url: "https://www.yachtbuyer.com/en-us/rmk-marine/for-sale/seven-seas-989c18e6",
        label: "Yachtbuyer (listing ended March 2026)",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.ngyachting.com/yacht-sales/2024-rmk-marine-120-seven-seas-tuzla-for-sale/183787",
        label: "Next Generation Yachting (marked removed)",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://denisonyachtsales.com/yachts-for-sale/seven-seas-121-rmk-marine",
        label: "Denison Yacht Sales",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 5,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Supplied price matches no source seen; observed prices range from about EUR 13.9M to $20.2M",
        "At least two sources show the listing ended or removed",
        "Hull material differs between listings",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-005",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2017,
    builderKey: "ocean-alexander",
    namePrivate: "WRECKLESS",
    modelPrivate: "Ocean Alexander OA 120",
    modelOnly: false,
    suppliedPrice: { amount: 11_950_000, currency: "USD" },
    observedPrices: [
      {
        amount: 11_950_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://www.worthavenueyachts.com/yachts-for-sale/wreckless/",
        checkedOn: CHECKED,
        note: "Same price across several broker pages per search summary.",
      },
    ],
    sources: [
      {
        url: "https://www.worthavenueyachts.com/yachts-for-sale/wreckless/",
        label: "Worth Avenue Yachts",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.fraseryachts.com/en/yacht-for-sale/wreckless/",
        label: "Fraser Yachts",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 5,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Refit year and engine hours differ between listings",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-006",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2017,
    builderKey: "isa",
    namePrivate: "BACK 9 AND A HALF (ex CLORINDA)",
    modelPrivate: "ISA 120 Sport",
    modelOnly: false,
    suppliedPrice: { amount: 8_700_000, currency: "USD" },
    observedPrices: [
      {
        amount: 8_700_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://www.worthavenueyachts.com/yachts-for-sale/back-9-and-a-half/",
        checkedOn: CHECKED,
      },
      {
        amount: 9_400_000,
        currency: "USD",
        kind: "historical",
        sourceUrl: "https://www.yachtsalesinternational.com/?p=856",
        checkedOn: CHECKED,
        note: "Earlier price on one page, since reduced.",
      },
    ],
    sources: [
      {
        url: "https://www.worthavenueyachts.com/yachts-for-sale/back-9-and-a-half/",
        label: "Worth Avenue Yachts",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.burgessyachts.com/en/buy-a-yacht/yachts-for-sale/back-9-and-a-half-00009621",
        label: "Burgess",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 6,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Location differs between listings",
        "Duty-paid wording differs between listings",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-007",
    status: "MODEL_REFERENCE",
    nominalLengthFt: 120,
    year: 2010,
    builderKey: "benetti",
    namePrivate: null,
    modelPrivate: "Benetti 120",
    modelOnly: true,
    suppliedPrice: { amount: 5_486_250, amountHigh: 8_095_360, currency: "USD" },
    observedPrices: [
      {
        amount: 5_486_250,
        currency: "USD",
        kind: "model-range",
        sourceUrl: null,
        checkedOn: CHECKED,
        note: "Lower end of a spread across hulls; not the price of any vessel.",
      },
      {
        amount: 8_095_360,
        currency: "USD",
        kind: "model-range",
        sourceUrl: null,
        checkedOn: CHECKED,
        note: "Upper end of the same spread.",
      },
    ],
    sources: [],
    verification: {
      identity: "not-applicable",
      duplicateOf: null,
      sameHullListingCount: 0,
      advertisedPublicly: false,
      availabilityEvidence: "none",
      sellerPosition: "unconfirmed",
      classMatch: "not-applicable",
      gaps: [
        "Model-level range: no individual vessel identified, so no vessel record exists",
        "No source recorded",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-008",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 2004,
    builderKey: "louisbourg-custom",
    namePrivate: "TOUCH",
    modelPrivate: "Louisbourg 120",
    modelOnly: false,
    suppliedPrice: { amount: 2_850_000, currency: "USD" },
    observedPrices: [
      {
        amount: 2_850_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://www.yatco.com/yacht/120-08-louisbourg-motor-yacht-2004-416190/",
        checkedOn: CHECKED,
        note: "Also on an HMY page.",
      },
      {
        amount: 4_500_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://boatinternational.com/yachts-for-sale/touch-louisbourg-2004",
        checkedOn: CHECKED,
        note: "Other pages show $3.45M to $4.9M; the prices conflict and some may be historical.",
      },
    ],
    sources: [
      {
        url: "https://www.yatco.com/yacht/120-08-louisbourg-motor-yacht-2004-416190/",
        label: "Yatco",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://www.hmy.com/yachts-for-sale/louisbourg-2004-touch-416190",
        label: "HMY Yachts",
        checkedOn: CHECKED,
        opened: false,
      },
      {
        url: "https://boatinternational.com/yachts-for-sale/touch-louisbourg-2004",
        label: "Boat International",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "probable",
      duplicateOf: null,
      sameHullListingCount: 6,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "luxury-yacht",
      gaps: [
        "Original listing pages not opened",
        "Asking prices conflict between sources; supplied price may be the lowest or an old one",
        "Build year conflicts (2002 and 2004) and refit years differ",
        "Location differs between listings; vessel also appears as a charter yacht",
        "No seller authorisation; vessel is advertised by name",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
  {
    id: "RC-009",
    status: "INTERNAL_RESEARCH",
    nominalLengthFt: 120,
    year: 1999,
    builderKey: "stardust",
    namePrivate: null,
    modelPrivate: "Stardust 120",
    modelOnly: false,
    suppliedPrice: { amount: 1_300_000, currency: "USD" },
    observedPrices: [
      {
        amount: 1_300_000,
        currency: "USD",
        kind: "advertised-unverified",
        sourceUrl: "https://www.denisonyachtsales.com/yachts-for-sale/120-stardust-cruisers",
        checkedOn: CHECKED,
        note: "Single broker page.",
      },
    ],
    sources: [
      {
        url: "https://www.denisonyachtsales.com/yachts-for-sale/120-stardust-cruisers",
        label: "Denison Yacht Sales",
        checkedOn: CHECKED,
        opened: false,
      },
    ],
    verification: {
      identity: "unconfirmed",
      duplicateOf: null,
      sameHullListingCount: 1,
      advertisedPublicly: true,
      availabilityEvidence: "public-advertisement-unverified",
      sellerPosition: "unconfirmed",
      classMatch: "scope-mismatch",
      gaps: [
        "Original listing page not opened",
        "Summary describes a rebuilt houseboat on an inland lake, outside the luxury-yacht class of this inventory",
        "Single source only",
        "No seller authorisation",
      ],
    },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  },
];
