import { PrismaClient } from "prisma";
import { ENV } from "../config/env";

export const prisma = new PrismaClient({
  datasources: {
    db: { url: ENV.DATABASE_URL },
  },
});
