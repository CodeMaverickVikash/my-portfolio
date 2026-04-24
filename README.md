# Portfolio Monorepo

This workspace is set up with:

- `apps/web`: Vite + React frontend
- `apps/api`: NestJS API using Prisma + PostgreSQL
- `packages/ui`: shared UI components
- `packages/shared`: shared constants and API helpers

## Local development

Install dependencies:

```sh
pnpm install
```

Run both apps:

```sh
pnpm dev
```

Default local URLs:

```sh
Frontend: http://localhost:3000
API:      http://localhost:3001/api
Health:   http://localhost:3001/api/health
```

The web app uses `/api` by default and Vite proxies that path to the local Nest server, so local frontend-to-API calls work without extra setup.

## Shared package usage

Shared constants and helpers live in `packages/shared` and can be imported from either app:

```ts
import { API_PREFIX, APP_NAME, getApiHealthUrl } from "@repo/shared";
```

## Vercel deployment

Deploy the frontend and API as two separate Vercel projects from the same repository.

### Frontend project

- Root Directory: `apps/web`
- Framework Preset: `Vite`
- Build Command: `pnpm build`
- Output Directory: `dist`
- Environment variable:

```sh
VITE_API_BASE_URL=https://your-api-project.vercel.app/api
```

### API project

- Root Directory: `apps/api`
- The included `vercel.json` routes all requests to the Nest serverless function in `api/index.ts`
- Environment variables:

```sh
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public
CLIENT_URL=https://your-frontend-project.vercel.app
```

You can provide multiple frontend origins in `CLIENT_URL` by separating them with commas.

## Useful commands

```sh
pnpm build
pnpm check-types
pnpm --filter web dev
pnpm --filter api dev
```
