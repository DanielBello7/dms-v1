# builder
FROM node:20.13.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY ./turbo.json ./
COPY ./pnpm-workspace.yaml ./
COPY ./package.json ./
COPY ./packages/ ./packages/
COPY ./apps/web/ ./apps/web/

RUN pnpm install
RUN pnpm run build:packages

WORKDIR /app/apps/web

RUN pnpm install
RUN pnpm run build


# run
FROM node:20.13.1-alpine AS run

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/apps/web/dist ./apps/web/dist
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/web/vite.config.ts ./apps/web/vite.config.ts
COPY --from=builder /app/apps/web/tsconfig.json ./apps/web/tsconfig.json
COPY --from=builder /app/apps/web/tsconfig.node.json ./apps/web/tsconfig.node.json
COPY --from=builder /app/apps/web/tsconfig.app.json ./apps/web/tsconfig.app.json
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

RUN pnpm install --production

WORKDIR /app/apps/web

RUN pnpm install --only=production

EXPOSE 3000