-- Private inventory intake (owner and broker submissions).
-- Idempotent: safe to run more than once. Applied by `npm run db:migrate`.

CREATE TABLE IF NOT EXISTS intake_submission (
  id          TEXT PRIMARY KEY,
  source      TEXT NOT NULL CHECK (source IN ('OWNER_DIRECT', 'BROKER_PARTNER')),
  status      TEXT NOT NULL,
  lead_id     TEXT NOT NULL UNIQUE,
  version     INTEGER NOT NULL DEFAULT 1,
  received_at TIMESTAMPTZ NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL,
  doc         JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS intake_submission_status_idx
  ON intake_submission (status, received_at DESC);

-- Append-only: rows are only ever inserted.
CREATE TABLE IF NOT EXISTS intake_event (
  id            BIGSERIAL PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES intake_submission (id),
  at            TIMESTAMPTZ NOT NULL,
  actor         TEXT NOT NULL,
  action        TEXT NOT NULL,
  detail        TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS intake_event_submission_idx
  ON intake_event (submission_id, at);
