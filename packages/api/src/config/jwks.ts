import { createRemoteJWKSet } from "jose";
import { ENV } from "./env";

export const JWKS = createRemoteJWKSet(new URL("https://api.clerk.dev/v1/jwks"), {
  headers: { Authorization: `Bearer ${ENV.CLERK_API_KEY}` },
  cacheMaxAge: 60 * 5 * 1000, // 5 mins
});
