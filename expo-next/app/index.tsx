// import "expo-router/entry";
import React from "react";
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
