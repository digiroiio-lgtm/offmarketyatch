import Link from "next/link";

import { FOOTER_NAV, INTERNATIONAL_NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-deal-room-line bg-deal-room text-ink-inverse-muted">
      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_3fr]">
          <div>
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-[17px] font-semibold tracking-[0.14em] text-white">
                OFF<span className="text-accent">MARKET</span>YACHT
              </span>
              <span className="label-mono mt-2 text-ink-inverse-muted">{SITE.tagline}</span>
            </Link>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed">
              Confidential and privately available yacht opportunities, sourced through an
              international network of owners, captains and cooperating brokers. Access is by
              private inquiry.
            </p>
            <div className="mt-6 space-y-1.5 text-[14px]">
              <a
                href={`mailto:${SITE.email}`}
                className="block transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="block transition-colors hover:text-white"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_NAV.map((column) => (
              <div key={column.heading}>
                <h2 className="label-mono mb-4 text-accent">{column.heading}</h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-deal-room-line pt-8">
          <h2 className="label-mono mb-4 text-accent">International Inventory</h2>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {INTERNATIONAL_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13.5px] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-deal-room-line pt-8">
          <p className="max-w-4xl text-[12.5px] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-inverse-muted">Important:</strong>{" "}
            {SITE.legalName} is a private acquisition and lead-generation platform. Opportunities
            are presented in masked form to protect owner confidentiality; identity, exact
            pricing and location are disclosed only to qualified buyers under appropriate terms.
            An entry marked <em>Potential Opportunity</em> means availability has not been
            confirmed and no seller mandate exists. Nothing on this site is an offer, a valuation,
            or a representation that a particular vessel is for sale.
          </p>
          <p className="mt-5 text-[12.5px] text-ink-faint">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
