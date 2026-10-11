#!/usr/bin/env node
/**
 * End-to-end check of the private intake flow against a real `next start`.
 *
 *     npm run build && node scripts/intake-e2e.mjs
 *
 * Starts the production server on a spare port with an in-memory intake store
 * and a local webhook sink (so the lead is "delivered" without any external
 * service), submits an owner and a broker lead, and verifies that submissions
 * stay private, that admin access is enforced, and that every approval gate
 * holds. Exits non-zero on the first failed expectation.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";

const PORT = 3190;
const SINK_PORT = 3191;
const BASE = `http://127.0.0.1:${PORT}`;
const ADMIN = { user: "e2e-admin", password: "e2e-password-not-secret" };
const AUTH = "Basic " + Buffer.from(`${ADMIN.user}:${ADMIN.password}`).toString("base64");

const MARKERS = {
  ownerBuilder: "Zzownerbuilderq",
  ownerLocation: "Zzownerplaceq",
  brokerBuilder: "Zzbrokerbuilderq",
  brokerLocation: "Zzbrokerplaceq",
  brokerCompany: "Zzbrokeragecoq",
};

let failures = 0;
function expect(condition, label) {
  console.log(`${condition ? "ok  " : "FAIL"} ${label}`);
  if (!condition) failures += 1;
}

const sink = createServer((req, res) => {
  req.resume();
  res.writeHead(200).end("ok");
}).listen(SINK_PORT);

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  env: {
    ...process.env,
    ADMIN_USER: ADMIN.user,
    ADMIN_PASSWORD: ADMIN.password,
    LEAD_WEBHOOK_URL: `http://127.0.0.1:${SINK_PORT}`,
    FORMSPREE_ENDPOINT: "",
    DATABASE_URL: "",
  },
  stdio: "ignore",
  detached: true,
});

async function waitReady() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("server did not start");
}

const get = (path, auth = false) =>
  fetch(`${BASE}${path}`, { headers: auth ? { Authorization: AUTH } : {} });
const text = async (path, auth = false) => (await get(path, auth)).text();

function admin(body, { origin = BASE, auth = AUTH } = {}) {
  return fetch(`${BASE}/api/admin/intake`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: auth } : {}),
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify(body),
  });
}

function lead(kind, answers, contact) {
  return fetch(`${BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, answers, contact }),
  });
}

const baseAnswers = (builder, location) => ({
  "Yacht type": "Motor Yacht",
  Length: "120 ft",
  Year: "2018",
  Builder: builder,
  "Current location": location,
  "Expected value": "$10M–$25M",
  "Sale timeline": "This season",
});

try {
  await waitReady();

  const sitemapBefore = (await text("/sitemap.xml")).match(/<loc>/g).length;
  const countBefore = (await text("/request-private-access")).match(/(\d+) opportunities currently published/)?.[1];

  // Submissions
  const owner = await lead("sell-side", baseAnswers(MARKERS.ownerBuilder, MARKERS.ownerLocation), {
    name: "Olivia Owner",
    email: "olivia@example.com",
    phone: "+1 555 0101",
  });
  expect(owner.status === 200, "owner submission accepted");

  const brokerAnswers = {
    ...baseAnswers(MARKERS.brokerBuilder, MARKERS.brokerLocation),
    "Company website": "https://brokerage.example.com",
    "Licence or membership": "IYBA member 4242",
    Representation: "written-mandate-central-agent",
    "Mandate evidence available": "yes",
    "Requested permissions": "INTERNAL_BUYER_MATCHING,MASKED_PUBLICATION,IDENTITY_DISCLOSURE",
    "Authority attested": "yes",
    "Co-brokerage acknowledged": "yes",
  };
  const brokerContact = {
    name: "Ben Broker",
    email: "ben@brokerage.example.com",
    phone: "+1 555 0102",
    company: MARKERS.brokerCompany,
  };
  const bad = await lead("broker-submission", { ...brokerAnswers, "Authority attested": "no" }, brokerContact);
  expect(bad.status === 422, "broker submission without attestation is refused");
  const broker = await lead("broker-submission", brokerAnswers, brokerContact);
  expect(broker.status === 200, "broker submission accepted");

  // Admin access
  expect((await get("/admin/intake")).status === 401, "/admin/intake requires credentials");
  expect((await admin({ action: "status", id: "x" }, { auth: null })).status === 401, "admin API refuses no credentials");
  expect((await admin({ action: "status", id: "x" }, { auth: "Basic " + Buffer.from("e2e-admin:wrong").toString("base64") })).status === 401, "admin API refuses wrong credentials");
  expect((await admin({ action: "status", id: "x" }, { origin: "https://evil.example" })).status === 403, "admin API refuses cross-origin requests");

  // Queue
  const queue = await text("/admin/intake", true);
  expect(queue.includes(MARKERS.ownerBuilder) && queue.includes(MARKERS.brokerBuilder), "admin queue shows both submissions");
  const cards = queue.split("<details").slice(1);
  const cardWith = (marker) => cards.find((card) => card.includes(marker));
  expect(
    Boolean(cardWith(MARKERS.ownerBuilder)?.includes(">Owner<")) &&
      Boolean(cardWith(MARKERS.brokerBuilder)?.includes(">Broker<")),
    "queue labels both sources"
  );
  expect(queue.includes("No matching, publication or disclosure is permitted"), "new submissions have no approvals");
  const idOf = (card) => card?.match(/INT-[A-Z0-9]+-[A-Z0-9]+/)?.[0];
  const brokerId = idOf(cardWith(MARKERS.brokerBuilder));
  const ownerId = idOf(cardWith(MARKERS.ownerBuilder));
  expect(Boolean(brokerId && ownerId && brokerId !== ownerId), "exactly two distinct intake records exist");

  // Nothing public
  const publicPaths = ["/", "/sell-your-yacht-privately", "/yacht-brokers", "/off-market-yachts", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/robots.txt"];
  let leaked = [];
  for (const path of publicPaths) {
    const body = await text(path);
    for (const marker of Object.values(MARKERS)) if (body.includes(marker)) leaked.push(`${path}:${marker}`);
  }
  expect(leaked.length === 0, `no submission data in public pages${leaked.length ? ` (${leaked.join(", ")})` : ""}`);
  expect((await text("/sitemap.xml")).match(/<loc>/g).length === sitemapBefore, "sitemap unchanged");
  expect((await text("/request-private-access")).match(/(\d+) opportunities currently published/)?.[1] === countBefore, "published inventory count unchanged");

  // Gates
  const grant = (id, kind, evidence = "Mandate PDF seen, signed 2026-10-01, from J. Smith", scope = "") =>
    admin({ action: "grant", id, kind, evidence, scope }).then((r) => r.status);
  expect((await grant(brokerId, "INTERNAL_BUYER_MATCHING")) === 422, "matching approval refused before authority is confirmed");
  expect((await admin({ action: "draft", id: brokerId })).status === 422, "draft refused for a submission that is not ready");

  expect((await admin({ action: "status", id: brokerId, status: "VERIFICATION_PENDING" })).status === 200, "broker moved to verification");
  expect((await admin({ action: "status", id: brokerId, status: "AUTHORITY_CONFIRMED", evidence: "Mandate seen on call 2026-10-12 with the owner" })).status === 422, "authority refused while broker is unverified");
  expect((await admin({ action: "verify-broker", id: brokerId, outcome: "VERIFIED", note: "Licence checked with the association; firm site matches email domain" })).status === 200, "broker verified by a person");
  expect((await admin({ action: "status", id: brokerId, status: "AUTHORITY_CONFIRMED", evidence: "Mandate seen on call 2026-10-12 with the owner" })).status === 200, "authority confirmed with evidence");
  expect((await grant(brokerId, "INTERNAL_BUYER_MATCHING")) === 200, "matching approval recorded");
  expect((await grant(brokerId, "MASKED_PUBLICATION")) === 422, "publication approval refused before review stage");
  expect((await grant(brokerId, "IDENTITY_DISCLOSURE")) === 422, "identity disclosure refused without a buyer lead");

  const proposal = {
    type: "Motor Yacht",
    buildRegion: "Italian Build",
    locationPublic: "Mediterranean",
    country: "Italy",
    descriptionPublic: "A well-kept Italian motor yacht operating a Mediterranean programme, offered privately.",
    opportunityNotes: "Research-led approach for qualified buyers.",
  };
  expect((await admin({ action: "proposal", id: brokerId, proposal: { ...proposal, buildRegion: "Not a region" } })).status === 422, "proposal with an invalid region is refused");
  expect((await admin({ action: "proposal", id: brokerId, proposal })).status === 200, "proposal saved");
  expect((await admin({ action: "status", id: brokerId, status: "READY_FOR_PUBLICATION_REVIEW" })).status === 200, "moved to publication review (OMY reference issued)");
  expect((await admin({ action: "draft", id: brokerId })).status === 403, "draft refused without a publication approval");
  expect((await grant(brokerId, "MASKED_PUBLICATION")) === 200, "publication approval recorded");

  const draftRes = await admin({ action: "draft", id: brokerId });
  const draft = (await draftRes.json()).draft;
  expect(draftRes.status === 200 && draft?.status === "draft", "draft generated and still a draft");
  expect(draft?.availabilityType === "POTENTIAL OPPORTUNITY" && draft?.verified === false, "draft is an unconfirmed potential opportunity");
  expect(draft?.yachtNamePrivate === null && draft?.builderPrivate === null && draft?.locationPrivate === null, "draft carries no private fields");
  expect(draft?.year === null, "draft withholds the exact year");
  const draftText = JSON.stringify(draft ?? {});
  expect(!Object.values(MARKERS).some((m) => draftText.includes(m)), "draft contains no submitted private values");

  const queueAfter = await text("/admin/intake", true);
  expect(queueAfter.includes("approval-granted"), "approvals appear in the review queue with history");
  const approvalIds = [...new Set([...queueAfter.matchAll(/APR-[A-Z0-9]+-[A-Z0-9]+/g)].map((m) => m[0]))];
  expect(approvalIds.length === 2, "both recorded approvals are listed");
  const revoked = [];
  for (const approval of approvalIds) {
    revoked.push((await admin({ action: "revoke", id: brokerId, approvalId: approval, reason: "Owner withdrew consent" })).status);
  }
  expect(revoked.every((status) => status === 200), "approvals can be revoked");
  expect((await admin({ action: "revoke", id: brokerId, approvalId: approvalIds[0], reason: "again" })).status === 422, "an approval cannot be revoked twice");
  expect((await admin({ action: "draft", id: brokerId })).status === 403, "draft refused again once publication approval is revoked");

  // Owner never gets approvals by submitting
  expect((await grant(ownerId, "INTERNAL_BUYER_MATCHING")) === 422, "owner matching approval refused before authority is confirmed");

  // Still nothing public after the whole flow
  leaked = [];
  for (const path of publicPaths) {
    const body = await text(path);
    for (const marker of Object.values(MARKERS)) if (body.includes(marker)) leaked.push(`${path}:${marker}`);
  }
  expect(leaked.length === 0, "still no submission data in public pages after approvals");
  expect((await text("/sitemap.xml")).match(/<loc>/g).length === sitemapBefore, "sitemap still unchanged");
} catch (error) {
  console.error(error);
  failures += 1;
} finally {
  try {
    process.kill(-server.pid);
  } catch {}
  sink.close();
}

console.log(failures === 0 ? "\nPASS" : `\nFAIL: ${failures} expectation(s)`);
process.exit(failures === 0 ? 0 : 1);
