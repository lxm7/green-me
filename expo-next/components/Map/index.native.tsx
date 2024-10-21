import React, { useRef } from "react";
import MapboxGL from "@rnmapbox/maps";
import { View } from "react-native";
import { Product, Business } from "@components/MapContainer/types";
import CustomMarker from "@components/UserMarker";
interface MapComponentProps {
  mapCenter: { latitude: number; longitude: number };
  matchedBusinesses: Business[];
  onCenterChange?: (lat: number, lng: number) => void;
  radius?: number; // in meters
}

const getCircleRadius = (
  radiusInMeters: number,
  latitude: number,
  zoomLevel: number,
) => {
  const earthCircumference = 40075016.686; // Earth's circumference in meters
  const latitudeRadians = (latitude * Math.PI) / 180;
  const metersPerPixel =
    (earthCircumference * Math.cos(latitudeRadians)) /
    Math.pow(2, zoomLevel + 8);
  return radiusInMeters / metersPerPixel;
};

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPTILERS_API_KEY as string);

const MapComponent: React.FC<MapComponentProps> = ({
  mapCenter,
  matchedBusinesses,
  onCenterChange,
  radius,
}) => {
  const mapRef = useRef<MapboxGL.MapView>(null);

  const handleRegionDidChange = async () => {
    if (onCenterChange && mapRef.current) {
      const center = await mapRef.current.getCenter();
      if (center && center.length === 2) {
        const [longitude, latitude] = center;
        onCenterChange(latitude, longitude); // Pass (lat, lng)
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        ref={mapRef}
        style={{ flex: 1 }}
        styleURL={`https://api.maptiler.com/maps/streets-v2-light/style.json?key=${process.env.EXPO_PUBLIC_MAPTILERS_API_KEY}`}
        onMapIdle={handleRegionDidChange}
      >
        <MapboxGL.Camera
          centerCoordinate={[mapCenter.longitude, mapCenter.latitude]}
          zoomLevel={12}
        />
        {/* User location marker */}
        <MapboxGL.PointAnnotation
          id="user-location"
          coordinate={[mapCenter.longitude, mapCenter.latitude]}
        >
          <CustomMarker />
        </MapboxGL.PointAnnotation>

        {/* Search radius circle */}
        {radius && (
          <MapboxGL.ShapeSource
            id="circle-source"
            shape={{
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [mapCenter.longitude, mapCenter.latitude],
              },
              properties: {},
            }}
          >
            <MapboxGL.CircleLayer
              id="circle-layer"
              style={{
                circleRadius: getCircleRadius(radius, mapCenter.latitude, 12),
                circleColor: "rgba(255, 0, 0, 0.1)",
                circleStrokeColor: "#ff0000",
                circleStrokeWidth: 2,
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {/* Business markers */}
        {matchedBusinesses.map((business: Business) => {
          const { coordinates, name, products } = business.document;
          const highestGreenScoreProduct = products.reduce(
            (max: Product | null, product) =>
              product.greenScore > (max?.greenScore || 0) ? product : max,
            null,
          );

          const popupContent = highestGreenScoreProduct
            ? `${name}\n${highestGreenScoreProduct.name} - ${highestGreenScoreProduct.greenScore}`
            : name;

          return (
            <MapboxGL.PointAnnotation
              key={business.id}
              id={business.id}
              coordinate={[
                coordinates.coordinates[0],
                coordinates.coordinates[1],
              ]}
            >
              <MapboxGL.Callout title={popupContent} />
            </MapboxGL.PointAnnotation>
          );
        })}
      </MapboxGL.MapView>
    </View>
  );
};

export default MapComponent;
