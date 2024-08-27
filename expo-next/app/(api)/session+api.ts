// Universal imports
import jwt from "jsonwebtoken";
import { Platform } from "react-native";
// Web-specific imports
import { redirect } from "next/navigation";
import { serialize } from "cookie"; // Import cookie serialization utility

// React Native-specific imports
import * as SecureStore from "expo-secure-store";

// Route handlers are executed in a sandboxed environment that is isolated from the client code.
// It means you can safely store sensitive data in the route handlers without exposing it to the client.

// Abstract function to store user info
async function storeUserInfo(userInfo: string, headers: Headers) {
  const userInfoString = JSON.stringify(userInfo);

  if (Platform.OS === "web") {
    // For web, use cookies
    const cookie = serialize("user_info", userInfoString, {
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    headers.set("Set-Cookie", cookie);
  } else {
    // For React Native, use SecureStore
    await SecureStore.setItemAsync("user_info", JSON.stringify(userInfo));
  }
}

// API handler function (Next.js)
export async function GET(request: any, response: Response) {
  const [path, queryString] = request.url.split("?token=");

  if (!queryString) {
    return Response.json({ error: "No query string found" }, { status: 400 });
  }

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

    if (userInfo) {
      const headers = new Headers({
        Location: "/",
      });
      // Store user info using the appropriate method
      await storeUserInfo(userInfo, headers);
      return new Response(userInfo, {
        status: 302, // Use 301 for a permanent redirect
        headers: {
          Location: "/",
        },
      });

      // return Response.json(userInfo, { status: 200 });
    }
  }

  // If no token is found, return an unauthorized responseponse
  return Response.json({ error: "No query string found" }, { status: 401 });
}
