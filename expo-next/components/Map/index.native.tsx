import React, { useRef, useEffect } from "react";
import MapView, {
  Marker,
  Callout,
  UrlTile,
  PROVIDER_DEFAULT,
  Circle,
  Region,
} from "react-native-maps";
import { Text } from "react-native";
import { Product, Business } from "@components/MapContainer/types";

interface MapComponentProps {
  mapCenter: { latitude: number; longitude: number };
  matchedBusinesses: Business[];
  onCenterChange?: (lat: number, lng: number) => void;
  radius?: number; // in meters
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapCenter,
  matchedBusinesses,
  onCenterChange,
  radius,
}) => {
  const mapRef = useRef<MapView | null>(null);

  // Adjust map center when mapCenter prop changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: mapCenter.latitude,
          longitude: mapCenter.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000, // Duration in milliseconds
      );
    }
  }, [mapCenter]);

  const handleRegionChangeComplete = (region: Region) => {
    if (onCenterChange) {
      onCenterChange(region?.latitude, region?.longitude);
    }
  };

  return (
    <MapView
      ref={mapRef}
      className="flex-1"
      initialRegion={{
        latitude: mapCenter.latitude,
        longitude: mapCenter.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      provider={PROVIDER_DEFAULT}
      onRegionChangeComplete={handleRegionChangeComplete}
    >
      {/* Use OpenStreetMap tiles */}
      <UrlTile
        urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />

      {/* User location marker */}
      <Marker
        coordinate={{
          latitude: mapCenter.latitude,
          longitude: mapCenter.longitude,
        }}
        pinColor="red"
      />

      {/* Search radius circle */}
      {radius && (
        <Circle
          center={{
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude,
          }}
          radius={radius}
          strokeColor="#ff0000"
          fillColor="rgba(255, 0, 0, 0.1)"
        />
      )}

      {/* Business markers */}
      {matchedBusinesses.map((business: Business) => {
        const { coordinates, name, products } = business.document;

        // Ensure coordinates are [longitude, latitude]
        // If not, adjust the indices accordingly
        const businessLatitude = coordinates.coordinates[1];
        const businessLongitude = coordinates.coordinates[0];

        // Verify that businessLatitude and businessLongitude are valid numbers
        if (
          typeof businessLatitude !== "number" ||
          typeof businessLongitude !== "number"
        ) {
          console.warn(`Invalid coordinates for business ${name}`);
          return null;
        }

        const highestGreenScoreProduct = products.reduce(
          (max: Product | null, product) =>
            product.greenScore > (max?.greenScore || 0) ? product : max,
          null,
        );

        const popupContent = highestGreenScoreProduct
          ? `${name}\n${highestGreenScoreProduct.name} - ${highestGreenScoreProduct.greenScore}`
          : name;

        return (
          <Marker
            key={business.id}
            coordinate={{
              latitude: coordinates.coordinates[1],
              longitude: coordinates.coordinates[0],
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
