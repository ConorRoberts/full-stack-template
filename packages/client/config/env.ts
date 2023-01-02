import { z } from "zod";

export const ENV = z
  .object({
    STAGE: z.enum(["dev", "prod"]),
    API_URL: z.string().url(),
    ENVIRONMENT: z.enum(["development", "production", "test"]),
    WEBSITE_URL: z.string().url(),
  })
  .parse({
    STAGE: process.env.NEXT_PUBLIC_STAGE,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ENVIRONMENT: process.env.NODE_ENV,
    WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  });
