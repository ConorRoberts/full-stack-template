import { type inferAsyncReturnType } from "@trpc/server";
import { getValidatedJwt } from "../utils/getValidatedJwt";
import { type DecodedJwt } from "../types/DecodedJwt";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "prisma/client/edge";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Env } from "..";

/**
 * @link https://trpc.io/docs/context
 **/
export const createContext = async ({ opts, env }: { opts: FetchCreateContextFnOptions; env: Env }) => {
  const { req } = opts;

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });

  let user: DecodedJwt | null = null;
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const token = String(authHeader.slice(7));

    if (token) {
      try {
        user = await getValidatedJwt(token, { apiKey: env.CLERK_API_KEY });
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      }
    }
  }

  return {
    prisma,
    user,
    req,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
