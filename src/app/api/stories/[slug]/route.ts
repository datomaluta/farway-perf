import { stories } from "@/content/stories";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: RouteContext<"/api/stories/[slug]">) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) {
    return Response.json({ error: "Story not found" }, { status: 404 });
  }
  return Response.json(story, { headers: { "Cache-Control": "no-store" } });
}
