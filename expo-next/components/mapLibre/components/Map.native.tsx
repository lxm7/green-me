// components/MapComponent.native.tsx
import React, { useRef, useEffect } from "react";
import MapView, {
  Marker,
  Callout,
  UrlTile,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import { matchesTerm, calculateDistance } from "../../../utils/maps";

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

interface MapComponentProps {
  mapCenter: [number, number]; // [longitude, latitude]
  matchedBusinesses: Business[];
  selectedDistance: number;
  travelMode: "walk" | "drive";
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapCenter,
  matchedBusinesses,
  selectedDistance,
  travelMode,
}) => {
  const mapRef = useRef<MapView | null>(null);

  // Adjust map center when mapCenter prop changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mapCenter[1],
        longitude: mapCenter[0],
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [mapCenter]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: mapCenter[1],
        longitude: mapCenter[0],
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      provider={PROVIDER_DEFAULT}
    >
      {/* Use OpenStreetMap tiles */}
      <UrlTile
        urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />

      {/* User location marker */}
      <Marker
        coordinate={{ latitude: mapCenter[1], longitude: mapCenter[0] }}
        pinColor="red"
      />

      {/* Business markers */}
      {matchedBusinesses.map((business: Business) => {
        const { coordinates, name, products } = business.document;
        const highestGreenScoreProduct = products.reduce(
          (max: Product | null, product) =>
            product.greenScore > (max?.greenScore || 0) ? product : max,
          null
        );

        const popupContent = highestGreenScoreProduct
          ? `${name}\n${highestGreenScoreProduct.name} - ${highestGreenScoreProduct.greenScore}`
          : name;

        return (
          <Marker
            key={business.id}
            coordinate={{
              latitude: coordinates[1],
              longitude: coordinates[0],
            }}
          >
            <Callout>
              <Text>{popupContent}</Text>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
