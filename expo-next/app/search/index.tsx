// src/App.js
// @ts-nocheck
import { View, Text } from "react-native";
import React from "react";
import MapLibreMap from "../../components/mapLibre";
// import MapboxMap from "../../components/mapbox/index";

function App() {
  return (
    <View className="flex-1">
      <Text>MapLibre GL JS Uninversal Map</Text>
      <MapLibreMap />
      {/* <MapboxMap /> */}
    </View>
  );
}

export default App;
