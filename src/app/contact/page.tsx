import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Contact OffMarketYachts.com",
  description:
    "Contact OffMarketYachts.com for buyer access requests, yacht submissions, broker cooperation, and general enquiries. All messages handled privately.",
  alternates: {
    canonical: "https://www.offmarketyachts.com/contact",
  },
  openGraph: {
    url: "https://www.offmarketyachts.com/contact",
    title: "Contact OffMarketYachts.com",
    description: "Get in touch with OffMarketYachts.com — all enquiries handled privately.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.offmarketyachts.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.offmarketyachts.com/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <SchemaOrg schema={[breadcrumbSchema]} />
      <Breadcrumb items={[{ label: "Contact" }]} />
      <ContactClient />
    </>
  );
}
