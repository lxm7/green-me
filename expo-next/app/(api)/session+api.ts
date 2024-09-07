// Example...Route handlers are executed in a sandboxed environment that is isolated from the client code.
// It means you can safely store sensitive data in the route handlers without exposing it to the client.

// API handler function for Expo/Next.js
export async function GET(request: Request, response: Response) {
  const [path, queryString] = request.url.split("?token=");

  if (!queryString) {
    return Response.json({ error: "No query string found" }, { status: 400 });
  }
  // If no token is found, return an unauthorized responseponse
  return Response.json({ error: "No query string found" }, { status: 401 });
}
