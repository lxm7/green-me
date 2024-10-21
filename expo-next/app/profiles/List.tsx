import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from "react-native";

type Profile = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
};

type Props = {
  list: Profile[];
};

const renderItem: ListRenderItem<Profile> = ({ item }) => (
  <View className="flex-row mb-2">
    <Text className="text-lg text-black italic pr-2">{item.user_id} |</Text>
    <Text className="text-lg text-black italic pr-2">{item.name} |</Text>
    <Text className="text-lg text-black italic">{item.bio}</Text>
  </View>
);

const ProfilesList: React.FC<Props> = ({ list }) => {
  if (!list) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      keyExtractor={(item) => item.user_id}
      data={list}
      renderItem={renderItem}
    />
  );
};

export default ProfilesList;
