"use client";
import { useEffect, useState } from "react";

type Session = {
  name: string;
  picture: string;
  email: string;
} | null;

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // const useSessionHookPage = useSession();
  const getSession = async () => {
    const token = localStorage.getItem("session");
    if (token) {
      const user = await getUserInfo(token);
      console.log(user);

      if (user) setSession(user);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSession();
    // console.log("useEffect", { useSessionHookPage });
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("session", token);
      window.location.replace(window.location.origin);
    }
  }, []);

  const signOut = async () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  const getUserInfo = async (session: string) => {
    try {
      // console.log("try getUserInfo", { useSessionHookPage });

      const response = await fetch(`http://localhost:3000/api/session`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      });
      console.log({ session });

      return await response.json();
    } catch (error) {
      // alert(error);
    }
  };

  if (loading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="container">Loading...</div>
        </div>
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="container">
          <h2>SST Auth Example</h2>
          {session ? (
            <div className="profile">
              <p>Welcome {session.name}!</p>
              <img
                src={session?.picture}
                style={{ borderRadius: "50%" }}
                width={100}
                height={100}
                alt=""
              />
              <p>{session.email}</p>
              <button onClick={signOut}>Sign out</button>
            </div>
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
