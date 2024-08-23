import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Config from 'react-native-config';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Profile = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
};

type RootStackParamList = {
  Profiles: Profile[];
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profiles'>;

export async function listProfiles() {
  try {
    const res = await fetch(`${Config.API_URL}/profiles`);
    const profiles = await res.json();
    return profiles;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error; // Re-throw the error to handle it further up the call chain if needed
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfilesScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Profile | undefined>();

  useEffect(() => {
    setLoading(true);
    const fetchUserProfile = async () => {
      try {
        const users = await listProfiles();
        // const userProfile = users.find((user: any) => user.user_id === 'user1'); // Replace with logic to select the correct user
        setData(users);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  const renderItem: ListRenderItem<Profile> = ({item}) => (
    <View style={styles.content}>
      <Text style={styles.text}>{item.user_id} |</Text>
      <Text style={styles.text}>{item.name} |</Text>
      <Text style={styles.text}>{item.bio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F44336', '#E91E63', '#FF4081']}
        style={styles.gradient}
      />
      <Text>Profiles</Text>
      <FlatList
        data={data as unknown as Profile[]}
        keyExtractor={item => item.user_id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    paddingRight: 8,
    color: 'white',
    fontStyle: 'italic',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default ProfilesScreen;
