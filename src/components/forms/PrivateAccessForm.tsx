"use client";

import { useEffect, useRef, useState } from "react";

import {
  ChoiceGroup,
  Field,
  FormError,
  Honeypot,
  SelectField,
  StepIndicator,
  SuccessPanel,
} from "@/components/forms/FormParts";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { track } from "@/lib/analytics";

/**
 * The primary qualification funnel (§9). One decision per screen keeps the
 * commitment low at the top and gathers the qualifying answers before the
 * contact details are ever requested.
 */

const LOOKING_FOR = [
  "Motor Yacht",
  "Explorer Yacht",
  "Sailing Yacht",
  "Superyacht",
  "Open to Opportunities",
];
const BUDGET = ["Under $5M", "$5M–$10M", "$10M–$25M", "$25M–$50M", "$50M+"];
const SIZE = ["Under 80 ft", "80–100 ft", "100–130 ft", "130–165 ft", "165 ft+"];
const TIMELINE = ["Immediately", "0–3 months", "3–6 months", "6–12 months", "Exploring"];
const CONTACT_METHOD = ["Email", "Phone", "Either"];

const STEP_LABELS = ["Requirement", "Budget", "Size", "Timeline", "Contact"];
const TOTAL_STEPS = 5;

export default function PrivateAccessForm({
  variant = "full",
}: {
  /** "compact" drops the surrounding panel chrome for embedding in a section. */
  variant?: "full" | "compact";
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    lookingFor: "",
    budget: "",
    size: "",
    timeline: "",
  });
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    preferredContact: "",
    company: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const headingRef = useRef<HTMLDivElement>(null);

  const { submit, status, error } = useLeadSubmit();

  useEffect(() => {
    if (step > 1 && headingRef.current) headingRef.current.focus();
  }, [step]);

  function advance(field: keyof typeof answers, value: string) {
    if (!started.current) {
      started.current = true;
      track("request_access_started", { form: "private_access" });
    }
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    track("request_access_click", { form: "private_access", step, filter_value: value });
  }

  function validateContact(): boolean {
    const errors: Record<string, string> = {};
    if (contact.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(contact.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (contact.phone.trim().length < 6) errors.phone = "Please enter a contact number.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateContact()) return;

    const ok = await submit({
      kind: "private-access",
      answers: {
        "Looking for": answers.lookingFor,
        "Target budget": answers.budget,
        "Preferred size": answers.size,
        "Buying timeline": answers.timeline,
      },
      contact,
      website: honeypot,
    });

    if (ok) {
      track("request_access_completed", {
        form: "private_access",
        price_band: answers.budget,
        length_band: answers.size,
        type: answers.lookingFor,
      });
    }
  }

  if (status === "done") {
    return (
      <SuccessPanel
        title="Your private acquisition request has been received."
        body="Our team will review your criteria and contact you with relevant opportunities."
        footnote="Requests are reviewed by a person before any confidential information is shared. If your criteria match an opportunity currently under mandate, we will say so; if they do not, we will tell you that too rather than send you inventory that does not fit."
      />
    );
  }

  const wrapperClass =
    variant === "full"
      ? "border border-line bg-paper-raised p-6 sm:p-10"
      : "bg-transparent";

  return (
    <div className={wrapperClass}>
      <StepIndicator step={step} total={TOTAL_STEPS} label={STEP_LABELS[step - 1]} />

      <div ref={headingRef} tabIndex={-1} className="outline-none">
        {step === 1 && (
          <ChoiceGroup
            legend="What are you looking for?"
            options={LOOKING_FOR}
            value={answers.lookingFor}
            onSelect={(value) => advance("lookingFor", value)}
          />
        )}
        {step === 2 && (
          <ChoiceGroup
            legend="What is your target budget?"
            options={BUDGET}
            value={answers.budget}
            onSelect={(value) => advance("budget", value)}
          />
        )}
        {step === 3 && (
          <ChoiceGroup
            legend="What size are you considering?"
            options={SIZE}
            value={answers.size}
            onSelect={(value) => advance("size", value)}
          />
        )}
        {step === 4 && (
          <ChoiceGroup
            legend="What is your buying timeline?"
            options={TIMELINE}
            value={answers.timeline}
            onSelect={(value) => advance("timeline", value)}
          />
        )}

        {step === 5 && (
          <form onSubmit={handleSubmit} noValidate className="relative">
            <h2 className="display mb-2 text-[26px] text-ink sm:text-[30px]">
              Where should we send matching opportunities?
            </h2>
            <p className="mb-7 text-[15px] leading-relaxed text-ink-muted">
              Confidential. Used to qualify your request and contact you directly — never
              published, never sold on.
            </p>

            <Honeypot value={honeypot} onChange={setHoneypot} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="pa-name"
                label="Full Name"
                value={contact.name}
                onChange={(v) => setContact((p) => ({ ...p, name: v }))}
                required
                autoComplete="name"
                error={fieldErrors.name}
              />
              <Field
                id="pa-email"
                label="Email"
                type="email"
                value={contact.email}
                onChange={(v) => setContact((p) => ({ ...p, email: v }))}
                required
                autoComplete="email"
                error={fieldErrors.email}
              />
              <Field
                id="pa-phone"
                label="Phone"
                type="tel"
                value={contact.phone}
                onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
                required
                autoComplete="tel"
                error={fieldErrors.phone}
              />
              <Field
                id="pa-country"
                label="Country"
                value={contact.country}
                onChange={(v) => setContact((p) => ({ ...p, country: v }))}
                autoComplete="country-name"
                placeholder="United States"
              />
              <SelectField
                id="pa-contact-method"
                label="Preferred Contact Method"
                value={contact.preferredContact}
                onChange={(v) => setContact((p) => ({ ...p, preferredContact: v }))}
                options={CONTACT_METHOD}
              />
              <Field
                id="pa-company"
                label="Company / Family Office"
                value={contact.company}
                onChange={(v) => setContact((p) => ({ ...p, company: v }))}
                autoComplete="organization"
                hint="Optional"
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
              {status === "sending" ? "Sending…" : "Request Private Opportunities"}
            </button>

            <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
              All inquiries handled confidentially. Submitting this form does not release
              confidential listing information automatically.
            </p>
          </form>
        )}
      </div>

      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep((prev) => prev - 1)}
          className="label-mono mt-8 text-ink-faint transition-colors hover:text-accent"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
