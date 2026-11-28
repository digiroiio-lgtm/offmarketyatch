import LocaleLink from "@/components/LocaleLink";
import { t, type Locale } from "@/lib/i18n";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items, locale = "en" }: { items: Crumb[]; locale?: Locale }) {
  return (
    <nav aria-label={t(locale, "Breadcrumb")} className="border-b border-line bg-paper-sunken">
      <div className="container-site">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3">
          <li>
            <LocaleLink
              href="/"
              className="label-mono text-ink-faint transition-colors hover:text-accent"
            >
              Home
            </LocaleLink>
          </li>
          {items.map((item, index) => (
            <li key={`${t(locale, item.label)}-${index}`} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-ink-faint">
                /
              </span>
              {item.href ? (
                <LocaleLink
                  href={item.href}
                  className="label-mono text-ink-faint transition-colors hover:text-accent"
                >
                  {item.label}
                </LocaleLink>
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
