import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { getToken } = getAuth(req);

  try {
    if (method === "GET") {
      return res.status(200).json({ token: await getToken() });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
