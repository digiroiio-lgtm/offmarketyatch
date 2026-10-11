/**
 * Shared private-inventory intake types.
 *
 * Both intake sources feed one record shape. Nothing here is published: a
 * submission is private by default and every onward use (internal buyer
 * matching, masked public entry, identity disclosure) needs its own recorded
 * approval. This module is type-only and safe to import anywhere, but the
 * values it describes are private and live only on the server.
 */

export type IntakeSource = "OWNER_DIRECT" | "BROKER_PARTNER";

export type IntakeStatus =
  | "RECEIVED"
  | "VERIFICATION_PENDING"
  | "AUTHORITY_CONFIRMED"
  | "READY_FOR_PUBLICATION_REVIEW"
  | "REJECTED"
  | "WITHDRAWN";

export type ApprovalKind =
  | "INTERNAL_BUYER_MATCHING"
  | "MASKED_PUBLICATION"
  | "IDENTITY_DISCLOSURE";

export type RepresentationStatus =
  | "written-mandate-central-agent"
  | "written-co-brokerage"
  | "verbal-or-informal"
  | "introducing-without-mandate";

export interface IntakeVessel {
  type: string;
  length: string;
  year: string;
  builder: string;
  location: string;
  valueExpectation: string;
  timeline: string;
}

export interface IntakeSubmitter {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  role: string | null;
  website: string | null;
  licence: string | null;
  jurisdictions: string | null;
}

/** What a broker says about their authority. Claims, not evidence. */
export interface BrokerClaims {
  representation: RepresentationStatus;
  canSupplyMandateEvidence: boolean;
  /** Permissions the broker asks for. Requests only; none is a grant. */
  requestedPermissions: ApprovalKind[];
  attestedAuthority: boolean;
  coBrokerageAcknowledged: boolean;
}

export interface AutoCheck {
  key: string;
  passed: boolean;
  detail: string;
}

export type BrokerVerificationStatus = "NOT_APPLICABLE" | "PENDING" | "VERIFIED" | "REJECTED";

export interface BrokerVerification {
  status: BrokerVerificationStatus;
  autoChecks: AutoCheck[];
  verifiedBy: string | null;
  verifiedAt: string | null;
  note: string | null;
}

export interface Approval {
  id: string;
  kind: ApprovalKind;
  state: "granted" | "revoked";
  grantedBy: string;
  grantedAt: string;
  /** What the reviewer saw: a document, call or message, not a conclusion. */
  evidence: string;
  /** Identity disclosure only: the qualified buyer inquiry it is limited to. */
  scope: string | null;
  revokedBy: string | null;
  revokedAt: string | null;
}

export interface AuditEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

/**
 * Admin-authored, allow-listed proposal for a masked public entry. It is
 * reviewed and previewed but never published from here.
 */
export interface IntakeProposal {
  buildRegion: string;
  locationPublic: string;
  country: string;
  type: string;
  descriptionPublic: string;
  opportunityNotes: string;
}

export interface IntakeSubmission {
  id: string;
  source: IntakeSource;
  status: IntakeStatus;
  version: number;
  leadId: string;
  receivedAt: string;
  updatedAt: string;
  vessel: IntakeVessel;
  submitter: IntakeSubmitter;
  broker: BrokerClaims | null;
  verification: BrokerVerification;
  /** Recorded by a reviewer when authority to act is confirmed. */
  authorityEvidence: string | null;
  /** Assigned only when the submission reaches publication review. */
  omyReference: string | null;
  proposal: IntakeProposal | null;
  approvals: Approval[];
  audit: AuditEntry[];
}

export const INTAKE_STATUSES: IntakeStatus[] = [
  "RECEIVED",
  "VERIFICATION_PENDING",
  "AUTHORITY_CONFIRMED",
  "READY_FOR_PUBLICATION_REVIEW",
  "REJECTED",
  "WITHDRAWN",
];

export const APPROVAL_KINDS: ApprovalKind[] = [
  "INTERNAL_BUYER_MATCHING",
  "MASKED_PUBLICATION",
  "IDENTITY_DISCLOSURE",
];

/**
 * Keys of the `answers` map shared by the owner form, the broker form and the
 * server-side mapping, so the three cannot drift apart. The first seven are the
 * keys the existing owner form already sends.
 */
export const ANSWER_KEYS = {
  type: "Yacht type",
  length: "Length",
  year: "Year",
  builder: "Builder",
  location: "Current location",
  value: "Expected value",
  timeline: "Sale timeline",
  website: "Company website",
  role: "Role",
  licence: "Licence or membership",
  jurisdictions: "Jurisdictions",
  representation: "Representation",
  mandateEvidence: "Mandate evidence available",
  permissions: "Requested permissions",
  attested: "Authority attested",
  coBrokerage: "Co-brokerage acknowledged",
} as const;
