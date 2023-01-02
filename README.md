# Full Stack App Template

## Getting Started

1. Register an application with [Clerk](https://clerk.dev) and get your API keys.
2. Run `pnpm install`
3. Supply environment varibles to packages `client`, `api`, and `prisma`.
   1. `client`: The schema for these variables can be found here `packages/client/config/clientEnv.ts`
   2. `api`: The schema for these variables can be found here `packages/api/config/env.ts`
   3. `prisma`: Just needs a `DATABASE_URL` environment variable. This is the connection string to your database.
