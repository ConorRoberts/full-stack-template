import { createRemoteJWKSet } from "jose";

export const JWKS = (apiKey: string) =>
  createRemoteJWKSet(new URL("https://api.clerk.dev/v1/jwks"), {
    headers: { Authorization: `Bearer ${apiKey}` },
    cacheMaxAge: 60 * 5 * 1000, // 5 mins
  });
