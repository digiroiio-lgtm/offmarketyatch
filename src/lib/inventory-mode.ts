/**
 * Whether the opportunities on this deployment are real broker-sourced
 * records or the sample set shipped with the platform.
 *
 * The site must never present sample inventory as live availability, so this
 * flag drives a visible disclosure wherever opportunities are rendered. Set
 * `NEXT_PUBLIC_INVENTORY_MODE=live` once the data layer is pointed at real
 * records that a person has verified.
 */
export type InventoryMode = "sample" | "live";

export const INVENTORY_MODE: InventoryMode =
  process.env.NEXT_PUBLIC_INVENTORY_MODE === "live" ? "live" : "sample";

export const IS_SAMPLE_INVENTORY = INVENTORY_MODE === "sample";

export const SAMPLE_INVENTORY_NOTICE =
  "These profiles illustrate the types of private opportunity we handle. They are not offers, and no vessel shown is represented as available; current opportunities are confirmed privately with qualified buyers.";

/** Short label shown before the notice. */
export const SAMPLE_INVENTORY_LABEL = "Representative profiles";
