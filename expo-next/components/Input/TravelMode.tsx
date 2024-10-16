import React from "react";
import { View } from "react-native";
import { TravelMode } from "@components/MapContainer/types";
import { Button } from "@components/ui/button";
import { Text } from "@components/ui/text";

interface TravelModeSelectorProps {
  travelMode: TravelMode;
  onModeChange: (mode: TravelMode) => void;
}

const TravelModeSelector: React.FC<TravelModeSelectorProps> = ({
  travelMode,
  onModeChange,
}) => {
  return (
    <View className="flex-row mb-4">
      <Button
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
      </Button>
      <Button
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
      </Button>
    </View>
  );
};

export default React.memo(TravelModeSelector);
