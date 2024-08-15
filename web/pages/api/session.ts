// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

type Data = {
  name: string;
};

// export default function handler(_, res) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function handler(
  req: NextApiRequest,
  res: any // NextApiResponse<Data | Error>
) {
  const [path, queryString] = req.url!.split("?token=");
  // If there is no query string, just return the original URL

  // if (!queryString) {
  //   return res
  //     .status(200)
  //     .json({ message: "No query string found", modifiedUrl: req.url });
  // }
  // Remove the 'token' parameter
  // queryParams.delete("token");
  const encodedToken = jwt.decode(queryString);
  const { idToken, provider } = (encodedToken as jwt.JwtPayload)?.properties;

  if (idToken) {
    let user;
    if (provider.includes("facebook")) {
      user = await fetch(
        `https://graph.facebook.com/me?fields=name,email&access_token=${idToken}`
      );
    }

    if (provider.includes("google")) {
      user = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
      );
    }

    const userInfo = await user!.json();

    setCookie(
      "user_info",
      JSON.stringify(userInfo),
      { req, res, maxAge: 60 * 60 * 24 }
      // , {
      //   httpOnly: false, // not accessible from server, but accessible from client-side JavaScript
      //   secure: process.env.NODE_ENV === "production",
      //   path: "/",
      //   maxAge: 3600, // 1 hour
      // }
    );

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const origin = `${protocol}://${host}`;
    console.log({ origin });
    return res.redirect(`${origin}`);
  }

  // If no token is found, return an unauthorized response
  return res.status(401); // .json({ error: "Unauthorized" });
}
