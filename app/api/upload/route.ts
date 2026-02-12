import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "File required" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return Response.json({ error: "File too large" }, { status: 400 });
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) return Response.json({ error: "Invalid file type" }, { status: 400 });

  const blob = await put(`uploads/${session.user.id}/${file.name}`, file, { access: "public" });
  return Response.json({ url: blob.url });
}
