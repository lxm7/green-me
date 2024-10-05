import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Hardcoded business data
const businesses = [
  {
    id: 1,
    name: "Bristol Coffee",
    coordinates: { latitude: 51.4545, longitude: -2.5879 },
    score: 4.5,
    business: "Independent",
    products: [
      { name: "Eco Coffee Beans", greenScore: 85 },
      { name: "Organic Brew", greenScore: 90 },
    ],
  },
  {
    id: 2,
    name: "Eco T-Shirt Shop",
    coordinates: { latitude: 51.4575, longitude: -2.5909 },
    score: 4.0,
    business: "Chain",
    products: [
      { name: "Recycled Cotton T-Shirt", greenScore: 95 },
      { name: "Eco-Friendly Hoodie", greenScore: 80 },
    ],
  },
  // Add more businesses here if needed
];

// Helper function to normalize the term (lowercase and remove hyphens/spaces)
const normalizeTerm = (term) => term.toLowerCase().replace(/[-\s]/g, "");

// Function to check if a term matches a business or product
const matchesTerm = (string, term) => {
  const normalizedString = normalizeTerm(string);
  const normalizedTerm = normalizeTerm(term);
  return normalizedString.includes(normalizedTerm);
};

const MapUI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBusinesses, setMatchedBusinesses] = useState(businesses); // Initial state with all businesses

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
    if (term.length < 3) {
      setMatchedBusinesses([]); // Clear results if less than 3 characters
      return;
    }

    // Filter businesses based on search term
    const matched = businesses.filter((business) => {
      const businessNameMatch = matchesTerm(business.name, term);
      const productMatch = business.products.some((product) =>
        matchesTerm(product.name, term)
      );
      return businessNameMatch || productMatch;
    });

    setMatchedBusinesses(matched); // Set the matched businesses
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for coffee or t-shirts..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {/* Business List */}
      <ScrollView style={styles.scrollContainer}>
        {searchTerm.length >= 3 && matchedBusinesses.length > 0 ? (
          matchedBusinesses.map((business) => (
            <View key={business.id} style={styles.businessItem}>
              <Text style={styles.businessName}>
                {business.name} - Score: {business.score || "n/a"}
              </Text>
              {business.products.map((product, idx) => (
                <Text key={idx} style={styles.productItem}>
                  {product.name} - GreenScore: {product.greenScore}
                </Text>
              ))}
            </View>
          ))
        ) : (
          <Text>No matching businesses found</Text>
        )}
      </ScrollView>

      {/* Map Section */}
      <MapView
        style={styles.map}
        provider={null}
        cacheEnabled={true}
        initialRegion={{
          latitude: 51.4545,
          longitude: -2.5879,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        tileOverlay={{
          urlTemplate: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", // Use OSM tiles
          tileSize: 256,
        }}
      >
        {matchedBusinesses.map((business) => (
          <Marker
            key={business.id}
            coordinate={business.coordinates}
            title={business.name}
            description={`Score: ${business.score}`}
          >
            <Callout>
              <View style={styles.callout}>
                <Text>{business.name}</Text>
                {business.products.map((product, idx) => (
                  <Text key={idx}>
                    {product.name} - GreenScore: {product.greenScore}
                  </Text>
                ))}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
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
  map: {
    width: "100%",
    height: "50%",
  },
  callout: {
    width: 150,
  },
});

export default MapUI;
