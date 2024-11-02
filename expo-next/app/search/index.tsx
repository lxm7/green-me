import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
// eslint-disable-next-line import/no-unresolved
import MapContainer from "@components/MapContainer";
import { useSession } from "@hooks/useSession";

function App() {
  const { signOut } = useSession();

  return (
    <View className="flex-1">
      <MapContainer />
      <View className="p-4 relative z-10">
        <Text
          onPress={() => {
            signOut();
            router.replace("/intro");
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );
}

export default App;
