"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  budget: string;
  yachtType: string;
  region: string;
  timeline: string;
  message: string;
}

const budgetOptions = [
  "Under $500K",
  "$500K – $1M",
  "$1M – $3M",
  "$3M – $5M",
  "$5M – $10M",
  "$10M – $25M",
  "$25M – $50M",
  "Over $50M",
];

const yachtTypeOptions = [
  "Any Type",
  "Superyacht (30m+)",
  "Motor Yacht",
  "Catamaran",
  "Trimaran",
  "Explorer Yacht",
  "Classic Yacht",
  "Other",
];

const regionOptions = [
  "Global",
  "Mediterranean",
  "Caribbean",
  "Pacific",
  "Atlantic",
  "Middle East",
  "South-East Asia",
  "Northern Europe",
  "Other",
];

const timelineOptions = [
  "Immediately",
  "Within 3 months",
  "Within 6 months",
  "Within 12 months",
  "Longer term",
];

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  yachtType: "",
  region: "",
  timeline: "",
  message: "",
};

export default function BuyerForm({ title = "Apply for Private Buyer Access" }: { title?: string }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-[#c9a96e] bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-[#0a1628]">
          Application Received
        </h3>
        <p className="text-sm text-[#4a5568]">
          Your access application has been received. A member of our team will
          review your enquiry and contact you within 24 hours.
        </p>
        <p className="mt-3 text-xs font-medium text-[#c9a96e]">
          Access subject to approval · Qualified introductions only
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#e8ecf0] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-1 text-xl font-bold text-[#0a1628] sm:text-2xl">
        {title}
      </h2>
      <p className="mb-4 text-sm text-[#8b97a5]">
        Private review only · Access subject to approval · Qualified introductions only
      </p>

      {/* Step indicator */}
      <div className="mb-6 flex items-center gap-3">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step === 1 ? "bg-[#c9a96e] text-[#0a1628]" : "bg-[#c9a96e]/20 text-[#c9a96e]"}`}>1</div>
        <div className="h-px flex-1 bg-[#e8ecf0]" />
        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step === 2 ? "bg-[#c9a96e] text-[#0a1628]" : "bg-[#e8ecf0] text-[#8b97a5]"}`}>2</div>
        <span className="text-xs text-[#8b97a5]">{step === 1 ? "Initial Details" : "Full Requirements"}</span>
      </div>

      {step === 1 && (
        <form onSubmit={handleStep1} noValidate className="space-y-4">
          <div>
            <label htmlFor="buyer-name" className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="buyer-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="buyer-email" className="form-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="buyer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="buyer-budget" className="form-label">
              Budget Range <span className="text-red-500">*</span>
            </label>
            <select
              id="buyer-budget"
              name="budget"
              required
              value={form.budget}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select budget range</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={!form.name || !form.email || !form.budget}
            className="btn-gold w-full py-4 disabled:opacity-50"
          >
            Continue →
          </button>
          <p className="text-center text-xs text-[#8b97a5]">
            Access is subject to approval. All applications are reviewed privately.
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="buyer-phone" className="form-label">
                Phone / WhatsApp
              </label>
              <input
                id="buyer-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+1 (555) 000 0000"
              />
            </div>
            <div>
              <label htmlFor="buyer-yachtType" className="form-label">
                Yacht Type
              </label>
              <select
                id="buyer-yachtType"
                name="yachtType"
                value={form.yachtType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select type</option>
                {yachtTypeOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="buyer-region" className="form-label">
                Preferred Region
              </label>
              <select
                id="buyer-region"
                name="region"
                value={form.region}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select region</option>
                {regionOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="buyer-timeline" className="form-label">
                Acquisition Timeline
              </label>
              <select
                id="buyer-timeline"
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="buyer-message" className="form-label">
              Additional Information
            </label>
            <textarea
              id="buyer-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="form-input resize-none"
              placeholder="Share any specific requirements, preferences, or context…"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-outline-gold flex-1 py-3"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold flex-[2] py-4 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit for Review (Subject to Approval)"}
            </button>
          </div>

          <p className="text-center text-xs text-[#8b97a5]">
            By submitting you agree to our{" "}
            <a href="/privacy" className="underline hover:text-[#c9a96e]">
              Privacy Policy
            </a>
            . NDA-based information sharing available upon request.
          </p>
        </form>
      )}
    </div>
  );
}
