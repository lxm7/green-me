import React, { useEffect, useState } from "react";
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
  list: Promise<Profile[]>;
};

const ProfilesList: React.FC<Props> = ({ list }) => {
  const [profileList, setProfileList] = useState<Profile[] | null>(null);

  useEffect(() => {
    list.then(setProfileList);
  }, [list]);

  const renderItem: ListRenderItem<Profile> = ({ item }) => (
    <View className="flex-row mb-2">
      <Text className="text-lg text-black italic pr-2">{item.user_id} |</Text>
      <Text className="text-lg text-black italic pr-2">{item.name} |</Text>
      <Text className="text-lg text-black italic">{item.bio}</Text>
    </View>
  );

  if (!profileList) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={profileList}
      keyExtractor={(item) => item.user_id}
      renderItem={renderItem}
    />
  );
};

export default ProfilesList;
