import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
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
          navigation.navigate('Profiles')
        }
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

export default HomeScreen;
