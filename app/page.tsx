import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-5xl font-bold">LetterForge</h1>
      <p className="text-lg text-slate-600">A business letterhead engine with rich editing and PDF export.</p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="rounded bg-slate-900 px-5 py-3 text-white">Go to Dashboard</Link>
        <Link href="/editor" className="rounded border border-slate-300 px-5 py-3">Open Editor</Link>
      </div>
    </main>
  );
}
