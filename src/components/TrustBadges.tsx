interface TrustBadgesProps {
  dark?: boolean;
}

const badges = [
  { icon: "🔒", label: "Private Review Only" },
  { icon: "👁", label: "No Public Listing Exposure" },
  { icon: "✅", label: "Qualified Introductions Only" },
  { icon: "📋", label: "NDA Available" },
];

export default function TrustBadges({ dark = false }: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {badges.map(({ icon, label }) => (
        <div
          key={label}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide ${
            dark
              ? "border-[#112040] text-[#8b97a5]"
              : "border-[#e8ecf0] text-[#4a5568]"
          }`}
        >
          <span>{icon}</span>
          {label}
        </div>
      ))}
    </div>
  );
}
