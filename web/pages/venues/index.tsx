import { GetServerSideProps } from "next";
import { Venue } from "@shared/index";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues`);
  const venues = await res.json();

  return { props: { venues } };
};

type Props = {
  venues: Venue[];
};

export default function Venues({ venues }: Props) {
  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue.user_id}>
            {venue.name} - {venue.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
