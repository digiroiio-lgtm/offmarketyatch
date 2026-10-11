import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import SourcesNote from "@/components/SourcesNote";
import MarketExplorer from "@/components/MarketExplorer";
import SampleInventoryNotice from "@/components/SampleInventoryNotice";
import SchemaOrg from "@/components/SchemaOrg";
import { LANDING_PAGES, getLandingPage } from "@/data/landing";
import { getOpportunities } from "@/lib/opportunities";
import {
  breadcrumbSchema,
  faqSchema,
  opportunityListSchema,
  pageMetadata,
} from "@/lib/seo";

/**
 * Commercial-intent landing pages. One route serves every entry in the landing
 * registry, and only those: a slug with no entry 404s below rather than
 * rendering an empty templated page.
 *
 * `dynamicParams` is true so a page can be regenerated on demand after a cache
 * invalidation. With `false`, anything that invalidated this route — an admin
 * action revalidating inventory, for instance — would leave every landing page
 * permanently 404, because the build-time param list is not re-evaluated at
 * runtime.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ landing: page.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[landing]">
): Promise<Metadata> {
  const { landing } = await props.params;
  const page = getLandingPage(landing);
  if (!page) return {};

  return pageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/${page.slug}`,
    noindex: page.indexable === false,
  });
}

export default async function LandingRoute(props: PageProps<"/[landing]">) {
  const { landing } = await props.params;
  const page = getLandingPage(landing);
  if (!page) notFound();

  const opportunities = getOpportunities(page.query);

  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema(
            page.breadcrumb.map((crumb) => ({
              name: crumb.label,
              path: crumb.href ?? `/${page.slug}`,
            }))
          ),
          faqSchema(page.faqs),
          ...(opportunities.length > 0
            ? [opportunityListSchema(opportunities, page.h1)]
            : []),
        ]}
      />

      <Breadcrumb items={page.breadcrumb} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-deal-room">
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <div className="container-site relative py-16 lg:py-20">
          <p className="label-mono text-accent">Private Market Access</p>
          <h1 className="display mt-6 max-w-4xl text-[38px] text-ink-inverse sm:text-[52px]">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-inverse-muted">
            {page.standfirst}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/request-private-access" className="btn-primary">
              Request Private Access
            </Link>
            <Link href="#opportunities" className="btn-onDark">
              {opportunities.length > 0
                ? `View ${opportunities.length} ${
                    opportunities.length === 1 ? "Opportunity" : "Opportunities"
                  }`
                : "Start a Private Search"}
            </Link>
          </div>
        </div>
      </section>

      {/* Unique editorial intro */}
      <section className="section-tight">
        <div className="container-site">
          <div className="max-w-[760px] prose-editorial">
            {page.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 max-w-[760px]">
            <SampleInventoryNotice />
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section
        id="opportunities"
        className="section border-y border-line bg-paper-sunken"
        aria-labelledby="inventory-heading"
      >
        <div className="container-wide">
          <h2
            id="inventory-heading"
            className="display mb-8 text-[30px] text-ink sm:text-[36px]"
          >
            {page.inventoryHeading}
          </h2>
          {opportunities.length > 0 ? (
            <MarketExplorer opportunities={opportunities} showChips={false} />
          ) : (
            <div className="border border-dashed border-line-strong px-6 py-14 text-center">
              <p className="mx-auto max-w-lg text-[16px] leading-relaxed text-ink-muted">
                {page.emptyMessage}
              </p>
              <Link href="/request-private-access" className="btn-primary mt-7">
                Start a Private Search
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* AI-citable answers */}
      <section className="section-tight defer-render" aria-labelledby="answers-heading">
        <div className="container-site">
          <h2
            id="answers-heading"
            className="display mb-9 text-[30px] text-ink sm:text-[34px]"
          >
            The short answers
          </h2>
          <div className="grid gap-9 lg:grid-cols-2">
            {page.answers.map((answer) => (
              <AnswerBlock
                key={answer.question}
                question={answer.question}
                answer={answer.answer}
                as="h3"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Optional secondary editorial */}
      {page.detail && (
        <section className="section-tight defer-render bg-paper-sunken">
          <div className="container-site">
            <div className="max-w-[760px] prose-editorial">
              <h2 className="!mt-0">{page.detail.heading}</h2>
              {page.detail.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="defer-render">
        <FAQSection faqs={page.faqs} />
      </div>

      {/* Internal links */}
      <section className="section-tight defer-render border-t border-line">
        <div className="container-site">
          <h2 className="label-mono mb-6 text-accent">Related</h2>
          <div className="flex flex-wrap gap-2.5">
            {page.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-line-strong px-4 py-2.5 text-[14px] text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {page.sources && <SourcesNote sources={page.sources} />}

      <FinalCTA />
    </>
  );
}
