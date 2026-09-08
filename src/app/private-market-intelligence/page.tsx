import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumb from "@/components/Breadcrumb";
import FinalCTA from "@/components/FinalCTA";
import SchemaOrg from "@/components/SchemaOrg";
import { ARTICLES, getArticlesByCluster } from "@/data/articles";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { canonical } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Market Intelligence | How the Off-Market Yacht Market Works",
  description:
    "Editorial intelligence on the private yacht market: off-market mechanics, pocket listings, US and Florida buying guides, purchase process, survey and valuation.",
  path: "/private-market-intelligence",
});

export default function IntelligenceHub() {
  const clusters = getArticlesByCluster();

  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([
            { name: "Private Market Intelligence", path: "/private-market-intelligence" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Private Market Intelligence",
            numberOfItems: ARTICLES.length,
            itemListElement: ARTICLES.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: article.title,
              url: canonical(`/private-market-intelligence/${article.slug}`),
            })),
          },
        ]}
      />

      <Breadcrumb items={[{ label: "Private Market Intelligence" }]} />

      <section className="relative overflow-hidden bg-deal-room">
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <div className="container-site relative py-16 lg:py-20">
          <p className="label-mono text-accent">Private Market Intelligence</p>
          <h1 className="display mt-6 max-w-3xl text-[38px] text-ink-inverse sm:text-[52px]">
            How the private yacht market actually works.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-inverse-muted">
            Written for buyers who want to understand the mechanics before committing capital.
            No sales copy, no invented statistics, and an explicit note wherever the honest
            answer is that the data does not exist.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          {clusters.map(({ cluster, articles }) => (
            <div key={cluster} className="mb-16 last:mb-0">
              <h2 className="label-mono mb-6 text-accent">{cluster}</h2>
              <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/private-market-intelligence/${article.slug}`}
                    className="group flex flex-col bg-paper-raised p-7 transition-colors hover:bg-paper-sunken"
                  >
                    <h3 className="text-[19px] font-semibold leading-snug text-ink">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                      {article.standfirst}
                    </p>
                    <p className="label-mono mt-6 text-ink-faint">
                      {article.readingMinutes} min read
                      <span className="ml-3 text-accent">Read →</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA
        title="Understanding the market is the easy part."
        body="Access to it is the difficult part. Tell us what you are looking for and we will search the private market on your behalf."
      />
    </>
  );
}
