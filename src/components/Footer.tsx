import Link from "next/link";

const footerLinks = {
  "Buy & Sell": [
    { href: "/buy-off-market-yachts", label: "Buy Off-Market Yachts" },
    { href: "/sell-off-market-yacht", label: "Sell Your Yacht" },
    { href: "/private-access", label: "Apply for Access" },
    { href: "/submit-yacht", label: "Submit Confidentially" },
  ],
  "Yacht Types": [
    { href: "/off-market-superyachts", label: "Superyachts" },
    { href: "/off-market-motor-yachts", label: "Motor Yachts" },
    { href: "/off-market-catamarans", label: "Catamarans" },
    { href: "/off-market-trimarans", label: "Trimarans" },
  ],
  "Advisory": [
    { href: "/owner-representation", label: "Owner Representation" },
    { href: "/private-yacht-brokerage", label: "Private Brokerage" },
    { href: "/yacht-brokers", label: "Broker Cooperation" },
    { href: "/family-offices", label: "Family Offices" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  "Legal": [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] text-[#8b97a5]">
      <div className="container-site py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex flex-col leading-none">
              <span className="text-lg font-bold tracking-wider text-white">
                OFFMARKET<span className="text-[#c9a96e]">YACHTS</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#8b97a5] uppercase">
                Private Yacht Platform
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#8b97a5]">
              A private, high-trust platform for off-market yachts and luxury
              marine assets not publicly listed.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#c9a96e]/70">
              Not Public. Not Indexed. Not Circulated.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Yacht Shows row */}
        <div className="mt-8 border-t border-[#1a2940] pt-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
            Yacht Shows &amp; Events
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Miami Boat Show", href: "/#yacht-shows" },
              { label: "Palm Beach Boat Show", href: "/#yacht-shows" },
              { label: "Monaco Yacht Show", href: "/#yacht-shows" },
              { label: "Cannes Yachting Festival", href: "/#yacht-shows" },
              { label: "Fort Lauderdale Boat Show", href: "/#yacht-shows" },
              { label: "Dubai Boat Show", href: "/#yacht-shows" },
              { label: "Genoa Boat Show", href: "/#yacht-shows" },
              { label: "Yacht Events Calendar", href: "/#yacht-shows" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-[#8b97a5] transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-[#112040] pt-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e]/60">
            Not Public. Not Indexed. Not Circulated.
          </p>
          <p className="text-xs leading-relaxed text-[#8b97a5]">
            <strong className="text-[#8b97a5]">Disclaimer:</strong>{" "}
            OffMarketYachts.com is a private lead-generation and advisory
            platform. Yacht availability, pricing, and specifications are
            subject to verification and owner approval. All enquiries are
            handled with strict confidentiality. NDA-based information sharing
            available.
          </p>
          <p className="mt-4 text-xs text-[#8b97a5]">
            © {new Date().getFullYear()} OffMarketYachts.com. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
