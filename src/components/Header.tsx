"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ─── Nav data ────────────────────────────────────────────────────────────────

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
  {
    label: "Services",
    children: [
      { href: "/owner-representation", label: "Owner Representation" },
      { href: "/private-yacht-brokerage", label: "Private Brokerage" },
      { href: "/yacht-brokers", label: "Broker Cooperation" },
      { href: "/family-offices", label: "Family Offices" },
    ],
  },
  { href: "/#insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg className="h-3 w-3 text-[#0a1628]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-3 w-3 text-[#c9a96e]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function ThemeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={darkMode}
      onClick={onToggle}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ${
        darkMode ? "bg-[#c9a96e]" : "bg-[#1e3052]"
      }`}
    >
      <span
        className={`absolute flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
          darkMode ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      >
        {darkMode ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

// ─── Shared nav-link styles ───────────────────────────────────────────────────
const NAV_LINK =
  "flex h-full items-center whitespace-nowrap text-[13px] font-medium tracking-wide text-[#8b97a5] transition-colors duration-200 ease-out hover:text-[#c9a96e]";

// Navbar CTA buttons — fixed height so they never shift the row
const BTN_OUTLINE =
  "inline-flex h-9 items-center justify-center rounded border border-[#c9a96e] px-4 text-[11px] font-semibold uppercase tracking-wider text-[#c9a96e] transition-colors duration-200 ease-out hover:bg-[#c9a96e] hover:text-[#0a1628] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]";
const BTN_SOLID =
  "inline-flex h-9 items-center justify-center rounded bg-[#c9a96e] px-4 text-[11px] font-semibold uppercase tracking-wider text-[#0a1628] transition-colors duration-200 ease-out hover:bg-[#e2c99a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]";

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  return (
    <header className="sticky top-0 z-50 bg-[#0a1628] shadow-lg">
      {/*
        Single fixed height (72 px) on both the <header> and the inner row
        eliminates the h-16 → h-20 breakpoint jump that causes CLS.
        max-w-[1520px] gives breathing room on 1920 px+ displays.
      */}
      <div className="mx-auto flex h-[72px] max-w-[1520px] items-center px-6 sm:px-10 lg:px-14">

        {/* ── Logo ───────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex shrink-0 flex-col justify-center leading-none"
          aria-label="OffMarketYachts home"
        >
          <span className="text-[15px] font-bold tracking-wider text-white sm:text-[17px]">
            OFFMARKET<span className="text-[#c9a96e]">YACHTS</span>
          </span>
          <span className="mt-[3px] text-[9px] uppercase tracking-[0.18em] text-[#8b97a5]">
            Private Yacht Platform
          </span>
        </Link>

        {/* ── Desktop nav — flex-1 + justify-center balances logo ↔ CTAs ── */}
        <nav
          className="hidden h-full flex-1 items-center justify-center gap-6 md:flex lg:gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative flex h-full items-center">
                <button
                  className={`${NAV_LINK} gap-1`}
                  onClick={() => toggleDropdown(link.label)}
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === link.label && (
                  <div className="absolute left-0 top-full mt-0 w-52 rounded-b border border-t-0 border-[#112040] bg-[#0a1628] py-1 shadow-2xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-[13px] text-[#8b97a5] transition-colors duration-150 hover:bg-[#112040] hover:text-[#c9a96e]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href!} className={NAV_LINK}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ── Desktop right rail: theme + badge + CTAs ───────────────────── */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {/* Theme toggle */}
          <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />

          {/* Vertical divider */}
          <span className="mx-1 h-5 w-px bg-[#1e3052]" aria-hidden="true" />

          {/* Member Access badge — inline-flex keeps it on the baseline */}
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-none text-[#8b97a5]/60">
            Member Access
            <span className="rounded-sm bg-[#112040] px-1.5 py-[3px] text-[9px] font-semibold uppercase tracking-widest text-[#c9a96e]/60">
              Soon
            </span>
          </span>

          {/* Vertical divider */}
          <span className="mx-1 h-5 w-px bg-[#1e3052]" aria-hidden="true" />

          {/* CTA buttons — h-9 gives them a unified, predictable height */}
          <Link href="/submit-yacht" className={BTN_OUTLINE}>
            Submit Confidentially
          </Link>
          <Link href="/access" className={BTN_SOLID}>
            Apply for Access
          </Link>
        </div>

        {/* ── Mobile hamburger ───────────────────────────────────────────── */}
        <button
          className="ml-auto flex flex-col gap-[5px] p-2 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ── Mobile nav ─────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <nav className="border-t border-[#112040] bg-[#0a1628] px-6 pb-6 pt-2" aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="pt-4">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]">
                  {link.label}
                </span>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 pl-3 text-sm text-[#8b97a5] transition-colors duration-150 hover:text-white"
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
                className="block py-2.5 text-sm font-medium text-[#8b97a5] transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex items-center justify-between rounded border border-[#112040] px-4 py-3">
              <span className="text-sm font-medium text-[#8b97a5]">
                {darkMode ? "Night Mode" : "Day Mode"}
              </span>
              <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
            </div>
            <Link href="/submit-yacht" className="btn-outline-gold py-3 text-xs" onClick={() => setMobileOpen(false)}>
              Submit Confidentially
            </Link>
            <Link href="/access" className="btn-gold py-3 text-xs" onClick={() => setMobileOpen(false)}>
              Apply for Access
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
