# TripNest – Agent context

**What it is:** Full-stack React app (TanStack Start on Vite). SSR, type-safe API via tRPC, Postgres via Drizzle, auth via Clerk.

---

## Stack (concise)

| Layer      | Tech |
|-----------|------|
| Framework | TanStack Start (Vite), React 19 |
| Routing   | TanStack Router (file-based under `src/routes/`) |
| Data      | TanStack Query v5 + tRPC v11 (superjson), SSR integration via `setupRouterSsrQueryIntegration` |
| API       | tRPC router at `/api/trpc`; procedures in `src/integrations/trpc/router.ts` |
| DB        | Drizzle ORM, Postgres; schema `src/db/schema.ts`, config `drizzle.config.ts` |
| Auth      | Clerk (`@clerk/clerk-react`); provider in `src/integrations/clerk/provider.tsx`, keys in `.env` |
| UI        | Tailwind v4, path alias `@/` → `src/` |
| Tooling   | Biome (lint/format), pnpm, Vitest |

---

## Where things live

- **Routes:** `src/routes/` — file-based; `__root.tsx` is layout; API route for tRPC: `api.trpc.$.tsx` (GET/POST handler).
- **Router/context:** `src/router.tsx` — `getRouter()` builds router and injects `queryClient` + `trpc` from `src/integrations/tanstack-query/root-provider.tsx` (`getContext()`). Root expects `MyRouterContext` with `queryClient` and `trpc`.
- **tRPC:** Router: `src/integrations/trpc/router.ts`. Init: `src/integrations/trpc/init.ts`. React: `src/integrations/trpc/react.ts` — `useTRPC()` for type-safe client.
- **DB:** `src/db/schema.ts` (tables), `src/db/index.ts` (client). Migrations: `pnpm db:generate`, `pnpm db:push`, `pnpm db:studio`.
- **Clerk:** Wraps app in `__root.tsx`; components in `src/integrations/clerk/`.

---

## Conventions

- Use **Biome** for lint/format (`pnpm check`, `pnpm format`, `pnpm lint`). No ESLint/Prettier.
- **Path alias:** `@/` for `src/` (e.g. `@/integrations/trpc/router`).
- **New route:** Add file under `src/routes/`; route tree is generated.
- **New tRPC procedure:** Add to `trpcRouter` in `src/integrations/trpc/router.ts`; use `publicProcedure`, `z` for inputs.
- **New DB table:** Add to `src/db/schema.ts`, then `pnpm db:generate` and `pnpm db:push` (or migrate).
- **Demo/scratch:** Files under `src/routes/demo/` and prefixed with `demo` are safe to delete.

---

## Adding features / fixing bugs

- **New page:** New file in `src/routes/`; use route loaders or `useTRPC()` + TanStack Query as needed.
- **New API:** Extend `trpcRouter`; call from client via `useTRPC()`.
- **SSR/streaming:** Router is wired with `setupRouterSsrQueryIntegration`; ensure loaders or tRPC usage work under the same `queryClient`/`trpc` context from `getRouter()`.
- **Auth:** Clerk provider is at root; use Clerk hooks in components; env: `VITE_CLERK_PUBLISHABLE_KEY` (see `.env.example`).
- **Docker:** `docker compose up` runs app + Postgres; app does `pnpm db:push` on startup. Host is set for port mapping in `vite.config.ts`.
