import { protectedProcedure, router } from "../trpc";

export const authRouter = router({
  getUser: protectedProcedure.query(({ ctx: { user } }) => {
    return user;
  }),
});
