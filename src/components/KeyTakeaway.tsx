/**
 * The page's direct answer, placed above everything else in the body: a
 * 40–60 word summary that is still true when quoted on its own.
 */
export default function KeyTakeaway({ text }: { text: string }) {
  return (
    <aside
      aria-label="Key takeaway"
      className="key-takeaway border border-line-strong bg-paper-raised px-6 py-5"
    >
      <p className="label-mono text-accent">Key takeaway</p>
      <p className="mt-3 text-[17px] leading-[1.7] text-ink">{text}</p>
    </aside>
  );
}
