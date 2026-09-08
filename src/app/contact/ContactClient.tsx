"use client";

import { useState } from "react";

import { Field, FormError, Honeypot, SuccessPanel } from "@/components/forms/FormParts";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/site";

export default function ContactClient() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { submit, status, error } = useLeadSubmit();

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
      kind: "private-access",
      answers: { Enquiry: message, Source: "Contact page" },
      contact,
      website: honeypot,
    });
    if (ok) track("request_access_completed", { form: "contact" });
  }

  return (
    <section className="section">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="label-mono mb-5 text-accent">Direct</h2>
            <dl className="border-t border-line">
              <div className="border-b border-line py-4">
                <dt className="text-[13px] text-ink-faint">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${SITE.email}`}
                    onClick={() => track("email_click", { form: "contact" })}
                    className="text-[16px] text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="text-[13px] text-ink-faint">Telephone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    onClick={() => track("phone_click", { form: "contact" })}
                    className="text-[16px] text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-[14px] leading-relaxed text-ink-muted">
              For a specific opportunity, enquire against its reference from the opportunity page
              — that carries the listing context and gets a faster, more useful answer.
            </p>
          </div>

          {status === "done" ? (
            <SuccessPanel
              title="Thank you — your message has been received."
              body="A member of our team will come back to you directly."
            />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative border border-line bg-paper-raised p-6 sm:p-8"
            >
              <h2 className="display text-[26px] text-ink sm:text-[30px]">Send a message</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                Confidential. We do not publish, share or sell contact details.
              </p>

              <Honeypot value={honeypot} onChange={setHoneypot} />

              <div className="mt-7 grid gap-5 sm:grid-cols-3">
                <Field
                  id="c-name"
                  label="Full Name"
                  value={contact.name}
                  onChange={(v) => setContact((p) => ({ ...p, name: v }))}
                  required
                  autoComplete="name"
                  error={fieldErrors.name}
                />
                <Field
                  id="c-email"
                  label="Email"
                  type="email"
                  value={contact.email}
                  onChange={(v) => setContact((p) => ({ ...p, email: v }))}
                  required
                  autoComplete="email"
                  error={fieldErrors.email}
                />
                <Field
                  id="c-phone"
                  label="Phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
                  required
                  autoComplete="tel"
                  error={fieldErrors.phone}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="c-message" className="form-label">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="form-input resize-y"
                  placeholder="What are you looking for, or what would you like to discuss?"
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
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
