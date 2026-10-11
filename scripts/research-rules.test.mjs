/**
 * Tests for the research publication rules.
 *
 *     npm run test:research
 *
 * Runs on Node's built-in test runner with type stripping, so the rule module
 * is exercised directly with no extra dependency. `format.ts` is imported only
 * to prove the generalisation helpers stay in step with the ones the public
 * masking uses.
 */
import assert from "node:assert/strict";
import test from "node:test";

import { maskedLengthRange, maskedYearRange } from "../src/lib/format.ts";
import {
  generaliseForPublication,
  lengthBand,
  publicationBlockers,
  yearRange,
} from "../src/lib/research-rules.ts";

const approved = {
  status: "INTERNAL_RESEARCH",
  modelOnly: false,
  sources: [{ url: "https://example.test/a", opened: true }],
  observedPrices: [{ kind: "advertised-unverified", currency: "USD", amount: 10 }],
  verification: {
    identity: "confirmed",
    duplicateOf: null,
    availabilityEvidence: "broker-confirmed",
    classMatch: "luxury-yacht",
  },
  publication: {
    approved: true,
    reviewer: "A. Reviewer",
    reviewedOn: "2026-10-11",
    lawfulBasisNote: "Documented basis",
    proposedPublic: { publicReference: "OMY-9999" },
  },
};

test("a fully evidenced candidate has no blockers", () => {
  assert.deepEqual(publicationBlockers(approved), []);
});

test("every missing piece of evidence is a blocker", () => {
  const bare = {
    ...approved,
    sources: [{ url: "https://example.test/a", opened: false }],
    verification: { ...approved.verification, identity: "probable", availabilityEvidence: "none" },
    publication: {
      approved: false,
      reviewer: null,
      reviewedOn: null,
      lawfulBasisNote: null,
      proposedPublic: null,
    },
  };
  const blockers = publicationBlockers(bare);
  for (const expected of [
    "Vessel identity not confirmed",
    "No original source page opened and read",
    "No evidence of availability",
    "Reviewer sign-off missing",
    "Reviewer and review date not recorded",
    "No lawful-basis note for publishing a masked research entry",
    "No allow-listed public projection",
  ]) {
    assert.ok(blockers.includes(expected), `missing blocker: ${expected}`);
  }
});

test("conflicting source prices block publication", () => {
  const conflicted = {
    ...approved,
    observedPrices: [
      { kind: "advertised-unverified", currency: "USD", amount: 10 },
      { kind: "advertised-unverified", currency: "USD", amount: 12 },
    ],
  };
  assert.ok(publicationBlockers(conflicted).includes("Source prices conflict"));
});

test("a model reference, a duplicate and an out-of-class record are blocked", () => {
  assert.ok(
    publicationBlockers({ ...approved, status: "MODEL_REFERENCE", modelOnly: true }).length >= 2
  );
  assert.ok(
    publicationBlockers({
      ...approved,
      verification: { ...approved.verification, duplicateOf: "RC-001" },
    }).includes("Duplicate of RC-001")
  );
  assert.ok(
    publicationBlockers({
      ...approved,
      verification: { ...approved.verification, classMatch: "scope-mismatch" },
    }).includes("Outside the luxury-yacht class of this inventory")
  );
});

test("generalisation helpers match the public masking", () => {
  assert.equal(lengthBand(120), maskedLengthRange(120).label);
  assert.equal(lengthBand(120), "120–135 ft");
  assert.equal(yearRange(2017), maskedYearRange(2017));
  assert.equal(yearRange(2017), "2015–2019");
});

test("publicly advertised vessels lose their exact year", () => {
  const result = generaliseForPublication({
    year: 2017,
    nominalLengthFt: 120,
    advertisedPublicly: true,
    currency: "USD",
    priceBandApproved: true,
  });
  assert.equal(result.year, null);
  assert.equal(result.priceVisibility, "band");
});

test("non-USD prices are never converted or banded", () => {
  const result = generaliseForPublication({
    year: 2024,
    nominalLengthFt: 120,
    advertisedPublicly: false,
    currency: "EUR",
    priceBandApproved: true,
  });
  assert.equal(result.priceVisibility, "on-request");
  assert.ok(result.reasons.some((r) => r.includes("not converted")));
});

test("no price band means price on request", () => {
  const result = generaliseForPublication({
    year: 2024,
    nominalLengthFt: 120,
    advertisedPublicly: false,
    currency: "USD",
    priceBandApproved: false,
  });
  assert.equal(result.priceVisibility, "on-request");
  assert.equal(result.year, 2024);
});
