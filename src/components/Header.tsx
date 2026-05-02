"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/buy-off-market-yachts", label: "Buy" },
  { href: "/sell-off-market-yacht", label: "Sell" },
  {
    label: "Yacht Types",
    children: [
      { href: "/off-market-superyachts", label: "Superyachts" },
      { href: "/off-market-motor-yachts", label: "Motor Yachts" },
      { href: "/off-market-catamarans", label: "Catamarans" },
      { href: "/off-market-trimarans", label: "Trimarans" },
    ],
  },
  { href: "/yacht-brokers", label: "Brokers" },
  { href: "/family-offices", label: "Family Offices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a1628] shadow-lg">
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label="OffMarketYachts home"
        >
          <span className="text-base font-bold tracking-wider text-white sm:text-lg">
            OFFMARKET<span className="text-[#c9a96e]">YACHTS</span>
          </span>
          <span className="text-[10px] tracking-widest text-[#8b97a5] uppercase">
            Private Yacht Platform
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-[#8b97a5] transition hover:text-[#c9a96e]"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-48 rounded border border-[#112040] bg-[#0a1628] py-1 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-[#8b97a5] transition hover:bg-[#112040] hover:text-[#c9a96e]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm font-medium text-[#8b97a5] transition hover:text-[#c9a96e]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/submit-yacht" className="btn-outline-gold py-2 text-xs">
            Submit Yacht
          </Link>
          <Link href="/private-access" className="btn-gold py-2 text-xs">
            Request Access
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-[#112040] bg-[#0a1628] px-5 pb-5" aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="pt-3">
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#c9a96e]">
                  {link.label}
                </span>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 pl-3 text-sm text-[#8b97a5] transition hover:text-white"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-[#8b97a5] transition hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/submit-yacht" className="btn-outline-gold py-3 text-xs" onClick={() => setMobileOpen(false)}>
              Submit Yacht
            </Link>
            <Link href="/private-access" className="btn-gold py-3 text-xs" onClick={() => setMobileOpen(false)}>
              Request Private Access
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
