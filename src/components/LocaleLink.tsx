"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

type Props = ComponentProps<typeof Link> & { locale?: ReturnType<typeof useLocale> };

function localizeHref(href: Props["href"], locale: ReturnType<typeof useLocale>): Props["href"] {
  if (typeof href !== "string" || locale === "en" || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }
  const pathname = href.split(/[?#]/, 1)[0] ?? href;
  if (/^\/(admin|api|_next|sitemaps?)(\/|$)/.test(pathname)) return href;
  if (/\.[a-z0-9]{2,8}$/i.test(pathname)) return href;
  return localizedPath(locale, pathname) + href.slice(pathname.length);
}

export default function LocaleLink(props: Props) {
  const locale = useLocale();
  const linkProps = Object.fromEntries(Object.entries(props).filter(([key]) => key !== "locale")) as Props;
  return <Link {...linkProps} href={localizeHref(props.href, locale)} />;
}
