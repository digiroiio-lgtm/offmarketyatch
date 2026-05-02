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

export default function BuyerForm({ title = "Request Private Buyer Access" }: { title?: string }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-[#c9a96e] bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-[#0a1628]">
          Request Received
        </h3>
        <p className="text-sm text-[#4a5568]">
          Your buyer access request has been received. A member of our team will
          review your enquiry and contact you within 24 hours.
        </p>
        <p className="mt-3 text-xs font-medium text-[#c9a96e]">
          Private review only · Qualified introductions only
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#e8ecf0] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-1 text-xl font-bold text-[#0a1628] sm:text-2xl">
        {title}
      </h2>
      <p className="mb-6 text-sm text-[#8b97a5]">
        Private review only · No public listing exposure · Qualified introductions only
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <div className="sm:col-span-2">
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

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-4 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Request Private Access"}
        </button>

        <p className="text-center text-xs text-[#8b97a5]">
          By submitting you agree to our{" "}
          <a href="/privacy" className="underline hover:text-[#c9a96e]">
            Privacy Policy
          </a>
          . NDA-based information sharing available upon request.
        </p>
      </form>
    </div>
  );
}
