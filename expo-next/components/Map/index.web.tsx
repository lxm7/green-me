import React, { useRef, useEffect, useState } from "react";
import maplibregl, {
  Map,
  Marker,
  NavigationControl,
  LngLatBounds,
} from "maplibre-gl";
import { Product, Business } from "@components/MapContainer/types";
import UserMarker from "@components/UserMarker"; // eslint-disable-line import/no-unresolved

interface MapComponentProps {
  mapCenter: [number, number]; // [longitude, latitude]
  matchedBusinesses: Business[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapCenter,
  matchedBusinesses,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const map = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  // Initialize the map
  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2-light/style.json?key=${process.env.EXPO_PUBLIC_MAPTILERS_API_KEY}`,
      center: mapCenter,
      zoom: 14,
    });

    getUserLocation();
    map.current.addControl(new NavigationControl(), "top-right");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map center when mapCenter prop changes
  useEffect(() => {
    if (map.current) {
      map.current.setCenter(mapCenter);
    }
  }, [mapCenter]);

  // Update markers when matchedBusinesses change
  useEffect(() => {
    showMarkersOnMap(matchedBusinesses);
  }, [matchedBusinesses]);

  // Function to get user's location
  const getUserLocation = () => {
    if (!map.current) return;

    const el = document.createElement("div");
    setMarkerContainer(el);

    // Add marker to map for user location
    new maplibregl.Marker({ element: el })
      .setLngLat(mapCenter)
      .addTo(map.current);
    map.current.setZoom(15);
  };

  // Function to show markers on the map
  const showMarkersOnMap = (businesses: Business[]) => {
    if (!map.current || businesses.length === 0) return;

    // Remove previous markers if any
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const coordinatesArray: [number, number][] = [];

    businesses.forEach((business) => {
      const { coordinates, name, products } = business.document;
      const highestGreenScoreProductAtBusiness = products.reduce(
        (max: Product | null, product: Product) =>
          product.greenScore > (max?.greenScore || 0) ? product : max,
        null,
      );

      const markerContent = highestGreenScoreProductAtBusiness
        ? `<div class="relative text-white text-center">
        ${
          // TODO: Make this more dynamic
          highestGreenScoreProductAtBusiness.greenScore >= 4.8
            ? `<div class="relative bottom-[-8px] left-[20px] bg-pink-500 w-fit px-1 rounded-md text-xs font-bold">
                Most Green
              </div>`
            : ""
        }
          <div class=" bg-purple-500 px-4 py-2 rounded-md mt-1 text-xs">
              ${highestGreenScoreProductAtBusiness.name} - ${highestGreenScoreProductAtBusiness.greenScore}<br>
              Co2e est: ${highestGreenScoreProductAtBusiness.co2e}
            <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500"></div>
          </div>
        </div>`
        : `<div class="relative bg-purple-500 text-white text-center px-4 py-2 rounded-md">
        ${name}
        <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500"></div>
      </div>`;

      // Create a DOM element for the marker
      const el = document.createElement("div");
      el.innerHTML = markerContent;
      const marker = new maplibregl.Marker({
        element: el,
        draggable: false,
      })
        .setLngLat(coordinates.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
      coordinatesArray.push(coordinates.coordinates);
    });

    // Adjust map bounds to fit all markers
    if (markersRef.current.length === 1) {
      const singleMarkerCoordinates = markersRef.current[0].getLngLat();
      map.current.setCenter(singleMarkerCoordinates);
      map.current.setZoom(16);
    } else if (coordinatesArray.length > 1) {
      const bounds = coordinatesArray.reduce(
        (bounds: LngLatBounds, coord) => bounds.extend(coord),
        new LngLatBounds(coordinatesArray[0], coordinatesArray[0]),
      );

      map.current.fitBounds(bounds, {
        padding: 120,
        maxZoom: 16,
      });
    }
  };

  return (
    <div ref={mapContainer} id="map" style={{ height: "100%", width: "100%" }}>
      <UserMarker container={markerContainer} />
    </div>
  );
};

export default MapComponent;
