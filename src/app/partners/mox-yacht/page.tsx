import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import MoxYachtClient from "./MoxYachtClient";

export const metadata: Metadata = {
  title: "MOX YACHT — Refit & Project Management",
  description:
    "MOX YACHT delivers yacht refit coordination, new build production management, and owner representation across the Mediterranean. Antalya Freezone operations.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: canonical("/partners/mox-yacht"),
  },
  openGraph: {
    title: "MOX YACHT — Marine Infrastructure Partner",
    description:
      "Yacht refit, production management, and owner representation. Mediterranean reach from Antalya Freezone.",
    url: canonical("/partners/mox-yacht"),
  },
};

export default function MoxYachtPage() {
  return <MoxYachtClient />;
}
