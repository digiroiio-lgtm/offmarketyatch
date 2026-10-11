"use client";

/**
 * GA4-ready event architecture.
 *
 * Events are pushed to `window.dataLayer`, which Google Tag Manager or a GA4
 * config tag consumes. Nothing here assumes a particular tag manager is
 * installed — if none is, the pushes queue harmlessly on the array.
 *
 * Attribution is captured on first touch and preserved through the whole lead
 * journey, so a lead recorded three sessions later still carries the campaign
 * that produced it.
 */

export type AnalyticsEvent =
  | "search_started"
  | "search_completed"
  | "filter_used"
  | "request_access_click"
  | "request_access_started"
  | "request_access_completed"
  | "private_search_started"
  | "private_search_completed"
  | "sell_yacht_started"
  | "sell_yacht_completed"
  | "broker_intake_started"
  | "broker_intake_completed";

export interface EventPayload {
  listing_id?: string;
  price_band?: string;
  length_band?: string;
  location?: string;
  type?: string;
  step?: number;
  query?: string;
  filter_name?: string;
  filter_value?: string;
  result_count?: number;
  form?: string;
  [key: string]: string | number | boolean | undefined;
}

interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  traffic_source?: string;
  landing_page?: string;
  first_seen?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    /** Provided by public/omy-ga4-values.js; sends a valued lead event. */
    omyLead?: (kind: "buyer" | "seller") => void;
  }
}

const ATTRIBUTION_KEY = "omy_attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
] as const;

function safeSessionRead(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function safeSessionWrite(value: Attribution): void {
  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    /* private browsing or blocked storage — attribution degrades, nothing breaks */
  }
}

/**
 * Capture UTM/click IDs on the first page of the visit and keep them for the
 * rest of it. Later pages without UTMs do not overwrite the original source.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const existing = safeSessionRead();
  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) incoming[key] = value.slice(0, 200);
  }

  const hasIncoming = Object.keys(incoming).length > 0;
  if (existing && !hasIncoming) return existing;

  const attribution: Attribution = {
    ...(existing ?? {}),
    ...incoming,
    traffic_source:
      existing?.traffic_source ??
      (document.referrer ? new URL(document.referrer).hostname : "direct"),
    landing_page: existing?.landing_page ?? window.location.pathname,
    first_seen: existing?.first_seen ?? new Date().toISOString(),
  };

  safeSessionWrite(attribution);
  return attribution;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return safeSessionRead() ?? captureAttribution();
}

/**
 * Send a GA4 event with attribution and page context attached. Uses gtag when
 * GA4 is loaded; otherwise the object is queued on dataLayer so Google Tag
 * Manager (or a later gtag load) can still consume it.
 */
export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  // Completed events fire only after the server accepted the lead, so they are
  // the right moment for the valued GA4 lead events.
  if (event === "request_access_completed" || event === "private_search_completed") {
    window.omyLead?.("buyer");
  } else if (event === "sell_yacht_completed") {
    window.omyLead?.("seller");
  }

  const params = {
    ...getAttribution(),
    page_path: window.location.pathname,
    ...payload,
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
