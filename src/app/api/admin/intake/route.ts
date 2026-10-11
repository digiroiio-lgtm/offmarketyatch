import { NextResponse } from "next/server";

import { checkAdminAuth, sameOrigin } from "@/lib/admin-auth";
import {
  IntakeError,
  grantApproval,
  promoteIntakeToDraft,
  revokeApproval,
  saveProposal,
  setStatus,
  verifyBroker,
} from "@/lib/intake/service";
import { APPROVAL_KINDS, INTAKE_STATUSES } from "@/lib/intake/types";
import type { ApprovalKind, IntakeProposal, IntakeStatus } from "@/lib/intake/types";

/**
 * Intake review actions. Lives under `/api/admin`, which the proxy matcher does
 * not cover, so it enforces the credentials itself, and it requires a
 * same-origin request because the browser sends Basic credentials automatically.
 * Every action goes through the service, which enforces the rules and writes
 * the audit entry. Nothing here can publish.
 */
export const dynamic = "force-dynamic";

const str = (value: unknown, max = 2000): string =>
  typeof value === "string" ? value.slice(0, max) : "";

export async function POST(request: Request) {
  if (checkAdminAuth(request.headers.get("authorization")) !== "ok") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Cross-origin request refused." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const actor = `admin:${process.env.ADMIN_USER ?? "unknown"}`;
  const id = str(body.id, 80);
  if (!id) return NextResponse.json({ ok: false, error: "Missing submission." }, { status: 422 });

  try {
    switch (body.action) {
      case "status": {
        const status = str(body.status, 60) as IntakeStatus;
        if (!INTAKE_STATUSES.includes(status)) throw new IntakeError("Unknown status.");
        const evidence = str(body.evidence) || null;
        await setStatus(id, actor, status, evidence);
        return NextResponse.json({ ok: true });
      }
      case "verify-broker": {
        const outcome = body.outcome === "REJECTED" ? "REJECTED" : "VERIFIED";
        await verifyBroker(id, actor, outcome, str(body.note));
        return NextResponse.json({ ok: true });
      }
      case "proposal": {
        const p = (body.proposal ?? {}) as Record<string, unknown>;
        const proposal: IntakeProposal = {
          type: str(p.type, 40),
          buildRegion: str(p.buildRegion, 60),
          locationPublic: str(p.locationPublic, 60),
          country: str(p.country, 80),
          descriptionPublic: str(p.descriptionPublic, 1200),
          opportunityNotes: str(p.opportunityNotes, 600),
        };
        await saveProposal(id, actor, proposal);
        return NextResponse.json({ ok: true });
      }
      case "grant": {
        const kind = str(body.kind, 40) as ApprovalKind;
        if (!APPROVAL_KINDS.includes(kind)) throw new IntakeError("Unknown approval kind.");
        await grantApproval(id, actor, kind, str(body.evidence), str(body.scope, 80) || null);
        return NextResponse.json({ ok: true });
      }
      case "revoke": {
        await revokeApproval(id, actor, str(body.approvalId, 80), str(body.reason));
        return NextResponse.json({ ok: true });
      }
      case "draft": {
        const draft = await promoteIntakeToDraft(id, actor);
        // A draft is allow-listed and masked; it is shown for a person to add
        // to the record store. It is not saved or published here.
        return NextResponse.json({ ok: true, draft });
      }
      default:
        return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 422 });
    }
  } catch (error) {
    if (error instanceof IntakeError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    }
    console.error(
      JSON.stringify({
        event: "admin_intake_error",
        message: error instanceof Error ? error.message : "unknown",
      })
    );
    return NextResponse.json({ ok: false, error: "Action failed." }, { status: 500 });
  }
}
