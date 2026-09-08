import type { NextConfig } from "next";

/**
 * Redirects preserve the URLs the previous information architecture published,
 * pointing each at its closest equivalent in the new structure. Every one is a
 * single hop — no chains — so link equity transfers cleanly.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Previous IA → new commercial-intent pages ────────────────────────
      { source: "/buy-off-market-yachts", destination: "/off-market-yachts-for-sale", permanent: true },
      { source: "/sell-off-market-yacht", destination: "/sell-your-yacht-privately", permanent: true },
      { source: "/off-market-superyachts", destination: "/superyachts-for-sale", permanent: true },
      { source: "/off-market-motor-yachts", destination: "/motor-yachts-for-sale", permanent: true },
      { source: "/off-market-catamarans", destination: "/sailing-yachts-for-sale", permanent: true },
      { source: "/off-market-trimarans", destination: "/sailing-yachts-for-sale", permanent: true },
      { source: "/private-yacht-brokerage", destination: "/private-yachts-for-sale", permanent: true },
      { source: "/off-market-yacht-listings", destination: "/superyachts-for-sale", permanent: true },

      // ── Funnels ─────────────────────────────────────────────────────────
      { source: "/private-access", destination: "/request-private-access", permanent: true },
      { source: "/submit-yacht", destination: "/sell-your-yacht-privately", permanent: true },
      { source: "/access", destination: "/request-private-access", permanent: true },

      // ── The gated marketplace is now the public masked marketplace ──────
      { source: "/marketplace", destination: "/off-market-yachts", permanent: true },
      { source: "/marketplace/:path*", destination: "/off-market-yachts", permanent: true },

      // ── Retained from the previous configuration ────────────────────────
      { source: "/superyacht-shows", destination: "/yacht-shows", permanent: true },
    ];
  },
};

export default nextConfig;
