import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/superyacht-shows",
        destination: "/yacht-shows",
        permanent: true,
      },
      {
        source: "/off-market-yacht-listings",
        destination: "/off-market-superyachts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
