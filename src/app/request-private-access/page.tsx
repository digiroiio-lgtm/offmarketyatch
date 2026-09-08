import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import SchemaOrg from "@/components/SchemaOrg";
import PrivateAccessForm from "@/components/forms/PrivateAccessForm";
import { getInventoryStats } from "@/lib/opportunities";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request Private Access | Confidential Yacht Opportunities",
  description:
    "Tell us what you are looking for and we will search the private yacht market on your behalf. Confidential, no obligation, reviewed by a person.",
  path: "/request-private-access",
  // A conversion funnel is not a search destination.
  noindex: true,
});

export default function RequestPrivateAccessPage() {
  const stats = getInventoryStats();

  return (
    <>
      <SchemaOrg
        schema={breadcrumbSchema([
          { name: "Request Private Access", path: "/request-private-access" },
        ])}
      />
      <Breadcrumb items={[{ label: "Request Private Access" }]} />

      <section className="section">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="label-mono text-accent">Private Market Access</p>
              <h1 className="display mt-5 text-[38px] text-ink sm:text-[46px]">
                Tell us what you&rsquo;re looking for.
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">
                Five questions. They let us match you against what is currently under mandate and,
                more usefully, tell us what to go looking for.
              </p>

              <ul className="mt-10 space-y-5 border-t border-line pt-8">
                {[
                  {
                    title: "Reviewed by a person",
                    body: "Not an autoresponder. Someone reads your criteria against the owners' disclosure terms before anything is shared.",
                  },
                  {
                    title: "We will tell you if nothing fits",
                    body: "An honest no is more useful than a list of near-misses. We would rather keep the relationship than fill the silence.",
                  },
                  {
                    title: "Confidential in both directions",
                    body: "Your identity reaches an owner only when you have agreed that it should.",
                  },
                ].map((item) => (
                  <li key={item.title}>
                    <h2 className="text-[16px] font-semibold text-ink">{item.title}</h2>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>

              {stats.total > 0 && (
                <p className="mt-10 text-[14px] text-ink-faint">
                  {stats.total} opportunities currently published · {stats.usa} in the United
                  States
                </p>
              )}
            </div>

            <PrivateAccessForm />
          </div>
        </div>
      </section>
    </>
  );
}
