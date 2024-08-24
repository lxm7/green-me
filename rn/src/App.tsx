import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings} from 'react-native-fbsdk-next';

import ProfilesScreen from './pages/Profiles';
import HomeScreen from './pages/Home';

const Stack = createNativeStackNavigator();
// Settings.initializeSDK();

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
