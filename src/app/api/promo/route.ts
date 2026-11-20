export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      text: "New: our winter issue on slow trains and quiet coasts is out now.",
      cta: "Read the issue",
      href: "/stories/the-alps-by-rail",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
