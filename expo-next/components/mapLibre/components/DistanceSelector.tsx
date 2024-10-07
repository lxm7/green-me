// components/DistanceSelector.tsx
import React, { useCallback } from "react";
import { View, Text, TextInput } from "react-native";

interface DistanceSelectorProps {
  travelMode: "walk" | "drive";
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
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        keyboardType="numeric"
        value={selectedDistance.toString()}
        onChangeText={(text) => onDistanceChange(Number(text))}
      />
    </View>
  );
};

export default React.memo(DistanceSelector);
