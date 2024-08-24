import React from 'react';
import {Text, View, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import Config from 'react-native-config';

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
        title={'Sign in with Google'}
        onPress={() => {
          GoogleSignin.configure({
            iosClientId: Config.GOOGLE_AUTH_IOS_APP_ID,
            // @ts-ignore TODO
            androidClientId: Config.GOOGLE_AUTH_ANDROID_APP_ID,
            // to retrieve id_token as we do in the web auth
            offlineAccess: true,
            webClientId: Config.GOOGLE_AUTH_WEB_APP_ID,
          });
          GoogleSignin.hasPlayServices()
            .then(hasPlayService => {
              if (hasPlayService) {
                GoogleSignin.signIn()
                  .then(userInfo => {
                    console.log(JSON.stringify(userInfo));
                  })
                  .catch(e => {
                    console.log('ERROR IS: ' + JSON.stringify(e));
                  });
              }
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }}
      />
      {/* <Button
        title={'Login with Facebook'}
        onPress={() => {
          LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
              console.log({result});
              if (result.isCancelled) {
                console.log('Login Cancelled ' + JSON.stringify(result));
              } else {
                console.log(
                  'Login success with  permisssions: ' +
                    result.grantedPermissions!.toString(),
                );
                console.log('Login Success ' + result.toString());
              }
            },
            function (error) {
              console.log('Login failed with error: ' + error);
            },
          );
        }}
      /> */}
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
