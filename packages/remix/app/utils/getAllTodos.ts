import { PrismaClient } from "prisma";

const getAllTodos = async ({ userId,prisma }: { userId: string,prisma:PrismaClient }) => {
  const todos = await prisma.todo.findMany({
    where: {
      createdBy: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return todos.map((e) => ({ ...e, createdAt: e.createdAt.toISOString(), updatedAt: e.updatedAt.toISOString() }));
};

export default getAllTodos;
