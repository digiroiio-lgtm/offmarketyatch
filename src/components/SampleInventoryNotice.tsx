import { IS_SAMPLE_INVENTORY, SAMPLE_INVENTORY_NOTICE } from "@/lib/inventory-mode";

/**
 * Discloses that the opportunities on screen are the platform's sample records
 * rather than live availability. Renders nothing once
 * `NEXT_PUBLIC_INVENTORY_MODE=live` is set against real verified inventory.
 */
export default function SampleInventoryNotice({ onDark = false }: { onDark?: boolean }) {
  if (!IS_SAMPLE_INVENTORY) return null;

  return (
    <p
      className={`border-l-2 border-lock/60 py-1 pl-4 text-[12.5px] leading-relaxed ${
        onDark ? "text-ink-inverse-muted" : "text-ink-muted"
      }`}
      role="note"
    >
      <span className="label-mono mr-2 text-lock">Sample data</span>
      {SAMPLE_INVENTORY_NOTICE}
    </p>
  );
}
