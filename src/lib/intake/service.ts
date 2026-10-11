import "server-only";

import type { OpportunityRecord } from "@/data/opportunities";
import {
  BUILD_REGIONS,
  CRUISING_AREAS,
  YACHT_TYPES,
  buildDraftRecord,
} from "@/lib/draft-record";
import { getAllRecordsForAdmin, previewPublicOpportunity } from "@/lib/opportunities";
import type { BuildRegion, CruisingArea, PublicOpportunity, YachtType } from "@/lib/types";

import {
  brokerClaimsFromAnswers,
  intakeSourceFor,
  submitterFromLead,
  vesselFromLead,
  type LeadLike,
} from "./from-lead";
import { canGrant, canMoveTo, hasActiveApproval, runAutoChecks } from "./rules";
import { getIntakeStore } from "./store";
import type {
  ApprovalKind,
  AuditEntry,
  IntakeProposal,
  IntakeStatus,
  IntakeSubmission,
} from "./types";

/**
 * Intake service: the only code that creates or changes intake records. Every
 * mutation goes through the pure rules in `rules.ts` and writes an audit entry
 * in the same store call as the state change.
 *
 * Nothing here publishes anything. The strongest output is a DRAFT
 * `OpportunityRecord`, and only after a recorded MASKED_PUBLICATION approval.
 */

export class IntakeError extends Error {
  constructor(
    message: string,
    public readonly status: number = 422
  ) {
    super(message);
    this.name = "IntakeError";
  }
}

const id = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;

function entry(actor: string, action: string, detail: string): AuditEntry {
  return { id: id("EVT"), at: new Date().toISOString(), actor, action, detail };
}

// ─── Intake ──────────────────────────────────────────────────────────────────

/**
 * Create a private submission from an accepted lead. Always starts RECEIVED
 * with no approvals. Safe to call twice for one lead: the store rejects the
 * second, and the existing record is returned.
 */
export async function recordIntake(lead: LeadLike): Promise<IntakeSubmission> {
  const source = intakeSourceFor(lead.kind);
  if (!source) throw new IntakeError("This lead type does not create an intake record.");

  const store = getIntakeStore();
  const existing = await store.getByLead(lead.id);
  if (existing) return existing;

  const submitter = submitterFromLead(lead);
  const broker = source === "BROKER_PARTNER" ? brokerClaimsFromAnswers(lead.answers) : null;
  const now = new Date().toISOString();

  const submission: IntakeSubmission = {
    id: id("INT"),
    source,
    status: "RECEIVED",
    version: 1,
    leadId: lead.id,
    receivedAt: lead.receivedAt,
    updatedAt: now,
    vessel: vesselFromLead(lead),
    submitter,
    broker,
    verification: broker
      ? {
          status: "PENDING",
          autoChecks: runAutoChecks(submitter, broker),
          verifiedBy: null,
          verifiedAt: null,
          note: null,
        }
      : { status: "NOT_APPLICABLE", autoChecks: [], verifiedBy: null, verifiedAt: null, note: null },
    authorityEvidence: null,
    omyReference: null,
    proposal: null,
    approvals: [],
    audit: [],
  };

  const created = entry("system", "received", `${source} submission received; private by default`);
  submission.audit.push(created);
  await store.create(submission, created);
  return submission;
}

// ─── Reading ─────────────────────────────────────────────────────────────────

export async function listQueue(limit = 200): Promise<IntakeSubmission[]> {
  return getIntakeStore().list(limit);
}

export async function getSubmission(submissionId: string): Promise<IntakeSubmission | null> {
  return getIntakeStore().get(submissionId);
}

/**
 * Submissions cleared for internal buyer matching. Only the minimum needed to
 * match leaves this function, and only where an approval is recorded.
 */
export async function getMatchableIntakes(): Promise<
  { id: string; source: string; type: string; length: string; area: string; valueBand: string }[]
> {
  const all = await getIntakeStore().list(500);
  return all
    .filter(
      (s) =>
        (s.status === "AUTHORITY_CONFIRMED" || s.status === "READY_FOR_PUBLICATION_REVIEW") &&
        hasActiveApproval(s, "INTERNAL_BUYER_MATCHING")
    )
    .map((s) => ({
      id: s.id,
      source: s.source,
      type: s.vessel.type,
      length: s.vessel.length,
      area: s.vessel.location,
      valueBand: s.vessel.valueExpectation,
    }));
}

// ─── Mutations ───────────────────────────────────────────────────────────────

async function mutate(
  submissionId: string,
  actor: string,
  change: (current: IntakeSubmission) => { next: IntakeSubmission; action: string; detail: string }
): Promise<IntakeSubmission> {
  const store = getIntakeStore();
  const current = await store.get(submissionId);
  if (!current) throw new IntakeError("Unknown submission.", 404);

  const { next, action, detail } = change(structuredClone(current));
  const event = entry(actor, action, detail);
  next.audit = [...next.audit, event];
  next.updatedAt = event.at;

  const saved = await store.update(next, current.version, event);
  if (!saved) throw new IntakeError("The record changed while you were editing. Reload.", 409);
  return { ...next, version: current.version + 1 };
}

function nextReference(taken: string[]): string {
  const numbers = [...getAllRecordsForAdmin().map((r) => r.publicReference), ...taken]
    .map((ref) => Number(/^OMY-(\d+)$/.exec(ref)?.[1] ?? 0))
    .filter(Boolean);
  return `OMY-${(numbers.length ? Math.max(...numbers) : 1100) + 1}`;
}

export async function setStatus(
  submissionId: string,
  actor: string,
  status: IntakeStatus,
  evidence: string | null
): Promise<IntakeSubmission> {
  // OMY reference numbers must not collide with intake references already issued.
  const taken = (await getIntakeStore().list(1000))
    .map((s) => s.omyReference)
    .filter((ref): ref is string => Boolean(ref));

  return mutate(submissionId, actor, (s) => {
    const decision = canMoveTo(s, status, evidence);
    if (!decision.ok) throw new IntakeError(decision.reason ?? "Move not allowed.");

    if (status === "AUTHORITY_CONFIRMED") s.authorityEvidence = evidence!.trim();
    if (status === "READY_FOR_PUBLICATION_REVIEW" && !s.omyReference) {
      s.omyReference = nextReference(taken);
    }
    const from = s.status;
    s.status = status;
    return {
      next: s,
      action: "status",
      detail: `${from} -> ${status}${evidence ? `; evidence: ${evidence.trim()}` : ""}`,
    };
  });
}

export async function verifyBroker(
  submissionId: string,
  actor: string,
  outcome: "VERIFIED" | "REJECTED",
  note: string
): Promise<IntakeSubmission> {
  return mutate(submissionId, actor, (s) => {
    if (s.source !== "BROKER_PARTNER") throw new IntakeError("Only brokers are verified.");
    if (!note || note.trim().length < 10) {
      throw new IntakeError("A verification note is required (what was checked, how).");
    }
    s.verification = {
      ...s.verification,
      status: outcome,
      verifiedBy: actor,
      verifiedAt: new Date().toISOString(),
      note: note.trim(),
    };
    return { next: s, action: "broker-verification", detail: `${outcome}; ${note.trim()}` };
  });
}

function oneOf<T extends string>(value: string, allowed: readonly T[], label: string): T {
  if (!allowed.includes(value as T)) throw new IntakeError(`Invalid ${label}.`);
  return value as T;
}

export async function saveProposal(
  submissionId: string,
  actor: string,
  input: IntakeProposal
): Promise<IntakeSubmission> {
  return mutate(submissionId, actor, (s) => {
    if (s.status !== "AUTHORITY_CONFIRMED" && s.status !== "READY_FOR_PUBLICATION_REVIEW") {
      throw new IntakeError("A proposal can be drafted once authority is confirmed.");
    }
    const proposal: IntakeProposal = {
      type: oneOf(input.type, YACHT_TYPES, "yacht class"),
      buildRegion: oneOf(input.buildRegion, BUILD_REGIONS, "build region"),
      locationPublic: oneOf(input.locationPublic, CRUISING_AREAS, "cruising area"),
      country: input.country.trim().slice(0, 80),
      descriptionPublic: input.descriptionPublic.trim().slice(0, 1200),
      opportunityNotes: input.opportunityNotes.trim().slice(0, 600),
    };
    if (!proposal.country || proposal.descriptionPublic.length < 20) {
      throw new IntakeError("Country and a public description are required.");
    }
    s.proposal = proposal;
    return { next: s, action: "proposal", detail: "Masked public proposal saved for review" };
  });
}

export async function grantApproval(
  submissionId: string,
  actor: string,
  kind: ApprovalKind,
  evidence: string,
  scope: string | null
): Promise<IntakeSubmission> {
  return mutate(submissionId, actor, (s) => {
    const decision = canGrant(s, kind, evidence, scope);
    if (!decision.ok) throw new IntakeError(decision.reason ?? "Approval not allowed.");
    s.approvals.push({
      id: id("APR"),
      kind,
      state: "granted",
      grantedBy: actor,
      grantedAt: new Date().toISOString(),
      evidence: evidence.trim(),
      scope: kind === "IDENTITY_DISCLOSURE" ? scope : null,
      revokedBy: null,
      revokedAt: null,
    });
    return {
      next: s,
      action: "approval-granted",
      detail: `${kind}${scope ? ` for ${scope}` : ""}; evidence: ${evidence.trim()}`,
    };
  });
}

export async function revokeApproval(
  submissionId: string,
  actor: string,
  approvalId: string,
  reason: string
): Promise<IntakeSubmission> {
  return mutate(submissionId, actor, (s) => {
    const approval = s.approvals.find((a) => a.id === approvalId);
    if (!approval || approval.state === "revoked") throw new IntakeError("No active approval.");
    if (!reason || reason.trim().length < 5) throw new IntakeError("A reason is required.");
    approval.state = "revoked";
    approval.revokedBy = actor;
    approval.revokedAt = new Date().toISOString();
    return {
      next: s,
      action: "approval-revoked",
      detail: `${approval.kind}${approval.scope ? ` for ${approval.scope}` : ""}; ${reason.trim()}`,
    };
  });
}

// ─── Masked profile ──────────────────────────────────────────────────────────

function parseLengthFt(raw: string): number {
  const match = /(\d{2,3})(?:\.\d+)?/.exec(raw);
  const ft = match ? Number(match[1]) : NaN;
  if (!Number.isFinite(ft) || ft < 40 || ft > 400) {
    throw new IntakeError("Length could not be read as feet; correct it before drafting.");
  }
  return ft;
}

function draftFor(s: IntakeSubmission, reference: string): OpportunityRecord {
  const proposal = s.proposal;
  if (!proposal) throw new IntakeError("No masked public proposal.");
  const year = Number(/\d{4}/.exec(s.vessel.year)?.[0] ?? NaN);

  return buildDraftRecord({
    id: `intake-${s.id}`,
    slug: reference.toLowerCase(),
    publicReference: reference,
    nominalLengthFt: parseLengthFt(s.vessel.length),
    year: Number.isFinite(year) ? year : null,
    // A submitted vessel is treated as identifiable: the exact year stays
    // withheld until a reviewer approves a band.
    advertisedPublicly: true,
    currency: "USD",
    priceBand: null,
    type: proposal.type as YachtType,
    buildRegion: proposal.buildRegion as BuildRegion,
    locationPublic: proposal.locationPublic as CruisingArea,
    country: proposal.country,
    descriptionPublic: proposal.descriptionPublic,
    opportunityNotes: proposal.opportunityNotes,
    sellerSignalSource: `${s.source} submission ${s.id}; no seller position confirmed`,
  });
}

/** What the public record would show, for review. Needs no approval. */
export async function previewMaskedProfile(
  submissionId: string
): Promise<PublicOpportunity | null> {
  const s = await getSubmission(submissionId);
  if (!s?.proposal) return null;
  return previewPublicOpportunity(draftFor(s, s.omyReference ?? "OMY-PREVIEW"));
}

/**
 * The only way an intake submission becomes an `OpportunityRecord`: a DRAFT,
 * and only with an active MASKED_PUBLICATION approval, a reviewed proposal and
 * an issued OMY reference. It does not publish; a person adds it to the record
 * store and publishes deliberately.
 */
export async function promoteIntakeToDraft(
  submissionId: string,
  actor: string
): Promise<OpportunityRecord> {
  const s = await getSubmission(submissionId);
  if (!s) throw new IntakeError("Unknown submission.", 404);
  if (s.status !== "READY_FOR_PUBLICATION_REVIEW") {
    throw new IntakeError("Submission is not ready for publication review.");
  }
  if (!hasActiveApproval(s, "MASKED_PUBLICATION")) {
    throw new IntakeError("No active masked-publication approval.", 403);
  }
  if (!s.omyReference) throw new IntakeError("No OMY reference issued.");

  const draft = draftFor(s, s.omyReference);
  await mutate(submissionId, actor, (current) => ({
    next: current,
    action: "draft-generated",
    detail: `Draft ${s.omyReference} generated; not published`,
  }));
  return draft;
}
