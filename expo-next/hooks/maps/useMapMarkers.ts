// @ts-nocheck
import { useEffect } from "react";
import maplibregl from "maplibre-gl";

const useMapMarkers = (map, businesses) => {
  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    if (map.markers) {
      map.markers.forEach((marker) => marker.remove());
    }
    map.markers = [];

    businesses.forEach((business) => {
      // Create and add marker
      const marker = new maplibregl.Marker()
        .setLngLat(business.document.coordinates)
        .addTo(map);

      map.markers.push(marker);
    });

    // Adjust map bounds if needed
  }, [map, businesses]);
};

export default useMapMarkers;
