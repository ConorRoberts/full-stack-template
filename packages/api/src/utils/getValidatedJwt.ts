import { jwtVerify } from "jose";
import { DecodedJwt } from "../types/DecodedJwt";
import { JWKS } from "../config/jwks";

export const getValidatedJwt = async (token: string) => {
  const { payload } = await jwtVerify(token, JWKS, { algorithms: ["RS256", "HS256"] });

  // Wacky typecast because the JWT from Clerk is not the same format as the expected type returned by "jwtVerify"
  return payload as unknown as DecodedJwt;
};
