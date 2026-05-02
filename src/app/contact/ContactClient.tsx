"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <>
      <PageHero
        h1="Contact OffMarketYachts.com"
        subheadline="All enquiries handled privately. We respond to qualified buyers, sellers, and brokers within 24 hours."
        ctaLabel="Request Private Access"
        ctaHref="/private-access"
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#0a1628]">
                Get in Touch
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
                For buyer access requests, yacht submissions, broker
                cooperation enquiries, and general questions, please use the
                relevant dedicated forms or the general enquiry form.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Buyer Enquiries", href: "/private-access", desc: "Request private buyer access" },
                  { label: "Sell / Submit a Yacht", href: "/submit-yacht", desc: "Submit a vessel confidentially" },
                  { label: "Broker Cooperation", href: "/yacht-brokers", desc: "Co-brokerage and deal flow" },
                  { label: "Family Office Services", href: "/family-offices", desc: "Advisory for family offices" },
                ].map(({ label, href, desc }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-lg border border-[#e8ecf0] p-4 transition hover:border-[#c9a96e]"
                  >
                    <div>
                      <div className="font-bold text-[#0a1628]">{label}</div>
                      <div className="text-sm text-[#4a5568]">{desc}</div>
                    </div>
                    <span className="ml-auto text-[#c9a96e]">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="rounded-lg border border-[#c9a96e] bg-white p-8 text-center shadow-sm">
                  <div className="mb-4 text-4xl">✓</div>
                  <h3 className="mb-2 text-xl font-bold text-[#0a1628]">
                    Message Received
                  </h3>
                  <p className="text-sm text-[#4a5568]">
                    Thank you for your message. We will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#e8ecf0] bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="mb-4 text-xl font-bold text-[#0a1628]">
                    General Enquiry
                  </h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
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
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
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
                      <label htmlFor="contact-message" className="form-label">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={handleChange}
                        className="form-input resize-none"
                        placeholder="Your message…"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full py-4 disabled:opacity-60"
                    >
                      {loading ? "Sending…" : "Send Message"}
                    </button>
                    <p className="text-center text-xs text-[#8b97a5]">
                      All enquiries are handled privately and confidentially.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
