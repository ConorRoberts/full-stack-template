/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { mainRouter } from "./trpc/router/mainRouter";
import { createContext } from "./trpc/context";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;

  CLERK_API_KEY: string;
  STAGE: "dev" | "prod";
  CLIENT_URL: string;
  DATABASE_URL: string;
  CLERK_JWT_KEY: string;
}

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
    const CORS_HEADERS = {
      "Access-Control-Allow-Origin": env.CLIENT_URL,
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization,Cookie",
      "Access-Control-Allow-Credentials": "true",
    };
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: mainRouter,
      responseMeta: ({ errors }) => {
        return {
          headers: {
            ...CORS_HEADERS,
          },
          status: 200,
        };
      },
      createContext: (opts) => createContext({ opts, env }),
    });
  },
};
