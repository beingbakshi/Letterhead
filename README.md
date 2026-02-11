# LetterForge – Digital Letterhead SaaS

Next.js 14 SaaS blueprint for a Vercel-hosted digital letterhead editor with templates, plan enforcement, uploads, and client-side PDF export.

## Stack
- Next.js 14 App Router + TypeScript + TailwindCSS
- Tiptap editor
- NextAuth (Credentials + Google)
- Prisma + Vercel Postgres
- Vercel Blob uploads
- Stripe webhook for plan upgrades
- Server Actions + API Routes

## Project structure
- `app/dashboard` – user dashboard
- `app/editor` – letterhead canvas/editor
- `app/api` – upload/export/auth/stripe APIs
- `components` – editor + template components
- `lib` – auth, prisma, rate limit, actions
- `prisma` – schema
- `types` – local shared typings

## Environment variables
Copy `.env.example` and fill required values.

## Local run
```bash
npm install
npx prisma generate
npm run dev
```

## Deployment (Vercel)
1. Push to GitHub.
2. Import project in Vercel.
3. Set env vars (`DATABASE_URL`, `NEXTAUTH_SECRET`, `STRIPE_SECRET`, `OPENAI_KEY`, etc.).
4. Connect Vercel Postgres + Blob.
5. Run Prisma migrations.
6. Deploy.
