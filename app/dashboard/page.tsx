import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/signin");

  const [companies, documents] = await Promise.all([
    prisma.company.findMany({ where: { userId: session.user.id } }),
    prisma.document.findMany({ where: { userId: session.user.id }, take: 10, orderBy: { updatedAt: "desc" } })
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Dashboard</h1>
      <section className="mb-8 rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-medium">Companies</h2>
        {companies.length === 0 ? <p className="text-slate-500">No companies yet.</p> : (
          <ul className="space-y-2">{companies.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
        )}
      </section>
      <section className="rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-medium">Recent Documents</h2>
        {documents.length === 0 ? <p className="text-slate-500">No documents yet.</p> : (
          <ul className="space-y-2">{documents.map((d) => <li key={d.id}>{d.title}</li>)}</ul>
        )}
      </section>
    </main>
  );
}
