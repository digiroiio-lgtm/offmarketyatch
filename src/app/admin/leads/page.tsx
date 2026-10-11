import { LEAD_BUFFER_IS_EPHEMERAL, leadCountsByKind, listLeads } from "@/lib/leads";

const KIND_LABEL: Record<string, string> = {
  "private-access": "Private access",
  "listing-inquiry": "Listing inquiry",
  "private-search": "Private search",
  "sell-side": "Seller",
  "broker-submission": "Broker",
};

export default function AdminLeadsPage() {
  const leads = listLeads(100);
  const counts = leadCountsByKind();

  return (
    <div>
      <h1 className="display text-[32px] text-ink">Leads</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
        Requests received by this process. Every accepted lead is also written to the server log
        as a structured JSON line, and forwarded to <code>LEAD_WEBHOOK_URL</code> when one is
        configured — those are the durable records.
      </p>

      {LEAD_BUFFER_IS_EPHEMERAL && (
        <p className="mt-6 border-l-2 border-lock py-2 pl-4 text-[13.5px] leading-relaxed text-ink-muted">
          <span className="label-mono mr-2 text-lock">Ephemeral buffer</span>
          This screen reads an in-process buffer of the most recent 500 leads. It does not survive
          a restart or span serverless instances, so treat it as a live view rather than the
          system of record. Configure the webhook, or point <code>persistLead</code> at a
          database, before relying on it.
        </p>
      )}

      <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-5">
        {Object.entries(counts).map(([kind, value]) => (
          <div key={kind} className="bg-paper-raised px-5 py-5">
            <dt className="label-mono text-ink-faint">{KIND_LABEL[kind] ?? kind}</dt>
            <dd className="mt-2 font-mono text-[24px] tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {leads.length === 0 ? (
        <p className="mt-10 border border-dashed border-line-strong px-6 py-14 text-center text-[15px] text-ink-muted">
          No leads recorded in this process yet.
        </p>
      ) : (
        <div className="mt-10 space-y-4">
          {leads.map((lead) => (
            <article key={lead.id} className="border border-line bg-paper-raised p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="label-mono text-accent">
                    {KIND_LABEL[lead.kind] ?? lead.kind}
                  </span>
                  {lead.listingReference && (
                    <span className="label-mono ml-3 text-ink-muted">
                      {lead.listingReference}
                    </span>
                  )}
                </div>
                <time className="label-mono text-ink-faint" dateTime={lead.receivedAt}>
                  {new Date(lead.receivedAt).toLocaleString("en-US")}
                </time>
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-3">
                <div>
                  <h2 className="label-mono mb-2 text-ink-faint">Contact</h2>
                  <p className="text-[15px] font-medium text-ink">{lead.contact.name}</p>
                  <a
                    href={`mailto:${lead.contact.email}`}
                    className="block text-[14px] text-ink-muted underline decoration-accent underline-offset-4"
                  >
                    {lead.contact.email}
                  </a>
                  <a
                    href={`tel:${lead.contact.phone}`}
                    className="block text-[14px] text-ink-muted underline decoration-accent underline-offset-4"
                  >
                    {lead.contact.phone}
                  </a>
                  {lead.contact.country && (
                    <p className="text-[14px] text-ink-muted">{lead.contact.country}</p>
                  )}
                  {lead.contact.company && (
                    <p className="text-[14px] text-ink-muted">{lead.contact.company}</p>
                  )}
                  {lead.contact.preferredContact && (
                    <p className="label-mono mt-2 text-ink-faint">
                      Prefers {lead.contact.preferredContact}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="label-mono mb-2 text-ink-faint">Qualification</h2>
                  <dl className="space-y-1.5">
                    {Object.entries(lead.answers).map(([key, value]) => (
                      <div key={key} className="flex gap-2 text-[13.5px]">
                        <dt className="shrink-0 text-ink-faint">{key}:</dt>
                        <dd className="text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h2 className="label-mono mb-2 text-ink-faint">Attribution</h2>
                  <dl className="space-y-1.5">
                    {Object.entries(lead.attribution).map(([key, value]) => (
                      <div key={key} className="flex gap-2 text-[13px]">
                        <dt className="shrink-0 text-ink-faint">{key}:</dt>
                        <dd className="break-all text-ink-muted">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {lead.sourceUrl && (
                    <p className="mt-2 break-all text-[12px] text-ink-faint">{lead.sourceUrl}</p>
                  )}
                  <p className="label-mono mt-3 text-ink-faint">{lead.id}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
