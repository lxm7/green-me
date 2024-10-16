// index.native.tsx

import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@state/store/useStore";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";
import SearchInputComponent from "@components/Input/Search";
import { Text } from "@components/ui/text";
import MapComponent from "@components/Map"; // eslint-disable-line import/no-unresolved
import DistanceSelector from "@components/Input/DistanceSelector"; // eslint-disable-line import/no-unresolved
import BusinessList from "@components/BusinessList";
import TravelModeSelector from "@components/Input/TravelMode";
import { Business, TravelMode } from "@components/MapContainer/types";
import { BristolCentre } from "@constants/Place";

const MapUI: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({
    latitude: BristolCentre[0],
    longitude: BristolCentre[1],
  });
  const [travelMode, setTravelMode] = useState<TravelMode>("walk");
  const [selectedDistance, setSelectedDistance] = useState<number>(160.9); // in meters
  const [displayedBusinesses, setDisplayedBusinesses] = useState<Business[]>(
    [],
  );

  const { searchTerm, setSearchTerm } = useStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
    })),
  );

  const {
    data: businesses,
    isLoading,
    isError,
    error,
  } = useBusinessesQuery(searchTerm);

  const handleModeChange = useCallback((mode: TravelMode) => {
    setTravelMode(mode);
    setSelectedDistance(mode === "walk" ? 160.9 : 1609.34); // Update distances in meters
  }, []);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
    },
    [setSearchTerm],
  );

  const handleSubmit = useCallback(() => {
    if (businesses) {
      setDisplayedBusinesses(businesses);
    }
  }, [businesses]);

  const handleDistanceChange = useCallback((value: number) => {
    setSelectedDistance(value);
  }, []);

  const handleMapCenterChange = useCallback((lat: number, lng: number) => {
    setMapCenter({ latitude: lat, longitude: lng });
  }, []);

  return (
    <View className="flex-1 flex-row bg-gray-100">
      {/* Left Sidebar */}
      <View className="w-1/3 p-4 bg-white">
        {/* Travel Mode Selector */}
        <TravelModeSelector
          travelMode={travelMode}
          onModeChange={handleModeChange}
        />

        {/* Distance Selector */}
        <DistanceSelector
          travelMode={travelMode}
          selectedDistance={selectedDistance}
          onDistanceChange={handleDistanceChange}
        />

        {/* Search Input */}
        <SearchInputComponent onSearch={handleSearch} onSubmit={handleSubmit} />

        {/* Business List */}
        {isError && (
          <View className="flex-1 justify-center items-center">
            <Text>Error loading businesses: {error.message}</Text>
          </View>
        )}
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="small" color="lightblue" />
          </View>
        )}
        <View className="mt-4">
          {searchTerm.length >= 3 && businesses && (
            <BusinessList businesses={businesses} />
          )}
        </View>
      </View>

      {/* Right Map Section */}
      <View className="w-2/3 h-full">
        <MapComponent
          mapCenter={mapCenter}
          matchedBusinesses={displayedBusinesses}
          onCenterChange={handleMapCenterChange} // Update map center based on user input
          radius={selectedDistance}
        />
      </View>
    </View>
  );
};

export default MapUI;
