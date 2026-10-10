import { NextResponse } from "next/server";

import { LeadValidationError, parseLead, persistLead } from "@/lib/leads";

/** Lead intake must always hit the origin — never cache or prerender it. */
export const dynamic = "force-dynamic";

// Modest per-IP rate limit. In-process, so it is a speed bump against casual
// form spam rather than a substitute for an edge WAF on a busy deployment.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a field no human sees, so anything filling it is automation.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true, id: "accepted" });
  }

  try {
    const lead = parseLead(body);
    await persistLead(lead, request.headers.get("user-agent") ?? undefined);
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    if (error instanceof LeadValidationError) {
      return NextResponse.json(
        { ok: false, field: error.field, error: error.message },
        { status: 422 }
      );
    }
    console.error("lead_intake_error", error);
    return NextResponse.json(
      { ok: false, error: "We could not record that request. Please try again." },
      { status: 500 }
    );
  }
}
