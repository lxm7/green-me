import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@state/store/useStore";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";
import SearchInputComponent from "@components/Input/Search";
import { Text } from "@components/ui/text";

import MapComponent from "@components/Map";
import DistanceSelector from "@components/Input/DistanceSelector";
import TravelModeSelector from "@components/Input/TravelMode";
import BusinessList from "@components/BusinessList";
import { Business, TravelMode } from "@components/MapContainer/types";
import { BristolCentre } from "@constants/Place";

const businesses = [
  {
    id: "eb7efa2d-ab1b-4a31-b3e2-599c12472eff",
    document: {
      co2e: 0.01,
      name: "The Vegan Deli",
      image: "vegan_deli.jpg",
      score: 4.8,
      business: "deli",
      products: [
        {
          name: "Coffee",
          price: 2.5,
          business: "deli",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 45,
        },
      ],
      greenScore: 4.8,
      coordinates: {
        type: "Point",
        coordinates: [-2.598, 51.452],
      },
      publishedLCAs: null,
    },
  },
  {
    id: "ca91d66e-fa58-43cd-a6df-39b9eb1cf50d",
    document: {
      co2e: 0.01583,
      name: "Bristol Brews",
      image: "bristol_brews.jpg",
      score: 4.5,
      business: "cafe",
      products: [
        {
          name: "Flat White",
          price: 3.2,
          business: "cafe",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 44,
        },
        {
          name: "Americano",
          price: 2.8,
          business: "cafe",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 41,
        },
        {
          name: "Espresso",
          price: 2.5,
          business: "cafe",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 47,
        },
      ],
      greenScore: 4.5,
      coordinates: {
        type: "Point",
        coordinates: [-2.595, 51.458],
      },
      publishedLCAs: null,
    },
  },
  {
    id: "1cfb001d-74ea-44de-a781-77cce4686909",
    document: {
      co2e: 0.01617,
      name: "City Bakery",
      image: "city_bakery.jpg",
      score: 4.5,
      business: "bakery",
      products: [
        {
          name: "Latte",
          price: 3.5,
          business: "bakery",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 41,
        },
      ],
      greenScore: 4.5,
      coordinates: {
        type: "Point",
        coordinates: [-2.5935, 51.4565],
      },
      publishedLCAs: null,
    },
  },
];

const isLoading = false;
const isError = false;
const error = null;

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

  const handleModeChange = useCallback((value: string) => {
    setTravelMode(value as TravelMode);
    setSelectedDistance(value === "walk" ? 160.9 : 1609.34); // Update default distances: 0.1 miles walk, 1 mile drive
  }, []);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term); // This will trigger the query and fetch the results from Supabase
    },
    [setSearchTerm],
  );

  const handleShowMapMarkers = useCallback(() => {
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
      <View className="w-2/5 p-4 bg-white">
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
        <SearchInputComponent
          onSearch={handleSearch}
          onSubmit={handleShowMapMarkers}
        />

        {/* Business List */}
        {isError && (
          <View className="flex-1 justify-center items-center">
            <Text>Error loading businesses: {error!.message}</Text>
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
