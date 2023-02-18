import { PrismaClient } from "prisma/client/edge";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { TRPCError, inferAsyncReturnType } from "@trpc/server";
import { User } from "~/types/User";
import { getAuthEdge } from "@clerk/nextjs/dist/server/getAuthEdge";

/**
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;

  const auth = getAuthEdge(req)

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: String(process.env.DATABASE_URL),
      },
    },
  });

  let user: User | null = null;
  const userId = auth.userId;

  if (userId) {
    user = {
      id: userId,
    };
  } else {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
  }

  return {
    prisma,
    user,
    req,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
