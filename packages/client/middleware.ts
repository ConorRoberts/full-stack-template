import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handler = withClerkMiddleware(async (req: NextRequest) => {
  const { getToken } = getAuth(req);
  
  const headers = new Headers(req.headers);
  headers.set("authorization", `Bearer ${await getToken()}`);
  return NextResponse.next({ request: { headers } });
});

export const config = {
  runtime: "edge",
};

export default handler;
