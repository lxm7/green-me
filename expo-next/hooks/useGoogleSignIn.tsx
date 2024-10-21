import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type Response = {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
};

export const useGoogleSignIn = (
  handleWebCredentialResponse: (response: Response) => Promise<void>,
) => {
  const buttonDivRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      // Load the Google Identity Services library for web
      scriptRef.current = document.createElement("script");
      scriptRef.current.src = "https://accounts.google.com/gsi/client";
      scriptRef.current.async = true;
      scriptRef.current.defer = true;
      document.body.appendChild(scriptRef.current);

      scriptRef.current.onload = () => {
        // @ts-expect-error window.google is not typed
        if (window.google && buttonDivRef.current) {
          // @ts-expect-error window.google is not typed
          window.google.accounts.id.initialize({
            client_id: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_APP_ID, // Replace with your Google Web client ID
            callback: handleWebCredentialResponse,
          });
          // @ts-expect-error window.google is not typed
          window.google.accounts.id.renderButton(buttonDivRef.current, {
            theme: "outline",
          });
        }
      };
      return () => {
        if (scriptRef.current) {
          document.body.removeChild(scriptRef.current);
        }
      };
    } else {
      // Configure Google Sign-In for mobile
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_ANDROID_APP_ID, // Replace with your Google Web client ID
        offlineAccess: true,
      });
    }
  }, [handleWebCredentialResponse]);

  return { buttonDivRef };
};
