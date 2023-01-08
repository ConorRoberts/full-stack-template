import { PrismaClient } from "prisma/client/edge";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: String(process.env.DATABASE_URL),
    },
  },
});
