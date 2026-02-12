import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/signin");

  const [companies, documents] = await Promise.all([
    prisma.company.findMany({ where: { userId: session.user.id }, orderBy: { name: "asc" } }),
    prisma.document.findMany({ where: { userId: session.user.id }, take: 10, orderBy: { updatedAt: "desc" } })
  ]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="flex items-center justify-between rounded bg-white p-4 shadow">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your business identity and documents.</p>
        </div>
        <Link href="/editor" className="rounded bg-slate-900 px-4 py-2 text-sm text-white">Open Editor</Link>
      </header>

      <section className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-medium">Company setup</h2>
        {companies.length === 0 ? (
          <p className="text-slate-500">No company found. Create one in your seed/setup flow.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {companies.map((company) => (
              <li key={company.id} className="rounded border p-3">
                <p className="font-medium">{company.name}</p>
                <p className="text-sm text-slate-500">{company.email} • {company.phone}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-medium">Recent documents</h2>
        {documents.length === 0 ? (
          <p className="text-slate-500">No documents saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {documents.map((document) => (
              <li key={document.id} className="flex items-center justify-between rounded border p-3 text-sm">
                <span>{document.title}</span>
                <span className="text-slate-500">{new Date(document.updatedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
