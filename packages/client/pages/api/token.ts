import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  const { getToken } = getAuth(req);
  return new Response(
    JSON.stringify({
      token: await getToken(),
    }),
    { status: 200 }
  );
};

export const config = {
  runtime: "edge",
};

export default handler;
