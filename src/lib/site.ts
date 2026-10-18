/** Single source of truth for site-wide identity, navigation and SEO constants. */

export const SITE = {
  name: "OffMarketYacht",
  legalName: "OffMarketYacht.com",
  url: "https://offmarketyacht.com",
  tagline: "The Private Side of the Yacht Market",
  description:
    "Confidential, off-market yacht opportunities from a private international network: motor yachts, explorer yachts and superyachts in Florida and the USA.",
  email: "private@offmarketyacht.com",
  phoneDisplay: "+1 (954) 388-0129",
  phoneHref: "+19543880129",
} as const;

export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const PRIMARY_NAV: NavGroup[] = [
  {
    label: "Private Market",
    href: "/off-market-yachts",
  },
  {
    label: "Yachts",
    children: [
      { href: "/motor-yachts-for-sale", label: "Motor Yachts" },
      { href: "/explorer-yachts-for-sale", label: "Explorer Yachts" },
      { href: "/sailing-yachts-for-sale", label: "Sailing Yachts" },
      { href: "/superyachts-for-sale", label: "Superyachts" },
      { href: "/mega-yachts-for-sale", label: "Mega Yachts" },
      { href: "/luxury-yachts-for-sale", label: "Luxury Yachts" },
      { href: "/yachts-for-sale", label: "All Yachts for Sale" },
    ],
  },
  {
    label: "USA",
    children: [
      { href: "/yachts-for-sale-florida", label: "Florida" },
      { href: "/yachts-for-sale-fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/yachts-for-sale-miami", label: "Miami" },
      { href: "/yachts-for-sale-palm-beach", label: "Palm Beach" },
      { href: "/yachts-for-sale-california", label: "California" },
      { href: "/yachts-for-sale-bahamas", label: "Bahamas" },
      { href: "/yachts-for-sale-usa", label: "All USA Opportunities" },
    ],
  },
  {
    label: "Sell Privately",
    href: "/sell-your-yacht-privately",
  },
  {
    label: "Intelligence",
    href: "/private-market-intelligence",
  },
];

export const FOOTER_NAV: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Private Market",
    links: [
      { href: "/off-market-yachts", label: "Off-Market Yachts" },
      { href: "/off-market-yachts-for-sale", label: "Off-Market Yachts for Sale" },
      { href: "/private-yachts-for-sale", label: "Private Yachts for Sale" },
      { href: "/yachts-for-sale", label: "Yachts for Sale" },
      { href: "/luxury-yachts-for-sale", label: "Luxury Yachts for Sale" },
      { href: "/superyachts-for-sale", label: "Superyachts for Sale" },
      { href: "/mega-yachts-for-sale", label: "Mega Yachts for Sale" },
    ],
  },
  {
    heading: "United States",
    links: [
      { href: "/yachts-for-sale-usa", label: "Yachts for Sale USA" },
      { href: "/off-market-yachts-usa", label: "Off-Market Yachts USA" },
      { href: "/yachts-for-sale-florida", label: "Florida" },
      { href: "/off-market-yachts-florida", label: "Off-Market Florida" },
      { href: "/superyachts-for-sale-florida", label: "Florida Superyachts" },
      { href: "/yachts-for-sale-fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/yachts-for-sale-miami", label: "Miami" },
      { href: "/yachts-for-sale-palm-beach", label: "Palm Beach" },
      { href: "/yachts-for-sale-california", label: "California" },
      { href: "/yachts-for-sale-san-diego", label: "San Diego" },
      { href: "/yachts-for-sale-newport-beach", label: "Newport Beach" },
    ],
  },
  {
    heading: "By Budget & Size",
    links: [
      { href: "/yachts-for-sale-under-5-million", label: "Under $5M" },
      { href: "/yachts-for-sale-under-10-million", label: "Under $10M" },
      { href: "/yachts-for-sale-10-million-25-million", label: "$10M – $25M" },
      { href: "/superyachts-for-sale-over-25-million", label: "Over $25M" },
      { href: "/yachts-for-sale-80-100-feet", label: "80–100 ft" },
      { href: "/yachts-for-sale-100-130-feet", label: "100–130 ft" },
      { href: "/yachts-for-sale-130-165-feet", label: "130–165 ft" },
      { href: "/yachts-for-sale-over-165-feet", label: "Over 165 ft" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/sell-your-yacht-privately", label: "Sell Your Yacht Privately" },
      { href: "/request-private-access", label: "Request Private Access" },
      { href: "/private-market-intelligence", label: "Private Market Intelligence" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/owner-representation", label: "Owner Representation" },
      { href: "/yacht-brokers", label: "Broker Cooperation" },
      { href: "/family-offices", label: "Family Offices" },
      { href: "/yacht-shows", label: "Yacht Shows & Events" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

/** Regions and international inventory, kept secondary to the USA. */
export const INTERNATIONAL_NAV: NavItem[] = [
  { href: "/yachts-for-sale-caribbean", label: "Caribbean" },
  { href: "/yachts-for-sale-mediterranean", label: "Mediterranean" },
];

export function canonical(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${SITE.url}${clean}`;
}
