import React, { useCallback } from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";

import { TravelMode } from "@components/MapContainer/types";
import { Text } from "components/ui/text";

interface DistanceSelectorProps {
  travelMode: TravelMode;
  selectedDistance: number; // always in metres
  onDistanceChange: (value: number) => void; // value in metres
}

const DistanceSelector: React.FC<DistanceSelectorProps> = ({
  travelMode,
  selectedDistance,
  onDistanceChange,
}) => {
  // Helper to convert metres to miles
  const metresToMiles = (metres: number) => metres / 1609.34;

  // Helper to convert miles to metres
  const milesToMetres = (miles: number) => miles * 1609.34;

  // Display the distance based on travel mode
  const getDisplayedDistance = useCallback(() => {
    if (travelMode === "walk") {
      const miles = metresToMiles(selectedDistance);
      return `${miles.toFixed(1)} miles`; // show 0.1-mile steps
    }
    const miles = metresToMiles(selectedDistance);
    return `${Math.round(miles)} miles`; // show in 1-mile steps
  }, [selectedDistance, travelMode]);

  // Handle change in slider and convert values accordingly
  const handleDistanceChange = (value: number) => {
    let valueInMetres;
    if (travelMode === "walk") {
      // Convert from 0.1-mile steps to metres
      valueInMetres = milesToMetres(value);
    } else {
      // Convert from 1-mile steps to metres
      valueInMetres = milesToMetres(value);
    }

    onDistanceChange(valueInMetres);
  };

  return (
    <View>
      <Text className="text-gray-700">
        Select Distance: {getDisplayedDistance()}
      </Text>

      <View className="mt-2 mb-5">
        <Slider
          minimumValue={travelMode === "walk" ? 0.1 : 1} // 0.1 miles for walking, 1 mile for driving
          maximumValue={travelMode === "walk" ? 2 : 5} // max 2 miles for walking, 5 miles for driving
          step={travelMode === "walk" ? 0.1 : 1}
          value={
            travelMode === "walk"
              ? Number(metresToMiles(selectedDistance).toFixed(1)) // convert metres to 0.1-mile steps
              : Number(metresToMiles(selectedDistance).toFixed(0)) // convert metres to 1-mile steps
          }
          onValueChange={handleDistanceChange}
          className="w-full"
        />
      </View>
    </View>
  );
};

export default React.memo(DistanceSelector);
