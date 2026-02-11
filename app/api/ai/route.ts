import { generateWithAiAction } from "@/lib/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const prompt = String(body.prompt ?? "");
  if (!prompt) return Response.json({ error: "Prompt required" }, { status: 400 });

  const text = await generateWithAiAction(prompt);
  return Response.json({ text });
}
