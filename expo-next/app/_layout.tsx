import "./global.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaView>
  );
}
