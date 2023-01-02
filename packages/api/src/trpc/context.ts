import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { getValidatedJwt } from "../utils/getValidatedJwt";
import { type DecodedJwt } from "../types/DecodedJwt";
import { TRPCError } from "@trpc/server";

/**
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateFastifyContextOptions) => {
  const { req, res } = opts;

  let user: DecodedJwt | null = null;

  if (req.headers.authorization) {
    try {
      user = await getValidatedJwt(req.headers.authorization.slice(7));
    } catch (error) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }
  }

  return {
    user,
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
