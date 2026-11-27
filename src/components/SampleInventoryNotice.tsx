import Link from "next/link";

import {
  IS_SAMPLE_INVENTORY,
  SAMPLE_INVENTORY_LABEL,
  SAMPLE_INVENTORY_NOTICE,
} from "@/lib/inventory-mode";

/**
 * Discloses that the opportunities on screen are representative profiles
 * rather than live availability. Deliberately quiet in tone, but always
 * visible wherever opportunities render; the full explanation lives in the
 * Terms. Renders nothing once `NEXT_PUBLIC_INVENTORY_MODE=live` is set
 * against real verified inventory.
 */
export default function SampleInventoryNotice({ onDark = false }: { onDark?: boolean }) {
  if (!IS_SAMPLE_INVENTORY) return null;

  return (
    <p
      className={`text-[12px] leading-relaxed ${
        onDark ? "text-ink-inverse-muted" : "text-ink-faint"
      }`}
      role="note"
    >
      <span className={`font-medium ${onDark ? "text-ink-inverse" : "text-ink-muted"}`}>
        {SAMPLE_INVENTORY_LABEL}.
      </span>{" "}
      {SAMPLE_INVENTORY_NOTICE}{" "}
      <Link href="/terms#representative-profiles" className="underline underline-offset-2">
        Learn more
      </Link>
    </p>
  );
}
