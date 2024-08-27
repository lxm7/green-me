import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getCookie } from "cookies-next";

export async function getUserInfo() {
  if (Platform.OS === "web") {
    const userInfoString = getCookie("user_info");
    if (userInfoString) {
      return JSON.parse(userInfoString as string);
    }
  } else {
    const userInfoString = await SecureStore.getItemAsync("user_info");
    if (userInfoString) {
      return JSON.parse(userInfoString);
    }
  }
  return null;
}
