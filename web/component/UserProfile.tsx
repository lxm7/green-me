"use client";
import Button from "./Button";
import { useRouter } from "next/router";

type Props = {
  user: User;
};

type User = {
  name: string;
  picture: string;
  email: string;
};

const UserProfile = ({ user }: Props) => {
  const router = useRouter();

  const signOut = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <div className="profile">
      <p>Welcome {user.name}!</p>
      <img
        src={user?.picture}
        style={{ border: "1px solid grey", borderRadius: "50%" }}
        width={100}
        height={100}
        alt=""
      />
      <p>{user.email}</p>
      <Button onClick={signOut} />
    </div>
  );
};

export default UserProfile;
