import { z } from "zod";

export const CLIENT_ENV = z
  .object({
    STAGE: z.enum(["dev", "prod"]),
    API_URL: z.string().url(),
    ENVIRONMENT: z.enum(["development", "production", "test"]),
    WEBSITE_URL: z.string().url(),
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
     * URL of the API server (within the API folder)
     */
    API_URL: process.env.NEXT_PUBLIC_API_URL,

    /**
     * The URL at which this application is hosted
     */
    WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL ?? process.env.VERCEL_URL,

    /**
     * Clerk frontend API URL.
     */
    CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
  });
