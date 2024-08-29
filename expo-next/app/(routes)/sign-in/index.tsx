import React from "react";
import { View, Text, StyleSheet } from "react-native";
import VideoBackground from "@/app/(routes)/sign-in/components/VideoBackground";

export default function App() {
  return (
    <View style={styles.container}>
      <VideoBackground />
      <Text style={styles.text1}>Background here where is it</Text>
      <Text style={styles.text2}>Background here where is it</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    color: "white",
    zIndex: 1,
  },
  text2: {
    color: "red",
    zIndex: 1,
  },
});
