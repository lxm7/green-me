import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@state/store/useStore";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";
import SearchInputComponent from "@components/Input/Search";
import { Text } from "@components/ui/text";

import MapComponent from "@components/Map"; // eslint-disable-line import/no-unresolved
import DistanceSelector from "@components/Input/DistanceSelector"; // eslint-disable-line import/no-unresolved
import TravelModeSelector from "@components/Input/TravelMode";
import BusinessList from "@components/BusinessList";
import { Business, TravelMode } from "@components/MapContainer/types";
import { BristolCentre } from "@constants/Place";

const businesses: Business[] = [
  {
    id: "53b9bae2-b61d-48df-9464-90b037b1b927",
    document: {
      name: "City Bakery",
      score: null,
      business: "Chain",
      products: [
        {
          co2e: 0.0175,
          name: "Latte",
          price: 3.5,
          business: "Chain",
          keywords: ["coffee"],
          available: true,
          greenScore: 4.3,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          publishedLCAs: [],
          environmentScore: 41,
        },
      ],
      accreditors: false,
      coordinates: {
        type: "Point",
        coordinates: [-2.582561236, 51.446505827],
      },
    },
  },
  {
    id: "6ee75a0a-2c34-455c-956b-9563922bc4cd",
    document: {
      name: "The Coffee House",
      score: null,
      business: "Independent",
      products: [
        {
          co2e: 0.01755,
          name: "Cappuccino",
          price: 3,
          business: "Independent",
          keywords: ["coffee"],
          available: true,
          greenScore: 4.03,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          publishedLCAs: [
            "Carbon Trust",
            "Rainforest Alliance",
            "GOTS",
            "OEKO-TEX",
            "Fair Trade",
            "CarbonNeutral",
            "Cradle to Cradle Certified",
          ],
          environmentScore: 43.5,
        },
        {
          co2e: 0.01755,
          name: "Cappuccino",
          price: 3,
          business: "Independent",
          keywords: ["coffee"],
          available: true,
          greenScore: 4.03,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          publishedLCAs: [
            "Carbon Trust",
            "Rainforest Alliance",
            "GOTS",
            "OEKO-TEX",
            "Fair Trade",
            "CarbonNeutral",
            "Cradle to Cradle Certified",
          ],
          environmentScore: 43.5,
        },
      ],
      accreditors: false,
      coordinates: {
        type: "Point",
        coordinates: [-2.5919, 51.4553],
      },
    },
  },
  {
    id: "71a4c5cc-25a9-4b55-b319-1253d4c4b1ad",
    document: {
      name: "Bristol Brews",
      score: null,
      business: "Chain",
      products: [
        {
          co2e: 0.017,
          name: "Flat White",
          price: 3.2,
          business: "Chain",
          keywords: ["coffee"],
          available: true,
          greenScore: 4.5,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          publishedLCAs: [],
          environmentScore: 44,
        },
        {
          co2e: 0.0155,
          name: "Americano",
          price: 2.8,
          business: "Chain",
          keywords: ["coffee"],
          available: true,
          greenScore: 4.2,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          publishedLCAs: [],
          environmentScore: 41,
        },
        {
          co2e: 0.015,
          name: "Espresso",
          price: 2.5,
          business: "Chain",
          keywords: ["coffee"],
          available: true,
          greenScore: 4.9,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          publishedLCAs: [],
          environmentScore: 47,
        },
      ],
      accreditors: false,
      coordinates: {
        type: "Point",
        coordinates: [-2.595720981, 51.447861722],
      },
    },
  },
];

const isLoading = false;
const isError = false;
const error = new Error("Error loading businesses");

const MapUI: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({
    latitude: BristolCentre[0],
    longitude: BristolCentre[1],
  });
  const [travelMode, setTravelMode] = useState<TravelMode>("walk");
  const [selectedDistance, setSelectedDistance] = useState<number>(160.9); // 0.1 miles
  const [displayedBusinesses, setDisplayedBusinesses] = useState<Business[]>(
    [],
  );

  const { searchTerm, setSearchTerm } = useStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
    })),
  );

  // const {
  //   data: businesses,
  //   isLoading,
  //   isError,
  //   error,
  // } = useBusinessesQuery(searchTerm);

  const handleModeChange = useCallback((mode: TravelMode) => {
    setTravelMode(mode);
    setSelectedDistance(mode === "walk" ? 160.9 : 1609.34); // Update default distances: 0.1 miles walk, 1 mile drive
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
  }, []);

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
        <View className="mt-4 flex flex-1 overflow-y-auto">
          {searchTerm.length >= 3 && businesses && (
            <BusinessList businesses={businesses} />
          )}
        </View>
      </View>

      {/* Right Map Section */}
      <View className="w-2/3 h-full">
        <MapComponent
          // @ts-expect-error - web expects [number, number], native expects {latitude: number, longitude: number}
          mapCenter={[mapCenter.latitude, mapCenter.longitude]}
          matchedBusinesses={displayedBusinesses}
          onCenterChange={handleMapCenterChange} // Update map center based on user input
          radius={selectedDistance}
        />
      </View>
    </View>
  );
};

export default MapUI;
