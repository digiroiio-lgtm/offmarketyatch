"use client";

import { useRef, useState } from "react";

import {
  Field,
  FormError,
  Honeypot,
  SelectField,
  SuccessPanel,
} from "@/components/forms/FormParts";
import { EXPECTED_VALUE, SALE_TIMELINE, YACHT_TYPE } from "@/components/forms/intake-options";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { track } from "@/lib/analytics";

/** Sell-side funnel (§12). Positioned as private exploration, not a mandate. */

export default function SellPrivatelyForm() {
  const [yacht, setYacht] = useState({
    type: "",
    length: "",
    year: "",
    builder: "",
    location: "",
    expectedValue: "",
    timeline: "",
  });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const { submit, status, error } = useLeadSubmit();

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("sell_yacht_started", { form: "sell_privately" });
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
      kind: "sell-side",
      answers: {
        "Yacht type": yacht.type,
        Length: yacht.length,
        Year: yacht.year,
        Builder: yacht.builder,
        "Current location": yacht.location,
        "Expected value": yacht.expectedValue,
        "Sale timeline": yacht.timeline,
      },
      contact,
      website: honeypot,
    });

    if (ok) {
      track("sell_yacht_completed", { form: "sell_privately", price_band: yacht.expectedValue });
    }
  }

  if (status === "done") {
    return (
      <SuccessPanel
        title="Your private sale enquiry has been received."
        body="A member of our team will contact you to understand the vessel and discuss whether a private approach makes sense before any public listing."
        footnote="We have not valued your yacht and we have not represented that a buyer exists for it. Nothing about your yacht has been shared: matching, any masked entry and any disclosure of its identity each need your separate authorisation. Any view on demand or price will come from a person, after we have seen the specification."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
      className="relative border border-line bg-paper-raised p-6 sm:p-10"
    >
      <p className="label-mono text-accent">Private Sale Enquiry</p>
      <h2 className="display mt-3 text-[28px] text-ink sm:text-[32px]">
        Tell us about the yacht.
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        Nothing is published, circulated or listed as a result of this form. It starts a private
        conversation about whether there is buyer demand worth exploring. Matching your yacht to
        buyers, any masked entry and any disclosure of its identity each need your separate
        authorisation later.
      </p>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <SelectField
          id="sell-type"
          label="Yacht Type"
          value={yacht.type}
          onChange={(v) => setYacht((p) => ({ ...p, type: v }))}
          options={YACHT_TYPE}
        />
        <Field
          id="sell-length"
          label="Length"
          value={yacht.length}
          onChange={(v) => setYacht((p) => ({ ...p, length: v }))}
          placeholder="e.g. 120 ft"
        />
        <Field
          id="sell-year"
          label="Year"
          value={yacht.year}
          onChange={(v) => setYacht((p) => ({ ...p, year: v }))}
          placeholder="e.g. 2018"
        />
        <Field
          id="sell-builder"
          label="Builder"
          value={yacht.builder}
          onChange={(v) => setYacht((p) => ({ ...p, builder: v }))}
        />
        <Field
          id="sell-location"
          label="Current Location"
          value={yacht.location}
          onChange={(v) => setYacht((p) => ({ ...p, location: v }))}
          placeholder="e.g. Fort Lauderdale"
        />
        <SelectField
          id="sell-value"
          label="Expected Value"
          value={yacht.expectedValue}
          onChange={(v) => setYacht((p) => ({ ...p, expectedValue: v }))}
          options={EXPECTED_VALUE}
        />
        <SelectField
          id="sell-timeline"
          label="Sale Timeline"
          value={yacht.timeline}
          onChange={(v) => setYacht((p) => ({ ...p, timeline: v }))}
          options={SALE_TIMELINE}
        />
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <h3 className="mb-5 text-[17px] font-semibold text-ink">How should we reach you?</h3>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            id="sell-name"
            label="Full Name"
            value={contact.name}
            onChange={(v) => setContact((p) => ({ ...p, name: v }))}
            required
            autoComplete="name"
            error={fieldErrors.name}
          />
          <Field
            id="sell-email"
            label="Email"
            type="email"
            value={contact.email}
            onChange={(v) => setContact((p) => ({ ...p, email: v }))}
            required
            autoComplete="email"
            error={fieldErrors.email}
          />
          <Field
            id="sell-phone"
            label="Phone"
            type="tel"
            value={contact.phone}
            onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
            required
            autoComplete="tel"
            error={fieldErrors.phone}
          />
        </div>
      </div>

      <div className="mt-6">
        <FormError message={error} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Discuss a Private Sale"}
      </button>

      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
        Confidential. We do not publish your yacht, circulate its details, or contact your crew
        or marina without your instruction, and we record each authorisation you give.
      </p>
    </form>
  );
}
