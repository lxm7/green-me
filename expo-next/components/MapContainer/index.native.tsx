import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@state/store/useStore";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";
import SearchInputComponent from "@components/Input/Search";
import { Text } from "react-native"; // Use React Native's Text

import TravelModeSelector from "@components/Input/TravelMode";
import BusinessList from "@components/BusinessList";
import { Business, TravelMode } from "@components/MapContainer/types";
import { BristolCentre } from "@constants/Place";

import DistanceSelector from "@components/Input/DistanceSelector"; // eslint-disable-line import/no-unresolved
import MapComponent from "@components/Map"; // eslint-disable-line import/no-unresolved

const MapUI: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: BristolCentre[1], // Assuming BristolCentre is [longitude, latitude]
    longitude: BristolCentre[0],
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
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f3f4f6" }}>
      {/* Left Sidebar */}
      <View style={{ width: "33%", padding: 16, backgroundColor: "#fff" }}>
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
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Error loading businesses: {error.message}</Text>
          </View>
        )}
        {isLoading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="small" color="lightblue" />
          </View>
        )}
        <View style={{ marginTop: 16, flex: 1 }}>
          {searchTerm.length >= 3 && businesses && (
            <BusinessList businesses={businesses} />
          )}
        </View>
      </View>

      {/* Right Map Section */}
      <View style={{ width: "67%", height: "100%" }}>
        <MapComponent
          mapCenter={mapCenter}
          matchedBusinesses={displayedBusinesses}
          onCenterChange={handleMapCenterChange}
          radius={selectedDistance}
        />
      </View>
    </View>
  );
};

export default MapUI;
