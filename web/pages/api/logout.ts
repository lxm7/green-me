import type { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default async function handler(req: any, res: any) {
  deleteCookie("user_info", { req, res });
  // deleteCookie("user_info", { path: "/", domain: "http://localhost:3000/" });
  res.writeHead(302, { Location: "/" });
  res.end();
}
