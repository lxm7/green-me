import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Video, ResizeMode, VideoFullscreenUpdate } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoBackgroundWeb = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%, -50%)",
        zIndex: -1,
      }}
    >
      <source
        src={"https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}
        type="video/mp4"
      />
    </video>
  );
};

const VideoBackgroundNative = () => {
  const onFullscreenUpdate = async ({ fullscreenUpdate }: any) => {
    console.log({ fullscreenUpdate });
    if (Platform.OS === "android") {
      if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
        await ScreenOrientation.unlockAsync();
      } else if (
        fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS
      ) {
        // lock the screen in Portrait orientation
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
        onFullscreenUpdate={onFullscreenUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const VideoBackground = () => {
  if (Platform.OS === "web") {
    return <VideoBackgroundWeb />;
  }
  return <VideoBackgroundNative />;
};

export default VideoBackground;
