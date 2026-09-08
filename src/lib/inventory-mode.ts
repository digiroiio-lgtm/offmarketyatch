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
  "Platform demonstration. The opportunities shown are sample records used to illustrate how the private market is presented — they are not offers, and no vessel shown is represented as available.";
