import "./global.css";
import "maplibre-gl/dist/maplibre-gl.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
