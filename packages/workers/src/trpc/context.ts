import { type inferAsyncReturnType } from "@trpc/server";
import { getValidatedJwt } from "../utils/getValidatedJwt";
import { type DecodedJwt } from "../types/DecodedJwt";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "prisma/client/edge";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Env } from "..";
// import cookie from "cookie";

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
  // const cookieHeader = req.headers.get("cookie");

  if (authHeader) {
    // const token = cookie.parse(cookieHeader)["__session"];
    const token = authHeader.substring(7)

    if (token) {
      try {
        user = await getValidatedJwt(token, { apiKey: env.CLERK_API_KEY, jwtKey: env.CLERK_JWT_KEY });
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
