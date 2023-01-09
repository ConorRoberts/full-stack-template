import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
import SuperJSON from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure users are logged in. This is also useful to assert the "user" field as non-null.
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

/**
 * Protected procedure. Requires user to be logged in.
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
