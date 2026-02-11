import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 p-6 text-center">
      <h1 className="text-5xl font-bold">LetterForge</h1>
      <p className="max-w-3xl text-lg text-slate-600">
        Build professional letterheads, write polished business documents, and export PDFs with subscription-aware watermarking.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/auth/register" className="rounded bg-slate-900 px-5 py-3 text-white">Create account</Link>
        <Link href="/auth/signin" className="rounded border border-slate-300 px-5 py-3">Sign in</Link>
        <Link href="/editor" className="rounded border border-slate-300 px-5 py-3">Try editor</Link>
      </div>
    </main>
  );
}
