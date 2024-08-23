import React from 'react';
import {Text, View, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <LinearGradient
        colors={['#F44336', '#E91E63', '#FF4081']}
        style={tw`absolute w-full h-full`}
      />
      <Text style={tw`text-2xl mb-4`}>Home</Text>
      <Button
        title="Go to list of profiles"
        onPress={() =>
          // navigation.navigate('Profiles', {name: 'Jane'}) // specific
          navigation.navigate('Profiles')
        }
      />
    </View>
  );
};

export default HomeScreen;
