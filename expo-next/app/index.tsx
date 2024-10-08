import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from "@hooks/useSession";

export default function Home() {
  const { signOut } = useSession();
  return (
    <View>
      <Link href="/sign-in">Go to Signin</Link>
      <Link href="/search">Map</Link>
      <Text>Welcome to the Home Page</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          onPress={() => {
            // The `app/(routes)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );
}
