import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import SchemaOrg from "@/components/SchemaOrg";
import { ARTICLES, getArticle } from "@/data/articles";
import { articleSchema, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

/*
  Regenerable on demand, so a cache invalidation can never leave the cluster
  permanently 404. A slug with no article still 404s below.
*/
export const dynamicParams = true;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/private-market-intelligence/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/private-market-intelligence/${article.slug}`,
    ogType: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
  });
}

export default async function ArticlePage(
  props: PageProps<"/private-market-intelligence/[slug]">
) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/private-market-intelligence/${article.slug}`;
  const related = article.related
    .map((relatedSlug) => getArticle(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <SchemaOrg
        schema={[
          breadcrumbSchema([
            { name: "Private Market Intelligence", path: "/private-market-intelligence" },
            { name: article.title, path },
          ]),
          articleSchema({
            headline: article.title,
            description: article.metaDescription,
            path,
            published: article.published,
            modified: article.updated,
          }),
          faqSchema(article.faqs),
        ]}
      />

      <Breadcrumb
        items={[
          { label: "Intelligence", href: "/private-market-intelligence" },
          { label: article.title },
        ]}
      />

      <article>
        <header className="section-tight border-b border-line">
          <div className="container-prose">
            <p className="label-mono text-accent">{article.cluster}</p>
            <h1 className="display mt-5 text-[36px] text-ink sm:text-[46px]">
              {article.title}
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-ink-muted">
              {article.standfirst}
            </p>
            <p className="label-mono mt-7 text-ink-faint">
              {article.readingMinutes} min read · Updated{" "}
              <time dateTime={article.updated}>
                {new Date(article.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </div>
        </header>

        <div className="section-tight">
          <div className="container-prose prose-editorial">
            {article.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* AI-citable answers, placed high so answer engines find them first */}
        <div className="section-tight bg-paper-sunken">
          <div className="container-prose">
            <h2 className="label-mono mb-8 text-accent">In short</h2>
            <div className="space-y-9">
              {article.answers.map((answer) => (
                <AnswerBlock
                  key={answer.question}
                  question={answer.question}
                  answer={answer.answer}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="section-tight">
          <div className="container-prose prose-editorial">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Contextual links into inventory and funnels */}
        <div className="section-tight border-y border-line bg-paper-sunken">
          <div className="container-prose">
            <h2 className="label-mono mb-5 text-accent">Put this to use</h2>
            <div className="flex flex-wrap gap-2.5">
              {article.inventoryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="btn-secondary btn-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="defer-render">
          <FAQSection faqs={article.faqs} />
        </div>

        {related.length > 0 && (
          <div className="section-tight defer-render border-t border-line">
            <div className="container-wide">
              <h2 className="label-mono mb-6 text-accent">Continue reading</h2>
              <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/private-market-intelligence/${item.slug}`}
                    className="bg-paper-raised p-7 transition-colors hover:bg-paper-sunken"
                  >
                    <h3 className="text-[17px] font-semibold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                      {item.standfirst}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      <FinalCTA />
    </>
  );
}
