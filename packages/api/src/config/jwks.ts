import { createRemoteJWKSet } from "jose";

export const JWKS = createRemoteJWKSet(new URL("https://conorroberts.us.auth0.com/.well-known/jwks.json"), {
  cacheMaxAge: 60 * 5 * 1000, // 5 mins
});
