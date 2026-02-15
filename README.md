# v1 (DMs)

A pnpm + Turborepo monorepo containing a NestJS API, a Vite + React web app, and shared packages.

## Structure

```
v1/
├── apps/
│   ├── api/          # NestJS backend (REST + WebSockets)
│   └── web/          # Vite + React frontend
├── packages/
│   ├── eslint-config/    # Shared ESLint configs
│   ├── helpers/          # @repo/helpers – shared utilities
│   ├── services/         # @repo/services – shared API/client logic
│   ├── types/            # @repo/types – shared TypeScript types
│   └── typescript-config/ # Shared TypeScript configs
├── infra/            # Nginx, certbot, etc.
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Prerequisites

- **Node.js** ≥ 18
- **pnpm** 9.x (see `packageManager` in root `package.json`)

## Getting started

```bash
# Install dependencies (from repo root)
pnpm install

# Build all packages and apps
pnpm build

# Run all apps in development
pnpm dev
```

## Scripts (root)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run all apps in dev mode (Turbo) |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all workspaces |
| `pnpm format` | Format code with Prettier |
| `pnpm check-types` | Type-check all workspaces |
| `pnpm build:packages` | Build only `packages/*` (e.g. before app builds) |

## Apps

| App | Path | Stack |
|-----|------|--------|
| **API** | [`apps/api`](./apps/api) | NestJS, TypeORM, PostgreSQL, WebSockets |
| **Web** | [`apps/web`](./apps/web) | Vite, React 19, Tailwind, React Query, Zustand |

Each app has its own README with setup, env, and run instructions.

## Packages

Shared code used by the apps:

- **@repo/types** – Shared TypeScript types and DTOs
- **@repo/helpers** – Utilities (CJS + ESM)
- **@repo/services** – API client / service layer (CJS + ESM)
- **@repo/eslint-config** – ESLint configs (base, next-js, react-internal)
- **@repo/typescript-config** – Shared `tsconfig` bases

Build packages before or as part of a full build:

```bash
pnpm build:packages
# or
pnpm build
```

## Docker

The repo includes Docker Compose for running the API and web app in production-like mode, plus optional nginx and certbot services.

```bash
# Build and run (see docker-compose.yml for services)
docker compose up -d
```

- **web**: built from `apps/web/Dockerfile.pro`, runs `pnpm run start` (serves built frontend).
- **api**: built from `apps/api/Dockerfile.pro`, runs `pnpm run start`.

Create the required env files before running:

- `apps/web/.env.production` for the web app
- `apps/api/.env` for the API

See each app’s README for required variables.

## CI/CD

GitHub Actions workflows (under `.github/workflows/`) are set up for:

- **Tests**: build verification for frontend and backend on push (e.g. to `dev`).
- **Build & deploy**: build Docker images and deploy on tag push (when enabled).

Workflows may be commented out; uncomment and configure secrets as needed.

## License

Private / UNLICENSED (see root and app `package.json`).
