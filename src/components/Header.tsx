"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-[#0a1628] shadow-lg">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 flex-col leading-none"
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
        <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-[#8b97a5] transition hover:text-[#c9a96e]"
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
                className="whitespace-nowrap text-sm font-medium text-[#8b97a5] transition hover:text-[#c9a96e]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTAs + Theme Toggle */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
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
            <div className="flex items-center justify-between rounded border border-[#112040] px-4 py-3">
              <span className="text-sm font-medium text-[#8b97a5]">
                {darkMode ? "Night Mode" : "Day Mode"}
              </span>
              <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
            </div>
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
