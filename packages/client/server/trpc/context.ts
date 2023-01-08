import { PrismaClient } from "prisma/client/edge";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { TRPCError, inferAsyncReturnType } from "@trpc/server";
import { User } from "~/types/User";

/**
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: String(process.env.DATABASE_URL),
      },
    },
  });

  let user: User | null = null;
  const userId = req.headers.get("x-clerk-user-id");

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
