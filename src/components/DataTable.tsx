import type { ContentTable } from "@/lib/types";

/** Semantic comparison table; scrolls horizontally inside its own box on phones. */
export default function DataTable({ table }: { table: ContentTable }) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-snug">
          <caption className="border-b border-line bg-paper-sunken px-4 py-3 text-left text-[14px] font-semibold text-ink">
            {table.caption}
          </caption>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="border-b border-line-strong px-4 py-3 font-semibold text-ink"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("|")} className="border-b border-line last:border-b-0">
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row" className="px-4 py-3 font-medium text-ink">
                      {cell}
                    </th>
                  ) : (
                    <td key={index} className="px-4 py-3 text-ink-muted">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <figcaption className="mt-3 text-[13px] leading-relaxed text-ink-faint">{table.note}</figcaption>
      )}
    </figure>
  );
}
