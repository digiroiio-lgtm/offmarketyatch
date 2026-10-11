import type {
  ApprovalKind,
  AutoCheck,
  BrokerClaims,
  IntakeStatus,
  IntakeSubmission,
  IntakeSubmitter,
} from "./types";

/**
 * Pure intake rules: what a broker submission must contain, which automatic
 * checks run, which status moves are legal, and when an approval may be
 * granted. No storage and no I/O, so every gate is unit-testable.
 */

// ─── Broker submission ───────────────────────────────────────────────────────

const FREE_MAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
]);

function emailDomain(email: string): string {
  return email.split("@")[1]?.trim().toLowerCase() ?? "";
}

function websiteHost(website: string | null): string | null {
  if (!website) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

/** True when `host` is the email domain or a subdomain of it, or the reverse. */
function sameBusinessDomain(a: string, b: string): boolean {
  return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
}

export interface BrokerValidation {
  ok: boolean;
  /** Field the first problem belongs to, for form feedback. */
  field?: string;
  message?: string;
}

/** What a broker must supply before a submission is accepted at all. */
export function validateBrokerClaims(
  submitter: IntakeSubmitter,
  claims: BrokerClaims
): BrokerValidation {
  if (!submitter.company || submitter.company.length < 2) {
    return { ok: false, field: "company", message: "Please enter your brokerage or company." };
  }
  if (!submitter.licence || submitter.licence.length < 3) {
    return {
      ok: false,
      field: "licence",
      message: "Please enter your licence, association membership or registration.",
    };
  }
  if (!claims.attestedAuthority) {
    return {
      ok: false,
      field: "attestedAuthority",
      message: "Please confirm you are authorised to share this information.",
    };
  }
  if (!claims.coBrokerageAcknowledged) {
    return {
      ok: false,
      field: "coBrokerageAcknowledged",
      message: "Please acknowledge that terms are agreed in writing before any introduction.",
    };
  }
  return { ok: true };
}

/**
 * Automatic checks run at intake. They are signals for the reviewer, never a
 * verification: only a person can verify a broker.
 */
export function runAutoChecks(submitter: IntakeSubmitter, claims: BrokerClaims): AutoCheck[] {
  const domain = emailDomain(submitter.email);
  const host = websiteHost(submitter.website);
  const checks: AutoCheck[] = [
    {
      key: "business-email",
      passed: domain.length > 0 && !FREE_MAIL_DOMAINS.has(domain),
      detail: FREE_MAIL_DOMAINS.has(domain)
        ? `Free-mail domain (${domain})`
        : `Email domain ${domain || "missing"}`,
    },
    {
      key: "website-matches-email",
      passed: Boolean(host && domain && sameBusinessDomain(host, domain)),
      detail: host
        ? `Website ${host} vs email domain ${domain}`
        : "No usable company website supplied",
    },
    {
      key: "licence-supplied",
      passed: Boolean(submitter.licence && submitter.licence.length >= 3),
      detail: submitter.licence ? "Licence or membership stated (not checked)" : "Not supplied",
    },
    {
      key: "mandate-evidence-offered",
      passed: claims.canSupplyMandateEvidence,
      detail: claims.canSupplyMandateEvidence
        ? "Broker says mandate evidence can be supplied"
        : "Broker did not offer mandate evidence",
    },
    {
      key: "mandate-claimed",
      passed:
        claims.representation === "written-mandate-central-agent" ||
        claims.representation === "written-co-brokerage",
      detail: `Stated representation: ${claims.representation}`,
    },
  ];
  return checks;
}

// ─── Status moves ────────────────────────────────────────────────────────────

const TRANSITIONS: Record<IntakeStatus, IntakeStatus[]> = {
  RECEIVED: ["VERIFICATION_PENDING", "REJECTED", "WITHDRAWN"],
  VERIFICATION_PENDING: ["AUTHORITY_CONFIRMED", "REJECTED", "WITHDRAWN"],
  AUTHORITY_CONFIRMED: ["READY_FOR_PUBLICATION_REVIEW", "VERIFICATION_PENDING", "REJECTED", "WITHDRAWN"],
  READY_FOR_PUBLICATION_REVIEW: ["AUTHORITY_CONFIRMED", "REJECTED", "WITHDRAWN"],
  REJECTED: [],
  WITHDRAWN: [],
};

export interface Decision {
  ok: boolean;
  reason?: string;
}

const deny = (reason: string): Decision => ({ ok: false, reason });
const allow: Decision = { ok: true };

export function canMoveTo(
  submission: IntakeSubmission,
  next: IntakeStatus,
  evidence: string | null
): Decision {
  if (!TRANSITIONS[submission.status].includes(next)) {
    return deny(`Cannot move from ${submission.status} to ${next}`);
  }

  if (next === "AUTHORITY_CONFIRMED") {
    if (!evidence || evidence.trim().length < 10) {
      return deny("Authority evidence is required (what was seen, from whom, when)");
    }
    if (submission.source === "BROKER_PARTNER") {
      if (submission.verification.status !== "VERIFIED") {
        return deny("Broker must be verified first");
      }
      if (submission.broker?.representation === "introducing-without-mandate") {
        return deny("An introduction without a mandate cannot confirm authority");
      }
    }
  }

  if (next === "READY_FOR_PUBLICATION_REVIEW") {
    if (!submission.authorityEvidence) return deny("Authority has not been confirmed");
    if (!submission.proposal) return deny("No masked public proposal to review");
  }
  return allow;
}

// ─── Approvals ───────────────────────────────────────────────────────────────

export function hasActiveApproval(
  submission: IntakeSubmission,
  kind: ApprovalKind,
  scope: string | null = null
): boolean {
  return submission.approvals.some(
    (approval) =>
      approval.kind === kind &&
      approval.state === "granted" &&
      (kind !== "IDENTITY_DISCLOSURE" || approval.scope === scope)
  );
}

/**
 * Whether an approval may be recorded now. A grant is a statement by a
 * reviewer that evidence exists, so evidence text is mandatory, and the
 * submission must already have cleared the stage that earns the permission.
 */
export function canGrant(
  submission: IntakeSubmission,
  kind: ApprovalKind,
  evidence: string,
  scope: string | null
): Decision {
  if (submission.status === "REJECTED" || submission.status === "WITHDRAWN") {
    return deny(`Submission is ${submission.status}`);
  }
  if (!evidence || evidence.trim().length < 10) {
    return deny("Evidence is required (what was seen, from whom, when)");
  }
  if (hasActiveApproval(submission, kind, scope)) {
    return deny("Already granted");
  }

  if (!submission.authorityEvidence) {
    return deny("Authority has not been confirmed");
  }
  if (submission.source === "BROKER_PARTNER" && submission.verification.status !== "VERIFIED") {
    return deny("Broker must be verified first");
  }

  if (kind === "MASKED_PUBLICATION") {
    if (submission.status !== "READY_FOR_PUBLICATION_REVIEW") {
      return deny("Publication needs the submission to be ready for publication review");
    }
    if (!submission.proposal) return deny("No masked public proposal to approve");
  }

  if (kind === "IDENTITY_DISCLOSURE") {
    if (!scope || !/^LEAD-[A-Z0-9-]{6,}$/.test(scope)) {
      return deny("Identity disclosure is limited to one qualified buyer inquiry (lead id)");
    }
  }
  return allow;
}
