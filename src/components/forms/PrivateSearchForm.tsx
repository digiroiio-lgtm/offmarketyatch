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
 * The private-matching funnel (§11). Deliberately short and single-screen: it
 * has to convert even when nothing in current inventory fits the visitor.
 */

const TYPE = [
  "Motor Yacht",
  "Explorer Yacht",
  "Sailing Yacht",
  "Catamaran",
  "Superyacht",
  "Open to Opportunities",
];
const BUDGET = ["Under $5M", "$5M–$10M", "$10M–$25M", "$25M–$50M", "$50M+"];
const SIZE = ["Under 80 ft", "80–100 ft", "100–130 ft", "130–165 ft", "165 ft+"];
const TIMELINE = ["Immediately", "0–3 months", "3–6 months", "6–12 months", "Exploring"];

export default function PrivateSearchForm({ onDark = false }: { onDark?: boolean }) {
  const [criteria, setCriteria] = useState({
    type: "",
    budget: "",
    size: "",
    timeline: "",
    notes: "",
  });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const { submit, status, error } = useLeadSubmit();

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("private_search_started", { form: "private_search" });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const errors: Record<string, string> = {};
    if (contact.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(contact.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (contact.phone.trim().length < 6) errors.phone = "Please enter a contact number.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const ok = await submit({
      kind: "private-search",
      answers: {
        "Yacht type": criteria.type,
        "Target budget": criteria.budget,
        "Preferred size": criteria.size,
        "Buying timeline": criteria.timeline,
        "Acquisition criteria": criteria.notes,
      },
      contact,
      website: honeypot,
    });

    if (ok) {
      track("private_search_completed", {
        form: "private_search",
        price_band: criteria.budget,
        length_band: criteria.size,
        type: criteria.type,
      });
    }
  }

  if (status === "done") {
    return (
      <SuccessPanel
        title="Your private search request has been received."
        body="Our team will review your criteria and search beyond publicly advertised inventory. We will come back to you with what the network turns up — including if the honest answer is that nothing currently fits."
      />
    );
  }

  const labelClass = onDark ? "text-ink-inverse-muted" : "text-ink-muted";

  return (
    <form onSubmit={handleSubmit} onFocus={markStarted} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="ps-type"
          label="Yacht Type"
          value={criteria.type}
          onChange={(v) => setCriteria((p) => ({ ...p, type: v }))}
          options={TYPE}
        />
        <SelectField
          id="ps-budget"
          label="Target Budget"
          value={criteria.budget}
          onChange={(v) => setCriteria((p) => ({ ...p, budget: v }))}
          options={BUDGET}
        />
        <SelectField
          id="ps-size"
          label="Preferred Size"
          value={criteria.size}
          onChange={(v) => setCriteria((p) => ({ ...p, size: v }))}
          options={SIZE}
        />
        <SelectField
          id="ps-timeline"
          label="Buying Timeline"
          value={criteria.timeline}
          onChange={(v) => setCriteria((p) => ({ ...p, timeline: v }))}
          options={TIMELINE}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="ps-notes" className="form-label">
          What are you looking for?
        </label>
        <textarea
          id="ps-notes"
          rows={3}
          value={criteria.notes}
          onChange={(event) => setCriteria((p) => ({ ...p, notes: event.target.value }))}
          placeholder="Specific yards, a model you have been watching, cruising plans, must-have features…"
          className="form-input resize-y"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Field
          id="ps-name"
          label="Full Name"
          value={contact.name}
          onChange={(v) => setContact((p) => ({ ...p, name: v }))}
          required
          autoComplete="name"
          error={fieldErrors.name}
        />
        <Field
          id="ps-email"
          label="Email"
          type="email"
          value={contact.email}
          onChange={(v) => setContact((p) => ({ ...p, email: v }))}
          required
          autoComplete="email"
          error={fieldErrors.email}
        />
        <Field
          id="ps-phone"
          label="Phone"
          type="tel"
          value={contact.phone}
          onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
          required
          autoComplete="tel"
          error={fieldErrors.phone}
        />
      </div>

      <div className="mt-6">
        <FormError message={error} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Start a Private Search"}
      </button>

      <p className={`mt-4 text-[12.5px] leading-relaxed ${labelClass}`}>
        Confidential. No obligation. We will tell you what we find, including when the answer is
        that nothing suitable is currently available.
      </p>
    </form>
  );
}
