import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import PageHero from "@/components/PageHero";
import SchemaOrg from "@/components/SchemaOrg";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { SITE, canonical } from "@/lib/site";

import ContactClient from "./ContactClient";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Private Yacht Acquisition Enquiries",
  description:
    "Contact OffMarketYacht for confidential yacht acquisition and private sale enquiries. All inquiries handled discreetly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: canonical("/contact"),
            name: "Contact OffMarketYacht",
            mainEntity: {
              "@type": "Organization",
              "@id": `${SITE.url}/#organization`,
              email: SITE.email,
              telephone: SITE.phoneDisplay,
            },
          },
        ]}
      />
      <Breadcrumb items={[{ label: "Contact" }]} />

      <PageHero
        eyebrow="Contact"
        h1="Start a confidential conversation."
        standfirst="Acquisition enquiries, private sale discussions and broker cooperation."
        ctaLabel="Request Private Access"
        secondaryCtaLabel="Sell Privately"
        secondaryCtaHref="/sell-your-yacht-privately"
      />

      <ContactClient />
    </>
  );
}
