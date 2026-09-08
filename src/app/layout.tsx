import type { Metadata } from "next";

import "./globals.css";
import AttributionTracker from "@/components/AttributionTracker";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SchemaOrg from "@/components/SchemaOrg";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Off-Market Yachts for Sale | Private Yacht Opportunities — OffMarketYacht",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Off-Market Yachts for Sale | Private Yacht Opportunities",
    description: SITE.description,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Off-Market Yachts for Sale | Private Yacht Opportunities",
    description: SITE.description,
    images: ["/og-default.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE.url },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {/* Applies the stored theme before paint so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <SchemaOrg schema={[organizationSchema(), websiteSchema()]} />
        <AttributionTracker />
        <Header />
        <main id="main" className="flex-1 pb-[68px] md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
