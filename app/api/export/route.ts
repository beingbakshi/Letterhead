import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!rateLimit(`export:${session.user.id}`, 20, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return Response.json({ error: "User missing" }, { status: 404 });

  const monthlyExports = await prisma.exportLog.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    }
  });

  if (user.plan === "FREE" && monthlyExports >= 3) {
    return Response.json({ error: "Free plan limit reached" }, { status: 402 });
  }

  await prisma.exportLog.create({ data: { userId: session.user.id } });
  return Response.json({ allowed: true, watermark: user.plan === "FREE" });
}
