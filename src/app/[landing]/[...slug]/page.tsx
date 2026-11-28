import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import AboutPage, { metadata as aboutMetadata } from "@/app/about/page";
import ContactPage, { metadata as contactMetadata } from "@/app/contact/page";
import FamilyOfficesPage, { metadata as familyOfficesMetadata } from "@/app/family-offices/page";
import OwnerRepresentationPage, { metadata as ownerRepresentationMetadata } from "@/app/owner-representation/page";
import PrivacyPage, { metadata as privacyMetadata } from "@/app/privacy/page";
import RequestPrivateAccessPage, { metadata as requestAccessMetadata } from "@/app/request-private-access/page";
import SellPrivatelyPage, { metadata as sellPrivatelyMetadata } from "@/app/sell-your-yacht-privately/page";
import TermsPage, { metadata as termsMetadata } from "@/app/terms/page";
import YachtBrokersPage, { metadata as yachtBrokersMetadata } from "@/app/yacht-brokers/page";
import YachtShowsPage, { metadata as yachtShowsMetadata } from "@/app/yacht-shows/page";
import MoxYachtPage, { metadata as moxYachtMetadata } from "@/app/partners/mox-yacht/page";
import MarketplacePage, { metadata as marketplaceMetadata } from "@/app/off-market-yachts/page";
import IntelligenceHub, { metadata as intelligenceMetadata } from "@/app/private-market-intelligence/page";
import OpportunityPage, { generateMetadata as opportunityMetadata } from "@/app/off-market-yachts/[slug]/page";
import ArticlePage, { generateMetadata as articleMetadata } from "@/app/private-market-intelligence/[slug]/page";
import LandingRoute, { generateMetadata as landingMetadata } from "@/app/[landing]/page";
import { getLandingPage } from "@/data/landing";
import { internalPath, isLocale } from "@/lib/i18n";
import { localizedPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { translateReactTree } from "@/lib/translate-tree";

type PageFunction = (props?: unknown) => ReactNode | Promise<ReactNode>;
type StaticRoute = { page: PageFunction; metadata: Metadata };

const STATIC_ROUTES: Record<string, StaticRoute> = {
  "/about": { page: AboutPage as PageFunction, metadata: aboutMetadata },
  "/contact": { page: ContactPage as PageFunction, metadata: contactMetadata },
  "/family-offices": { page: FamilyOfficesPage as PageFunction, metadata: familyOfficesMetadata },
  "/owner-representation": { page: OwnerRepresentationPage as PageFunction, metadata: ownerRepresentationMetadata },
  "/privacy": { page: PrivacyPage as PageFunction, metadata: privacyMetadata },
  "/request-private-access": { page: RequestPrivateAccessPage as PageFunction, metadata: requestAccessMetadata },
  "/sell-your-yacht-privately": { page: SellPrivatelyPage as PageFunction, metadata: sellPrivatelyMetadata },
  "/terms": { page: TermsPage as PageFunction, metadata: termsMetadata },
  "/yacht-brokers": { page: YachtBrokersPage as PageFunction, metadata: yachtBrokersMetadata },
  "/yacht-shows": { page: YachtShowsPage as PageFunction, metadata: yachtShowsMetadata },
  "/partners/mox-yacht": { page: MoxYachtPage as PageFunction, metadata: moxYachtMetadata },
  "/off-market-yachts": { page: MarketplacePage as PageFunction, metadata: marketplaceMetadata },
  "/private-market-intelligence": { page: IntelligenceHub as PageFunction, metadata: intelligenceMetadata },
};

type LocalizedParams = { landing: string; slug: string[] };

async function getRouteMetadata(path: string): Promise<Metadata> {
  const staticRoute = STATIC_ROUTES[path];
  if (staticRoute) return staticRoute.metadata;

  const opportunityMatch = path.match(/^\/off-market-yachts\/([^/]+)$/);
  if (opportunityMatch) {
    return opportunityMetadata({ params: Promise.resolve({ slug: opportunityMatch[1] }) } as never);
  }

  const articleMatch = path.match(/^\/private-market-intelligence\/([^/]+)$/);
  if (articleMatch) {
    return articleMetadata({ params: Promise.resolve({ slug: articleMatch[1] }) } as never);
  }

  const landingSlug = path.slice(1);
  if (!path.includes("/") && getLandingPage(landingSlug)) {
    return landingMetadata({ params: Promise.resolve({ landing: landingSlug }) } as never);
  }

  return {
    title: "Private Yacht Opportunities | OffMarketYacht",
    description: SITE.description,
  };
}

async function renderRoute(path: string): Promise<ReactNode> {
  const staticRoute = STATIC_ROUTES[path];
  if (staticRoute) return staticRoute.page({});

  const opportunityMatch = path.match(/^\/off-market-yachts\/([^/]+)$/);
  if (opportunityMatch) {
    return OpportunityPage({ params: Promise.resolve({ slug: opportunityMatch[1] }) } as never);
  }

  const articleMatch = path.match(/^\/private-market-intelligence\/([^/]+)$/);
  if (articleMatch) {
    return ArticlePage({ params: Promise.resolve({ slug: articleMatch[1] }) } as never);
  }

  const landingSlug = path.slice(1);
  if (!path.includes("/") && getLandingPage(landingSlug)) {
    return LandingRoute({ params: Promise.resolve({ landing: landingSlug }) } as never);
  }

  notFound();
}

export const dynamicParams = true;

export async function generateMetadata(props: { params: Promise<LocalizedParams> }): Promise<Metadata> {
  const { landing, slug } = await props.params;
  if (!isLocale(landing)) return {};
  const path = internalPath(landing, "/" + slug.join("/"));
  const base = await getRouteMetadata(path);
  return localizedPageMetadata(landing, path, base);
}

export default async function LocalizedNestedRoute(props: { params: Promise<LocalizedParams> }) {
  const { landing, slug } = await props.params;
  if (!isLocale(landing)) notFound();
  const path = internalPath(landing, "/" + slug.join("/"));
  const content = await renderRoute(path);
  return translateReactTree(content, landing);
}
