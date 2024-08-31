import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSession } from "../../hooks/useSession";

type Profile = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
};

type RootStackParamList = {
  Profiles: Profile[];
};

type Props = NativeStackScreenProps<RootStackParamList, "Profiles">;

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

const ProfilesScreen: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Profile | undefined>();
  const { session } = useSession();
  console.log({ session });
  useEffect(() => {
    setLoading(true);
    const fetchUserProfile = async () => {
      try {
        const users = await listProfiles();
        setData(users);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItem: ListRenderItem<Profile> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTextWithPadding}>{item.user_id} |</Text>
      <Text style={styles.itemTextWithPadding}>{item.name} |</Text>
      <Text style={styles.itemText}>{item.bio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiles</Text>
      <FlatList
        data={data as unknown as Profile[]}
        keyExtractor={(item) => item.user_id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24, // text-2xl
    marginBottom: 16, // mb-4
  },
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

export default ProfilesScreen;
