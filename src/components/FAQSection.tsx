export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Native <details> disclosure: keyboard-accessible, works without JS, and the
 * answer text is in the HTML for crawlers and answer engines regardless of
 * open state.
 */
import { t, type Locale } from "@/lib/i18n";

export default function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  locale = "en",
}: {
  faqs: FAQ[];
  heading?: string;
  locale?: Locale;
}) {
  return (
    <section className="section-tight" aria-labelledby="faq-heading">
      <div className="container-site">
        <h2 id="faq-heading" className="display mb-8 text-[30px] text-ink sm:text-[34px]">
          {heading}
        </h2>
        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={t(locale, faq.question)} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-medium text-ink marker:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[15.5px] leading-[1.75] text-ink-muted">
                {t(locale, faq.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
