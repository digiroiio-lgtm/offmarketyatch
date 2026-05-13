import type { Metadata } from "next";
import MoxYachtClient from "./MoxYachtClient";

export const metadata: Metadata = {
  title: "MOX YACHT — Refit, Production & Project Management | Partner",
  description:
    "MOX YACHT delivers yacht refit coordination, new build production management, and owner representation across the Mediterranean. Antalya Freezone operations.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.offmarketyachts.com/partners/mox-yacht",
  },
  openGraph: {
    title: "MOX YACHT — Marine Infrastructure Partner",
    description:
      "Yacht refit, production management, and owner representation. Mediterranean reach from Antalya Freezone.",
    url: "https://www.offmarketyachts.com/partners/mox-yacht",
  },
};

export default function MoxYachtPage() {
  return <MoxYachtClient />;
}
