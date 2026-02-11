import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/dashboard"
          });
        }}
        className="space-y-4"
      >
        <input name="email" type="email" required className="w-full rounded border p-2" placeholder="Email" />
        <input name="password" type="password" required className="w-full rounded border p-2" placeholder="Password" />
        <button className="w-full rounded bg-slate-900 p-2 text-white" type="submit">Sign in</button>
      </form>
    </main>
  );
}
