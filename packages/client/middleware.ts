import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handler = withClerkMiddleware(async (req: NextRequest) => {
  const { getToken } = getAuth(req);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Authorization", `Bearer ${await getToken()}`);
  
  return NextResponse.rewrite(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}/trpc/${req.nextUrl.pathname.split("/").slice(-1)[0]}`),
    {
      request: {
        headers: requestHeaders,
      },
    }
  );
});

export const config = { matcher: "/api/trpc/:path*" };

export default handler;
