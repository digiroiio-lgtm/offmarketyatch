"use client";

import { useState } from "react";

import { getAttribution } from "@/lib/analytics";

export interface LeadSubmission {
  kind: "private-access" | "listing-inquiry" | "private-search" | "sell-side";
  answers: Record<string, string>;
  contact: {
    name: string;
    email: string;
    phone: string;
    country?: string;
    preferredContact?: string;
    company?: string;
  };
  listingReference?: string;
  /** Honeypot value. Always empty for a real person. */
  website?: string;
}

/**
 * Posts a lead to the intake endpoint with attribution, source URL and
 * timestamp attached automatically, so no funnel has to remember to do it.
 */
export function useLeadSubmit() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: LeadSubmission): Promise<boolean> {
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          sourceUrl: window.location.href,
          submittedAt: new Date().toISOString(),
          attribution: getAttribution(),
        }),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setError(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return false;
      }
      setStatus("done");
      return true;
    } catch {
      setError(
        "We could not reach the server. Please check your connection and try again."
      );
      setStatus("error");
      return false;
    }
  }

  return { submit, status, error };
}
