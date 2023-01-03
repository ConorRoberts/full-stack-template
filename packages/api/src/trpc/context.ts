import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { getValidatedJwt } from "../utils/getValidatedJwt";
import { type DecodedJwt } from "../types/DecodedJwt";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import cookie from "cookie";
import { PrismaClient } from "prisma";

const prisma = new PrismaClient();

/**
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateFastifyContextOptions) => {
  const { req, res } = opts;

  let user: DecodedJwt | null = null;

  if (req.headers.cookie) {
    const token = z.coerce.string().optional().parse(cookie.parse(req.headers.cookie)["__session"]);

    if (token) {
      try {
        user = await getValidatedJwt(token);
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      }
    }
  }

  return {
    prisma,
    user,
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
