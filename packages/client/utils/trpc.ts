import { httpLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type Router } from "../../api/src/index";
import { CLIENT_ENV } from "~/config/clientEnv";

export const trpc = createTRPCNext<Router>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpLink({
          url: `${CLIENT_ENV.WEBSITE_URL}/api/trpc`,
          headers: async () => {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering
              // If you're using Node 18, omit the "connection" header
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                connection: _connection,
                ...headers
              } = ctx.req.headers;
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                "x-ssr": "1",
              };
            }

            return {};
          },
        }),
      ],
    };
  },
  ssr: true,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<Router>;

/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<Router>;
