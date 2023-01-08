import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handler = withClerkMiddleware(async (req: NextRequest) => {
  const { userId } = getAuth(req);

  const requestHeaders = new Headers(req.headers);
  if (userId) {
    requestHeaders.set("x-clerk-user-id", userId);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export default handler;
