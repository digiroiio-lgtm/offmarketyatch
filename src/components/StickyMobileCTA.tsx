"use client";

import LocaleLink from "@/components/LocaleLink";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";
import { usePathname } from "next/navigation";

import { track } from "@/lib/analytics";

/** Routes where a second, competing CTA would just be in the way. */
const SUPPRESSED_PREFIXES = [
  "/request-private-access",
  "/sell-your-yacht-privately",
  "/admin",
];

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const locale = useLocale();
  const basePath = pathname.replace(/^\/(it|de|fr|ar)(?=\/|$)/, "") || "/";
  if (SUPPRESSED_PREFIXES.some((prefix) => basePath.startsWith(prefix))) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-deal-room-line bg-deal-room/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex gap-2.5">
        <LocaleLink
          href="/off-market-yachts"
          className="btn-onDark flex-1 py-3 text-[11px]"
         >{t(locale, "Browse Market")}</LocaleLink>
        <LocaleLink
          href="/request-private-access"
          onClick={() => track("request_access_click", { form: "sticky_mobile" })}
          className="btn-primary flex-1 py-3 text-[11px]"
         >{t(locale, "Private Access")}</LocaleLink>
      </div>
    </div>
  );
}
