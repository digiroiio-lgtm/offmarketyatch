import { buildLlmsTxt } from "@/lib/llms";

// Built once at deploy time: the content only changes with a commit.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
