import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from "react-native";

type Profile = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
};

const ProfilesList: React.FC<any> = ({
  list,
}: {
  list: Promise<Profile[]>;
}) => {
  // Canary TODO: replace useState, useEffect and !profileList loader
  // with use() - https://www.youtube.com/watch?v=0tvfC9r9lcw
  const [profileList, setProfileList] = useState<Profile[] | null>(null);

  useEffect(() => {
    list.then(setProfileList);
  }, [list]);

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTextWithPadding}>{item.user_id} |</Text>
      <Text style={styles.itemTextWithPadding}>{item.name} |</Text>
      <Text style={styles.itemText}>{item.bio}</Text>
    </View>
  );

  if (!profileList) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={profileList as unknown as Profile[]}
      keyExtractor={(item) => item.user_id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row", // flex-row
    marginBottom: 8, // mb-2
  },
  itemText: {
    fontSize: 18, // text-lg
    color: "black",
    fontStyle: "italic",
  },
  itemTextWithPadding: {
    fontSize: 18, // text-lg
    color: "black",
    fontStyle: "italic",
    paddingRight: 8, // pr-2
  },
});

export default ProfilesList;
