import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { useProfiles } from "@state/queries/useGetProfiles";
import ProfilesList from "./List";

type Props = {};

const ProfilesScreen: React.FC<Props> = () => {
  const { data, isLoading, error } = useProfiles();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profiles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Error loading profiles</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center">
      <Text className="text-2xl mb-4">Profiles</Text>
      <ProfilesList list={data} />
    </View>
  );
};

export default ProfilesScreen;
