// components/MapLibreNativeMap.js
import React from "react";
import MapLibreGL, { Logger } from "@maplibre/maplibre-react-native";
import { StyleSheet, View } from "react-native";

MapLibreGL.setAccessToken(null); // MapLibre GL does not require an access token

// hides known issue: MapLibre [info] Request failed due to a permanent error: Canceled
// {"level": "warning", "message": "Request failed due to a permanent error: Canceled ", "tag": "Mbgl-HttpRequest"}
// expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
Logger.setLogCallback((log) => {
  const { message } = log;

  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed")
  ) {
    return true;
  }
  return false;
});

const MapLibreNativeMap = () => {
  return (
    <View
      style={styles.page}
      // className={"absolute right-0 left-0 bottom-0 top-0"}
    >
      <MapLibreGL.MapView
        style={styles.map}
        // className={"absolute right-0 left-0 bottom-0 top-0"}
      >
        <MapLibreGL.Camera
          zoomLevel={12}
          centerCoordinate={[-74.006, 40.7128]}
        />
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // height: "100%",
  },
  map: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MapLibreNativeMap;
