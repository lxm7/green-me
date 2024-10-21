import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { SplashScreen } from "expo-router";
import { useColorScheme } from "@lib/useColourScheme";

export const useInitializeColorScheme = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useEffect(() => {
    const initializeColorScheme = async () => {
      try {
        const theme = await AsyncStorage.getItem("theme");

        if (Platform.OS === "web") {
          // Adds the background color to the html element to prevent white background on overscroll.
          document.documentElement.classList.add("bg-background");
        }

        if (!theme) {
          await AsyncStorage.setItem("theme", colorScheme);
          setIsColorSchemeLoaded(true);
          return;
        }

        const colorTheme = theme === "dark" ? "dark" : "light";

        if (colorTheme !== colorScheme) {
          setColorScheme(colorTheme);
        }

        setIsColorSchemeLoaded(true);
      } catch (error) {
        console.error("Failed to initialize theme:", error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    initializeColorScheme();
  }, [colorScheme, setColorScheme]);

  return { isColorSchemeLoaded, isDarkColorScheme };
};
