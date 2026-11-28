import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, "src");
const OUTPUT = path.join(SOURCE_ROOT, "i18n", "catalog.generated.ts");
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const TARGETS = ["it", "de", "fr", "ar"];
const TRANSLATABLE_KEYS = new Set([
  "title", "metaTitle", "metaDescription", "description", "standfirst", "intro",
  "heading", "body", "content", "paragraphs", "bullets", "keyTakeaway", "eyebrow",
  "ctaLabel", "secondaryCtaLabel", "linkLabel", "label", "term", "detail",
  "emptyMessage", "inventoryHeading", "cluster", "question", "answer",
  "placeholder", "footnote", "text", "headingLabel", "note", "subtitle", "options",
  "summary", "tagline", "headline", "caption", "buttonText", "alt",
]);

if (!API_KEY) {
  throw new Error("Set GOOGLE_TRANSLATE_API_KEY before running npm run i18n:translate.");
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (["admin", "api", "i18n"].includes(entry.name)) continue;
      files.push(...(await walk(full)));
    } else if (/\.(tsx?|mts|cts)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function isInsideTranslateCall(node, source) {
  let current = node.parent;
  while (current && current !== source) {
    if (
      ts.isCallExpression(current) &&
      ts.isIdentifier(current.expression) &&
      current.expression.text === "t"
    ) return true;
    current = current.parent;
  }
  return false;
}

function collectStrings(fileName, sourceText, output) {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);
  function visit(node, activeKey = "") {
    let key = activeKey;
    if (ts.isPropertyAssignment(node)) {
      key = ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : activeKey;
    } else if (ts.isJsxAttribute(node) && node.name && ts.isIdentifier(node.name)) {
      key = node.name.text;
    }

    if (ts.isJsxText(node)) {
      const text = node.getText(source).replace(/\s+/g, " ").trim();
      if (text.length > 1) output.add(text);
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text.replace(/\s+/g, " ").trim();
      const translatable = TRANSLATABLE_KEYS.has(key) || isInsideTranslateCall(node, source);
      if (
        translatable &&
        text.length > 1 &&
        !text.startsWith("/") &&
        !/^https?:\/\//i.test(text) &&
        !/^[A-Z0-9_:-]{3,}$/.test(text)
      ) output.add(text);
    }
    ts.forEachChild(node, (child) => visit(child, key));
  }
  visit(source);
}

const sourceFiles = (await walk(SOURCE_ROOT)).filter((file) =>
  !file.includes(path.sep + "admin" + path.sep) &&
  !file.includes(path.sep + "api" + path.sep) &&
  !file.endsWith(path.sep + "opportunities.ts") &&
  !file.endsWith(path.sep + "catalog.generated.ts")
);

const phrases = new Set();
for (const file of sourceFiles) {
  collectStrings(file, await fs.readFile(file, "utf8"), phrases);
}
const ordered = [...phrases].sort((a, b) => a.localeCompare(b));
const catalog = Object.fromEntries(TARGETS.map((locale) => [locale, {}]));

function batches(items, maxItems = 80, maxChars = 28000) {
  const result = [];
  let batch = [];
  let size = 0;
  for (const item of items) {
    if (batch.length >= maxItems || size + item.length > maxChars) {
      if (batch.length) result.push(batch);
      batch = [];
      size = 0;
    }
    batch.push(item);
    size += item.length;
  }
  if (batch.length) result.push(batch);
  return result;
}

for (const locale of TARGETS) {
  const groups = batches(ordered);
  let completed = 0;
  for (const group of groups) {
    const response = await fetch("https://translation.googleapis.com/language/translate/v2?key=" + encodeURIComponent(API_KEY), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: group, source: "en", target: locale, format: "text" }),
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error("Google Translate request failed for " + locale + ": " + response.status + " " + detail.slice(0, 500));
    }
    const payload = await response.json();
    const translations = payload?.data?.translations ?? [];
    if (translations.length !== group.length) {
      throw new Error("Translation count mismatch for " + locale + ": expected " + group.length + ", received " + translations.length);
    }
    group.forEach((phrase, index) => { catalog[locale][phrase] = translations[index].translatedText; });
    completed += group.length;
    process.stdout.write(locale + ": " + completed + "/" + ordered.length + "\n");
  }
}

const output = "import type { SupportedLocale } from \"@/lib/i18n\";\n\n" +
  "/** Generated by npm run i18n:translate. Do not edit by hand. */\n" +
  "export const GENERATED_TRANSLATIONS: Record<SupportedLocale, Record<string, string>> = " +
  JSON.stringify(catalog, null, 2) + ";\n";
await fs.writeFile(OUTPUT, output, "utf8");
process.stdout.write("Wrote " + ordered.length + " source phrases across " + TARGETS.length + " locales to " + path.relative(ROOT, OUTPUT) + "\n");
