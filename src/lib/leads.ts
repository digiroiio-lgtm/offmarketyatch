import "server-only";

import { brokerClaimsFromAnswers, intakeSourceFor, submitterFromLead } from "@/lib/intake/from-lead";
import { validateBrokerClaims } from "@/lib/intake/rules";
import { recordIntake } from "@/lib/intake/service";
import { SITE } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEAD INTAKE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Qualified buyer leads are the site's primary KPI, so intake is deliberately
 *  boring and hard to lose:
 *
 *   1. Every accepted lead is written to the server log as a single structured
 *      JSON line, which any log drain or CRM pipeline can consume.
 *   2. If `LEAD_WEBHOOK_URL` is set, the lead is forwarded to it (CRM, Zapier,
 *      HubSpot, a Slack hook — whatever the business uses).
 *   3. A bounded in-process buffer backs the admin review screen.
 *
 *  The buffer is per-instance and does NOT survive a restart or scale-out. It
 *  exists so the admin screen is useful in development and on a single
 *  instance; durable storage means pointing `persistLead` at a database or
 *  keeping the webhook configured. That trade-off is stated rather than hidden.
 */

export type LeadKind =
  | "private-access"
  | "listing-inquiry"
  | "private-search"
  | "sell-side"
  | "broker-submission";

export interface LeadAttribution {
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

export interface StoredLead {
  id: string;
  kind: LeadKind;
  receivedAt: string;
  /** Answers from the qualification funnel, already sanitised. */
  answers: Record<string, string>;
  contact: {
    name: string;
    email: string;
    phone: string;
    country?: string;
    preferredContact?: string;
    company?: string;
  };
  /** Present on listing inquiries so demand can be measured per opportunity. */
  listingReference?: string;
  sourceUrl?: string;
  attribution: LeadAttribution;
}

const MAX_BUFFERED_LEADS = 500;

/**
 * Survives hot-reload in development by hanging off `globalThis`, which avoids
 * the buffer resetting on every edit.
 */
const globalStore = globalThis as unknown as { __omyLeads?: StoredLead[] };
const buffer: StoredLead[] = (globalStore.__omyLeads ??= []);

// ─── Validation ──────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export class LeadValidationError extends Error {
  constructor(public readonly field: string, message: string) {
    super(message);
    this.name = "LeadValidationError";
  }
}

/** Trim, cap length, and strip control characters before anything is stored. */
function clean(value: unknown, maxLength = 300): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanRecord(value: unknown, maxKeys = 30): Record<string, string> {
  if (typeof value !== "object" || value === null) return {};
  const out: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>).slice(0, maxKeys)) {
    const cleaned = clean(raw, 600);
    if (cleaned) out[clean(key, 60)] = cleaned;
  }
  return out;
}

const ATTRIBUTION_FIELDS: (keyof LeadAttribution)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "traffic_source",
  "landing_page",
  "first_seen",
];

function cleanAttribution(value: unknown): LeadAttribution {
  if (typeof value !== "object" || value === null) return {};
  const source = value as Record<string, unknown>;
  const out: LeadAttribution = {};
  for (const field of ATTRIBUTION_FIELDS) {
    const cleaned = clean(source[field], 200);
    if (cleaned) out[field] = cleaned;
  }
  return out;
}

const LEAD_KINDS: LeadKind[] = [
  "private-access",
  "listing-inquiry",
  "private-search",
  "sell-side",
  "broker-submission",
];

/**
 * Validate and normalise an untrusted request body into a `StoredLead`.
 * Throws `LeadValidationError` with the offending field on bad input.
 */
export function parseLead(body: unknown): StoredLead {
  if (typeof body !== "object" || body === null) {
    throw new LeadValidationError("body", "Expected an object.");
  }
  const input = body as Record<string, unknown>;

  const kind = clean(input.kind, 40) as LeadKind;
  if (!LEAD_KINDS.includes(kind)) {
    throw new LeadValidationError("kind", "Unknown lead type.");
  }

  const contactInput = (input.contact ?? {}) as Record<string, unknown>;
  const name = clean(contactInput.name, 120);
  const email = clean(contactInput.email, 200);
  const phone = clean(contactInput.phone, 60);

  if (name.length < 2) throw new LeadValidationError("name", "Please enter your full name.");
  if (!EMAIL_RE.test(email)) {
    throw new LeadValidationError("email", "Please enter a valid email address.");
  }
  if (phone.length < 6) {
    throw new LeadValidationError("phone", "Please enter a contact phone number.");
  }

  const lead: StoredLead = {
    id: `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`,
    kind,
    receivedAt: new Date().toISOString(),
    answers: cleanRecord(input.answers),
    contact: {
      name,
      email,
      phone,
      country: clean(contactInput.country, 80) || undefined,
      preferredContact: clean(contactInput.preferredContact, 40) || undefined,
      company: clean(contactInput.company, 160) || undefined,
    },
    listingReference: clean(input.listingReference, 40) || undefined,
    sourceUrl: clean(input.sourceUrl, 500) || undefined,
    attribution: cleanAttribution(input.attribution),
  };

  // A broker submission carries claims about authority. They are required, but
  // they stay claims: only a reviewer can verify them.
  if (kind === "broker-submission") {
    const check = validateBrokerClaims(
      submitterFromLead(lead),
      brokerClaimsFromAnswers(lead.answers)
    );
    if (!check.ok) throw new LeadValidationError(check.field ?? "broker", check.message ?? "Invalid.");
  }
  return lead;
}

// ─── Persistence ─────────────────────────────────────────────────────────────

/** Resolves `null` when no webhook is configured, otherwise whether delivery succeeded. */
async function forwardToWebhook(lead: StoredLead): Promise<boolean | null> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error(
        JSON.stringify({ event: "lead_webhook_failed", id: lead.id, status: response.status })
      );
      return false;
    }
    return true;
  } catch (error) {
    // Never fail the visitor's submission because a downstream CRM is down —
    // the log line above is the durable record either way.
    console.error(
      JSON.stringify({
        event: "lead_webhook_error",
        id: lead.id,
        message: error instanceof Error ? error.message : "unknown",
      })
    );
    return false;
  }
}

/**
 * Formspree delivers each lead to the team's inbox and keeps a durable copy in
 * its dashboard, which covers the gap left by the per-instance buffer below.
 * Called server-side so the funnel keeps its validation, honeypot and
 * attribution. The endpoint is public by design; override via env if needed.
 */
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xwlvbqdo";

const KIND_LABELS: Record<LeadKind, string> = {
  "private-access": "Private access request",
  "listing-inquiry": "Listing inquiry",
  "private-search": "Private search",
  "sell-side": "Sell-side submission",
  "broker-submission": "Broker submission",
};

async function forwardToFormspree(lead: StoredLead, userAgent?: string): Promise<boolean> {
  if (!FORMSPREE_ENDPOINT) return false;

  // Formspree renders flat fields best, so answers and attribution are
  // prefixed rather than nested.
  const payload: Record<string, string> = {
    _subject: `[OffMarketYacht] ${KIND_LABELS[lead.kind]}${
      lead.listingReference ? ` — ${lead.listingReference}` : ""
    }`,
    lead_id: lead.id,
    kind: lead.kind,
    received_at: lead.receivedAt,
    name: lead.contact.name,
    email: lead.contact.email,
    phone: lead.contact.phone,
  };
  if (lead.contact.country) payload.country = lead.contact.country;
  if (lead.contact.preferredContact) payload.preferred_contact = lead.contact.preferredContact;
  if (lead.contact.company) payload.company = lead.contact.company;
  if (lead.listingReference) payload.listing_reference = lead.listingReference;
  if (lead.sourceUrl) payload.source_url = lead.sourceUrl;
  for (const [key, value] of Object.entries(lead.answers)) payload[`answer_${key}`] = value;
  for (const [key, value] of Object.entries(lead.attribution)) payload[key] = value;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Server-side requests carry no browser Origin; Formspree's
        // "restrict to domain" setting rejects those without one.
        Origin: SITE.url,
        Referer: `${SITE.url}/`,
        // Pass the visitor's browser identity through. A bare server UA is
        // what Formspree's spam filter most often flags.
        ...(userAgent ? { "User-Agent": userAgent } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error(
        JSON.stringify({
          event: "lead_formspree_failed",
          id: lead.id,
          status: response.status,
          body: (await response.text().catch(() => "")).slice(0, 500),
        })
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "lead_formspree_error",
        id: lead.id,
        message: error instanceof Error ? error.message : "unknown",
      })
    );
    return false;
  }
}

export async function persistLead(lead: StoredLead, userAgent?: string): Promise<void> {
  console.info(JSON.stringify({ event: "lead_received", lead }));

  buffer.unshift(lead);
  if (buffer.length > MAX_BUFFERED_LEADS) buffer.length = MAX_BUFFERED_LEADS;

  const [formspree, webhook] = await Promise.all([
    forwardToFormspree(lead, userAgent),
    forwardToWebhook(lead),
  ]);

  // The in-process buffer is not durable, so if no durable channel accepted
  // the lead, say so rather than confirming a request nobody will see.
  if (!formspree && webhook !== true) {
    throw new Error("lead_delivery_failed");
  }

  // Owner and broker submissions also open a private intake record. A failure
  // here is logged but never loses the lead, which has already been delivered.
  if (intakeSourceFor(lead.kind)) {
    try {
      await recordIntake(lead);
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "intake_record_failed",
          id: lead.id,
          message: error instanceof Error ? error.message : "unknown",
        })
      );
    }
  }
}

export function listLeads(limit = 100): StoredLead[] {
  return buffer.slice(0, limit);
}

/** Lead volume per opportunity — which confidential listings create demand. */
export function leadCountsByListing(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const lead of buffer) {
    if (lead.listingReference) {
      counts[lead.listingReference] = (counts[lead.listingReference] ?? 0) + 1;
    }
  }
  return counts;
}

export function leadCountsByKind(): Record<LeadKind, number> {
  const counts = {
    "private-access": 0,
    "listing-inquiry": 0,
    "private-search": 0,
    "sell-side": 0,
    "broker-submission": 0,
  } as Record<LeadKind, number>;
  for (const lead of buffer) counts[lead.kind] += 1;
  return counts;
}

export const LEAD_BUFFER_IS_EPHEMERAL = true;
