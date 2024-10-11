import React, { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@state/store/useStore";
import { fetchBusinesses, cache } from "@state/queries/useBusinessQueries";
import { matchesTerm, calculateDistance } from "@utils/maps";
import SearchInputComponent from "@components/Input/Search";

// @ts-expect-error - https://docs.expo.dev/guides/typescript/#typescript-for-projects-config-files really??
import MapComponent from "@components/Map"; // eslint-disable-line import/no-unresolved
import TravelModeSelector from "@components/Input/TravelMode";
import DistanceSelector from "@components/Input/DistanceSelector";
import BusinessList from "@components/BusinessList";
import { Business, Product, TavelMode } from "@components/MapContainer/types";

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

  const { matchedBusinesses, setMatchedBusinesses } = useStore(
    useShallow((state) => ({
      matchedBusinesses: state.matchedBusinesses,
      setMatchedBusinesses: state.setMatchedBusinesses,
    })),
  );

  const handleModeChange = useCallback((mode: TavelMode) => {
    setTravelMode(mode);

    if (mode === "walk") {
      setSelectedDistance(500);
    } else {
      setSelectedDistance(1);
    }
  }, []);

  const handleSearch = useCallback(
    async (term: string) => {
      setSearchTerm(term);

      if (term.length < 3) {
        setMatchedBusinesses([]);
        return;
      }

      if (!cache.coffee) {
        await fetchBusinesses("coffee");
      }
      if (!cache.tshirt) {
        await fetchBusinesses("tshirt");
      }

      const businesses = [...(cache.coffee || []), ...(cache.tshirt || [])];
      if (!businesses || businesses.length === 0) return;

      const unit = travelMode === "walk" ? "meters" : "miles";

      const matched = businesses.filter((business: Business) => {
        const businessNameMatch = matchesTerm(business.document.name, term);

        const productMatch = business.document.products.some(
          (product: Product) =>
            matchesTerm(product.name, term) ||
            product.keywords.some((keyword: string) =>
              matchesTerm(keyword, term),
            ),
        );

        const businessDistance = calculateDistance(
          mapCenter[1],
          mapCenter[0],
          business.document.coordinates[1],
          business.document.coordinates[0],
          unit,
        );

        return (
          (businessNameMatch || productMatch) &&
          businessDistance <= selectedDistance
        );
      });

      setMatchedBusinesses(matched);
    },
    [
      mapCenter,
      selectedDistance,
      travelMode,
      setSearchTerm,
      setMatchedBusinesses,
    ],
  );

  const handleDistanceChange = useCallback((value: number) => {
    setSelectedDistance(value);
  }, []);

  const handleSubmit = useCallback(() => {
    setDisplayedBusinesses(matchedBusinesses);
  }, [matchedBusinesses]);

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
          {searchTerm.length >= 3 && (
            <BusinessList businesses={matchedBusinesses} />
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
