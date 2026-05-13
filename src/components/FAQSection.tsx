interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQSection({
  items,
  title = "Frequently Asked Questions",
}: FAQSectionProps) {
  return (
    <section className="section bg-[#f5f7fa]" aria-labelledby="faq-heading">
      <div className="container-site">
        <h2
          id="faq-heading"
          className="mb-10 text-center text-2xl font-bold tracking-tight text-[#0a1628] sm:text-3xl"
        >
          {title}
        </h2>
        <div className="mx-auto max-w-3xl divide-y divide-[#e8ecf0]">
          {items.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#0a1628] transition hover:text-[#c9a96e]">
                {item.question}
                <span className="ml-4 shrink-0 text-[#c9a96e] transition group-open:rotate-45">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5568]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
