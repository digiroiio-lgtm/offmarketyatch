"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  yachtType: string;
  year: string;
  length: string;
  askingPrice: string;
  flag: string;
  location: string;
  refit: string;
  documentation: string;
  message: string;
}

const yachtTypeOptions = [
  "Superyacht (30m+)",
  "Motor Yacht",
  "Catamaran",
  "Trimaran",
  "Explorer Yacht",
  "Classic Yacht",
  "Other",
];

const documentationOptions = [
  "Yes – Full documentation available",
  "Partial documentation available",
  "Pending / In progress",
  "Unknown – contact to discuss",
];

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  yachtType: "",
  year: "",
  length: "",
  askingPrice: "",
  flag: "",
  location: "",
  refit: "",
  documentation: "",
  message: "",
};

export default function SellerForm({
  title = "Submit an Off-Market Yacht",
}: {
  title?: string;
}) {
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
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-[#c9a96e] bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-[#0a1628]">
          Submission Received
        </h3>
        <p className="text-sm text-[#4a5568]">
          Your yacht submission has been received for confidential review. Our
          team will be in contact within 24 hours.
        </p>
        <p className="mt-3 text-xs font-medium text-[#c9a96e]">
          No public listing exposure · Confidential review
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
        No public listing exposure · Confidential review · NDA available
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="seller-name" className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="seller-name"
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
            <label htmlFor="seller-email" className="form-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="seller-email"
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
            <label htmlFor="seller-phone" className="form-label">
              Phone / WhatsApp
            </label>
            <input
              id="seller-phone"
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
            <label htmlFor="seller-yachtType" className="form-label">
              Yacht Type <span className="text-red-500">*</span>
            </label>
            <select
              id="seller-yachtType"
              name="yachtType"
              required
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
            <label htmlFor="seller-year" className="form-label">
              Build Year
            </label>
            <input
              id="seller-year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={form.year}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. 2015"
            />
          </div>
          <div>
            <label htmlFor="seller-length" className="form-label">
              LOA (metres)
            </label>
            <input
              id="seller-length"
              name="length"
              type="text"
              value={form.length}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. 45m"
            />
          </div>
          <div>
            <label htmlFor="seller-askingPrice" className="form-label">
              Asking Price
            </label>
            <input
              id="seller-askingPrice"
              name="askingPrice"
              type="text"
              value={form.askingPrice}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. €8,500,000 or contact to discuss"
            />
          </div>
          <div>
            <label htmlFor="seller-flag" className="form-label">
              Flag / Registry
            </label>
            <input
              id="seller-flag"
              name="flag"
              type="text"
              value={form.flag}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Cayman Islands"
            />
          </div>
          <div>
            <label htmlFor="seller-location" className="form-label">
              Current Location
            </label>
            <input
              id="seller-location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Palma, Mallorca"
            />
          </div>
          <div>
            <label htmlFor="seller-refit" className="form-label">
              Recent Refit / Upgrades
            </label>
            <input
              id="seller-refit"
              name="refit"
              type="text"
              value={form.refit}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. 2023 full refit"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="seller-documentation" className="form-label">
              Documentation Available
            </label>
            <select
              id="seller-documentation"
              name="documentation"
              value={form.documentation}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select documentation status</option>
              {documentationOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="seller-message" className="form-label">
            Additional Information
          </label>
          <textarea
            id="seller-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="form-input resize-none"
            placeholder="Describe the vessel, ownership situation, reason for sale, or any other relevant detail…"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-4 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Yacht for Confidential Review"}
        </button>

        <p className="text-center text-xs text-[#8b97a5]">
          By submitting you agree to our{" "}
          <a href="/privacy" className="underline hover:text-[#c9a96e]">
            Privacy Policy
          </a>
          . All submissions are reviewed privately. No public exposure without
          your explicit consent.
        </p>
      </form>
    </div>
  );
}
