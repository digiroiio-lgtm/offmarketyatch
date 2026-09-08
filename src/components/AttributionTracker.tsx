"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/lib/analytics";

/**
 * Captures campaign attribution on the first page of a visit so every lead
 * submitted later in the session carries the source that produced it.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
