import React from "react";
import { useMap } from "@hooks/useMap";
import UserMarker from "@components/UserMarker";
import { Business } from "@components/MapContainer/types";
import EventDetailPanel from "@components/EventDetailPanel";

interface MapComponentProps {
  mapCenter: number[]; // [longitude, latitude]
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
    <div ref={mapContainerRef} id="map" className="w-full h-full">
      <UserMarker container={userMarkerRef.current} />
      <EventDetailPanel />
    </div>
  );
};

export default MapComponent;
