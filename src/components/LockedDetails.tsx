import Link from "next/link";

/**
 * The locked block tells the visitor exactly which attributes are being
 * withheld and why. The withheld values are not present in this component's
 * props, in the surrounding page, or anywhere in the HTML — the lock is a
 * statement about server-side masking, not a CSS overlay over hidden text.
 */
export default function LockedDetails({
  fields,
  reference,
  href,
}: {
  fields: string[];
  reference: string;
  href: string;
}) {
  return (
    <section
      aria-labelledby={`locked-${reference}`}
      className="border border-line bg-deal-room text-ink-inverse"
    >
      <div className="border-b border-deal-room-line px-6 py-5 sm:px-8">
        <p className="label-mono text-accent">Confidential Details</p>
        <h2
          id={`locked-${reference}`}
          className="display mt-3 text-[26px] text-ink-inverse sm:text-[30px]"
        >
          Withheld Until Buyer Qualification
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-inverse-muted">
          The owner has authorised a limited public description only. The attributes below are
          held server-side and released to qualified buyers under appropriate terms.
        </p>
      </div>

      <ul className="grid gap-px border-b border-deal-room-line bg-deal-room-line sm:grid-cols-2">
        {fields.map((field) => (
          <li key={field} className="flex items-center gap-3 bg-deal-room px-6 py-4 sm:px-8">
            <svg
              className="h-4 w-4 shrink-0 text-lock"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="text-[15px] text-ink-inverse-muted">{field}</span>
          </li>
        ))}
      </ul>

      <div className="px-6 py-7 sm:px-8">
        <Link href={href} className="btn-primary w-full sm:w-auto">
          Request Private Access
        </Link>
        <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
          Available to qualified buyers. All inquiries handled confidentially. Submitting a
          request does not release confidential information automatically — a member of our team
          reviews every request before anything is shared.
        </p>
      </div>
    </section>
  );
}
