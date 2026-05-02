import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-[#e8ecf0] bg-[#f5f7fa] py-3"
    >
      <div className="container-site">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-[#8b97a5]">
          <li>
            <Link href="/" className="transition hover:text-[#c9a96e]">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <span aria-hidden="true">›</span>
              {item.href ? (
                <Link href={item.href} className="transition hover:text-[#c9a96e]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-[#0a1628]">
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
