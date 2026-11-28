import LocaleLink from "@/components/LocaleLink";
import { t, type Locale } from "@/lib/i18n";

/** Standard hero for supporting pages. Deal-room panel, editorial headline. */
export default function PageHero({
  eyebrow,
  h1,
  standfirst,
  ctaLabel = "Request Private Access",
  ctaHref = "/request-private-access",
  secondaryCtaLabel,
  secondaryCtaHref,
  locale = "en",
}: {
  eyebrow?: string;
  h1: string;
  standfirst?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  locale?: Locale;
}) {
  return (
    <section className="relative overflow-hidden bg-deal-room">
      <div aria-hidden="true" className="grid-texture absolute inset-0" />
      <div className="container-site relative py-16 lg:py-20">
        {eyebrow && <p className="label-mono text-accent">{eyebrow && t(locale, eyebrow)}</p>}
        <h1 className="display mt-6 max-w-4xl text-[38px] text-ink-inverse sm:text-[50px]">
          {t(locale, h1)}
        </h1>
        {standfirst && (
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-inverse-muted">
            {standfirst && t(locale, standfirst)}
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <LocaleLink href={ctaHref} className="btn-primary">
            {t(locale, ctaLabel)}
          </LocaleLink>
          {secondaryCtaLabel && secondaryCtaHref && (
            <LocaleLink href={secondaryCtaHref} className="btn-onDark">
              {secondaryCtaLabel && t(locale, secondaryCtaLabel)}
            </LocaleLink>
          )}
        </div>
      </div>
    </section>
  );
}
