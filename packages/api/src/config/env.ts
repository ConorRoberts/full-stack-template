import { z } from "zod";

/**
 * Environment variables. This ensure that we can leverage autocomplete and type constraints on our environment variables.
 */
export const ENV = z
  .object({
    ENVIRONMENT: z.enum(["dev", "prod", "test"]),
    STAGE: z.enum(["dev", "prod"]),
    JWKS_URL: z.string().url(),
  })
  .parse({
    /**
     * The current environment. Post-build environment will be "prod". In development, it will be "dev".
     */
    ENVIRONMENT: process.env.NODE_ENV,

    /**
     * The current stage. If set to "prod", we will be using production resources. If set to "dev", we will be using development resources.
     */
    STAGE: process.env.STAGE,

    /**
     * The link to a JSON Web Key Set (JWKS) that contains the public keys used to verify the JWT signature.
     */
    JWKS_URL: process.env.JWKS_URL,
  });
