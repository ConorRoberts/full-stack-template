export interface DecodedJwt {
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sid: string;
  sub: string;
}
