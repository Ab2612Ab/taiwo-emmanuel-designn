# Vercel deployment

This project is configured for Vercel + TanStack Start + Nitro.

## Backend
- `POST /api/contact` validates and sends enquiries through Resend.
- `GET /api/health` is a deployment health check.
- Zod validation, same-origin protection, honeypot protection and basic per-instance rate limiting are included.
- Secrets stay server-side.

## Required Vercel environment variables
- `RESEND_API_KEY` — Resend API key.
- `CONTACT_FROM_EMAIL` — sender on a verified Resend domain, e.g. `Portfolio <hello@yourdomain.com>`.
- `CONTACT_TO_EMAIL` — receiving inbox. If omitted, the project uses `taiwoemmanuel693@gmail.com`.

Do not prefix secrets with `VITE_`.

## Deploy
1. Push the project to GitHub.
2. Import it into Vercel.
3. Keep framework detection as TanStack Start.
4. Add the environment variables above.
5. Deploy.
6. Test `/api/health` and submit the Contact form.

## Resend
Create a Resend account, verify your sending domain, create an API key, and add it to Vercel. For local testing, copy `.env.example` to `.env.local`; never commit real secrets.
