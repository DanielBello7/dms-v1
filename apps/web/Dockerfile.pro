# build
FROM node:20.13.1-alpine AS build

# install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# copy project contents
COPY ./turbo.json ./
COPY ./pnpm-workspace.yaml ./
COPY ./package.json ./
COPY ./.npmrc ./
COPY ./packages/ ./packages/
COPY ./apps/web/ ./apps/web/

# install project packages and build project internal packages
RUN pnpm install
RUN pnpm run build:packages

# change dir to app dir
WORKDIR /app/apps/web

# install api app packages and run the build for the web app
RUN pnpm install
RUN pnpm run build


# run
FROM node:20.13.1-alpine AS run

RUN npm install -g pnpm

WORKDIR /app

# copy project contents
COPY --from=build /app/turbo.json ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/package.json ./
COPY --from=build /app/.npmrc ./
COPY --from=build /app/packages ./packages

# copy api app contents
COPY --from=build /app/apps/web/dist ./apps/web/dist
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/apps/web/vite.config.ts ./apps/web/
COPY --from=build /app/apps/web/tsconfig.node.json ./apps/web/
COPY --from=build /app/apps/web/tsconfig.json ./apps/web/
COPY --from=build /app/apps/web/tsconfig.app.json ./apps/web/
COPY --from=build /app/apps/web/package.json ./apps/web/

RUN pnpm install --production

WORKDIR /app/apps/web

RUN pnpm install --only=production

EXPOSE 3000