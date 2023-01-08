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
import { createContext } from "~/server/trpc/context";
import { mainRouter } from "~/server/trpc/router/mainRouter";

export const config = {
  runtime: 'edge', // this is a pre-requisite
  regions: ['iad1'], // only execute this function on iad1
};

const handler = async (request: Request): Promise<Response> => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: mainRouter,
    responseMeta: ({ errors }) => {
      return {
        status: 200,
      };
    },
    createContext,
  });
};

export default handler;
