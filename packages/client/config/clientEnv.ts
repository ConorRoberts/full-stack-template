import { z } from "zod";

export const CLIENT_ENV = z
  .object({
    STAGE: z.enum(["dev", "prod"]),
    ENVIRONMENT: z.enum(["development", "production", "test"]),
    CLERK_FRONTEND_API: z.string(),
  })
  .parse({
    /**
     * Equivalent to NODE_ENV
     */
    ENVIRONMENT: process.env.NODE_ENV,

    /**
     * The current stage. Allows for differentiating between dev and prod environments.
     */
    STAGE: process.env.NEXT_PUBLIC_STAGE,

    /**
     * Clerk frontend API URL.
     */
    CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
  });
