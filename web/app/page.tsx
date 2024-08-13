import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { UserProfile } from "@/app/_components/UserProfile";

export default function Home() {
  const session = cookies().get("user_info") as RequestCookie;
  const user = session?.value ? JSON.parse(session?.value) : null;

  // if (loading)
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
  //         <div className="container">Loading...</div>
  //       </div>
  //     </main>
  //   );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="container">
          <h2>SST Auth Example</h2>
          {user ? (
            <UserProfile user={user} />
          ) : (
            <div>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`}
                rel="noreferrer"
              >
                <button>Sign in with Google</button>
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook/authorize`}
                rel="noreferrer"
              >
                <button>Sign in with Facebook</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
