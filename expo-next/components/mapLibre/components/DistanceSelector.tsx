import React, { useCallback } from "react";
import { View, Text, TextInput } from "react-native";
import { TavelMode } from "@components/mapLibre/types";

interface DistanceSelectorProps {
  travelMode: TavelMode;
  selectedDistance: number;
  onDistanceChange: (value: number) => void;
}

const DistanceSelector: React.FC<DistanceSelectorProps> = ({
  travelMode,
  selectedDistance,
  onDistanceChange,
}) => {
  const getDisplayedDistance = useCallback(() => {
    if (travelMode === "walk") {
      return `${selectedDistance} meters`;
    }
    return `${selectedDistance} miles`;
  }, [selectedDistance, travelMode]);

  return (
    <View className="mt-4">
      <Text className="text-gray-700">
        Select Distance: {getDisplayedDistance()}
      </Text>
      <div className="mt-2 mb-4">
        <input
          className="w-full"
          type="range"
          min={travelMode === "walk" ? 500 : 1}
          max={travelMode === "walk" ? 2000 : 10}
          step={travelMode === "walk" ? 500 : 1}
          value={selectedDistance.toString()}
          onChange={(e) => onDistanceChange(Number(e.target.value))}
        />
      </div>
    </View>
  );
};

export default React.memo(DistanceSelector);
