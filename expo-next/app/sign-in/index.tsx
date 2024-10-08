import { View } from "react-native";
import VideoBackground from "@app/sign-in/components/VideoBackground";
import GoogleSignIn from "@app/sign-in/components/GoogleSignIn";

export default function App() {
  return (
    <View
      className={
        "absolute right-0 left-0 bottom-0 top-0 justify-center items-center"
      }
    >
      <VideoBackground />
      <GoogleSignIn />
    </View>
  );
}
