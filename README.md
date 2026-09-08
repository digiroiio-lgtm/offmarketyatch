# OffMarketYacht.com

A confidential off-market yacht opportunity marketplace, built to convert
high-intent US buyers into qualified leads.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript strict.

---

## The one rule that shapes the codebase

**Confidential yacht data is masked on the server and never reaches the
client.** Not hidden with CSS, not filtered in JavaScript — absent from the
payload.

```
src/data/opportunities.ts   server-only  full records, incl. confidential fields
        │
        ▼
src/lib/opportunities.ts    server-only  the ONLY reader. Builds PublicOpportunity
        │                                DTOs field-by-field from an allow-list.
        ▼
src/lib/types.ts            client-safe  describes only publishable shapes
        │
        ▼
components / pages / JSON-LD / sitemap / API responses
```

Both server modules `import "server-only"`, so reaching them from a Client
Component is a build error rather than a leak.

### Verifying it

```bash
npm run build
npm run audit:confidentiality
```

The audit scans the three surfaces that actually reach a browser — browser
bundles, prerendered HTML, and RSC payloads fetched on client navigation — for
confidential field names, confidential values, internal record ids, and the
exact lengths of listings published as a band. It exits non-zero on any
finding, so it can gate a deploy. `npm run verify` runs build → audit → lint.

`.next/server` chunks are deliberately not scanned: the confidential store has
to exist on the server, which is the whole design.

---

## What gets masked

| Published | Withheld until qualification |
| --- | --- |
| Class, length (exact or band), year, refit | Yacht name, shipyard |
| Build region, hull, guests, cabins, crew | Exact asking price |
| Cruising area, price band, condition | Full specification, current position |
| Public reference (`OMY-1048`) | Additional photography, broker/seller access |

Masking depth follows each record's `confidentialityLevel`:

- **`confidential`** — length published as a band (`150–165 ft`), never the
  exact figure. The band midpoint is the only number that leaves the server.
- **`restricted`** — exact length published, identity and price still withheld.
- **`open`** — the least restrictive tier.

Alt text is masked too. A human authoring `"Silhouette of a 164 ft motor
yacht"` on a confidential record would otherwise publish the exact length; the
DAL rewrites any length-shaped figure to the published band.

---

## Honesty constraints in code

The brief forbids manufactured scarcity, and the data model enforces it rather
than relying on copy review:

- **Badges derive only from stored fields.** There is no code path that can
  render "3 buyers viewing", "seller motivated" or a countdown, because no
  field exists to derive one from.
- **`availabilityType` distinguishes what we actually know.** `VERIFIED
  OFF-MARKET` (seller position confirmed by a person) · `PRIVATE LISTING` ·
  `BROKER-SOURCED` · `POTENTIAL OPPORTUNITY` (no mandate; availability
  unconfirmed, and the card says so).
- **Counts are real.** `getInventoryStats()` counts published records. Where
  there is nothing to count, the UI omits the number instead of inventing one.
- **Imagery is labelled.** Listings without authorised photography render a
  generated profile study marked "not the vessel". No stock photo is ever
  presented as the yacht.
- **Structured data is not abused.** Opportunity pages carry `BreadcrumbList`
  only — no `Product`/`Offer`, because a masked listing has no published price,
  no identified product and no purchasable offer.

### Sample inventory

`src/data/opportunities.ts` ships **sample records** used to build and
demonstrate the platform. `NEXT_PUBLIC_INVENTORY_MODE` defaults to `sample`,
and every inventory surface renders a visible disclosure saying so. Set it to
`live` only once real, verified, broker-sourced records are in place.

---

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_INVENTORY_MODE` | `sample` \| `live`. Drives the visitor-facing disclosure. | `sample` |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Enables `/admin`. **Admin fails closed** — unset means 404, never a default password. | unset |
| `LEAD_WEBHOOK_URL` | CRM/Zapier/HubSpot endpoint. Every accepted lead is POSTed here. | unset |
| `LEAD_WEBHOOK_TOKEN` | Sent as `Authorization: Bearer` on the webhook. | unset |

---

## Lead capture

Four funnels, all posting to `POST /api/leads`:

| Funnel | Route | Kind |
| --- | --- | --- |
| 5-step qualification | `/request-private-access` | `private-access` |
| Per-listing inquiry | `/off-market-yachts/[slug]` | `listing-inquiry` |
| Private matching | homepage | `private-search` |
| Sell-side | `/sell-your-yacht-privately` | `sell-side` |

Attribution (UTMs, `gclid`, `fbclid`, `msclkid`, referrer, landing page) is
captured on first touch and preserved through the whole journey, so a lead
carries the campaign that produced it.

### Durability — read this before going live

Leads are (1) written to the server log as a structured JSON line, (2) POSTed
to `LEAD_WEBHOOK_URL` if set, and (3) held in a bounded in-process buffer that
backs the admin screen.

**The buffer is not a database.** It does not survive a restart or span
serverless instances. The log line and the webhook are the durable records.
Configure the webhook, or point `persistLead` in `src/lib/leads.ts` at a
database, before relying on lead storage.

---

## Admin

`/admin` — protected by HTTP Basic auth enforced in `src/proxy.ts` (Next 16's
renamed middleware) with a constant-time credential comparison, `noindex`
headers, and no caching.

Operational controls per listing: publish / draft / withdraw, feature, verify,
price visibility, location granularity, confidentiality level. Withdrawing a
listing revalidates the affected paths, so the page genuinely 404s and drops
out of the sitemap; re-publishing brings it back without a redeploy.

Only those switches are settable — the API allow-lists them, so there is no
path that could publish a confidential value.

Editorial content (descriptions, specification, imagery) lives in the
version-controlled record store and changes through a commit. Overrides are
in-process and non-durable; the admin UI says so plainly.

---

## Information architecture

- `/` — 13-section homepage, inventory above the fold
- `/off-market-yachts` — the marketplace, with search and filters
- `/off-market-yachts/[slug]` — masked opportunity pages
- 33 commercial-intent landing pages (`src/data/landing/`) — core, USA,
  Florida, cities, regions, budget bands, size bands, classes
- `/private-market-intelligence` + 17 articles (`src/data/articles.ts`)
- `/sell-your-yacht-privately`, `/request-private-access`

Landing pages and articles are config-driven but each carries genuinely unique
content — a distinct intro, AI-citable answer blocks, FAQs and internal links.
They are not templated doorway pages.

### Indexing

Indexed: the homepage, marketplace, landing pages, articles, and opportunity
pages with sufficient unique public content.

`noindex`: conversion funnels, admin, and any opportunity page that fails the
substance test in `isIndexable()` (floors on description, on acquisition notes,
and on the two combined, so a record cannot pass by padding one field). Such a
page stays reachable but leaves the sitemap.

All URLs from the previous IA 301 to their closest new equivalent — single hop,
no chains. See `next.config.ts`.

---

## Development

```bash
npm install
npm run dev            # http://localhost:3000
npm run build
npm start
npm run lint
npm run verify         # build + confidentiality audit + lint
```

### A note on dynamic routes

`/[landing]`, `/off-market-yachts/[slug]` and
`/private-market-intelligence/[slug]` all set `dynamicParams = true`
deliberately. With `false`, any cache invalidation that clears a route's params
leaves its pages permanently 404, because `generateStaticParams` is not
re-evaluated at runtime. Unknown slugs still `notFound()`.

---

## Analytics

GA4-ready events push to `window.dataLayer` (see `src/lib/analytics.ts`),
covering search, filtering, listing views, all four funnels at click / start /
complete, and contact clicks — each carrying listing id, price band, length
band, location, type and full attribution.

Primary KPI: **qualified private access requests.** The site is optimised for
that, not for page views.
