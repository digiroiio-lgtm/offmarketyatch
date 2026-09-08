import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  linkHref,
  linkLabel,
  onDark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  linkHref?: string;
  linkLabel?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`mb-10 flex flex-col gap-4 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`label-mono mb-3 ${onDark ? "text-accent" : "text-accent"}`}>{eyebrow}</p>
        )}
        <h2
          className={`display text-[30px] sm:text-[38px] ${
            onDark ? "text-ink-inverse" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`mt-4 text-[16px] leading-relaxed ${
              onDark ? "text-ink-inverse-muted" : "text-ink-muted"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={`shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            onDark ? "text-accent hover:text-white" : "text-accent hover:text-ink"
          }`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
