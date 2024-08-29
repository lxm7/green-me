import React, { useState } from "react";
import { Link } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function App() {
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
      <Link href="/sign-in">Sign In</Link>

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
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
