import { Redirect } from "expo-router";
import { useSession } from "@hooks/useSession";

const Index = () => {
  const { session } = useSession();

  if (session) {
    return <Redirect href="/search" />;
  } else {
    return <Redirect href="/intro" />;
  }
};

export default Index;
