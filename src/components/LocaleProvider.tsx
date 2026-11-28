"use client";

import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LOCALE_CONFIG, localeFromPath, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale: initialLocale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname() || "/";
  const activeLocale = localeFromPath(pathname) || initialLocale;
  useEffect(() => {
    document.documentElement.lang = LOCALE_CONFIG[activeLocale].htmlLang;
    document.documentElement.dir = LOCALE_CONFIG[activeLocale].dir;
  }, [activeLocale]);
  return <LocaleContext.Provider value={activeLocale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
