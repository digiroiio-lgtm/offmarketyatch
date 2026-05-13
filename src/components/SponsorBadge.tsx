// ─── SponsorBadge ─────────────────────────────────────────────────────────────

export default function SponsorBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border border-[#c9a96e]/20 bg-[#060e1a]/80 px-2 py-[3px] text-[8px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]/70 backdrop-blur-sm ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-[#c9a96e]/60" />
      Sponsored
    </span>
  );
}
