import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useUserInfo } from "./hooks/useUserInfo";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   console.log({ document });
  //   if (document) ;
  //   const scriptTag = document.createElement("script");
  //   scriptTag.src = "https://accounts.google.com/gsi/client";
  //   scriptTag.async = true;
  //   scriptTag.onload = () => {
  //     setLoaded(true);
  //   };
  //   scriptTag.onerror = () => {
  //     console.error("Failed to load Google One-tap script");
  //   };

  //   document.body.appendChild(scriptTag);
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home page</Text>

      <Link href="/" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>
      <Link
        href={{
          pathname: "/profile/[id]",
          params: { id: "alex" },
        }}
      >
        Profile Alex
      </Link>
      <Link href="/profiles">profiles</Link>
      <View>
        {/* <Link
          href={`${process.env.EXPO_PUBLIC_API_URL}/auth/google/authorize`}
          rel="noreferrer"
        >
          <Text>Sign in with Google</Text>
        </Link>
        <Link
          href={`${process.env.EXPO_PUBLIC_API_URL}/auth/facebook/authorize`}
          rel="noreferrer"
        >
          <Text>Sign in with Facebook</Text>
        </Link> */}
        <Pressable
          // disabled={!loaded}
          onPress={() => {
            console.log(process.env);
            GoogleSignin.configure({
              iosClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_IOS_APP_ID,
              // @ts-ignore TODO
              androidClientId:
                process.env.EXPO_PUBLIC_GOOGLE_AUTH_ANDROID_APP_ID,
              // to retrieve id_token as we do in the web auth
              offlineAccess: true,
              webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_APP_ID,
            });
            GoogleSignin.hasPlayServices()
              .then((hasPlayService) => {
                if (hasPlayService) {
                  GoogleSignin.signIn()
                    .then((userInfo) => {
                      console.log(
                        "______GOOGLE SUCCESS",
                        JSON.stringify(userInfo)
                      );
                    })
                    .catch((e) => {
                      console.log("ERROR IS: " + JSON.stringify(e));
                    });
                }
              })
              .catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
              });
          }}
        >
          <Text>Sign in with Google</Text>
        </Pressable>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
