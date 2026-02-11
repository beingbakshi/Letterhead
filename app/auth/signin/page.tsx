import Link from "next/link";
import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: String(formData.get("email") ?? "").toLowerCase(),
            password: formData.get("password"),
            redirectTo: "/dashboard"
          });
        }}
        className="space-y-4"
      >
        <input name="email" type="email" required className="w-full rounded border p-2" placeholder="Email" />
        <input name="password" type="password" required className="w-full rounded border p-2" placeholder="Password" />
        <button className="w-full rounded bg-slate-900 p-2 text-white" type="submit">Sign in with password</button>
      </form>

      <form
        className="mt-3"
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button className="w-full rounded border p-2" type="submit">Continue with Google</button>
      </form>

      <p className="mt-3 text-sm text-slate-500">No account yet? <Link href="/auth/register" className="underline">Create one</Link></p>
    </main>
  );
}
