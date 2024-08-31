import React, { Suspense, lazy } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";

const ProfilesList = lazy(() => import("./List"));

export async function listProfiles() {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/profiles`);
    const profiles = await res.json();
    return profiles;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error; // Re-throw the error to handle it further up the call chain if needed
  }
}

const ProfilesScreen: React.FC<any> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiles</Text>
      <Suspense
        fallback={
          <View>
            <ActivityIndicator />
          </View>
        }
      >
        <ProfilesList list={listProfiles()} />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 24, // text-2xl
    marginBottom: 16, // mb-4
  },
});

export default ProfilesScreen;
