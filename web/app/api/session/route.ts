// /views/app/api/session/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  // if (token) {
  // In a real-world scenario, you would validate the token here
  // and possibly fetch user information from your backend or database.

  // Simulating fetching user information based on the token
  const user = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
  };

  // const userInfoResponse = await fetch(
  //   "https://www.googleapis.com/oauth2/v3/userinfo",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // if (!userInfoResponse.ok) {
  //   throw new Error(`HTTP error! status: ${userInfoResponse.status}`);
  // }

  // Return the user information as a JSON response
  return NextResponse.json(user, { status: 200 });
  // }

  // If no token is found, return an unauthorized response
  // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
