import React, { Suspense, lazy } from "react";
import { Text, View, ActivityIndicator } from "react-native";

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

type Props = {};

const ProfilesScreen: React.FC<Props> = () => {
  return (
    <View className="flex-1 bg-white items-center">
      <Text className="text-2xl mb-4">Profiles</Text>
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

export default ProfilesScreen;
