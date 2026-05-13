"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ACCESS_PASSWORD = "0000";
const COOKIE_NAME = "mky_access";

function setAccessCookie() {
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=1; path=/; expires=${expires}; SameSite=Lax`;
}

function hasAccessCookie() {
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=1`));
}

// ─── Icon components ──────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

// ─── Inner form (uses useSearchParams, must be inside Suspense) ───────────────

function AccessForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const destination = searchParams.get("from") || "/marketplace";

  useEffect(() => {
    if (hasAccessCookie()) {
      router.replace(destination);
    } else {
      setChecking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [router, destination]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (password === ACCESS_PASSWORD) {
        setAccessCookie();
        localStorage.setItem("mky_access", "1");
        router.push(destination);
      } else {
        setError(true);
        setLoading(false);
        setPassword("");
        inputRef.current?.focus();
      }
    }, 700);
  };

  if (checking) return null;

  return (
    <div className="rounded-2xl border border-[#c9a96e]/15 bg-[#0a1628]/70 px-8 py-9 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-7 text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-[#c9a96e]">
          <LockIcon />
        </span>
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.28em] text-[#c9a96e]">
          Restricted Access
        </p>
        <h1 className="text-[22px] font-bold leading-snug tracking-tight text-white">
          Private Member Access
        </h1>
        <p className="mt-2.5 text-[13px] leading-relaxed text-[#8b97a5]">
          Confidential yacht opportunities and off-market deal flow.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter access code"
            className={`w-full rounded-xl border bg-[#060e1a] px-5 py-4 pr-12 text-center text-white tracking-[0.6em] placeholder:tracking-normal placeholder:text-[#4a5568] transition-colors duration-200 focus:outline-none focus:ring-1 ${
              error
                ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
                : "border-[#1e3052] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
            }`}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a5568] transition-colors hover:text-[#8b97a5]"
            aria-label={showPassword ? "Hide code" : "Show code"}
            tabIndex={-1}
          >
            <EyeIcon visible={showPassword} />
          </button>
        </div>

        {/* Error */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            error ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-center text-[12px] text-red-400/90">
            Access code is incorrect — please try again.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-xl bg-[#c9a96e] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0a1628] transition-all duration-200 hover:bg-[#e2c99a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0a1628]/30 border-t-[#0a1628]" />
              Verifying…
            </span>
          ) : (
            "Access Member Portal"
          )}
        </button>
      </form>

      {/* Footer link */}
      <p className="mt-7 text-center text-[12px] text-[#4a5568]">
        Don&apos;t have access?{" "}
        <Link
          href="/private-access"
          className="text-[#c9a96e]/80 underline-offset-2 transition-colors hover:text-[#c9a96e] hover:underline"
        >
          Apply for consideration
        </Link>
      </p>
    </div>
  );
}

// ─── Page (exported default — wraps form in Suspense) ─────────────────────────

export default function AccessPage() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#060e1a]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#000_100%)]" />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]/[0.04] blur-[100px]" />

      {/* Content */}
      <div className="relative w-full max-w-[400px] px-5">
        {/* Logo */}
        <Link href="/" className="mb-10 flex flex-col items-center gap-1">
          <span className="text-[18px] font-bold tracking-wider text-white">
            OFFMARKET<span className="text-[#c9a96e]">YACHTS</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#8b97a5]">
            Private Yacht Platform
          </span>
        </Link>

        {/* Card — form wrapped in Suspense for useSearchParams() */}
        <Suspense
          fallback={
            <div className="rounded-2xl border border-[#c9a96e]/15 bg-[#0a1628]/70 px-8 py-9 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col items-center gap-4 py-6">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#1e3052] border-t-[#c9a96e]" />
                <p className="text-[12px] text-[#4a5568]">Loading…</p>
              </div>
            </div>
          }
        >
          <AccessForm />
        </Suspense>

        {/* Tagline */}
        <p className="mt-7 text-center text-[11px] leading-relaxed text-[#4a5568]">
          Access is restricted to qualified principals, family offices,
          <br className="hidden sm:block" /> and verified yacht brokers.
        </p>
      </div>
    </div>
  );
}

