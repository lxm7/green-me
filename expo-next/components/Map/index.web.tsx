import React from "react";
import { useMap } from "@hooks/useMap";
import UserMarker from "@components/UserMarker";
import { Business } from "@components/MapContainer/types";

interface MapComponentProps {
  mapCenter: [number, number]; // [longitude, latitude]
  matchedBusinesses: Business[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapCenter,
  matchedBusinesses,
}) => {
  const apiKey = process.env.EXPO_PUBLIC_MAPTILERS_API_KEY as string;
  const { mapContainerRef, userMarkerRef } = useMap(
    mapCenter,
    matchedBusinesses,
    apiKey,
  );

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{ height: "100%", width: "100%" }}
    >
      <UserMarker container={userMarkerRef.current} />
    </div>
  );
};

export default MapComponent;
