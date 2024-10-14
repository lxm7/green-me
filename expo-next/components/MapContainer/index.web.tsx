import React, { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@state/store/useStore";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";
import SearchInputComponent from "@components/Input/Search";

// @ts-expect-error - https://docs.expo.dev/guides/typescript/#typescript-for-projects-config-files really??
import MapComponent from "@components/Map"; // eslint-disable-line import/no-unresolved
import TravelModeSelector from "@components/Input/TravelMode";
import DistanceSelector from "@components/Input/DistanceSelector";
import BusinessList from "@components/BusinessList";
import { Business, TavelMode } from "@components/MapContainer/types";

const MapUI: React.FC = () => {
  const [mapCenter] = useState<[number, number]>([-2.5879, 51.4545]);
  const [travelMode, setTravelMode] = useState<TavelMode>("walk");
  const [selectedDistance, setSelectedDistance] = useState<number>(500);
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
    // isLoading,
    // isError,
  } = useBusinessesQuery(searchTerm);

  const handleModeChange = useCallback((mode: TavelMode) => {
    setTravelMode(mode);
    setSelectedDistance(mode === "walk" ? 500 : 1);
  }, []);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term); // This will trigger the query and fetch the results from Supabase
    },
    [setSearchTerm],
  );

  const handleSubmit = useCallback(() => {
    // Set displayed businesses directly from the fetched query result
    if (businesses) {
      setDisplayedBusinesses(businesses);
    }
  }, [businesses]);

  const handleDistanceChange = useCallback((value: number) => {
    setSelectedDistance(value);
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
        <ScrollView className="mt-4">
          {searchTerm.length >= 3 && businesses && (
            <BusinessList businesses={businesses} />
          )}
        </ScrollView>
      </View>

      {/* Right Map Section */}
      <View className="w-2/3 h-full">
        <MapComponent
          mapCenter={mapCenter}
          matchedBusinesses={displayedBusinesses}
        />
      </View>
    </View>
  );
};

export default MapUI;
