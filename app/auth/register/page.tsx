import bcrypt from "bcryptjs";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Create account</h1>
      <form
        action={async (formData) => {
          "use server";
          const email = String(formData.get("email") ?? "").trim().toLowerCase();
          const password = String(formData.get("password") ?? "");

          if (password.length < 8) throw new Error("Password must be at least 8 characters");
          const existing = await prisma.user.findUnique({ where: { email } });
          if (existing) throw new Error("Email already registered");

          const hash = await bcrypt.hash(password, 12);
          await prisma.user.create({ data: { email, password: hash } });
          redirect("/auth/signin");
        }}
        className="space-y-4"
      >
        <input name="email" type="email" required className="w-full rounded border p-2" placeholder="Email" />
        <input name="password" type="password" required minLength={8} className="w-full rounded border p-2" placeholder="Password" />
        <button className="w-full rounded bg-slate-900 p-2 text-white" type="submit">Create account</button>
      </form>
      <p className="mt-3 text-sm text-slate-500">Already have an account? <Link href="/auth/signin" className="underline">Sign in</Link></p>
    </main>
  );
}
