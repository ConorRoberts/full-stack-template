import { router } from "../trpc";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";

export const mainRouter = router({
  todo: todoRouter,
  auth: authRouter,
});

// export type definition of API
export type Router = typeof mainRouter;
