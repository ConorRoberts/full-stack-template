import { ulid } from "ulid";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const todoRouter = router({
  getAllTodos: protectedProcedure.query(async ({ ctx: { user, prisma } }) => {
    const todos = await prisma.todo.findMany({
      where: {
        createdBy: user.sub,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos;
  }),
  createTodo: protectedProcedure
    .input(z.object({ createdAt: z.date().optional() }).optional().default({}))
    .mutation(async ({ ctx: { user, prisma }, input: { createdAt } }) => {
      const newTodo = await prisma.todo.create({
        data: {
          createdAt,
          createdBy: user.sub,
          title: `${ulid()} New Todo`,
          completed: false,
        },
      });

      return newTodo;
    }),
  deleteTodo: protectedProcedure
    .input(z.object({ todoId: z.number() }))
    .mutation(async ({ ctx: { user, prisma }, input }) => {
      const { todoId } = input;
      await prisma.todo.deleteMany({
        where: {
          id: todoId,
          createdBy: user.sub,
        },
      });
    }),
  reportLatency: protectedProcedure
    .input(z.object({ todoId: z.number(), latency: z.number() }))
    .mutation(async ({ ctx: { prisma, user }, input }) => {
      const { todoId, latency } = input;
      await prisma.todo.updateMany({
        where: {
          id: todoId,
          createdBy: user.sub,
        },
        data: {
          creationLatency: latency,
        },
      });
    }),
});