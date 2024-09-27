import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";

const MapLibreWebMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", // Map style URL
      center: [-74.006, 40.7128], // New York City
      zoom: 12,
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-64" />;
};

export default MapLibreWebMap;
