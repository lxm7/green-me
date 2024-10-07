// components/TravelModeSelector.tsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface TravelModeSelectorProps {
  travelMode: "walk" | "drive";
  onModeChange: (mode: "walk" | "drive") => void;
}

const TravelModeSelector: React.FC<TravelModeSelectorProps> = ({
  travelMode,
  onModeChange,
}) => {
  return (
    <View className="flex-row mb-4">
      <TouchableOpacity
        className={`py-2 px-4 rounded-full mr-2 ${
          travelMode === "walk" ? "bg-blue-500" : "bg-gray-300"
        }`}
        onPress={() => onModeChange("walk")}
      >
        <Text
          className={`${travelMode === "walk" ? "text-white" : "text-black"}`}
        >
          🚶 Walk
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`py-2 px-4 rounded-full ${
          travelMode === "drive" ? "bg-blue-500" : "bg-gray-300"
        }`}
        onPress={() => onModeChange("drive")}
      >
        <Text
          className={`${travelMode === "drive" ? "text-white" : "text-black"}`}
        >
          🚗 Drive
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TravelModeSelector);
