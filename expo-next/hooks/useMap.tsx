import { useRef, useEffect, useState } from "react";
import maplibregl, { Marker } from "maplibre-gl";

import { initializeMap, showMarkersOnMap } from "@utils/maps/initialise";
import { Business } from "@components/MapContainer/types";

export const useMap = (
  mapCenter: [number, number],
  matchedBusinesses: Business[],
  apiKey: string,
) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const userMarkerRef = useRef<HTMLDivElement | null>(null);
  // this gives it one extra re-render to load the user marker on mount, no need to export the state
  const [, setIsUserMarkerReady] = useState(false);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize the map only once
      mapRef.current = initializeMap(
        mapContainerRef.current,
        mapCenter,
        apiKey,
      );

      const el = document.createElement("div");
      userMarkerRef.current = el; // Assign the DOM element to the ref

      // Add the user marker to the map for user location
      new maplibregl.Marker({ element: userMarkerRef.current })
        .setLngLat(mapCenter)
        .addTo(mapRef.current!);

      mapRef.current.setZoom(15);
      setIsUserMarkerReady(true);
    }
  }, [mapContainerRef, mapCenter, apiKey]);

  useEffect(() => {
    if (mapRef.current) {
      showMarkersOnMap(
        mapRef.current,
        matchedBusinesses,
        markersRef,
        mapCenter,
        mapCenter,
      );
    }
  }, [matchedBusinesses, mapCenter]);

  return { mapContainerRef, userMarkerRef };
};
