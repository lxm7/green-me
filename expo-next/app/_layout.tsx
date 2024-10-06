import "./global.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
