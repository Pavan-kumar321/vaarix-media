# Vaarix Media

A single-page marketing site for Vaarix Media, a restaurant/local-business creative agency, with a real lead-capture form that stores submissions in Postgres.

## Run & Operate

- `pnpm --filter @workspace/vaarix-media run dev` — run the marketing site (frontend)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/vaarix-media` — the marketing site (react-vite artifact, previewPath `/`)
- `artifacts/api-server` — the Express API (`POST /api/leads` stores form submissions)
- `lib/db/src/schema/leads.ts` — `leads` table (Drizzle schema)
- `lib/api-spec/openapi.yaml` — source of truth for the `/leads` API contract; run codegen after editing

## Architecture decisions

- Lead capture is a real, persisted flow: the contact form POSTs through the generated `useCreateLead` hook to `/api/leads`, validated with the generated Zod schema, and inserted into Postgres — no mock data.
- No admin/list endpoint for leads exists yet since no admin UI was requested; add one if that need arises.

## Product

- Single-page scrolling marketing site: hero → services → portfolio → results → testimonials → lead form → final CTA.
- Lead form fields: full name, business name, phone, email, optional website/Instagram, monthly budget (dropdown), services interested (multi-select), message.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
