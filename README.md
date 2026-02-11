# LetterForge – Digital Letterhead SaaS

LetterForge is a Vercel-first SaaS for creating branded business letters with reusable company letterheads, rich editing, AI generation, and PDF export.

## Core capabilities
- Next.js 14 App Router architecture (no separate backend service)
- NextAuth auth with email/password + Google
- Prisma schema for users/companies/documents/subscription plan metadata
- Tiptap editor with variables, table insertion, image/signature insertion, and page-break markers
- Six dynamic letterhead templates with adjustable logo size/margins + header/footer toggles
- PDF export with free-plan watermark support
- Vercel Blob upload endpoint for logos/signatures/images
- Stripe webhook plan upgrade flow
- Route protection + basic export rate limiting

## Tech stack
- Next.js 14 + TypeScript + TailwindCSS
- Tiptap
- Prisma + Postgres (Vercel Postgres or Supabase)
- NextAuth
- Stripe
- OpenAI API

## Routes
- `/` – landing page
- `/auth/register` – register
- `/auth/signin` – login
- `/dashboard` – company/doc listing
- `/editor` – letter editor workspace
- `/api/upload` – blob upload
- `/api/export` – export policy check
- `/api/ai` – AI generation
- `/api/stripe/webhook` – Stripe webhook

## Environment variables
See `.env.example` for required values.

## Local setup
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Vercel deployment
1. Push repository to GitHub.
2. Import into Vercel.
3. Configure environment variables.
4. Attach Vercel Postgres and Blob stores.
5. Run migrations.
6. Deploy.
