import type { PublicImage, YachtType } from "@/lib/types";

/**
 * Privacy treatment for opportunity imagery.
 *
 * Confidential listings cannot carry identifying photography, and dropping a
 * stock photo in its place would misrepresent the vessel. So the card renders
 * a generated profile study instead: a deterministic, seeded drawing that
 * conveys class and proportion without asserting anything about a specific
 * yacht. It is labelled for what it is, weighs nothing, and paints instantly.
 *
 * When a listing has authorised photography, pass it through `photoSrc` and
 * this component steps aside.
 */

const PROFILES: Record<YachtType, string> = {
  // Each path is an abstracted sheer + superstructure profile, drawn in a
  // 400×130 box. Deliberately generic: proportion only, no identifying detail.
  "Motor Yacht":
    "M8 104 L392 104 L378 118 L26 118 Z M40 104 L40 84 L112 78 L118 66 L236 62 L246 76 L330 82 L344 104 Z M118 66 L124 50 L212 48 L220 62 Z",
  Superyacht:
    "M4 106 L396 106 L380 120 L22 120 Z M30 106 L30 82 L96 76 L100 62 L262 58 L276 74 L346 80 L358 106 Z M100 62 L106 44 L238 42 L250 58 Z M140 42 L146 28 L214 27 L220 42 Z",
  "Explorer Yacht":
    "M10 104 L390 104 L376 120 L28 120 Z M44 104 L44 78 L108 74 L112 56 L226 54 L238 72 L322 76 L336 104 Z M112 56 L118 40 L206 39 L216 54 Z M300 74 L300 52 L318 52 L318 76 Z",
  "Sailing Yacht":
    "M22 106 L378 106 L358 120 L44 120 Z M60 106 L58 92 L200 88 L330 92 L332 106 Z M196 88 L196 8 L200 8 L200 88 Z M204 20 L268 84 L204 84 Z M192 24 L142 84 L192 84 Z",
  Catamaran:
    "M18 104 L150 104 L140 120 L30 120 Z M250 104 L382 104 L370 120 L262 120 Z M60 104 L60 92 L340 92 L340 104 Z M150 92 L150 12 L154 12 L154 92 Z M158 26 L214 88 L158 88 Z M146 30 L98 88 L146 88 Z",
  "Sport Yacht":
    "M14 102 L386 102 L370 118 L32 118 Z M52 102 L52 86 L128 80 L144 68 L268 66 L282 82 L344 86 L352 102 Z",
  Trimaran:
    "M40 104 L360 104 L346 118 L54 118 Z M12 100 L44 100 L44 110 L14 110 Z M356 100 L388 100 L386 110 L356 110 Z M120 104 L120 90 L280 90 L280 104 Z M198 90 L198 14 L202 14 L202 90 Z M206 28 L258 86 L206 86 Z",
};

/** Deterministic 0–1 value from a seed, so a card looks the same on every render. */
function seedValue(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return hash / 100000;
}

export default function OpportunityVisual({
  image,
  type,
  className = "",
  priority = false,
}: {
  image: PublicImage;
  type: YachtType;
  className?: string;
  /** Set on above-the-fold cards; drops the lazy hint so LCP paints sooner. */
  priority?: boolean;
}) {
  const drift = seedValue(image.seed);
  const horizon = 58 + drift * 10;
  const gradientId = `og-${image.seed}`;
  const path = PROFILES[type] ?? PROFILES["Motor Yacht"];

  return (
    <div
      className={`relative overflow-hidden bg-deal-room ${className}`}
      data-treatment={image.treatment}
    >
      <svg
        viewBox="0 0 400 200"
        className="h-full w-full"
        role="img"
        aria-label={image.alt}
        preserveAspectRatio="xMidYMid slice"
        {...(priority ? {} : { loading: "lazy" as const })}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#151b23" />
            <stop offset={`${horizon}%`} stopColor="#0d1218" />
            <stop offset="100%" stopColor="#06080b" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill={`url(#${gradientId})`} />

        {/* Measurement rule — the deal-room motif, not decoration */}
        <g stroke="#ffffff" strokeOpacity="0.09" strokeWidth="0.5">
          {Array.from({ length: 21 }, (_, i) => (
            <line key={i} x1={i * 20} y1="176" x2={i * 20} y2={i % 5 === 0 ? 166 : 171} />
          ))}
          <line x1="0" y1="176" x2="400" y2="176" />
        </g>

        {/* Horizon */}
        <line
          x1="0"
          y1={horizon + 62}
          x2="400"
          y2={horizon + 62}
          stroke="#ffffff"
          strokeOpacity="0.12"
          strokeWidth="0.5"
        />

        {/* Vessel profile study */}
        <g transform={`translate(0, ${horizon - 18})`}>
          <path d={path} fill="#ffffff" fillOpacity="0.14" />
          <path d={path} fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="0.6" />
        </g>
      </svg>

      {image.treatment !== "authorized" && (
        <span className="label-mono absolute bottom-2.5 left-3 text-white/45">
          {image.treatment === "silhouette" ? "Profile study" : "Illustrative"} · not the vessel
        </span>
      )}
    </div>
  );
}
