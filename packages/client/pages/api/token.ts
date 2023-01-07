import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const { method } = req;
    const { accessToken: token } = await getAccessToken(req, res, {});

    console.log(token);
    
    if (method === "GET") {
      return res.status(200).json({ token });
    } else if (method === "POST") {
      return res.status(201).json({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default handler;
