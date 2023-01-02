import { z } from "zod";

/**
 * Environment variables. This ensure that we can leverage autocomplete and type constraints on our environment variables.
 */
export const ENV = z
  .object({
    ENVIRONMENT: z.enum(["dev", "prod", "test"]),
    STAGE: z.enum(["dev", "prod"]),
    CLERK_API_KEY: z.string(),
    CLIENT_URL: z.string(),
  })
  .parse({
    /**
     * Equivalent to NODE_ENV
     */
    ENVIRONMENT: process.env.NODE_ENV,

    /**
     * The current stage. Allows for differentiating between dev and prod environments.
     */
    STAGE: process.env.STAGE,

    /**
     * Secret key used to authenticate with Clerk.
     */
    CLERK_API_KEY: process.env.CLERK_API_KEY,

    /**
     * The URL of the client app (within ./packages/client)
     */
    CLIENT_URL: process.env.CLIENT_URL,
  });
