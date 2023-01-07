import { importSPKI, jwtVerify } from "jose";
import { DecodedJwt } from "../types/DecodedJwt";

export const getValidatedJwt = async (token: string, { jwtKey }: { apiKey: string; jwtKey: string }) => {
  const publicKey = await importSPKI(
    "-----BEGIN PUBLIC KEY-----\n" + jwtKey.match(/.{1,64}/g)?.join("\n") + "\n-----END PUBLIC KEY-----",
    "RS256"
  );

  const {payload} = await jwtVerify(token, publicKey);

  // Wacky typecast because the JWT from Clerk is not the same format as the expected type returned by "jwtVerify"
  return payload as unknown as DecodedJwt;
};
