import "server-only";

import { neon } from "@neondatabase/serverless";

import type { AuditEntry, IntakeSubmission } from "./types";

/**
 * Storage seam for private intake records. Two adapters:
 *
 *  - Postgres (Neon), chosen when `DATABASE_URL` is set. Durable. Updates use
 *    optimistic concurrency on `version`, and each write is a single statement
 *    that inserts the audit event from the rows it changed, so history cannot
 *    diverge from state.
 *  - In-memory, used otherwise. NOT durable: it exists so development and the
 *    end-to-end test run without a database, and `INTAKE_STORE_DURABLE` lets
 *    the admin screen say so.
 */

export interface IntakeStore {
  /** Fails if the lead already has a submission, so a retry cannot duplicate it. */
  create(submission: IntakeSubmission, event: AuditEntry): Promise<void>;
  /** Replaces the record only if `expectedVersion` still matches. */
  update(
    submission: IntakeSubmission,
    expectedVersion: number,
    event: AuditEntry
  ): Promise<boolean>;
  get(id: string): Promise<IntakeSubmission | null>;
  getByLead(leadId: string): Promise<IntakeSubmission | null>;
  list(limit: number): Promise<IntakeSubmission[]>;
}

export const INTAKE_STORE_DURABLE = Boolean(process.env.DATABASE_URL);

// ─── In-memory ───────────────────────────────────────────────────────────────

const globalStore = globalThis as unknown as { __omyIntake?: Map<string, IntakeSubmission> };

function memoryStore(): IntakeStore {
  const records: Map<string, IntakeSubmission> = (globalStore.__omyIntake ??= new Map());
  const clone = <T>(value: T): T => structuredClone(value);

  return {
    async create(submission) {
      for (const existing of records.values()) {
        if (existing.leadId === submission.leadId) throw new Error("duplicate_lead");
      }
      records.set(submission.id, clone(submission));
    },
    async update(submission, expectedVersion) {
      const current = records.get(submission.id);
      if (!current || current.version !== expectedVersion) return false;
      records.set(submission.id, clone({ ...submission, version: expectedVersion + 1 }));
      return true;
    },
    async get(id) {
      const found = records.get(id);
      return found ? clone(found) : null;
    },
    async getByLead(leadId) {
      for (const record of records.values()) {
        if (record.leadId === leadId) return clone(record);
      }
      return null;
    },
    async list(limit) {
      return [...records.values()]
        .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
        .slice(0, limit)
        .map(clone);
    },
  };
}

// ─── Postgres (Neon) ─────────────────────────────────────────────────────────

function postgresStore(url: string): IntakeStore {
  const sql = neon(url);

  return {
    async create(submission, event) {
      // One statement, so the record and its first history row land together.
      await sql.query(
        `WITH created AS (
           INSERT INTO intake_submission (id, source, status, lead_id, version, received_at, updated_at, doc)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
         )
         INSERT INTO intake_event (submission_id, at, actor, action, detail)
         SELECT id, $9, $10, $11, $12 FROM created`,
        [
          submission.id,
          submission.source,
          submission.status,
          submission.leadId,
          submission.version,
          submission.receivedAt,
          submission.updatedAt,
          JSON.stringify(submission),
          event.at,
          event.actor,
          event.action,
          event.detail,
        ]
      );
    },

    async update(submission, expectedVersion, event) {
      const next = { ...submission, version: expectedVersion + 1 };
      // One statement: the history row is inserted only from the rows the
      // UPDATE actually changed, so a lost race (stale version) writes nothing.
      const rows = (await sql.query(
        `WITH changed AS (
           UPDATE intake_submission
              SET status = $2, version = $3, updated_at = $4, doc = $5
            WHERE id = $1 AND version = $6
        RETURNING id
         )
         INSERT INTO intake_event (submission_id, at, actor, action, detail)
         SELECT id, $7, $8, $9, $10 FROM changed
         RETURNING submission_id`,
        [
          next.id,
          next.status,
          next.version,
          next.updatedAt,
          JSON.stringify(next),
          expectedVersion,
          event.at,
          event.actor,
          event.action,
          event.detail,
        ]
      )) as unknown[];
      return rows.length === 1;
    },

    async get(id) {
      const rows = (await sql.query("SELECT doc FROM intake_submission WHERE id = $1", [
        id,
      ])) as { doc: IntakeSubmission }[];
      return rows[0]?.doc ?? null;
    },

    async getByLead(leadId) {
      const rows = (await sql.query("SELECT doc FROM intake_submission WHERE lead_id = $1", [
        leadId,
      ])) as { doc: IntakeSubmission }[];
      return rows[0]?.doc ?? null;
    },

    async list(limit) {
      const rows = (await sql.query(
        "SELECT doc FROM intake_submission ORDER BY received_at DESC LIMIT $1",
        [limit]
      )) as { doc: IntakeSubmission }[];
      return rows.map((row) => row.doc);
    },
  };
}

let cached: IntakeStore | null = null;

export function getIntakeStore(): IntakeStore {
  if (!cached) {
    const url = process.env.DATABASE_URL;
    cached = url ? postgresStore(url) : memoryStore();
  }
  return cached;
}
