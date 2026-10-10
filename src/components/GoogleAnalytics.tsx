import Script from "next/script";

/** GA4 measurement ID. Override per environment with NEXT_PUBLIC_GA_ID. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-ZMWNM9MYMQ";

/**
 * Loads GA4 after the page is interactive so it never blocks rendering.
 * Page views on client-side navigation are covered by GA4 enhanced
 * measurement (history change events); custom events come from `track()`.
 */
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
