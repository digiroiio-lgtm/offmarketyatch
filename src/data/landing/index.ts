import { CORE_PAGES } from "@/data/landing/core";
import { SEGMENT_PAGES } from "@/data/landing/segments";
import type { LandingPage } from "@/data/landing/types";
import { USA_PAGES } from "@/data/landing/usa";

export type { LandingPage };

export const LANDING_PAGES: LandingPage[] = [
  ...CORE_PAGES,
  ...USA_PAGES,
  ...SEGMENT_PAGES,
];

const BY_SLUG = new Map(LANDING_PAGES.map((page) => [page.slug, page]));

export function getLandingPage(slug: string): LandingPage | undefined {
  return BY_SLUG.get(slug);
}

export function getIndexableLandingPages(): LandingPage[] {
  return LANDING_PAGES.filter((page) => page.indexable !== false);
}
