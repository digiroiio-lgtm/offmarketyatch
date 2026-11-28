import "server-only";

import { cloneElement, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { LOCALE_CONFIG, localizedPath, t, type Locale } from "@/lib/i18n";
import { canonical, SITE } from "@/lib/site";

const SKIP_KEYS = new Set([
  "href", "src", "slug", "path", "id", "key", "value", "type", "kind", "role",
  "name", "reference", "email", "phone", "price", "priceLabel", "date", "dateTime",
  "published", "updated", "timestamp", "query", "options", "opportunities", "sources",
  "related", "source", "country", "location", "className", "style", "target", "rel",
  "method", "action", "htmlFor", "tabIndex", "width", "height", "seed", "treatment",
  "image", "images", "onClick", "onChange", "dangerouslySetInnerHTML",
]);

function localizeUrl(value: string, locale: Locale): string {
  try {
    const url = new URL(value, SITE.url);
    if (url.origin !== SITE.url) return value;
    return canonical(localizedPath(locale, url.pathname)) + url.search + url.hash;
  } catch {
    return value;
  }
}

function translateSchema(value: unknown, locale: Locale, key = ""): unknown {
  if (typeof value === "string") {
    if (key === "@context" || key === "telephone" || key === "email") return value;
    if (key === "inLanguage") return LOCALE_CONFIG[locale].htmlLang;
    if (key === "url" || key === "item" || key === "mainEntityOfPage") return localizeUrl(value, locale);
    if (key === "@id") {
      const hashIndex = value.indexOf("#");
      return hashIndex >= 0
        ? localizeUrl(value.slice(0, hashIndex), locale) + value.slice(hashIndex)
        : localizeUrl(value, locale);
    }
    return t(locale, value);
  }
  if (Array.isArray(value)) return value.map((item) => translateSchema(item, locale, key));
  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      output[childKey] = translateSchema(childValue, locale, childKey);
    }
    return output;
  }
  return value;
}

function translateValue(value: unknown, locale: Locale, key = ""): unknown {
  if (SKIP_KEYS.has(key)) return value;
  if (typeof value === "string") return t(locale, value);
  if (Array.isArray(value)) return value.map((item) => translateValue(item, locale, key));
  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      output[childKey] = translateValue(childValue, locale, childKey);
    }
    return output;
  }
  return value;
}

export function translateReactTree(node: ReactNode, locale: Locale): ReactNode {
  if (typeof node === "string") return t(locale, node);
  if (Array.isArray(node)) return node.map((child) => translateReactTree(child, locale));
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<Record<string, unknown>>;
  const isDom = typeof element.type === "string";
  const isFragment = element.type === Fragment;
  const props: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(element.props)) {
    if (key === "children") {
      props.children = translateReactTree(value as ReactNode, locale);
    } else if (key === "schema") {
      props.schema = translateSchema(value, locale);
    } else if (isDom && !["aria-label", "aria-description", "placeholder", "alt", "title"].includes(key)) {
      props[key] = value;
    } else {
      props[key] = translateValue(value, locale, key);
    }
  }

  if (!isDom && !isFragment) props.locale = locale;
  return cloneElement(element, props);
}
