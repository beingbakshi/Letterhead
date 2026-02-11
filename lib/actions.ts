"use server";

import DOMPurify from "isomorphic-dompurify";
import OpenAI from "openai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const saveSchema = z.object({
  title: z.string().min(2),
  companyId: z.string(),
  contentJson: z.unknown(),
  templateId: z.string()
});

export async function saveDocumentAction(input: z.infer<typeof saveSchema>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const parsed = saveSchema.parse(input);

  const sanitized = JSON.parse(DOMPurify.sanitize(JSON.stringify(parsed.contentJson)));
  return prisma.document.create({
    data: {
      userId: session.user.id,
      companyId: parsed.companyId,
      title: parsed.title,
      contentJson: sanitized,
      templateId: parsed.templateId
    }
  });
}

export async function generateWithAiAction(prompt: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `Write formal business letter content. User prompt: ${prompt}`
  });

  return response.output_text;
}
