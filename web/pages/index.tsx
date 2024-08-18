import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Inter } from "next/font/google";

import UserProfile from "@/component/UserProfile";

const inter = Inter({ subsets: ["latin"] });

type UserDetailsFromAuthProvider = {
  name: string;
  picture: string;
  email: string;
};

export default function Home() {
  const session = getCookie("user_info");
  const [user, setUser] = useState<UserDetailsFromAuthProvider | undefined>(
    undefined
  );

  useEffect(() => {
    setUser(session ? JSON.parse(session) : undefined);
  }, [session]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
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
    </main>
  );
}
