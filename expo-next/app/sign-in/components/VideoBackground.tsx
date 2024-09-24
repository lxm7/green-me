import { View, Platform } from "react-native";
import { Video, ResizeMode } from "expo-av";

const VideoBackgroundWeb = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={
          "absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 -z-10 object-cover"
        }
        poster={"assets/assets/images/poster.png"}
        // style={{
        //   position: "absolute",
        //   top: "50%",
        //   left: "50%",
        //   width: "100%",
        //   height: "100%",
        //   objectFit: "cover",
        //   transform: "translate(-50%, -50%)",
        //   zIndex: -1,
        // }}
      >
        <source src={"assets/assets/videos/people.mp4"} type="video/mp4" />
      </video>
    </>
  );
};

const VideoBackgroundNative = () => {
  return (
    <View
      className={
        "absolute right-0 left-0 bottom-0 top-0 justify-center items-center"
      }
    >
      <Video
        source={require("assets/videos/people.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        className={"absolute right-0 left-0 bottom-0 top-0"}
        posterSource={require("assets/images/poster.png")}
      />
    </View>
  );
};

const VideoBackground = () => {
  if (Platform.OS === "web") {
    return <VideoBackgroundWeb />;
  }
  return <VideoBackgroundNative />;
};

export default VideoBackground;
