// BusinessResultsPanel.tsx
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Business } from "@components/MapContainer/types";
import BusinessList from "@components/BusinessList";

interface BusinessResultsPanelProps {
  searchTerm: string;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  businesses?: Business[];
}

const BusinessResultsPanel: React.FC<BusinessResultsPanelProps> = ({
  searchTerm,
  isLoading,
  isError,
  error,
  businesses,
}) => {
  return (
    <View>
      {/* Message when no search term */}
      {searchTerm.length === 0 && (
        <View className="flex overflow-y-auto">
          <Text>
            Start searching for social popup events and green gatherings and
            earn tokens for your efforts
          </Text>
        </View>
      )}

      {/* Error State */}
      {isError && (
        <View className="flex-1 justify-center items-center">
          <Text>Error loading businesses: {error?.message}</Text>
        </View>
      )}

      {/* Loading State */}
      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="small" color="lightblue" />
        </View>
      )}

      {/* Businesses List */}
      {searchTerm.length >= 3 && businesses && (
        <View className="flex-row flex flex-1 overflow-y-auto">
          <BusinessList businesses={businesses} />
        </View>
      )}
    </View>
  );
};

export default BusinessResultsPanel;
