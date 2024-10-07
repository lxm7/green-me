import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useStore } from "../../state/store/useStore";
import {
  useBusinessesQuery,
  fetchBusinesses,
  cache,
} from "../../state/queries/useBusinessQueries";
import { matchesTerm, calculateDistance } from "../../utils/maps";
import MapComponent from "./components/Map";

// Define the types for your data structures
interface Product {
  name: string;
  greenScore: number;
  keywords: string[];
}

interface BusinessDocument {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
  products: Product[];
}

interface Business {
  id: string;
  document: BusinessDocument;
}

interface Place {
  display_name: string;
  lon: string;
  lat: string;
  boundingbox: [string, string, string, string];
}

const MapUI: React.FC = () => {
  const searchInputRef = useRef<TextInput | null>(null); // Create a ref for the search input

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -2.5879, 51.4545,
  ]); // Default to Bristol, UK
  const [geolocationResults, setGeolocationResults] = useState<Place[]>([]);
  const [travelMode, setTravelMode] = useState<"walk" | "drive">("walk"); // Default is Walk
  const [selectedDistance, setSelectedDistance] = useState<number>(250); // Default distance is 250 meters

  const { searchTerm, matchedBusinesses, setSearchTerm, setMatchedBusinesses } =
    useStore();

  // Fetch businesses based on the search term
  const { isLoading, isError, data } = useBusinessesQuery(searchTerm);

  // Adjust the slider based on travel mode (walk or drive)
  const handleModeChange = (mode: "walk" | "drive") => {
    setTravelMode(mode);

    if (mode === "walk") {
      // Reset distance to the nearest 250m increment if switching to walk
      setSelectedDistance(250);
    } else {
      // Reset distance to the nearest 1 mile increment if switching to drive
      setSelectedDistance(1);
    }
  };

  // Adjust distance and handle search
  const handleDistanceChange = (value: number) => {
    setSelectedDistance(value);
    handleSearch(searchTerm);
  };

  // Convert meters to miles for display when driving mode is selected
  const getDisplayedDistance = () => {
    if (travelMode === "walk") {
      return `${selectedDistance} meters`;
    }
    return `${selectedDistance} miles`;
  };

  const handleSearch = useCallback(
    async (term: string) => {
      setSearchTerm(term);
      if (term.length < 3) {
        setMatchedBusinesses([]); // Clear if less than 3 characters
        return;
      }

      // Ensure caches are populated
      if (!cache.coffee) {
        await fetchBusinesses("coffee");
      }
      if (!cache.tshirt) {
        await fetchBusinesses("tshirt");
      }

      const businesses = [...(cache.coffee || []), ...(cache.tshirt || [])];
      if (!businesses || businesses.length === 0) return;

      const unit = travelMode === "walk" ? "meters" : "miles"; // Use meters for walk, miles for drive

      // Filter businesses based on search term
      const matched = businesses.filter((business: Business) => {
        const businessNameMatch = matchesTerm(business.document.name, term);

        const productMatch = business.document.products.some(
          (product: Product) =>
            matchesTerm(product.name, term) ||
            product.keywords.some((keyword: string) =>
              matchesTerm(keyword, term)
            )
        );

        // Calculate the distance between user and business
        const businessDistance = calculateDistance(
          mapCenter[1], // User's latitude
          mapCenter[0], // User's longitude
          business.document.coordinates[1], // Business latitude
          business.document.coordinates[0], // Business longitude
          unit
        );

        // Filter based on distance and search term
        return (
          (businessNameMatch || productMatch) &&
          businessDistance <= selectedDistance
        );
      });

      setMatchedBusinesses(matched); // Update autocomplete list
    },
    [
      mapCenter,
      selectedDistance,
      travelMode,
      setSearchTerm,
      setMatchedBusinesses,
    ]
  );

  return (
    <View style={styles.container}>
      {/* Left Sidebar */}
      <View style={styles.sidebar}>
        {/* Travel Mode Selection */}
        <View style={styles.modeSelection}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              travelMode === "walk" ? styles.activeMode : styles.inactiveMode,
            ]}
            onPress={() => handleModeChange("walk")}
          >
            <Text
              style={
                travelMode === "walk" ? styles.activeText : styles.inactiveText
              }
            >
              🚶 Walk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              travelMode === "drive" ? styles.activeMode : styles.inactiveMode,
            ]}
            onPress={() => handleModeChange("drive")}
          >
            <Text
              style={
                travelMode === "drive" ? styles.activeText : styles.inactiveText
              }
            >
              🚗 Drive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Distance Input */}
        <View style={styles.distanceContainer}>
          <Text style={styles.label}>
            Select Distance: {getDisplayedDistance()}
          </Text>
          {/* Use a TextInput for simplicity; you may replace it with a Slider component */}
          <TextInput
            style={styles.distanceInput}
            keyboardType="numeric"
            value={selectedDistance.toString()}
            onChangeText={(text) => handleDistanceChange(Number(text))}
          />
        </View>

        {/* Business search input */}
        <View style={styles.searchContainer}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            value={searchTerm}
            placeholder="Type coffee or t-shirt..."
            onChangeText={(text) => handleSearch(text)}
          />
        </View>

        {/* Autocomplete business list */}
        <ScrollView style={styles.autocompleteList}>
          {searchTerm.length >= 3 && (
            <View>
              {matchedBusinesses.map((business: Business) => (
                <View key={business.id} style={styles.businessItem}>
                  <Text style={styles.businessName}>
                    {business.document.name}
                  </Text>
                  {business.document.products.map(
                    (product: Product, idx: number) => (
                      <Text key={idx}>
                        {product.name} - {product.greenScore}
                      </Text>
                    )
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Right Map Section */}
      <View style={styles.mapContainer}>
        <MapComponent
          mapCenter={mapCenter}
          matchedBusinesses={matchedBusinesses}
          selectedDistance={selectedDistance}
          travelMode={travelMode}
        />
      </View>
    </View>
  );
};

export default MapUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f7fafc", // bg-gray-100
  },
  sidebar: {
    width: "33%",
    padding: 16,
    backgroundColor: "white",
  },
  modeSelection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    marginRight: 8,
  },
  activeMode: {
    backgroundColor: "#4299e1", // bg-blue-500
  },
  inactiveMode: {
    backgroundColor: "#e2e8f0", // bg-gray-300
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "black",
  },
  distanceContainer: {
    marginTop: 16,
  },
  label: {
    color: "#4a5568", // text-gray-700
  },
  distanceInput: {
    marginTop: 8,
    padding: 8,
    borderColor: "#cbd5e0",
    borderWidth: 1,
    borderRadius: 4,
  },
  searchContainer: {
    marginTop: 16,
  },
  searchInput: {
    padding: 8,
    borderColor: "#cbd5e0",
    borderWidth: 1,
    borderRadius: 4,
  },
  autocompleteList: {
    marginTop: 16,
  },
  businessItem: {
    marginTop: 16,
  },
  businessName: {
    fontWeight: "bold",
  },
  mapContainer: {
    width: "67%",
    height: "100%",
  },
});
