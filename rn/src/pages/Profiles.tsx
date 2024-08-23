import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Config from 'react-native-config';
import tw from 'twrnc';
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

const ProfilesScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Profile | undefined>();

  useEffect(() => {
    setLoading(true);
    const fetchUserProfile = async () => {
      try {
        const users = await listProfiles();
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
    <View style={tw`flex-row mb-2`}>
      <Text style={tw`text-lg text-white italic pr-2`}>{item.user_id} |</Text>
      <Text style={tw`text-lg text-white italic pr-2`}>{item.name} |</Text>
      <Text style={tw`text-lg text-white italic`}>{item.bio}</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <LinearGradient
        colors={['#F44336', '#E91E63', '#FF4081']}
        style={tw`absolute w-full h-full`}
      />
      <Text style={tw`text-2xl mb-4`}>Profiles</Text>
      <FlatList
        data={data as unknown as Profile[]}
        keyExtractor={item => item.user_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProfilesScreen;
