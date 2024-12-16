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

// popup party / incentive meetups
const businesses = [
  {
    id: "eb7efa2d-ab1b-4a31-b3e2-599c12472eff",
    document: {
      title: "Spring Cleaning Campaign",
      description:
        "Join our eco-friendly cleaning initiative this spring and make a difference.",
      image: "https://example.com/images/campaign-banner.jpg",
      progress: {
        current: 75,
        goal: 100,
        unit: "cleaned locations",
      },
      stats: {
        participants: 150,
        impact: "25 tons of waste removed",
        daysRemaining: 10,
      },
      actions: [
        {
          type: "donate",
          label: "Donate Now",
          url: "https://example.com/donate",
        },
        {
          type: "volunteer",
          label: "Sign Up to Volunteer",
          url: "https://example.com/volunteer",
        },
      ],
      details: {
        location: "Bristol, UK",
        dateRange: "March 15 - March 25, 2024",
        organizers: ["Eco Clean UK", "Green Volunteers Network"],
        contact: {
          email: "contact@ecocleanuk.org",
          phone: "+44 1234 567890",
        },
      },
      relatedCampaigns: [
        {
          id: 119,
          title: "Beach Cleanup Drive",
          url: "https://example.com/campaigns/119",
        },
        {
          id: 120,
          title: "Urban Greening Initiative",
          url: "https://example.com/campaigns/120",
        },
      ],
      gallery: [
        {
          image: "https://example.com/images/gallery1.jpg",
          caption: "Volunteers in action",
        },
        {
          image: "https://example.com/images/gallery2.jpg",
          caption: "Cleaned park area",
        },
      ],
    },
  },
  {
    id: "ca91d66e-fa58-43cd-a6df-39b9eb1cf50d",
    document: {
      title: "Spring Cleaning Campaign",
      description:
        "Join our eco-friendly cleaning initiative this spring and make a difference.",
      image: "https://example.com/images/campaign-banner.jpg",
      progress: {
        current: 75,
        goal: 100,
        unit: "cleaned locations",
      },
      stats: {
        participants: 150,
        impact: "25 tons of waste removed",
        daysRemaining: 10,
      },
      actions: [
        {
          type: "donate",
          label: "Donate Now",
          url: "https://example.com/donate",
        },
        {
          type: "volunteer",
          label: "Sign Up to Volunteer",
          url: "https://example.com/volunteer",
        },
      ],
      details: {
        location: "Bristol, UK",
        dateRange: "March 15 - March 25, 2024",
        organizers: ["Eco Clean UK", "Green Volunteers Network"],
        contact: {
          email: "contact@ecocleanuk.org",
          phone: "+44 1234 567890",
        },
      },
      relatedCampaigns: [
        {
          id: 119,
          title: "Beach Cleanup Drive",
          url: "https://example.com/campaigns/119",
        },
        {
          id: 120,
          title: "Urban Greening Initiative",
          url: "https://example.com/campaigns/120",
        },
      ],
      gallery: [
        {
          image: "https://example.com/images/gallery1.jpg",
          caption: "Volunteers in action",
        },
        {
          image: "https://example.com/images/gallery2.jpg",
          caption: "Cleaned park area",
        },
      ],
    },
  },
  {
    id: "1cfb001d-74ea-44de-a781-77cce4686909",
    document: {
      title: "Spring Cleaning Campaign",
      description:
        "Join our eco-friendly cleaning initiative this spring and make a difference.",
      image: "https://example.com/images/campaign-banner.jpg",
      progress: {
        current: 75,
        goal: 100,
        unit: "cleaned locations",
      },
      stats: {
        participants: 150,
        impact: "25 tons of waste removed",
        daysRemaining: 10,
      },
      actions: [
        {
          type: "donate",
          label: "Donate Now",
          url: "https://example.com/donate",
        },
        {
          type: "volunteer",
          label: "Sign Up to Volunteer",
          url: "https://example.com/volunteer",
        },
      ],
      details: {
        location: "Bristol, UK",
        dateRange: "March 15 - March 25, 2024",
        organizers: ["Eco Clean UK", "Green Volunteers Network"],
        contact: {
          email: "contact@ecocleanuk.org",
          phone: "+44 1234 567890",
        },
      },
      relatedCampaigns: [
        {
          id: 119,
          title: "Beach Cleanup Drive",
          url: "https://example.com/campaigns/119",
        },
        {
          id: 120,
          title: "Urban Greening Initiative",
          url: "https://example.com/campaigns/120",
        },
      ],
      gallery: [
        {
          image: "https://example.com/images/gallery1.jpg",
          caption: "Volunteers in action",
        },
        {
          image: "https://example.com/images/gallery2.jpg",
          caption: "Cleaned park area",
        },
      ],
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
