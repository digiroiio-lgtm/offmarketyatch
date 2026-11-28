"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { internalPath, localizedPath, t, type Locale } from "@/lib/i18n";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "it", label: "Italiano" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();

  function changeLanguage(next: Locale) {
    const englishPath = internalPath(locale, pathname);
    router.push(localizedPath(next, englishPath));
  }

  return (
    <select
      aria-label={t(locale, "Select language")}
      value={locale}
      onChange={(event) => changeLanguage(event.target.value as Locale)}
      className="h-8 max-w-[92px] rounded-[2px] border border-white/15 bg-deal-room px-2 text-[11px] font-semibold text-ink-inverse-muted outline-none hover:border-white/40"
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value} className="bg-deal-room text-ink-inverse">
          {option.label}
        </option>
      ))}
    </select>
  );
}
