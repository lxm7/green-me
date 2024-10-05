import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout, UrlTile } from "react-native-maps";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";
import axios from "axios";

// Import your data files or fetch from an API
// For this example, we'll assume you have JSON data files
import coffeeData from "../../app/api/coffee.json";
import tshirtData from "../../app/api/tshirt.json";

// Helper functions
const normalizeTerm = (term) => term.toLowerCase().replace(/[-\s]/g, "");

const matchesTerm = (string, term) => {
  const normalizedString = normalizeTerm(string);
  const normalizedTerm = normalizeTerm(term);
  return normalizedString.includes(normalizedTerm);
};

const checkForMatch = (term) => {
  const normalizedTerm = term.toLowerCase();
  if (normalizedTerm.includes("coffee")) {
    return "coffee";
  }
  if (normalizedTerm.includes("tshirt") || normalizedTerm.includes("t-shirt")) {
    return "tshirt";
  }
  return null;
};

const calculateDistance = (lat1, lon1, lat2, lon2, unit = "miles") => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = unit === "miles" ? 3958.8 : 6371 * 1000; // Radius of Earth

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance; // Distance in the selected unit
};

const cache = {
  coffee: null,
  tshirt: null,
};

const MapUI = () => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({
    latitude: 51.4545,
    longitude: -2.5879,
  }); // Default to Bristol, UK
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBusinesses, setMatchedBusinesses] = useState([]);
  const [travelMode, setTravelMode] = useState("walk"); // Default is Walk
  const [selectedDistance, setSelectedDistance] = useState(250); // Default distance

  useEffect(() => {
    getUserLocation();
  }, []);

  // Function to get user's location
  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapCenter({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error retrieving user location:", error);
    }
  };

  // Adjust the slider based on travel mode (walk or drive)
  const handleModeChange = (mode) => {
    setTravelMode(mode);
    // Reset distance when mode changes
    setSelectedDistance(mode === "walk" ? 250 : 1);
  };

  // Adjust slider and display distance in appropriate units
  const handleDistanceChange = (value) => {
    setSelectedDistance(Number(value));
    handleSearch(searchTerm, Number(value));
  };

  // Convert meters to miles for display when driving mode is selected
  const getDisplayedDistance = () => {
    if (travelMode === "walk") {
      return `${selectedDistance} meters`;
    }
    return `${selectedDistance} miles`;
  };

  const fetchBusinesses = async (term) => {
    const matchedTerm = checkForMatch(term);
    if (!matchedTerm) return;

    // Check if the data is already cached
    if (cache[matchedTerm]) {
      console.info(`Serving ${matchedTerm} from cache.`);
      return cache[matchedTerm]; // Return cached data
    }

    try {
      let data;
      if (matchedTerm === "coffee") {
        data = coffeeData;
      } else if (matchedTerm === "tshirt") {
        data = tshirtData;
      }
      const businesses = data.hits;
      cache[matchedTerm] = businesses; // Cache fetched data
      setMatchedBusinesses(businesses); // Set fetched businesses in state
      return businesses;
    } catch (error) {
      console.error("Error fetching business data:", error);
      return null; // Return null on error
    }
  };

  const handleSearch = useCallback(
    async (term) => {
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

      const unit = travelMode === "walk" ? "meters" : "miles";

      // Filter businesses based on search term and distance
      const matched = businesses.filter((business) => {
        const businessNameMatch = matchesTerm(business.document.name, term);

        const productMatch = business.document.products.some(
          (product) =>
            matchesTerm(product.name, term) ||
            product.keywords.some((keyword) => matchesTerm(keyword, term))
        );

        // Calculate the distance between user and business
        const businessDistance = calculateDistance(
          mapCenter.latitude, // User's latitude
          mapCenter.longitude, // User's longitude
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

      setMatchedBusinesses(matched);
    },
    [mapCenter, selectedDistance, travelMode]
  );

  // Function to populate map when submit is clicked
  const handleSubmit = () => {
    showMarkersOnMap(matchedBusinesses); // Populate the map
  };

  // Function to show markers on the map
  const showMarkersOnMap = (businesses) => {
    if (businesses.length === 0) return;

    const coordinatesArray = businesses.map((business) => ({
      latitude: business.document.coordinates[1],
      longitude: business.document.coordinates[0],
    }));

    // Adjust map to fit all markers
    if (coordinatesArray.length === 1) {
      const singleCoordinate = coordinatesArray[0];
      mapRef.current.animateToRegion({
        ...singleCoordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      mapRef.current.fitToCoordinates(coordinatesArray, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Sidebar */}
      <View style={styles.sidebar}>
        {/* Travel Mode Selection */}
        <View style={styles.travelModeContainer}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              travelMode === "walk" && styles.selectedModeButton,
            ]}
            onPress={() => handleModeChange("walk")}
          >
            <Text
              style={[
                styles.modeButtonText,
                travelMode === "walk" && styles.selectedModeButtonText,
              ]}
            >
              🚶 Walk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              travelMode === "drive" && styles.selectedModeButton,
            ]}
            onPress={() => handleModeChange("drive")}
          >
            <Text
              style={[
                styles.modeButtonText,
                travelMode === "drive" && styles.selectedModeButtonText,
              ]}
            >
              🚗 Drive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Distance Slider */}
        <View style={styles.distanceSliderContainer}>
          <Text style={styles.distanceLabel}>
            Select Distance: {getDisplayedDistance()}
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={travelMode === "walk" ? 250 : 1}
            maximumValue={travelMode === "walk" ? 2000 : 10}
            step={travelMode === "walk" ? 250 : 1}
            value={selectedDistance}
            onValueChange={handleDistanceChange}
          />
        </View>

        {/* Business search input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            placeholder="Type coffee or t-shirt..."
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Autocomplete business list */}
        <ScrollView style={styles.autocompleteList}>
          {searchTerm.length >= 3 && (
            <View>
              {matchedBusinesses.map((business) => (
                <View key={business.id} style={styles.businessItem}>
                  <Text style={styles.businessName}>
                    {business.document.name}
                  </Text>
                  {business.document.products.map((product, idx) => (
                    <Text key={idx} style={styles.productItem}>
                      {product.name} - {product.greenScore}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Right Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {/* UrlTile component for OSM tiles */}
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            tileSize={256}
          />

          {/* Markers for businesses */}
          {matchedBusinesses.map((business) => (
            <Marker
              key={business.id}
              coordinate={{
                latitude: business.document.coordinates[1],
                longitude: business.document.coordinates[0],
              }}
              title={business.document.name}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>
                    {business.document.name}
                  </Text>
                  {business.document.products.map((product, idx) => (
                    <Text key={idx}>
                      {product.name} - {product.greenScore}
                    </Text>
                  ))}
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 2,
  },
  map: {
    flex: 1,
  },
  travelModeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedModeButton: {
    backgroundColor: "#007AFF",
  },
  modeButtonText: {
    color: "#000",
  },
  selectedModeButtonText: {
    color: "#fff",
  },
  distanceSliderContainer: {
    marginVertical: 10,
  },
  distanceLabel: {
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
  },
  autocompleteList: {
    flex: 1,
  },
  businessItem: {
    marginBottom: 10,
  },
  businessName: {
    fontWeight: "bold",
  },
  productItem: {
    marginLeft: 10,
  },
  callout: {
    width: 150,
  },
  calloutTitle: {
    fontWeight: "bold",
  },
});

export default MapUI;
