import { nanoid } from "nanoid";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const todoRouter = router({
  getAllTodos: protectedProcedure.query(async ({ ctx: { user, prisma } }) => {
    const todos = await prisma.todo.findMany({
      where: {
        createdBy: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos;
  }),
  createTodo: protectedProcedure.mutation(async ({ ctx: { user, prisma } }) => {
    const newTodo = await prisma.todo.create({
      data: {
        createdBy: user.id,
        title: `${nanoid()} New Todo`,
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
          createdBy: user.id,
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
          createdBy: user.id,
        },
        data: {
          creationLatency: latency,
        },
      });
    }),
});
