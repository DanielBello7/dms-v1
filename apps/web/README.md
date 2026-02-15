# Web (DMs frontend)

Vite + React 19 SPA with Tailwind CSS, React Query, Zustand, React Router, and shared monorepo packages.

## Stack

- **Vite** 7, **React** 19
- **Tailwind CSS** 4, **Radix UI**, **Motion**
- **React Query** (TanStack Query), **Zustand**, **React Hook Form**, **Zod**
- **Socket.IO** client, **Axios**
- **@repo/types**, **@repo/helpers**, **@repo/services** (workspace packages)

## Prerequisites

- Node.js ≥ 18
- pnpm (monorepo uses pnpm workspaces)

## Setup

From the **monorepo root**:

```bash
pnpm install
```

From `apps/web` (or root with filter):

```bash
# Development (Vite dev server, default port 3000)
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview

# Serve built output (e.g. in Docker)
pnpm run start
```

Or run everything from root:

```bash
pnpm dev          # runs api + web in dev
pnpm build        # builds all
```

## Environment variables

Create `.env` or `.env.production` (for production builds). Vite exposes only variables prefixed with `VITE_`.

| Variable | Description |
|----------|-------------|
| `VITE_NODE_ENV` | `development` or `production` |
| `VITE_APP_ADDRESS` | Public URL of the web app |
| `VITE_API_ADDRESS` | Backend API base URL (e.g. `http://localhost:3000` for dev) |
| `VITE_SECRET` | Optional app secret |

For production Docker, the Compose setup mounts `apps/web/.env.production` into the container.

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Vite dev server (host `0.0.0.0`, port 3000) |
| `build` | TypeScript build + Vite build → `dist/` |
| `preview` | Serve `dist/` with Vite preview |
| `start` | Serve `dist/` with `serve` (single-page app, port 3000) |
| `lint` | ESLint |
| `format` | Prettier |

## Docker

Production image is built from `Dockerfile.pro` (context is monorepo root). Compose service:

```yaml
web:
  build:
    context: .
    dockerfile: ./apps/web/Dockerfile.pro
  command: ["pnpm", "run", "start"]
  volumes:
    - ./apps/web/.env.production:/app/apps/web/.env.production
```

Ensure `apps/web/.env.production` exists before `docker compose up` so the app has the correct `VITE_*` values at build/runtime as needed.

## Monorepo

This app depends on:

- `@repo/types`
- `@repo/helpers`
- `@repo/services`

Build from repo root so these packages are built and linked correctly (`pnpm build` or `pnpm build:packages` then app build).
