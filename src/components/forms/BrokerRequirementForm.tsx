"use client";

import { useRef, useState } from "react";

import {
  Field,
  FormError,
  Honeypot,
  SelectField,
  SuccessPanel,
} from "@/components/forms/FormParts";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { track } from "@/lib/analytics";

/**
 * A broker registering a client's acquisition requirement.
 *
 * Sent as a `private-search` lead so it enters the same matching queue as a
 * principal's search; the "Submitted by" answer and the brokerage fields mark
 * it as broker-originated. It asks up front for what otherwise only surfaces
 * in follow-up messages: preferred yards, the real budget ceiling, the
 * broker's standing with the client and the timeline.
 */

const RELATIONSHIP = [
  "Written buyer representation agreement",
  "Retained informally by the client",
  "Introducing the client, no agreement yet",
];
const TYPE = [
  "Motor Yacht",
  "Explorer Yacht",
  "Sailing Yacht",
  "Catamaran",
  "Superyacht",
  "Open to Opportunities",
];
const SIZE = [
  "Under 30 m / 100 ft",
  "30–40 m / 100–130 ft",
  "40–50 m / 130–165 ft",
  "50–60 m / 165–200 ft",
  "60–70 m / 200–230 ft",
  "70–80 m / 230–260 ft",
  "80 m+ / 260 ft+",
];
const TIMELINE = ["Immediately", "0–3 months", "3–6 months", "6–12 months", "Exploring"];

export default function BrokerRequirementForm() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [criteria, setCriteria] = useState({
    relationship: "",
    type: "",
    builders: "",
    budgetCeiling: "",
    size: "",
    timeline: "",
    notes: "",
  });
  const [coBrokerage, setCoBrokerage] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const { submit, status, error } = useLeadSubmit();

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("broker_requirement_started", { form: "broker_requirement" });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const errors: Record<string, string> = {};
    if (contact.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(contact.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (contact.phone.trim().length < 6) errors.phone = "Please enter a contact number.";
    if (contact.company.trim().length < 2) errors.company = "Please enter your brokerage.";
    if (!criteria.relationship) errors.relationship = "Please select your standing with the client.";
    if (!coBrokerage) errors.coBrokerage = "Please acknowledge the written-terms requirement.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const ok = await submit({
      kind: "private-search",
      answers: {
        "Submitted by": "Broker on behalf of a client",
        "Relationship with client": criteria.relationship,
        "Yacht type": criteria.type,
        "Preferred builders": criteria.builders,
        "Budget ceiling": criteria.budgetCeiling,
        "Preferred size": criteria.size,
        "Buying timeline": criteria.timeline,
        "Acquisition criteria": criteria.notes,
        "Co-brokerage acknowledged": coBrokerage ? "yes" : "no",
      },
      contact: { ...contact },
      website: honeypot,
    });

    if (ok) {
      track("broker_requirement_completed", {
        form: "broker_requirement",
        length_band: criteria.size,
        type: criteria.type,
        role: "broker",
      });
    }
  }

  if (status === "done") {
    return (
      <SuccessPanel
        title="Your client's requirement has been received."
        body="We will review it against what we hold privately and what the network turns up, and come back to you — not to your client — with anything that fits, including when the honest answer is that nothing does yet."
        footnote="We do not approach a buyer introduced by another broker. Cooperation terms are agreed in writing before any vessel is identified."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
      className="relative scroll-mt-28 border border-line bg-paper-raised p-6 sm:p-10"
      id="requirement"
    >
      <p className="label-mono text-accent">Client Requirement</p>
      <h2 className="display mt-3 text-[28px] text-ink sm:text-[32px]">
        Submit a client requirement.
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        Your client is not named and not contacted. We match the brief privately and reply to you.
      </p>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <h3 className="mt-8 text-[17px] font-semibold text-ink">You and your brokerage</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="br-name" label="Full Name" value={contact.name} required autoComplete="name"
          onChange={(v) => setContact((p) => ({ ...p, name: v }))} error={fieldErrors.name} />
        <Field id="br-company" label="Brokerage" value={contact.company} required
          autoComplete="organization" onChange={(v) => setContact((p) => ({ ...p, company: v }))}
          error={fieldErrors.company} />
        <Field id="br-email" label="Business Email" type="email" value={contact.email} required
          autoComplete="email" onChange={(v) => setContact((p) => ({ ...p, email: v }))}
          error={fieldErrors.email} />
        <Field id="br-phone" label="Phone / WhatsApp" type="tel" value={contact.phone} required
          autoComplete="tel" onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
          error={fieldErrors.phone} />
        <div className="sm:col-span-2">
          <SelectField id="br-relationship" label="Your Standing with the Client" required
            value={criteria.relationship}
            onChange={(v) => setCriteria((p) => ({ ...p, relationship: v }))}
            options={RELATIONSHIP} />
          {fieldErrors.relationship && (
            <p role="alert" className="mt-1 text-[12px] text-accent">{fieldErrors.relationship}</p>
          )}
        </div>
      </div>

      <h3 className="mt-10 border-t border-line pt-8 text-[17px] font-semibold text-ink">
        The requirement
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SelectField id="br-type" label="Yacht Type" value={criteria.type}
          onChange={(v) => setCriteria((p) => ({ ...p, type: v }))} options={TYPE} />
        <SelectField id="br-size" label="Length" value={criteria.size}
          onChange={(v) => setCriteria((p) => ({ ...p, size: v }))} options={SIZE} />
        <Field id="br-builders" label="Preferred Builders" value={criteria.builders}
          onChange={(v) => setCriteria((p) => ({ ...p, builders: v }))}
          placeholder="e.g. Lürssen, Feadship, Benetti" hint="Name a yard only if it is firm." />
        <Field id="br-budget" label="Budget Ceiling" value={criteria.budgetCeiling}
          onChange={(v) => setCriteria((p) => ({ ...p, budgetCeiling: v }))}
          placeholder="e.g. under $30M" hint="The real ceiling, not the opening figure." />
        <SelectField id="br-timeline" label="Buying Timeline" value={criteria.timeline}
          onChange={(v) => setCriteria((p) => ({ ...p, timeline: v }))} options={TIMELINE} />
      </div>

      <div className="mt-5">
        <label htmlFor="br-notes" className="form-label">
          Anything else that decides it
        </label>
        <textarea
          id="br-notes"
          rows={3}
          value={criteria.notes}
          onChange={(event) => setCriteria((p) => ({ ...p, notes: event.target.value }))}
          placeholder="Build year range, refit tolerance, cruising grounds, charter use, deal-breakers…"
          className="form-input resize-y"
        />
      </div>

      <div className="mt-8 space-y-3 border-t border-line pt-8">
        <label className="flex items-start gap-3 text-[14.5px] text-ink-muted">
          <input type="checkbox" checked={coBrokerage} onChange={(e) => setCoBrokerage(e.target.checked)}
            className="mt-1" />
          I understand that co-brokerage terms are agreed in writing before any vessel is identified.
        </label>
        {fieldErrors.coBrokerage && (
          <p role="alert" className="text-[12px] text-accent">{fieldErrors.coBrokerage}</p>
        )}
      </div>

      <div className="mt-6">
        <FormError message={error} />
      </div>

      <button type="submit" disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending…" : "Submit Requirement"}
      </button>

      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
        Confidential. Your client relationship stays yours.
      </p>
    </form>
  );
}
