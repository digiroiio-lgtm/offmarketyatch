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
import { EXPECTED_VALUE, SALE_TIMELINE, YACHT_TYPE } from "@/components/forms/intake-options";
import { track } from "@/lib/analytics";
import { ANSWER_KEYS } from "@/lib/intake/types";

/**
 * Broker partner intake. Distinct from the owner form: it asks for professional
 * credentials, the broker's representation status and which permissions they
 * request. Those permissions are requests only; submitting grants nothing and
 * nothing is shared, matched or published until a reviewer records approval.
 */

const REPRESENTATION = [
  { value: "written-mandate-central-agent", label: "Written mandate, I am the central agent" },
  { value: "written-co-brokerage", label: "Written co-brokerage agreement" },
  { value: "verbal-or-informal", label: "Verbal or informal arrangement" },
  { value: "introducing-without-mandate", label: "Introducing a vessel without a mandate" },
];

const PERMISSIONS = [
  { value: "INTERNAL_BUYER_MATCHING", label: "Match privately against registered buyer criteria (internal only)" },
  { value: "MASKED_PUBLICATION", label: "Consider a masked public entry under an OMY reference" },
  { value: "IDENTITY_DISCLOSURE", label: "Disclose the vessel's identity to a qualified buyer, case by case" },
];

export default function BrokerIntakeForm() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [firm, setFirm] = useState({ role: "", website: "", licence: "", jurisdictions: "" });
  const [representation, setRepresentation] = useState("");
  const [evidence, setEvidence] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [attested, setAttested] = useState(false);
  const [coBrokerage, setCoBrokerage] = useState(false);
  const [yacht, setYacht] = useState({
    type: "",
    length: "",
    year: "",
    builder: "",
    location: "",
    value: "",
    timeline: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const { submit, status, error } = useLeadSubmit();

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("broker_intake_started", { form: "broker_intake" });
  }

  function togglePermission(value: string) {
    setPermissions((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
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
    if (firm.licence.trim().length < 3) {
      errors.licence = "Please enter a licence, association membership or registration.";
    }
    if (!representation) errors.representation = "Please select your representation status.";
    if (!attested) errors.attested = "Please confirm you are authorised to share this.";
    if (!coBrokerage) errors.coBrokerage = "Please acknowledge the written-terms requirement.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const ok = await submit({
      kind: "broker-submission",
      answers: {
        [ANSWER_KEYS.type]: yacht.type,
        [ANSWER_KEYS.length]: yacht.length,
        [ANSWER_KEYS.year]: yacht.year,
        [ANSWER_KEYS.builder]: yacht.builder,
        [ANSWER_KEYS.location]: yacht.location,
        [ANSWER_KEYS.value]: yacht.value,
        [ANSWER_KEYS.timeline]: yacht.timeline,
        [ANSWER_KEYS.role]: firm.role,
        [ANSWER_KEYS.website]: firm.website,
        [ANSWER_KEYS.licence]: firm.licence,
        [ANSWER_KEYS.jurisdictions]: firm.jurisdictions,
        [ANSWER_KEYS.representation]: representation,
        [ANSWER_KEYS.mandateEvidence]: evidence ? "yes" : "no",
        [ANSWER_KEYS.permissions]: permissions.join(","),
        [ANSWER_KEYS.attested]: attested ? "yes" : "no",
        [ANSWER_KEYS.coBrokerage]: coBrokerage ? "yes" : "no",
      },
      contact: { ...contact },
      website: honeypot,
    });

    if (ok) track("broker_intake_completed", { form: "broker_intake" });
  }

  if (status === "done") {
    return (
      <SuccessPanel
        title="Your submission has been received."
        body="It is held privately. Our team will verify your credentials and your authority over the vessel before any next step."
        footnote="Receiving this form does not publish, circulate or disclose anything. Internal matching, any masked public entry and any disclosure of identity each require a separate approval that we record against your submission, after verification."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
      className="relative border border-line bg-paper-raised p-6 sm:p-10"
      id="submit"
    >
      <p className="label-mono text-accent">Broker Partner Submission</p>
      <h2 className="display mt-3 text-[28px] text-ink sm:text-[32px]">
        Submit a private mandate.
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        Nothing is published, matched or shared as a result of this form. It opens a private
        record that we verify before any use is agreed in writing.
      </p>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <h3 className="mt-8 text-[17px] font-semibold text-ink">You and your brokerage</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="broker-name" label="Full Name" value={contact.name} required autoComplete="name"
          onChange={(v) => setContact((p) => ({ ...p, name: v }))} error={fieldErrors.name} />
        <Field id="broker-role" label="Role" value={firm.role}
          onChange={(v) => setFirm((p) => ({ ...p, role: v }))} placeholder="e.g. Yacht broker" />
        <Field id="broker-email" label="Business Email" type="email" value={contact.email} required
          autoComplete="email" onChange={(v) => setContact((p) => ({ ...p, email: v }))}
          error={fieldErrors.email} hint="Use your brokerage email so we can verify the firm." />
        <Field id="broker-phone" label="Phone" type="tel" value={contact.phone} required
          autoComplete="tel" onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
          error={fieldErrors.phone} />
        <Field id="broker-company" label="Brokerage" value={contact.company} required
          autoComplete="organization" onChange={(v) => setContact((p) => ({ ...p, company: v }))}
          error={fieldErrors.company} />
        <Field id="broker-website" label="Company Website" value={firm.website}
          onChange={(v) => setFirm((p) => ({ ...p, website: v }))} placeholder="e.g. yourbrokerage.com" />
        <Field id="broker-licence" label="Licence or Association" value={firm.licence} required
          onChange={(v) => setFirm((p) => ({ ...p, licence: v }))} error={fieldErrors.licence}
          placeholder="e.g. IYBA member, licence no." />
        <Field id="broker-jurisdictions" label="Jurisdictions" value={firm.jurisdictions}
          onChange={(v) => setFirm((p) => ({ ...p, jurisdictions: v }))}
          placeholder="e.g. Florida, Monaco" />
      </div>

      <h3 className="mt-10 border-t border-line pt-8 text-[17px] font-semibold text-ink">
        Your authority over the vessel
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <SelectField
            id="broker-representation"
            label="Representation Status"
            required
            value={REPRESENTATION.find((r) => r.value === representation)?.label ?? ""}
            onChange={(label) =>
              setRepresentation(REPRESENTATION.find((r) => r.label === label)?.value ?? "")
            }
            options={REPRESENTATION.map((r) => r.label)}
          />
          {fieldErrors.representation && (
            <p role="alert" className="mt-1 text-[12px] text-accent">{fieldErrors.representation}</p>
          )}
        </div>
        <label className="flex items-start gap-3 pt-7 text-[14.5px] text-ink-muted">
          <input type="checkbox" checked={evidence} onChange={(e) => setEvidence(e.target.checked)}
            className="mt-1" />
          I can supply mandate evidence on request.
        </label>
      </div>

      <h3 className="mt-10 border-t border-line pt-8 text-[17px] font-semibold text-ink">
        The vessel
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SelectField id="broker-type" label="Yacht Type" value={yacht.type}
          onChange={(v) => setYacht((p) => ({ ...p, type: v }))} options={YACHT_TYPE} />
        <Field id="broker-length" label="Length" value={yacht.length}
          onChange={(v) => setYacht((p) => ({ ...p, length: v }))} placeholder="e.g. 120 ft" />
        <Field id="broker-year" label="Year" value={yacht.year}
          onChange={(v) => setYacht((p) => ({ ...p, year: v }))} placeholder="e.g. 2018" />
        <Field id="broker-builder" label="Builder" value={yacht.builder}
          onChange={(v) => setYacht((p) => ({ ...p, builder: v }))} />
        <Field id="broker-location" label="Current Location" value={yacht.location}
          onChange={(v) => setYacht((p) => ({ ...p, location: v }))} />
        <SelectField id="broker-value" label="Expected Value" value={yacht.value}
          onChange={(v) => setYacht((p) => ({ ...p, value: v }))} options={EXPECTED_VALUE} />
        <SelectField id="broker-timeline" label="Sale Timeline" value={yacht.timeline}
          onChange={(v) => setYacht((p) => ({ ...p, timeline: v }))} options={SALE_TIMELINE} />
      </div>

      <div role="group" aria-labelledby="broker-permissions" className="mt-10 border-t border-line pt-8">
        <h3 id="broker-permissions" className="text-[17px] font-semibold text-ink">
          Permissions you are requesting
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
          These are requests. None is granted by submitting this form; each is approved
          separately, after verification, and can be withdrawn.
        </p>
        <div className="mt-4 space-y-3">
          {PERMISSIONS.map((permission) => (
            <label key={permission.value} className="flex items-start gap-3 text-[14.5px] text-ink-muted">
              <input type="checkbox" checked={permissions.includes(permission.value)}
                onChange={() => togglePermission(permission.value)} className="mt-1" />
              {permission.label}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3 border-t border-line pt-8">
        <label className="flex items-start gap-3 text-[14.5px] text-ink-muted">
          <input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)}
            className="mt-1" />
          I confirm I am authorised to share this information with OffMarketYacht.
        </label>
        {fieldErrors.attested && (
          <p role="alert" className="text-[12px] text-accent">{fieldErrors.attested}</p>
        )}
        <label className="flex items-start gap-3 text-[14.5px] text-ink-muted">
          <input type="checkbox" checked={coBrokerage} onChange={(e) => setCoBrokerage(e.target.checked)}
            className="mt-1" />
          I understand that co-brokerage terms are agreed in writing before any introduction.
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
        {status === "sending" ? "Sending…" : "Submit Privately"}
      </button>

      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
        Confidential. We do not publish, circulate or disclose your mandate, and we do not contact
        the owner, crew or marina, without your written instruction.
      </p>
    </form>
  );
}
