# API (DMs backend)

NestJS backend with REST API, WebSockets (Socket.IO), JWT auth, TypeORM (PostgreSQL), and optional integrations (email, Cloudinary, Winston logging).

## Stack

- **NestJS** 11, **TypeORM**, **PostgreSQL**
- **Passport** (JWT, local), **class-validator** / **class-transformer**
- **WebSockets** via `@nestjs/websockets` + Socket.IO
- **Winston** logging, **Helmet**, **compression**, **cookie-parser**

## Prerequisites

- Node.js ≥ 18
- PostgreSQL (local or remote)
- pnpm (monorepo uses pnpm workspaces)

## Setup

From the **monorepo root**:

```bash
pnpm install
```

From `apps/api` (or root with filter):

```bash
# Development
pnpm run start:dev

# Production build + run
pnpm run build
pnpm run start:prod
```

Or run everything from root:

```bash
pnpm dev          # runs api + web in dev
pnpm build        # builds all
```

## Environment variables

Copy `.env.example` to `.env` and set values. The app also supports `.env.development` for local overrides.

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | `development` or `production` |
| `PORT` | Server port (default `3000`) |
| `API_ADDRESS` | Public API base URL |
| `HASH` | bcrypt salt rounds (default `10`) |
| `ALLOWED_URLS` | Comma-separated CORS origins (e.g. `http://localhost:3000`) |
| **Database** | |
| `SQL_DATABASE_TYPE` | `postgres` |
| `SQL_DATABASE_HOST` | DB host |
| `SQL_DATABASE_PORT` | DB port (default `5432`) |
| `SQL_DATABASE_USERNAME` | DB user |
| `SQL_DATABASE_PASSWORD` | DB password |
| `SQL_DATABASE_NAME` | DB name |
| `SQL_DATABASE_URI` | Full connection URI (alternative to above) |
| `SQL_SSL_MODE` | `true` / `false` |
| `SQL_SSL_TYPE` | `light` / `heavy` (when SSL enabled) |
| `SQL_DATABASE_CA_CERT` | Path to CA cert (e.g. for `heavy` SSL) |
| **Auth** | |
| `JWT_SECRET` | Secret for JWT signing |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| **Email / Cloudinary / Logs** | |
| `APP_EMAIL`, `APP_EMAIL_NAME`, `EMAIL_API_KEY` | Email provider config |
| `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` | Cloudinary (optional) |
| `LOG_PATH` | Winston log directory |

## Scripts

| Script | Description |
|--------|-------------|
| `start` | Start app (default dev) |
| `start:dev` | Start with watch mode |
| `start:prod` | Run built `dist/main.js` |
| `build` | Nest build → `dist/` |
| `lint` | ESLint |
| `format` | Prettier |
| `test` | Jest unit tests |
| `test:e2e` | E2E tests |
| `typeorm` | TypeORM CLI |

## Docker

Production image is built from `Dockerfile.pro` (context is monorepo root). Compose service:

```yaml
api:
  build:
    context: .
    dockerfile: ./apps/api/Dockerfile.pro
  command: ["pnpm", "run", "start"]
  volumes:
    - ./apps/api/.env:/app/apps/api/.env
```

Ensure `apps/api/.env` exists before `docker compose up`.

## Monorepo

This app depends on:

- `@repo/types` (workspace)

Internal libs (e.g. `@app/constants`, `@app/logger`, `@app/winston`) live under `apps/api/libs/`. Build from repo root so workspace packages and libs resolve correctly.
