import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  return new Response(
    JSON.stringify({
      token: req.headers.get("authorization"),
    }),
    { status: 200 }
  );
};

export const config = {
  runtime: "edge",
};

export default handler;
