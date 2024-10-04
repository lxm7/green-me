import MapLibreGL, { Logger } from "@maplibre/maplibre-react-native";
import React, { useState, useRef } from "react";
import { TextInput, View, Text, FlatList } from "react-native";
import axios from "axios";
import data from "../../app/api/coffee.json";
const API_URL = "https://nominatim.openstreetmap.org/search";

MapLibreGL.setAccessToken(null); // MapLibre GL does not require an access token

// hides known issue: MapLibre [info] Request failed due to a permanent error: Canceled
// {"level": "warning", "message": "Request failed due to a permanent error: Canceled ", "tag": "Mbgl-HttpRequest"}
// expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
Logger.setLogCallback((log) => {
  const { message } = log;

  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed")
  ) {
    return true;
  }
  return false;
});

const MapUI = () => {
  const [region, setRegion] = useState({
    latitude: 51.4545, // Default to Bristol, UK
    longitude: -2.5879,
    zoomLevel: 14,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBusinesses, setMatchedBusinesses] = useState([]); // To hold the fetched businesses
  const mapRef = useRef(null); // Reference to the MapView

  // Function to fetch businesses from a local endpoint
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("/app/api/coffee.json"); // Fetch data from local JSON file
      const businesses = response.data.hits;
      setMatchedBusinesses(businesses); // Set fetched businesses in state
      return businesses;
    } catch (error) {
      console.error("Error fetching business data:", error); // Handle error
    }
  };

  // Function to search businesses and products by search term
  const handleSearch = async (term) => {
    setSearchTerm(term); // Update the search term
    if (term.length < 3) {
      setMatchedBusinesses([]); // Clear results if less than 3 characters
      return;
    }

    const businesses = await fetchBusinesses();
    // Filter businesses based on search term
    const matched = businesses.filter((business) => {
      const businessNameMatch = business.document.name
        .toLowerCase()
        .includes(term.toLowerCase());
      const productMatch = business.document.products.some(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.keywords.some((keyword) =>
            keyword.toLowerCase().includes(term.toLowerCase())
          )
      );
      return businessNameMatch || productMatch;
    });

    setMatchedBusinesses(matched); // Set the matched businesses
    showMarkersOnMap(matched); // Show markers on the map
  };

  // Function to show markers on the map
  const showMarkersOnMap = (businesses) => {
    if (mapRef.current) {
      // Optionally zoom and center the map based on business locations
      // Adjust region to the first business in the results, if any
      if (businesses.length > 0) {
        const firstBusiness = businesses[0].document.coordinates;
        mapRef.current.setCamera({
          centerCoordinate: [firstBusiness[0], firstBusiness[1]],
          zoomLevel: 14,
        });
      }
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Search Input */}
      <TextInput
        className="p-3 bg-white border rounded m-2"
        value={searchTerm}
        onChangeText={(text) => handleSearch(text)} // Handle search input
        placeholder="Search for coffee, products..."
      />

      {/* Business List */}
      {searchTerm.length >= 3 && (
        <FlatList
          data={matchedBusinesses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="p-3 border-b border-gray-300">
              <Text className="font-bold">{item.document.name}</Text>
              {item.document.products.map((product, idx) => (
                <Text key={idx} className="ml-2">
                  {product.name} - {product.greenScore}
                </Text>
              ))}
            </View>
          )}
        />
      )}

      {/* Map Section */}
      <MapLibreGL.MapView
        ref={mapRef}
        style={{ flex: 1 }}
        styleURL="https://demotiles.maplibre.org/style.json"
        zoomLevel={region.zoomLevel}
        centerCoordinate={[region.longitude, region.latitude]}
      >
        {matchedBusinesses.map((business, index) => {
          const { coordinates, name, products } = business.document;
          return (
            <MapLibreGL.MarkerView
              key={index}
              coordinate={[coordinates[0], coordinates[1]]}
            >
              <View className="bg-white p-2 rounded">
                <Text className="font-bold">{name}</Text>
                <Text>
                  Products: {products.map((product) => product.name).join(", ")}
                </Text>
              </View>
            </MapLibreGL.MarkerView>
          );
        })}
      </MapLibreGL.MapView>
    </View>
  );
};

export default MapUI;
