import { router } from "../trpc";
import { authRouter } from "./authRouter";
import { exampleRouter } from "./example";

export const mainRouter = router({
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type Router = typeof mainRouter;
