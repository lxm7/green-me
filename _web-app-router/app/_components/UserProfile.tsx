import { cookies } from "next/headers";
import Button from "./Button";

type Props = {
  user: User;
};

type User = {
  name: string;
  picture: string;
  email: string;
};

export const UserProfile = ({ user }: Props) => {
  const signOut = async () => {
    "use server";
    cookies().delete("user_info");
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
