"use server";

import DOMPurify from "isomorphic-dompurify";
import OpenAI from "openai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const documentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  companyId: z.string().min(1),
  templateId: z.string().min(1),
  contentJson: z.unknown()
});

export async function saveDocumentAction(input: z.infer<typeof documentSchema>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const parsed = documentSchema.parse(input);
  const asString = JSON.stringify(parsed.contentJson);
  const sanitized = JSON.parse(DOMPurify.sanitize(asString));

  if (parsed.id) {
    const existing = await prisma.document.findFirst({ where: { id: parsed.id, userId: session.user.id } });
    if (!existing) throw new Error("Document not found");

    return prisma.document.update({
      where: { id: parsed.id },
      data: {
        title: parsed.title,
        companyId: parsed.companyId,
        templateId: parsed.templateId,
        contentJson: sanitized
      }
    });
  }

  return prisma.document.create({
    data: {
      userId: session.user.id,
      title: parsed.title,
      companyId: parsed.companyId,
      templateId: parsed.templateId,
      contentJson: sanitized
    }
  });
}

export async function generateWithAiAction(prompt: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const cleanPrompt = z.string().min(5).max(600).parse(prompt);
  const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `Write a formal business letter in clean paragraphs. User request: ${cleanPrompt}`
  });

  return response.output_text;
}
