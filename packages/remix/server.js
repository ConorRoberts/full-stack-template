import { createEventHandler } from "@remix-run/cloudflare-workers";
import * as build from "@remix-run/dev/server-build";
import { PrismaClient } from "prisma/client/edge";

addEventListener(
  "fetch",
  createEventHandler({
    build,
    mode: process.env.NODE_ENV,
    getLoadContext: (event) => {
      return {
        prisma: new PrismaClient({
          datasources: {
            db: {
              url: DATABASE_URL,
            },
          },
        }),
      };
    },
  })
);

