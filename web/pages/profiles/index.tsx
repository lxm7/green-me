import { GetServerSideProps } from "next";
import { Profile } from "@shared/index";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles`);
  const profiles = await res.json();

  return { props: { profiles } };
};

type Props = {
  profiles: Profile[];
};

export default function Profiles({ profiles }: Props) {
  return (
    <div>
      <h1>Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.user_id}>
            {profile.name} - {profile.bio}
          </li>
        ))}
      </ul>
    </div>
  );
}
