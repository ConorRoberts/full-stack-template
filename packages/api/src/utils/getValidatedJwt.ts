import { jwtVerify } from "jose";
import { DecodedJwt } from "../types/DecodedJwt";
import { JWKS } from "../config/jwks";

export const getValidatedJwt = async (token: string) => {
  const { payload } = await jwtVerify(token, JWKS);

  return payload as DecodedJwt
};
