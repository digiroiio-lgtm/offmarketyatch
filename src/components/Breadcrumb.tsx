import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper-sunken">
      <div className="container-site">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3">
          <li>
            <Link
              href="/"
              className="label-mono text-ink-faint transition-colors hover:text-accent"
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-ink-faint">
                /
              </span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="label-mono text-ink-faint transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="label-mono text-ink">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
