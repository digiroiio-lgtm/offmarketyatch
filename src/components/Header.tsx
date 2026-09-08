"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { PRIMARY_NAV } from "@/lib/site";

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={onToggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-white/15 text-ink-inverse-muted transition-colors hover:border-white/40 hover:text-ink-inverse"
    >
      {dark ? (
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // The pre-hydration script in the root layout has already applied the stored
  // theme to <html>. Reading it in a lazy initialiser keeps the toggle in sync
  // without an effect that would trigger a second render pass.
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavId = useId();

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openGroup) return;
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenGroup(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup]);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage blocked — the theme still applies for this page view */
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-deal-room-line bg-deal-room">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-widest focus:text-white"
      >
        Skip to content
      </a>

      <div
        ref={navRef}
        className="mx-auto flex h-[68px] max-w-[1480px] items-center gap-6 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex shrink-0 flex-col justify-center leading-none"
          aria-label="OffMarketYacht — home"
        >
          <span className="text-[15px] font-semibold tracking-[0.14em] text-white sm:text-[16px]">
            OFF<span className="text-accent">MARKET</span>YACHT
          </span>
          <span className="label-mono mt-[5px] text-ink-inverse-muted">
            The Private Side of the Yacht Market
          </span>
        </Link>

        <nav
          className="hidden h-full flex-1 items-center justify-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((group) =>
            group.children ? (
              <div key={group.label} className="relative flex h-full items-center">
                <button
                  type="button"
                  onClick={() => setOpenGroup((p) => (p === group.label ? null : group.label))}
                  aria-expanded={openGroup === group.label}
                  className="flex items-center gap-1.5 text-[13px] text-ink-inverse-muted transition-colors hover:text-white"
                >
                  {group.label}
                  <svg
                    className={`h-2.5 w-2.5 transition-transform duration-200 ${
                      openGroup === group.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openGroup === group.label && (
                  <div className="absolute left-1/2 top-full w-60 -translate-x-1/2 border border-deal-room-line bg-deal-room-raised py-1.5 shadow-2xl">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenGroup(null)}
                        className="block px-4 py-2.5 text-[13px] text-ink-inverse-muted transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={group.href}
                href={group.href!}
                className="text-[13px] text-ink-inverse-muted transition-colors hover:text-white"
              >
                {group.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeToggle dark={dark} onToggle={toggleTheme} />
          <Link
            href="/request-private-access"
            onClick={() => track("request_access_click", { form: "header" })}
            className="inline-flex h-9 items-center rounded-[2px] bg-accent px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover"
          >
            Private Access
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto flex flex-col gap-[5px] p-2 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls={mobileNavId}
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-200 ${
              mobileOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform duration-200 ${
              mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav
          id={mobileNavId}
          className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-deal-room-line bg-deal-room px-5 pb-8 pt-4 lg:hidden"
          aria-label="Mobile"
        >
          {PRIMARY_NAV.map((group) =>
            group.children ? (
              <div key={group.label} className="border-b border-deal-room-line py-4">
                <span className="label-mono block text-accent">{group.label}</span>
                <div className="mt-3 grid grid-cols-2 gap-x-4">
                  {group.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-2 text-[14px] text-ink-inverse-muted transition-colors hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={group.href}
                href={group.href!}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-deal-room-line py-4 text-[15px] text-white"
              >
                {group.label}
              </Link>
            )
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-[13px] text-ink-inverse-muted">
              {dark ? "Dark theme" : "Light theme"}
            </span>
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
          </div>

          <Link
            href="/request-private-access"
            onClick={() => {
              track("request_access_click", { form: "mobile_nav" });
              setMobileOpen(false);
            }}
            className="mt-5 flex w-full items-center justify-center rounded-[2px] bg-accent px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            Request Private Access
          </Link>
        </nav>
      )}
    </header>
  );
}
