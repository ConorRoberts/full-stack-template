export type DecodedJwt = {
  sub: string;
  "cognito:groups": string[];
  iss: string;
  version: number;
  client_id: string;
  origin_jti: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
};
