import Link from "next/link";

interface PageHeroProps {
  h1: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  dark?: boolean;
}

export default function PageHero({
  h1,
  subheadline,
  ctaLabel = "Request Private Access",
  ctaHref = "/private-access",
  secondaryCtaLabel,
  secondaryCtaHref,
  dark = true,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-28 ${
        dark ? "bg-[#0a1628]" : "bg-[#f5f7fa]"
      }`}
    >
      {/* subtle grid background */}
      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right,#c9a96e 1px,transparent 1px),linear-gradient(to bottom,#c9a96e 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      )}

      <div className="container-site relative text-center">
        <h1
          className={`mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? "text-white" : "text-[#0a1628]"
          }`}
        >
          {h1}
        </h1>

        {subheadline && (
          <p
            className={`mx-auto mt-5 max-w-2xl text-lg leading-relaxed ${
              dark ? "text-[#8b97a5]" : "text-[#4a5568]"
            }`}
          >
            {subheadline}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={ctaHref}
            className="btn-gold"
          >
            {ctaLabel}
          </Link>
          {secondaryCtaLabel && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className={dark ? "btn-outline-gold" : "btn-outline-gold"}
            >
              {secondaryCtaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
