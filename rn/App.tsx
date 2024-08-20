import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

let API_URL: string;

if (__DEV__) {
  API_URL = 'https://tmzid4yf4i.execute-api.us-east-1.amazonaws.com';
} else {
  API_URL = 'https://8id1ziyehc.execute-api.us-east-1.amazonaws.com';
}

export async function listProfiles() {
  try {
    const res = await fetch(`${API_URL}/profiles`);
    const profiles = await res.json();
    return profiles;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error; // Re-throw the error to handle it further up the call chain if needed
  }
}

function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    | {
        user_id: string;
        name?: string;
        email?: string;
      }
    | undefined
  >();

  useEffect(() => {
    setLoading(true);
    const fetchUserProfile = async () => {
      try {
        const users = await listProfiles();
        const userProfile = users.find((user: any) => user.user_id === 'user1'); // Replace with logic to select the correct user
        setData(userProfile);
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
  console.log({data});
  return (
    <View style={styles.content}>
      <Text style={styles.text}>{data?.user_id.trim()} |</Text>
      <Text style={styles.text}>{data?.name?.trim()} |</Text>
      <Text style={styles.text}>{data?.email?.trim()}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F44336', '#E91E63', '#FF4081']}
        style={styles.gradient}
      />
      <UserProfile />
    </View>
  );
}

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
