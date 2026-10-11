/**
 * Tests for the intake rules and the lead-to-intake mapping.
 *
 *     npm run test:research
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  brokerClaimsFromAnswers,
  intakeSourceFor,
  representationFromAnswer,
  submitterFromLead,
} from "../src/lib/intake/from-lead.ts";
import {
  canGrant,
  canMoveTo,
  hasActiveApproval,
  runAutoChecks,
  validateBrokerClaims,
} from "../src/lib/intake/rules.ts";
import { ANSWER_KEYS } from "../src/lib/intake/types.ts";

const submitter = {
  name: "A Broker",
  email: "a@brokerage.com",
  phone: "+1 555 0100",
  company: "Brokerage Ltd",
  role: null,
  website: "https://www.brokerage.com",
  licence: "IYBA member 123",
  jurisdictions: null,
};

const claims = {
  representation: "written-mandate-central-agent",
  canSupplyMandateEvidence: true,
  requestedPermissions: ["INTERNAL_BUYER_MATCHING"],
  attestedAuthority: true,
  coBrokerageAcknowledged: true,
};

function submission(overrides = {}) {
  return {
    id: "INT-1",
    source: "BROKER_PARTNER",
    status: "RECEIVED",
    version: 1,
    leadId: "LEAD-ABCDEF-12345",
    receivedAt: "2026-10-12T00:00:00.000Z",
    updatedAt: "2026-10-12T00:00:00.000Z",
    vessel: {},
    submitter,
    broker: claims,
    verification: { status: "PENDING", autoChecks: [], verifiedBy: null, verifiedAt: null, note: null },
    authorityEvidence: null,
    omyReference: null,
    proposal: null,
    approvals: [],
    audit: [],
    ...overrides,
  };
}

const EVIDENCE = "Mandate PDF seen, signed 2026-10-01, from J. Smith";

test("lead kinds map to the two intake sources, others to none", () => {
  assert.equal(intakeSourceFor("sell-side"), "OWNER_DIRECT");
  assert.equal(intakeSourceFor("broker-submission"), "BROKER_PARTNER");
  assert.equal(intakeSourceFor("listing-inquiry"), null);
  assert.equal(intakeSourceFor("private-access"), null);
});

test("unknown representation is read as the weakest claim", () => {
  assert.equal(representationFromAnswer("something-else"), "introducing-without-mandate");
  assert.equal(representationFromAnswer(undefined), "introducing-without-mandate");
});

test("broker answers become claims, and requests are not grants", () => {
  const parsed = brokerClaimsFromAnswers({
    [ANSWER_KEYS.representation]: "written-co-brokerage",
    [ANSWER_KEYS.mandateEvidence]: "yes",
    [ANSWER_KEYS.permissions]: "MASKED_PUBLICATION,NOT_A_PERMISSION,IDENTITY_DISCLOSURE",
    [ANSWER_KEYS.attested]: "yes",
    [ANSWER_KEYS.coBrokerage]: "no",
  });
  assert.deepEqual(parsed.requestedPermissions, ["MASKED_PUBLICATION", "IDENTITY_DISCLOSURE"]);
  assert.equal(parsed.coBrokerageAcknowledged, false);
});

test("a broker submission needs credentials and both attestations", () => {
  assert.equal(validateBrokerClaims(submitter, claims).ok, true);
  assert.equal(validateBrokerClaims({ ...submitter, licence: null }, claims).field, "licence");
  assert.equal(validateBrokerClaims({ ...submitter, company: null }, claims).field, "company");
  assert.equal(
    validateBrokerClaims(submitter, { ...claims, attestedAuthority: false }).field,
    "attestedAuthority"
  );
  assert.equal(
    validateBrokerClaims(submitter, { ...claims, coBrokerageAcknowledged: false }).field,
    "coBrokerageAcknowledged"
  );
});

test("automatic checks flag free-mail and mismatched websites", () => {
  const good = runAutoChecks(submitter, claims);
  assert.ok(good.find((c) => c.key === "business-email").passed);
  assert.ok(good.find((c) => c.key === "website-matches-email").passed);

  const bad = runAutoChecks({ ...submitter, email: "x@gmail.com", website: "other.com" }, claims);
  assert.equal(bad.find((c) => c.key === "business-email").passed, false);
  assert.equal(bad.find((c) => c.key === "website-matches-email").passed, false);
});

test("a new submission has no approvals and cannot be granted anything", () => {
  const s = submission();
  assert.equal(hasActiveApproval(s, "INTERNAL_BUYER_MATCHING"), false);
  for (const kind of ["INTERNAL_BUYER_MATCHING", "MASKED_PUBLICATION"]) {
    assert.equal(canGrant(s, kind, EVIDENCE, null).ok, false, kind);
  }
});

test("authority needs evidence, and a broker must be verified first", () => {
  const pending = submission({ status: "VERIFICATION_PENDING" });
  assert.equal(canMoveTo(pending, "AUTHORITY_CONFIRMED", null).ok, false);
  assert.equal(canMoveTo(pending, "AUTHORITY_CONFIRMED", EVIDENCE).reason, "Broker must be verified first");

  const verified = submission({
    status: "VERIFICATION_PENDING",
    verification: { ...pending.verification, status: "VERIFIED" },
  });
  assert.equal(canMoveTo(verified, "AUTHORITY_CONFIRMED", EVIDENCE).ok, true);

  const noMandate = submission({
    status: "VERIFICATION_PENDING",
    broker: { ...claims, representation: "introducing-without-mandate" },
    verification: { ...pending.verification, status: "VERIFIED" },
  });
  assert.equal(canMoveTo(noMandate, "AUTHORITY_CONFIRMED", EVIDENCE).ok, false);
});

test("an owner needs no broker verification but still needs evidence", () => {
  const owner = submission({
    source: "OWNER_DIRECT",
    broker: null,
    status: "VERIFICATION_PENDING",
    verification: { status: "NOT_APPLICABLE", autoChecks: [], verifiedBy: null, verifiedAt: null, note: null },
  });
  assert.equal(canMoveTo(owner, "AUTHORITY_CONFIRMED", null).ok, false);
  assert.equal(canMoveTo(owner, "AUTHORITY_CONFIRMED", EVIDENCE).ok, true);
});

test("status moves cannot skip stages or leave a terminal state", () => {
  assert.equal(canMoveTo(submission(), "READY_FOR_PUBLICATION_REVIEW", EVIDENCE).ok, false);
  assert.equal(canMoveTo(submission({ status: "REJECTED" }), "RECEIVED", null).ok, false);
});

test("matching can be granted after authority; publication needs review stage and a proposal", () => {
  const ready = submission({
    status: "AUTHORITY_CONFIRMED",
    authorityEvidence: EVIDENCE,
    verification: { status: "VERIFIED", autoChecks: [], verifiedBy: "admin", verifiedAt: "x", note: "checked" },
  });
  assert.equal(canGrant(ready, "INTERNAL_BUYER_MATCHING", EVIDENCE, null).ok, true);
  assert.equal(canGrant(ready, "INTERNAL_BUYER_MATCHING", "short", null).ok, false);
  assert.equal(canGrant(ready, "MASKED_PUBLICATION", EVIDENCE, null).ok, false);

  const review = {
    ...ready,
    status: "READY_FOR_PUBLICATION_REVIEW",
    proposal: { type: "Motor Yacht" },
  };
  assert.equal(canGrant(review, "MASKED_PUBLICATION", EVIDENCE, null).ok, true);
});

test("identity disclosure is limited to one qualified buyer lead", () => {
  const ready = submission({
    status: "AUTHORITY_CONFIRMED",
    authorityEvidence: EVIDENCE,
    verification: { status: "VERIFIED", autoChecks: [], verifiedBy: "admin", verifiedAt: "x", note: "checked" },
  });
  assert.equal(canGrant(ready, "IDENTITY_DISCLOSURE", EVIDENCE, null).ok, false);
  assert.equal(canGrant(ready, "IDENTITY_DISCLOSURE", EVIDENCE, "not-a-lead").ok, false);
  assert.equal(canGrant(ready, "IDENTITY_DISCLOSURE", EVIDENCE, "LEAD-ABCDEF-99999").ok, true);

  const granted = {
    ...ready,
    approvals: [
      {
        id: "A1",
        kind: "IDENTITY_DISCLOSURE",
        state: "granted",
        grantedBy: "admin",
        grantedAt: "x",
        evidence: EVIDENCE,
        scope: "LEAD-ABCDEF-99999",
        revokedBy: null,
        revokedAt: null,
      },
    ],
  };
  assert.equal(hasActiveApproval(granted, "IDENTITY_DISCLOSURE", "LEAD-ABCDEF-99999"), true);
  // An approval for one buyer does not cover another.
  assert.equal(hasActiveApproval(granted, "IDENTITY_DISCLOSURE", "LEAD-ZZZZZZ-00001"), false);
});

test("rejected and withdrawn submissions can be granted nothing", () => {
  for (const status of ["REJECTED", "WITHDRAWN"]) {
    const s = submission({ status, authorityEvidence: EVIDENCE });
    assert.equal(canGrant(s, "INTERNAL_BUYER_MATCHING", EVIDENCE, null).ok, false);
  }
});

test("submitter mapping trims and nulls empty optional fields", () => {
  const mapped = submitterFromLead({
    id: "L",
    kind: "broker-submission",
    receivedAt: "x",
    answers: { [ANSWER_KEYS.licence]: "  ", [ANSWER_KEYS.website]: "brokerage.com" },
    contact: { name: " A ", email: "a@b.com", phone: "1234567", company: "Co" },
  });
  assert.equal(mapped.name, "A");
  assert.equal(mapped.licence, null);
  assert.equal(mapped.website, "brokerage.com");
});
