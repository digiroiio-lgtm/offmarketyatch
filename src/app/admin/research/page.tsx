import { getResearchOverview } from "@/lib/research";

/**
 * Internal research pipeline. Read-only. Candidates are not published
 * inventory: they do not appear on the site, in the sitemap, in llms.txt or in
 * any inventory count. Access is enforced in `src/proxy.ts`.
 */
export default function AdminResearchPage() {
  const { rows, clusters } = getResearchOverview();

  return (
    <div>
      <h1 className="display text-[32px] text-ink">Research pipeline</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
        Unverified research leads. None is published, none counts toward inventory, and a
        candidate can only become a draft record once every blocker below is cleared and a
        reviewer has signed off. An advertisement is a research input, not evidence of seller
        authorisation or availability.
      </p>

      <div className="mt-8 overflow-x-auto border border-line bg-paper-raised">
        <table className="w-full min-w-[860px] text-left text-[13.5px]">
          <thead className="label-mono border-b border-line text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-normal">ID</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal">Builder</th>
              <th className="px-4 py-3 font-normal">Year</th>
              <th className="px-4 py-3 font-normal">Supplied price</th>
              <th className="px-4 py-3 font-normal">Sources opened</th>
              <th className="px-4 py-3 font-normal">Blockers</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line align-top last:border-0">
                <td className="px-4 py-3 font-mono text-ink">{row.id}</td>
                <td className="px-4 py-3 text-ink-muted">{row.status}</td>
                <td className="px-4 py-3 text-ink-muted">
                  {row.builder}
                  {row.builderRegion && (
                    <span className="block text-ink-faint">{row.builderRegion}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-muted">{row.year ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-ink-muted">{row.suppliedPrice}</td>
                <td className="px-4 py-3 text-ink-muted">{row.sourcesOpened}</td>
                <td className="px-4 py-3 text-ink-muted">
                  <ul className="list-disc space-y-1 pl-4">
                    {row.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-2 text-[13.5px] text-ink-faint">
        {clusters.map((cluster) => (
          <p key={cluster.name}>
            <span className="label-mono mr-2 text-ink-muted">{cluster.name}</span>
            {cluster.note}
          </p>
        ))}
      </div>
    </div>
  );
}
