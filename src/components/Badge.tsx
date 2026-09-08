import type { OpportunityBadge } from "@/lib/types";

/**
 * Restrained badge system. Every badge shown is derived from a stored field
 * in the opportunity record — there is no code path that can render a
 * "3 buyers viewing" or "price dropping today" claim, because no such field
 * exists to derive one from.
 */

type Tone = "status" | "geo" | "class" | "caution";

const TONE: Record<Tone, string> = {
  status: "border-accent/45 text-accent",
  geo: "border-line-strong text-ink-muted",
  class: "border-line-strong text-ink-muted",
  caution: "border-lock/50 text-lock",
};

const BADGE_TONE: Record<OpportunityBadge, Tone> = {
  "OFF-MARKET": "status",
  "PRIVATE SALE": "status",
  CONFIDENTIAL: "status",
  "NEW OPPORTUNITY": "status",
  "PRICE OPPORTUNITY": "status",
  "POTENTIAL OPPORTUNITY": "caution",
  USA: "geo",
  FLORIDA: "geo",
  BAHAMAS: "geo",
  CARIBBEAN: "geo",
  MEDITERRANEAN: "geo",
  EXPLORER: "class",
  SUPERYACHT: "class",
  "MOTOR YACHT": "class",
  SAILING: "class",
};

export function Badge({
  badge,
  onDark = false,
}: {
  badge: OpportunityBadge;
  onDark?: boolean;
}) {
  const tone = BADGE_TONE[badge] ?? "geo";
  const onDarkClass =
    tone === "status"
      ? "border-accent/60 text-accent"
      : tone === "caution"
        ? "border-lock/60 text-lock"
        : "border-white/20 text-white/65";

  return (
    <span
      className={`label-mono inline-flex items-center border px-2 py-1 ${
        onDark ? onDarkClass : TONE[tone]
      }`}
    >
      {badge}
    </span>
  );
}

/** Shows the most meaningful badges first and caps the row so cards stay calm. */
export function BadgeRow({
  badges,
  limit = 3,
  onDark = false,
}: {
  badges: OpportunityBadge[];
  limit?: number;
  onDark?: boolean;
}) {
  const priority: OpportunityBadge[] = [
    "POTENTIAL OPPORTUNITY",
    "NEW OPPORTUNITY",
    "OFF-MARKET",
    "PRIVATE SALE",
    "CONFIDENTIAL",
    "FLORIDA",
    "BAHAMAS",
    "USA",
    "CARIBBEAN",
    "MEDITERRANEAN",
    "SUPERYACHT",
    "EXPLORER",
    "MOTOR YACHT",
    "SAILING",
    "PRICE OPPORTUNITY",
  ];
  const ordered = [...badges].sort(
    (a, b) => priority.indexOf(a) - priority.indexOf(b)
  );

  return (
    <div className="flex flex-wrap gap-1.5">
      {ordered.slice(0, limit).map((badge) => (
        <Badge key={badge} badge={badge} onDark={onDark} />
      ))}
    </div>
  );
}
