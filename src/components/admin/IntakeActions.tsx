"use client";

import { useState } from "react";

import { APPROVAL_KINDS, INTAKE_STATUSES } from "@/lib/intake/types";

/**
 * Review controls for one submission. It receives only ids, the current status
 * and approval labels: no vessel, contact or credential detail is passed to the
 * client. Every action is checked and logged again on the server.
 */

interface Props {
  id: string;
  source: string;
  status: string;
  approvals: { id: string; kind: string; state: string; scope: string | null }[];
}

const box = "form-input w-full";

export default function IntakeActions({ id, source, status, approvals }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  async function post(payload: Record<string, unknown>) {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...payload }),
      });
      const result = (await response.json()) as { ok: boolean; error?: string; draft?: unknown };
      if (!result.ok) {
        setMessage(result.error ?? "Failed.");
        return;
      }
      if (result.draft) setDraft(JSON.stringify(result.draft, null, 2));
      setMessage("Saved. Reloading…");
      if (!result.draft) window.location.reload();
    } catch {
      setMessage("Network error.");
    } finally {
      setBusy(false);
    }
  }

  function form(action: string, fields: Record<string, string>, extra?: Record<string, unknown>) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const payload: Record<string, unknown> = { action, ...extra };
      for (const key of Object.keys(fields)) payload[key] = String(data.get(key) ?? "");
      void post(payload);
    };
  }

  return (
    <div className="mt-6 space-y-6 border-t border-line pt-6 text-[13.5px]">
      <form onSubmit={form("status", { status: "", evidence: "" })} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
        <select name="status" className={box} defaultValue="" required>
          <option value="">Move to…</option>
          {INTAKE_STATUSES.filter((s) => s !== status).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input name="evidence" className={box} placeholder="Evidence (required for authority confirmed)" />
        <button className="btn-primary" disabled={busy}>Apply</button>
      </form>

      {source === "BROKER_PARTNER" && (
        <form onSubmit={form("verify-broker", { outcome: "", note: "" })} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
          <select name="outcome" className={box} defaultValue="VERIFIED">
            <option value="VERIFIED">Broker verified</option>
            <option value="REJECTED">Broker rejected</option>
          </select>
          <input name="note" className={box} placeholder="What was checked, and how" required />
          <button className="btn-primary" disabled={busy}>Record</button>
        </form>
      )}

      <form onSubmit={form("proposal", { type: "", buildRegion: "", locationPublic: "", country: "", descriptionPublic: "", opportunityNotes: "" })} className="grid gap-3">
        <p className="label-mono text-ink-faint">Masked public proposal</p>
        <div className="grid gap-3 sm:grid-cols-4">
          <input name="type" className={box} placeholder="Class, e.g. Motor Yacht" required />
          <input name="buildRegion" className={box} placeholder="e.g. Italian Build" required />
          <input name="locationPublic" className={box} placeholder="e.g. Mediterranean" required />
          <input name="country" className={box} placeholder="Country" required />
        </div>
        <textarea name="descriptionPublic" className={box} rows={3} placeholder="Generic public description (no name, builder, marina)" required />
        <textarea name="opportunityNotes" className={box} rows={2} placeholder="Short acquisition rationale" />
        <button className="btn-primary w-fit" disabled={busy}>Save proposal</button>
      </form>

      <form onSubmit={form("grant", { kind: "", evidence: "", scope: "" })} className="grid gap-3 sm:grid-cols-[1.2fr_2fr_1.2fr_auto]">
        <select name="kind" className={box} defaultValue="" required>
          <option value="">Grant approval…</option>
          {APPROVAL_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <input name="evidence" className={box} placeholder="Evidence: what was seen, from whom, when" required />
        <input name="scope" className={box} placeholder="Buyer lead id (identity only)" />
        <button className="btn-primary" disabled={busy}>Grant</button>
      </form>

      {approvals.filter((a) => a.state === "granted").length > 0 && (
        <div className="space-y-2">
          {approvals.filter((a) => a.state === "granted").map((a) => (
            <form key={a.id} onSubmit={form("revoke", { reason: "" }, { approvalId: a.id })} className="grid gap-3 sm:grid-cols-[1.4fr_2fr_auto]">
              <span className="label-mono self-center text-ink-muted">{a.kind}{a.scope ? ` · ${a.scope}` : ""}</span>
              <input name="reason" className={box} placeholder="Reason for revoking" required />
              <button className="border border-line-strong px-4 py-2 text-ink-muted hover:text-ink" disabled={busy}>Revoke</button>
            </form>
          ))}
        </div>
      )}

      <div>
        <button type="button" className="border border-line-strong px-4 py-2 text-ink-muted hover:text-ink" disabled={busy} onClick={() => void post({ action: "draft" })}>
          Generate draft record (does not publish)
        </button>
        {draft && <pre className="mt-3 max-h-72 overflow-auto bg-paper-sunken p-4 text-[12px]">{draft}</pre>}
      </div>

      {message && <p role="status" className="text-ink-muted">{message}</p>}
    </div>
  );
}
