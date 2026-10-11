import Link from "next/link";

import IntakeActions from "@/components/admin/IntakeActions";
import { INTAKE_STORE_DURABLE } from "@/lib/intake/store";
import { listQueue, previewMaskedProfile } from "@/lib/intake/service";
import type { IntakeSubmission } from "@/lib/intake/types";

/**
 * One private review queue for both intake sources. Nothing listed here is
 * published or counted as inventory. Access is enforced in `src/proxy.ts`.
 */
const SOURCE_LABEL = { OWNER_DIRECT: "Owner", BROKER_PARTNER: "Broker" } as const;

export default async function AdminIntakePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; status?: string }>;
}) {
  const { source, status } = await searchParams;
  const all = await listQueue();
  const items = all.filter(
    (item) => (!source || item.source === source) && (!status || item.status === status)
  );

  const previews = new Map<string, Awaited<ReturnType<typeof previewMaskedProfile>>>();
  for (const item of items) {
    if (item.proposal) {
      try {
        previews.set(item.id, await previewMaskedProfile(item.id));
      } catch {
        previews.set(item.id, null);
      }
    }
  }

  return (
    <div>
      <h1 className="display text-[32px] text-ink">Private intake</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
        Owner and broker submissions in one queue. Every submission is private by default. Internal
        matching, a masked public entry and identity disclosure each need a recorded approval, and
        nothing here publishes: the strongest output is a draft record.
      </p>

      {!INTAKE_STORE_DURABLE && (
        <p className="mt-6 border-l-2 border-lock py-2 pl-4 text-[13.5px] leading-relaxed text-ink-muted">
          <span className="label-mono mr-2 text-lock">Not durable</span>
          No <code>DATABASE_URL</code> is set, so records are held in memory and are lost on restart.
          Approvals and audit history need the database.
        </p>
      )}

      <nav className="mt-8 flex flex-wrap gap-4 text-[13px]" aria-label="Filters">
        <Link href="/admin/intake" className="text-ink-muted hover:text-ink">All</Link>
        <Link href="/admin/intake?source=OWNER_DIRECT" className="text-ink-muted hover:text-ink">Owners</Link>
        <Link href="/admin/intake?source=BROKER_PARTNER" className="text-ink-muted hover:text-ink">Brokers</Link>
        <Link href="/admin/intake?status=RECEIVED" className="text-ink-muted hover:text-ink">New</Link>
        <Link href="/admin/intake?status=VERIFICATION_PENDING" className="text-ink-muted hover:text-ink">Verifying</Link>
      </nav>

      {items.length === 0 ? (
        <p className="mt-10 border border-dashed border-line-strong px-6 py-14 text-center text-[15px] text-ink-muted">
          No submissions yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <SubmissionCard key={item.id} item={item} preview={previews.get(item.id) ?? null} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubmissionCard({
  item,
  preview,
}: {
  item: IntakeSubmission;
  preview: Awaited<ReturnType<typeof previewMaskedProfile>>;
}) {
  const granted = item.approvals.filter((a) => a.state === "granted");

  return (
    <details className="border border-line bg-paper-raised p-6">
      <summary className="flex cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-ink">{item.id}</span>
        <span className="label-mono text-accent">{SOURCE_LABEL[item.source]}</span>
        <span className="label-mono text-ink-muted">{item.status}</span>
        <span className="text-[13.5px] text-ink-muted">
          {item.vessel.length || "length n/a"} {item.vessel.type}
        </span>
        <span className="label-mono text-ink-faint">
          {item.source === "BROKER_PARTNER" ? `broker ${item.verification.status}` : "owner"}
          {" · "}
          {granted.length === 0 ? "no approvals" : `${granted.length} approval(s)`}
        </span>
        <time className="label-mono ml-auto text-ink-faint" dateTime={item.receivedAt}>
          {new Date(item.receivedAt).toLocaleString("en-US")}
        </time>
      </summary>

      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="label-mono mb-2 text-ink-faint">Submitter</h2>
          <p className="text-[15px] font-medium text-ink">{item.submitter.name}</p>
          {item.submitter.company && <p className="text-[14px] text-ink-muted">{item.submitter.company}</p>}
          <p className="text-[14px] text-ink-muted">{item.submitter.email}</p>
          <p className="text-[14px] text-ink-muted">{item.submitter.phone}</p>
          {item.submitter.licence && <p className="text-[13px] text-ink-faint">Licence: {item.submitter.licence}</p>}
          {item.submitter.website && <p className="text-[13px] text-ink-faint">Site: {item.submitter.website}</p>}
          {item.broker && (
            <p className="mt-2 text-[13px] text-ink-faint">
              Claims: {item.broker.representation}; evidence offered: {item.broker.canSupplyMandateEvidence ? "yes" : "no"}.
              Requested: {item.broker.requestedPermissions.join(", ") || "none"}
            </p>
          )}
        </div>

        <div>
          <h2 className="label-mono mb-2 text-ink-faint">Vessel (private)</h2>
          <dl className="space-y-1 text-[14px] text-ink-muted">
            {Object.entries(item.vessel).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <dt className="w-28 shrink-0 text-ink-faint">{key}</dt>
                <dd>{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="label-mono mb-2 text-ink-faint">Checks and authority</h2>
          <ul className="space-y-1 text-[13.5px] text-ink-muted">
            {item.verification.autoChecks.map((check) => (
              <li key={check.key}>
                <span className={check.passed ? "text-signal" : "text-lock"}>{check.passed ? "ok" : "flag"}</span>{" "}
                {check.detail}
              </li>
            ))}
            {item.verification.autoChecks.length === 0 && <li>No automatic checks for owner submissions.</li>}
          </ul>
          {item.verification.note && (
            <p className="mt-2 text-[13px] text-ink-faint">Verification: {item.verification.status} — {item.verification.note}</p>
          )}
          <p className="mt-2 text-[13px] text-ink-faint">
            Authority: {item.authorityEvidence ?? "not confirmed"} · OMY: {item.omyReference ?? "not issued"}
          </p>
        </div>
      </div>

      {preview && (
        <div className="mt-6 border-l-2 border-line-strong pl-4 text-[13.5px] text-ink-muted">
          <p className="label-mono text-ink-faint">Proposed public profile (preview)</p>
          <p className="mt-1">
            {preview.reference} · {preview.availabilityType} · {preview.titlePublic} · {preview.buildRegion} ·{" "}
            {preview.yearLabel} · {preview.locationPublic} · {preview.priceLabel}
          </p>
          <p className="mt-1">{preview.descriptionPublic}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="label-mono mb-2 text-ink-faint">Approvals</h2>
        {item.approvals.length === 0 ? (
          <p className="text-[13.5px] text-ink-muted">None recorded. No matching, publication or disclosure is permitted.</p>
        ) : (
          <ul className="space-y-1 text-[13.5px] text-ink-muted">
            {item.approvals.map((a) => (
              <li key={a.id}>
                {a.kind}{a.scope ? ` for ${a.scope}` : ""} — {a.state} by {a.grantedBy} on{" "}
                {new Date(a.grantedAt).toLocaleDateString("en-US")}; evidence: {a.evidence}
                {a.revokedAt ? ` (revoked ${new Date(a.revokedAt).toLocaleDateString("en-US")} by ${a.revokedBy})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="label-mono mb-2 text-ink-faint">History</h2>
        <ol className="space-y-1 text-[13px] text-ink-faint">
          {item.audit.map((event) => (
            <li key={event.id}>
              {new Date(event.at).toLocaleString("en-US")} · {event.actor} · {event.action}: {event.detail}
            </li>
          ))}
        </ol>
      </div>

      <IntakeActions
        id={item.id}
        source={item.source}
        status={item.status}
        approvals={item.approvals.map((a) => ({ id: a.id, kind: a.kind, state: a.state, scope: a.scope }))}
      />
    </details>
  );
}
