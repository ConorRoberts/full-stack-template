import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello, world!";
  }),
});
