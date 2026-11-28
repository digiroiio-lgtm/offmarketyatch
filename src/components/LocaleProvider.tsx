"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale: initialLocale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname() || "/";
  const activeLocale = localeFromPath(pathname) || initialLocale;
  return <LocaleContext.Provider value={activeLocale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
