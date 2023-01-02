import { createRemoteJWKSet } from "jose";
import { ENV } from "./env";

export const JWKS = createRemoteJWKSet(new URL(ENV.JWKS_URL))