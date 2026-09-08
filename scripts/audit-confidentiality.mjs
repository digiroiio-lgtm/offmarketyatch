#!/usr/bin/env node
/**
 * Confidentiality leak audit.
 *
 * Masking on this platform is a security property, not a presentation choice,
 * so it is verified against build output rather than trusted. Run after
 * `next build`:
 *
 *     npm run audit:confidentiality
 *
 * Scope. Three surfaces actually reach a browser and all three must be clean:
 *
 *   1. `.next/static`             — JavaScript shipped to the browser
 *   2. `.next/server/app/**.html` — prerendered HTML
 *   3. `.next/server/app/**.rsc`  — RSC payloads fetched on client navigation
 *
 * `.next/server` chunks and source maps are deliberately NOT scanned. The
 * confidential store has to exist on the server; that is the whole design.
 *
 * Exits non-zero on any finding, so it can gate a deploy.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const STATIC_DIR = join(ROOT, ".next", "static");
const APP_DIR = join(ROOT, ".next", "server", "app");

/** Field names that must never appear in a client payload. */
const CONFIDENTIAL_KEYS = [
  "yachtNamePrivate",
  "builderPrivate",
  "locationPrivate",
  "descriptionPrivate",
  "sellerSignal",
  "sellerSignalSource",
  "brokerContactPrivate",
  "imoPrivate",
  "mmsiPrivate",
  "registrationPrivate",
  "imagesPrivate",
  "OPPORTUNITY_RECORDS",
];

/**
 * Values that only exist inside the confidential store.
 *
 * Every entry must be distinctive enough that it cannot occur in ordinary
 * published prose. The `sellerSignal` enum is checked by its hyphenated
 * machine values for exactly this reason — the bare word "unconfirmed" appears
 * legitimately in buyer-facing copy about potential opportunities, so matching
 * on it would produce noise rather than signal.
 */
const CONFIDENTIAL_VALUES = [
  "[withheld]",
  "confirmed-for-sale",
  "quietly-testing",
  "open-to-offers",
];

/** Internal record ids (`int-0001`…) must never be published either. */
const ID_PATTERN = /\bint-\d{4}\b/;

/**
 * Exact lengths of confidential listings. Read from the record store so the
 * audit stays correct as inventory changes, without duplicating the data.
 */
function confidentialExactLengths() {
  const source = readFileSync(join(ROOT, "src", "data", "opportunities.ts"), "utf8");
  const records = source.split(/\n  \{\n/).slice(1);
  const lengths = [];
  for (const record of records) {
    if (!/confidentialityLevel: "confidential"/.test(record)) continue;
    const slug = record.match(/slug: "([^"]+)"/)?.[1];
    const ft = record.match(/lengthFt: (\d+)/)?.[1];
    if (slug && ft) lengths.push({ slug, ft });
  }
  return lengths;
}

function walk(dir, extensions) {
  let files = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      files = files.concat(walk(path, extensions));
    } else if (extensions.length === 0 || extensions.includes(extname(path))) {
      files.push(path);
    }
  }
  return files;
}

const findings = [];

function scan(files, label) {
  for (const file of files) {
    let content;
    try {
      content = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const key of CONFIDENTIAL_KEYS) {
      if (content.includes(key)) {
        findings.push(`${label}: confidential field name "${key}" in ${file}`);
      }
    }
    for (const value of CONFIDENTIAL_VALUES) {
      if (content.includes(value)) {
        findings.push(`${label}: confidential value "${value}" in ${file}`);
      }
    }
    const idMatch = content.match(ID_PATTERN);
    if (idMatch) {
      findings.push(`${label}: internal record id "${idMatch[0]}" in ${file}`);
    }
  }
}

console.log("Confidentiality audit\n");

const staticFiles = walk(STATIC_DIR, [".js", ".json", ".css"]);
const htmlFiles = walk(APP_DIR, [".html"]);
const rscFiles = walk(APP_DIR, [".rsc"]);

if (staticFiles.length === 0 && htmlFiles.length === 0) {
  console.error("No build output found. Run `next build` first.");
  process.exit(2);
}

scan(staticFiles, "browser bundle");
scan(htmlFiles, "prerendered HTML");
scan(rscFiles, "RSC payload");

// Exact lengths of confidential listings must not appear on their own pages —
// they are published as a band, and alt text is the classic place they slip out.
for (const { slug, ft } of confidentialExactLengths()) {
  const page = join(APP_DIR, "off-market-yachts", `${slug}.html`);
  let content;
  try {
    content = readFileSync(page, "utf8");
  } catch {
    continue;
  }
  const pattern = new RegExp(`\\b${ft}\\s?(ft|foot|feet)\\b`, "i");
  if (pattern.test(content)) {
    findings.push(
      `masking: exact length "${ft} ft" of confidential listing ${slug} appears on its own page`
    );
  }
}

console.log(`  browser bundles : ${staticFiles.length} file(s)`);
console.log(`  prerendered HTML: ${htmlFiles.length} file(s)`);
console.log(`  RSC payloads    : ${rscFiles.length} file(s)`);
console.log("");

if (findings.length > 0) {
  console.error(`FAIL — ${findings.length} finding(s):\n`);
  for (const finding of findings) console.error(`  • ${finding}`);
  console.error("\nConfidential data must not reach the client. Fix before deploying.");
  process.exit(1);
}

console.log("PASS — no confidential field, value, internal id or masked length");
console.log("       found in any client-facing output.");
