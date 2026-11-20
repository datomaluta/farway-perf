import { stories } from "@/content/stories";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(stories, { headers: { "Cache-Control": "no-store" } });
}
