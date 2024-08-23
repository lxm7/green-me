import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

let API_URL: string;

if (__DEV__) {
  API_URL = 'https://tmzid4yf4i.execute-api.us-east-1.amazonaws.com';
} else {
  API_URL = 'https://8id1ziyehc.execute-api.us-east-1.amazonaws.com';
}

type Profile = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
};

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

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F44336', '#E91E63', '#FF4081']}
        style={styles.gradient}
      />
      <Text>Home</Text>
      <Button
        title="Go to list of profiles"
        onPress={() =>
          // navigation.navigate('Profiles', {name: 'Jane'}) // specific
          navigation.navigate('Profiles', {name: 'Jane'})
        }
      />
    </View>
  );
}

function ProfilesScreen({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    | {
        user_id: string;
        name?: string;
        bio?: string;
      }
    | undefined
  >();

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
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profiles" component={ProfilesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
