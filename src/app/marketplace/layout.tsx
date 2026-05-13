import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Private Marketplace | OffMarketYachts",
  description:
    "Private member marketplace for off-market yacht opportunities. Exclusive listings for qualified principals.",
  robots: { index: false, follow: false },
};

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
