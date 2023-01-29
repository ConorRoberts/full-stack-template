import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";

export const mainRouter = router({
  todo: todoRouter,
  auth: authRouter,
  example: publicProcedure.input(z.object({ query: z.string() })).query(({ input: { query } }) => {
    return "Hello World ".concat(query);
  }),
});

// export type definition of API
export type Router = typeof mainRouter;
