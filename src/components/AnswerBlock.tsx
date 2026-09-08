/**
 * A concise, self-contained question-and-answer unit.
 *
 * Written so an answer engine can lift the answer paragraph intact and have it
 * still be true and attributable out of context — the AEO/GEO surface of the
 * site (§16).
 */
export default function AnswerBlock({
  question,
  answer,
  children,
  as: Heading = "h2",
}: {
  question: string;
  answer: string;
  children?: React.ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <div className="border-l-2 border-accent py-1 pl-5">
      <Heading className="text-[19px] font-semibold leading-snug tracking-tight text-ink">
        {question}
      </Heading>
      <p className="mt-3 text-[16px] leading-[1.7] text-ink-muted">{answer}</p>
      {children && <div className="mt-3 text-[15px] leading-[1.7] text-ink-muted">{children}</div>}
    </div>
  );
}
