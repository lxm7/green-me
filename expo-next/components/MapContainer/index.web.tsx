import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { useQueryClient } from "@tanstack/react-query";

import { useStore } from "@state/store/useStore";
import SearchInputComponent from "@components/Input/Search";
import { Text } from "@components/ui/text";

import MapComponent from "@components/Map";
import DistanceSelector from "@components/Input/DistanceSelector";
// import TravelModeSelector from "@components/Input/TravelMode";
import { Button } from "@components/ui/button";
import { Business, TravelMode } from "@components/MapContainer/types";
import { BristolCentre } from "@constants/Place";

const businesses = [
  {
    id: "eb7efa2d-ab1b-4a31-b3e2-599c12472eff",
    document: {
      co2e: 0.01,
      name: "(Mugshot) The Vegan Deli",
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
          environmentScore: 45.0,
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
      name: "(Mugshot) Bristol Brews",
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
          environmentScore: 44.0,
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
          environmentScore: 41.0,
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
          environmentScore: 47.0,
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
      name: "(GreenCart) City Bakery",
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
          environmentScore: 41.0,
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

const MapUI: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({
    latitude: BristolCentre[0],
    longitude: BristolCentre[1],
  });
  const [travelMode] = useState<TravelMode>("walk");
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

  const queryClient = useQueryClient();
  // const businesses = queryClient.getQueryData(["businesses", searchTerm]) as
  //   | Business[]
  //   | undefined;

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
  }, [businesses]);

  const handleDistanceChange = useCallback((value: number) => {
    setSelectedDistance(value);
  }, []);

  const handleMapCenterChange = useCallback((lat: number, lng: number) => {
    setMapCenter({ latitude: lat, longitude: lng });
  }, []);

  return (
    <View className="h-full">
      {/* Left Sidebar */}
      <View className="absolute z-[1] left-1/2 -ml-[250px] w-[500px] p-4 flex-row justify-center items-center gap-4">
        {/* Travel Mode Selector */}
        {/* <TravelModeSelector
          travelMode={travelMode}
          onModeChange={handleModeChange}
        /> */}

        {/* Search Input */}
        <SearchInputComponent onSearch={handleSearch} />

        <View className="w-[90px]">
          {/* Distance Selector */}
          <DistanceSelector
            travelMode={travelMode}
            selectedDistance={selectedDistance}
            onDistanceChange={handleDistanceChange}
          />
        </View>
        <Button
          className="bg-purple-500 py-2 px-4 rounded"
          onPress={handleShowMapMarkers}
        >
          <Text className="text-white text-center">Show events</Text>
        </Button>
      </View>

      {/* Right Map Section */}
      <View className="h-full">
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
