import "./global.css";
import "maplibre-gl/dist/maplibre-gl.css";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { NAV_THEME } from "@lib/constants";
import { useInitializeColorScheme } from "@hooks/useInitializeColorScheme";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isColorSchemeLoaded, isDarkColorScheme } = useInitializeColorScheme();

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          {/* <StatusBar style={isDarkColorScheme ? "light" : "dark"}  */}
          <StatusBar />
          <Stack />
        </ThemeProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
