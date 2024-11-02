import React, { useState } from "react";
import { Platform, View, Text, Pressable } from "react-native";
import { useSession } from "@hooks/useSession";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useGoogleSignIn } from "@hooks/useGoogleSignIn";

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
  const [user, setUser] = useState<User | undefined>(undefined);
  const { signIn } = useSession();

  const handleWebCredentialResponse = async (response: Response) => {
    if (!response || !response?.credential) return;
    const decoded: User = jwtDecode(response.credential);
    setUser({
      name: decoded.name,
      surname: undefined,
      photo: decoded.photo,
      email: decoded.email,
    });

    // Perform custom sign-in logic here (SST login, etc.)
    signIn(response.credential);
    router.replace("/search");
  };

  const { buttonDivRef } = useGoogleSignIn(handleWebCredentialResponse);

  const handleMobileSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user: googleUser, idToken } = await GoogleSignin.signIn();

      setUser({
        name: googleUser.name as string,
        email: googleUser.email,
        surname: googleUser.familyName || undefined,
        photo: googleUser.photo || undefined,
      });

      signIn(idToken);
      router.replace("/search");
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
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
            //className="bg-[#4285F4] rounded-lg py-3 px-6 flex-row items-center justify-center shadow-md shadow-black"
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
            <Text className="text-white text-base font-semibold">
              Sign in with Google
            </Text>
          </Pressable>
        )}
      </View>
    );
  }
};

export default GoogleSignIn;
