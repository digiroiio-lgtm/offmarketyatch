/**
 * Shared references for the tax, duty and contract claims in the content.
 *
 * Only primary or clearly-labelled secondary sources go here. Where no
 * authoritative source exists (deposit norms, for example) the claim is
 * worded as common practice and carries a note instead of a link.
 */

export interface SourceNotes {
  links?: { label: string; url: string }[];
  notes?: string[];
}

const FLORIDA_DOR = {
  label:
    "Florida Department of Revenue, Tax Information Publication on the 2010 cap on sales and use tax for boats and vessels",
  url: "https://floridarevenue.com/taxes/tips/documents/TIP_10A01-07.pdf",
};

const FLORIDA_NOTES = [
  "The Florida cap limits the total sales and use tax, including any discretionary county surtax, on a vessel sale to $18,000. The Department of Revenue's own guidance is authoritative; rates, thresholds and conditions can change.",
  "Where the yacht is delivered, where it will be kept and how it will be used all affect the tax position. Confirm it with a Florida marine tax attorney before choosing a closing location.",
];

export const FLORIDA_TAX_SOURCES: SourceNotes = {
  links: [FLORIDA_DOR],
  notes: FLORIDA_NOTES,
};

export const EU_VAT_SOURCES: SourceNotes = {
  links: [
    {
      label: "European Boating Industry: EU Commission guidance on recreational craft customs and VAT treatment (summary)",
      url: "https://europeanboatingindustry.eu/newsroom/newsletter/item/1266-eu-commission-publishes-guidance-on-recreational-craft-customs-and-vat-treatment",
    },
    {
      label: "Sovereign Group: EU Guidance Note on the customs and tax treatment of pleasure craft (summary)",
      url: "https://www.sovereigngroup.com/news/eu-issues-new-guidance-note-on-the-customs-and-tax-treatment-of-pleasure-craft/",
    },
  ],
  notes: [
    "The industry term \"VAT-paid status\" corresponds to a craft's customs \"Union status\" under recent European Commission guidance. That guidance is not legally binding, and the sources above are secondary summaries of it.",
    "Standard VAT rates in EU member states range from roughly 17% to 27%, so the effect on a yacht's price depends on the country concerned.",
  ],
};

export const DEPOSIT_NOTES: SourceNotes = {
  notes: [
    "A deposit of around ten percent held by an escrow agent is common practice in yacht sales. It is a market convention, not a legal requirement: the amount, the escrow agent and the refund terms are set in the purchase agreement.",
  ],
};

export function mergeSources(...all: (SourceNotes | undefined)[]): SourceNotes {
  const present = all.filter((item): item is SourceNotes => Boolean(item));
  return {
    links: present.flatMap((item) => item.links ?? []),
    notes: present.flatMap((item) => item.notes ?? []),
  };
}
