#!/usr/bin/env node
/**
 * Applies `db/intake.sql` to the database in `DATABASE_URL`. Idempotent.
 *
 *     DATABASE_URL=postgres://... npm run db:migrate
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(2);
}

const sql = neon(url);
const file = readFileSync(join(process.cwd(), "db", "intake.sql"), "utf8");
const statements = file
  .split(/;\s*(?:\n|$)/)
  .map((statement) =>
    statement
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n")
      .trim()
  )
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log(`ok: ${statement.split("\n")[0].slice(0, 70)}`);
}
console.log(`Applied ${statements.length} statement(s).`);
