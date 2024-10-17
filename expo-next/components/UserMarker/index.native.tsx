import React from "react";
import { View, StyleSheet } from "react-native";

type UserMarkerProps = {
  container?: HTMLElement | null;
};

const CustomMarker: React.FC<UserMarkerProps> = ({ container }) => {
  return (
    <View
      // is this needed also?
      style={styles.marker}
      // lifted from web
      className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_0_20px_rgba(168,85,247,0.2)]"
    />
  );
};

const styles = StyleSheet.create({
  marker: {
    // Shadow for iOS
    shadowColor: "rgba(168,85,247,0.7)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 40,
    // Elevation for Android
    elevation: 40,
  },
});

export default CustomMarker;
