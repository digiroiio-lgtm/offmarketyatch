import type { Metadata } from "next";
import Link from "next/link";

/** Admin is never indexed, never cached. Access is enforced in `src/proxy.ts`. */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-sunken">
      <div className="border-b border-line bg-deal-room">
        <div className="container-wide flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
          <span className="label-mono text-accent">OffMarketYacht · Admin</span>
          <nav className="flex gap-6" aria-label="Admin">
            <Link href="/admin" className="text-[13px] text-ink-inverse-muted hover:text-white">
              Opportunities
            </Link>
            <Link
              href="/admin/intake"
              className="text-[13px] text-ink-inverse-muted hover:text-white"
            >
              Intake
            </Link>
            <Link
              href="/admin/research"
              className="text-[13px] text-ink-inverse-muted hover:text-white"
            >
              Research
            </Link>
            <Link
              href="/admin/leads"
              className="text-[13px] text-ink-inverse-muted hover:text-white"
            >
              Leads
            </Link>
            <Link href="/" className="text-[13px] text-ink-inverse-muted hover:text-white">
              View site →
            </Link>
          </nav>
        </div>
      </div>
      <div className="container-wide py-10">{children}</div>
    </div>
  );
}
