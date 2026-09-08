import Link from "next/link";

/** Standard hero for supporting pages. Deal-room panel, editorial headline. */
export default function PageHero({
  eyebrow,
  h1,
  standfirst,
  ctaLabel = "Request Private Access",
  ctaHref = "/request-private-access",
  secondaryCtaLabel,
  secondaryCtaHref,
}: {
  eyebrow?: string;
  h1: string;
  standfirst?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deal-room">
      <div aria-hidden="true" className="grid-texture absolute inset-0" />
      <div className="container-site relative py-16 lg:py-20">
        {eyebrow && <p className="label-mono text-accent">{eyebrow}</p>}
        <h1 className="display mt-6 max-w-4xl text-[38px] text-ink-inverse sm:text-[50px]">
          {h1}
        </h1>
        {standfirst && (
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-inverse-muted">
            {standfirst}
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={ctaHref} className="btn-primary">
            {ctaLabel}
          </Link>
          {secondaryCtaLabel && secondaryCtaHref && (
            <Link href={secondaryCtaHref} className="btn-onDark">
              {secondaryCtaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
