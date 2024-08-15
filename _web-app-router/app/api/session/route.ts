import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const url = new URL(request.url);
  // @ts-ignore
  const sessionProperties = request.nextUrl.searchParams.get("token");
  const encodedToken = jwt.decode(sessionProperties);
  const { idToken, provider } = (encodedToken as jwt.JwtPayload).properties;

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

    cookies().set("user_info", JSON.stringify(userInfo), {
      httpOnly: false, // not accessible from server, but accessible from client-side JavaScript
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return NextResponse.redirect(`${url.origin}/`);
  }

  // If no token is found, return an unauthorized response
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
