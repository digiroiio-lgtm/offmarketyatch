import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.offmarketyachts.com"),
  title: {
    default:
      "OffMarketYachts.com – Private Off-Market Yachts for Qualified Buyers & Sellers",
    template: "%s | OffMarketYachts.com",
  },
  description:
    "OffMarketYachts.com is a private platform for off-market yachts, superyachts, motor yachts, catamarans, and luxury marine assets not publicly listed. Buyer access and discreet seller representation available.",
  keywords: [
    "off market yachts",
    "off market yacht",
    "off market superyachts",
    "private yacht listings",
    "luxury yachts for sale off market",
    "private yacht deals",
    "exclusive yacht opportunities",
    "off market motor yacht",
    "off market catamaran",
    "off market trimaran",
  ],
  authors: [{ name: "OffMarketYachts.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.offmarketyachts.com",
    siteName: "OffMarketYachts.com",
    title:
      "OffMarketYachts.com – Private Off-Market Yachts for Qualified Buyers & Sellers",
    description:
      "A private, high-trust platform for off-market yachts and superyachts not publicly listed. Buyer access and discreet seller representation.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "OffMarketYachts.com – Private Yacht Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "OffMarketYachts.com – Private Off-Market Yachts",
    description:
      "Private platform for off-market yachts and superyachts. Qualified buyers and discreet seller representation.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.offmarketyachts.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-white text-[#0a1628]">
        {/* Inline script runs before hydration to set the correct theme class without flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
