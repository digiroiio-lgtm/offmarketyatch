import Link from "next/link";

export default function FinalCTA({
  title = "Your next yacht may never be publicly listed.",
  body = "Tell us what you are looking for. We will search the private market and come back to you with what is genuinely there.",
  primaryLabel = "Request Private Access",
  primaryHref = "/request-private-access",
  secondaryLabel = "Browse the Private Market",
  secondaryHref = "/off-market-yachts",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deal-room">
      <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-70" />
      <div className="container-site relative py-20 text-center lg:py-28">
        <h2 className="display mx-auto max-w-3xl text-[34px] text-ink-inverse sm:text-[46px]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-inverse-muted">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="btn-onDark">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
