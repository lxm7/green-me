import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, View, Text } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";
// import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

import { useSession } from "../../hooks/useSession";

type Response = {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
};

type User = {
  name: string;
  email: string;
  surname?: string;
  photo?: string;
};

const GoogleSignIn = () => {
  const buttonDivRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const { signIn } = useSession();

  useEffect(() => {
    if (Platform.OS === "web") {
      // Load the Google Identity Services library for web
      scriptRef.current = document.createElement("script");
      scriptRef.current.src = "https://accounts.google.com/gsi/client";
      scriptRef.current.async = true;
      scriptRef.current.defer = true;
      document.body.appendChild(scriptRef.current);

      scriptRef.current.onload = () => {
        // @ts-ignore
        if (window.google && buttonDivRef.current) {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_APP_ID, // Replace with your Google Web client ID
            callback: handleWebCredentialResponse,
          });
          // @ts-ignore
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
  }, []);

  const handleWebCredentialResponse = async (response: Response) => {
    if (!response || !response?.credential) return null;
    const decoded: User = jwtDecode(response.credential);
    setUser({
      name: decoded.name,
      surname: undefined,
      photo: decoded.photo,
      email: decoded.email,
    });
    // TODO: create our own session from manual login.
    // TODO: create a way to unify either google/fb or manual login into our own SSO for SST
    // for now just set google's idToken
    signIn(response.credential);
    router.replace("/profiles");
  };

  const handleMobileSignIn = async () => {
    try {
      GoogleSignin.configure({
        // @ts-ignore TODO
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_ANDROID_APP_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_IOS_APP_ID,
        // to retrieve id_token as we do in the web auth
        offlineAccess: true,
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_APP_ID,
      });
      await GoogleSignin.hasPlayServices();
      const { user: googleUser, idToken } = await GoogleSignin.signIn();

      setUser({
        name: googleUser.name as string,
        email: googleUser.email,
        surname: googleUser.familyName || undefined,
        photo: googleUser.photo || undefined,
      });

      signIn(idToken);
      router.replace("/profiles");
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error("user cancelled the sign-in flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error("operation (e.g. sign-in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error("play services not available or outdated");
      } else {
        console.error({ error });
      }
    }
  };

  if (Platform.OS === "web") {
    return (
      <View>
        {user ? (
          <View>
            <Text>{user.name}</Text>
            {user.surname && <Text>{user.surname}</Text>}
            {user.photo && <Text>{user.photo}</Text>}
            <Text>{user.email}</Text>
          </View>
        ) : (
          <div
            role="button"
            ref={buttonDivRef}
            className="bg-[#4285F4] rounded-lg py-3 px-6 flex-row items-center justify-center shadow-md shadow-black"
          >
            <span className="text-white text-base font-semibold">
              Sign in with Google
            </span>
          </div>
        )}
      </View>
    );
  } else {
    return (
      <View>
        {user ? (
          <View>
            <Text>{user.name}</Text>
            {user.surname && <Text>{user.surname}</Text>}
            {user.photo && <Text>{user.photo}</Text>}
            <Text>{user.email}</Text>
          </View>
        ) : (
          <Pressable
            className="bg-[#4285F4] rounded-lg py-3 px-6 flex-row items-center justify-center shadow-md shadow-black"
            onPress={handleMobileSignIn}
          >
            {/* <Icon name="google" size={20} color="#FFF" style={styles.icon} /> */}
            <Text className="text-white text-base font-semibold">
              Sign in with Google
            </Text>
          </Pressable>
        )}

        {/* <Pressable
        title={'Login with Facebook'}
        onPress={() => {
          LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
              console.log({result});
              if (result.isCancelled) {
                console.log('Login Cancelled ' + JSON.stringify(result));
              } else {
                console.log(
                  'Login success with  permisssions: ' +
                    result.grantedPermissions!.toString(),
                );
                console.log('Login Success ' + result.toString());
              }
            },
            function (error) {
              console.log('Login failed with error: ' + error);
            },
          );
        }}
      /> */}
      </View>
    );
  }
};

export default GoogleSignIn;
