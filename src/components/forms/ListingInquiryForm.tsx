"use client";

import { useEffect, useRef, useState } from "react";

import {
  Field,
  FormError,
  Honeypot,
  SelectField,
  SuccessPanel,
} from "@/components/forms/FormParts";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { track } from "@/lib/analytics";
import { lengthBandFor, priceBandFor } from "@/lib/format";
import type { PublicOpportunity } from "@/lib/types";

/**
 * The second funnel (§10) — a request against one specific opportunity.
 *
 * Listing context (reference, category, price band, length, source URL, UTMs,
 * timestamp) rides along automatically so demand can be measured per
 * opportunity. The visitor is only asked the six qualifying questions.
 */

const BUYER_STATUS = [
  "Buying for myself",
  "Buying through a family office",
  "Representing a client",
  "Researching the market",
];
const BUDGET_CONFIRM = [
  "Yes — the stated range works",
  "Yes — with the right yacht",
  "Below this range",
  "Above this range",
  "Prefer to discuss",
];
const TIMELINE = ["Immediately", "0–3 months", "3–6 months", "6–12 months", "Exploring"];

export default function ListingInquiryForm({
  opportunity,
}: {
  opportunity: PublicOpportunity;
}) {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [answers, setAnswers] = useState({ buyerStatus: "", budget: "", timeline: "" });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const { submit, status, error } = useLeadSubmit();

  const priceBand = priceBandFor(opportunity.priceMin, opportunity.priceMax);
  const lengthBand = lengthBandFor(opportunity.lengthFt);

  // A confidential detail page is a distinct, higher-intent view.
  useEffect(() => {
    if (opportunity.confidentialityLevel === "confidential") {
      track("private_listing_view", {
        listing_id: opportunity.reference,
        price_band: priceBand?.key ?? "on-request",
        length_band: lengthBand.key,
        location: opportunity.locationPublic,
        type: opportunity.type,
      });
    }
  }, [opportunity, priceBand, lengthBand]);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("request_access_started", {
      form: "listing_inquiry",
      listing_id: opportunity.reference,
      price_band: priceBand?.key ?? "on-request",
      length_band: lengthBand.key,
      location: opportunity.locationPublic,
      type: opportunity.type,
    });
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
      kind: "listing-inquiry",
      listingReference: opportunity.reference,
      answers: {
        "Buyer status": answers.buyerStatus,
        "Budget confirmation": answers.budget,
        "Purchase timeline": answers.timeline,
        "Listing category": opportunity.type,
        "Listing price band": priceBand?.label ?? "Price on request",
        "Listing length": opportunity.lengthDisplay,
        "Listing location": opportunity.locationPublic,
        "Availability type": opportunity.availabilityType,
      },
      contact,
      website: honeypot,
    });

    if (ok) {
      track("request_access_completed", {
        form: "listing_inquiry",
        listing_id: opportunity.reference,
        price_band: priceBand?.key ?? "on-request",
        length_band: lengthBand.key,
        location: opportunity.locationPublic,
        type: opportunity.type,
      });
    }
  }

  if (status === "done") {
    return (
      <SuccessPanel
        title={`Your request against ${opportunity.reference} has been received.`}
        body="A member of our team will review your request and come back to you directly. Where the owner has authorised disclosure to qualified buyers, we will share the confidential detail under appropriate terms."
        footnote="We do not release identity, exact pricing or location automatically on submission of a form."
      />
    );
  }

  const isPotential = opportunity.availabilityType === "POTENTIAL OPPORTUNITY";

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
      className="relative border border-line bg-paper-raised p-6 sm:p-8"
      id="request-details"
    >
      <p className="label-mono text-accent">
        {isPotential ? "Private Investigation Request" : "Request Confidential Details"}
      </p>
      <h2 className="display mt-3 text-[26px] text-ink sm:text-[30px]">
        {isPotential ? `Investigate ${opportunity.reference}` : `Access ${opportunity.reference}`}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {isPotential
          ? "Availability is not confirmed on this vessel. Tell us where you stand and our acquisition team can make a discreet approach on your behalf."
          : "Six questions. Your answers let us qualify the request and respond with the right level of detail."}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-line py-4">
        {[
          { term: "Reference", value: opportunity.reference },
          { term: "Class", value: opportunity.type },
          { term: "Length", value: opportunity.lengthDisplay },
          { term: "Range", value: opportunity.priceLabel },
        ].map((row) => (
          <div key={row.term}>
            <dt className="label-mono text-ink-faint">{row.term}</dt>
            <dd className="data-value mt-1 text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            id="li-name"
            label="Full Name"
            value={contact.name}
            onChange={(v) => setContact((p) => ({ ...p, name: v }))}
            required
            autoComplete="name"
            error={fieldErrors.name}
          />
          <Field
            id="li-email"
            label="Email"
            type="email"
            value={contact.email}
            onChange={(v) => setContact((p) => ({ ...p, email: v }))}
            required
            autoComplete="email"
            error={fieldErrors.email}
          />
          <Field
            id="li-phone"
            label="Phone"
            type="tel"
            value={contact.phone}
            onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
            required
            autoComplete="tel"
            error={fieldErrors.phone}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <SelectField
            id="li-status"
            label="Buyer Status"
            value={answers.buyerStatus}
            onChange={(v) => setAnswers((p) => ({ ...p, buyerStatus: v }))}
            options={BUYER_STATUS}
          />
          <SelectField
            id="li-budget"
            label="Budget Confirmation"
            value={answers.budget}
            onChange={(v) => setAnswers((p) => ({ ...p, budget: v }))}
            options={BUDGET_CONFIRM}
          />
          <SelectField
            id="li-timeline"
            label="Purchase Timeline"
            value={answers.timeline}
            onChange={(v) => setAnswers((p) => ({ ...p, timeline: v }))}
            options={TIMELINE}
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
        {status === "sending"
          ? "Sending…"
          : isPotential
            ? "Request Private Investigation"
            : "Request Confidential Details"}
      </button>

      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
        Available to qualified buyers. All inquiries handled confidentially.
      </p>
    </form>
  );
}
