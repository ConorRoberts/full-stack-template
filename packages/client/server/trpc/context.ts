import { prisma } from "../prisma";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { inferAsyncReturnType } from "@trpc/server";
import { getServerAuthSession } from "../getServerAuthSession";

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession();
  console.log(session);

  return {
    session,
    req,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
