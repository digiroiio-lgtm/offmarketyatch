import { ANSWER_KEYS } from "./types.ts";
import type {
  ApprovalKind,
  BrokerClaims,
  IntakeSource,
  IntakeSubmitter,
  IntakeVessel,
  RepresentationStatus,
} from "./types.ts";

/**
 * Maps a validated lead (the existing single lead record) onto the shared
 * intake shape. Pure: it only reads the lead and decides which of the two
 * sources it belongs to.
 */

export interface LeadLike {
  id: string;
  kind: string;
  receivedAt: string;
  answers: Record<string, string>;
  contact: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
}

const REPRESENTATIONS: RepresentationStatus[] = [
  "written-mandate-central-agent",
  "written-co-brokerage",
  "verbal-or-informal",
  "introducing-without-mandate",
];

const PERMISSIONS: ApprovalKind[] = [
  "INTERNAL_BUYER_MATCHING",
  "MASKED_PUBLICATION",
  "IDENTITY_DISCLOSURE",
];

export const INTAKE_LEAD_KINDS = ["sell-side", "broker-submission"] as const;

export function intakeSourceFor(kind: string): IntakeSource | null {
  if (kind === "sell-side") return "OWNER_DIRECT";
  if (kind === "broker-submission") return "BROKER_PARTNER";
  return null;
}

function text(value: string | undefined, max = 300): string {
  return (value ?? "").trim().slice(0, max);
}

function nullable(value: string | undefined): string | null {
  const cleaned = text(value);
  return cleaned.length > 0 ? cleaned : null;
}

export function representationFromAnswer(value: string | undefined): RepresentationStatus {
  const found = REPRESENTATIONS.find((r) => r === value);
  // Anything unrecognised is treated as the weakest claim, never the strongest.
  return found ?? "introducing-without-mandate";
}

export function brokerClaimsFromAnswers(answers: Record<string, string>): BrokerClaims {
  const requested = (answers[ANSWER_KEYS.permissions] ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter((p): p is ApprovalKind => PERMISSIONS.includes(p as ApprovalKind));

  return {
    representation: representationFromAnswer(answers[ANSWER_KEYS.representation]),
    canSupplyMandateEvidence: answers[ANSWER_KEYS.mandateEvidence] === "yes",
    requestedPermissions: requested,
    attestedAuthority: answers[ANSWER_KEYS.attested] === "yes",
    coBrokerageAcknowledged: answers[ANSWER_KEYS.coBrokerage] === "yes",
  };
}

export function submitterFromLead(lead: LeadLike): IntakeSubmitter {
  const a = lead.answers;
  return {
    name: text(lead.contact.name, 120),
    email: text(lead.contact.email, 200),
    phone: text(lead.contact.phone, 60),
    company: nullable(lead.contact.company),
    role: nullable(a[ANSWER_KEYS.role]),
    website: nullable(a[ANSWER_KEYS.website]),
    licence: nullable(a[ANSWER_KEYS.licence]),
    jurisdictions: nullable(a[ANSWER_KEYS.jurisdictions]),
  };
}

export function vesselFromLead(lead: LeadLike): IntakeVessel {
  const a = lead.answers;
  return {
    type: text(a[ANSWER_KEYS.type], 60),
    length: text(a[ANSWER_KEYS.length], 40),
    year: text(a[ANSWER_KEYS.year], 20),
    builder: text(a[ANSWER_KEYS.builder], 120),
    location: text(a[ANSWER_KEYS.location], 160),
    valueExpectation: text(a[ANSWER_KEYS.value], 60),
    timeline: text(a[ANSWER_KEYS.timeline], 60),
  };
}
