import type { SourceNotes } from "@/data/sources";

/**
 * References and caveats for the tax, duty and contract statements on a page.
 * Rendered only where a page supplies them.
 */
export default function SourcesNote({ sources }: { sources: SourceNotes }) {
  const links = sources.links ?? [];
  const notes = sources.notes ?? [];
  if (links.length === 0 && notes.length === 0) return null;

  return (
    <section className="section-tight border-t border-line" aria-labelledby="sources-heading">
      <div className="container-site">
        <h2 id="sources-heading" className="label-mono mb-5 text-accent">
          Sources and notes
        </h2>
        {links.length > 0 && (
          <ul className="mb-5 space-y-2 text-[14.5px] leading-relaxed text-ink-muted">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-accent underline-offset-4 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="space-y-3 text-[14px] leading-relaxed text-ink-faint">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
          <p>General information only, not legal, tax or financial advice.</p>
        </div>
      </div>
    </section>
  );
}
