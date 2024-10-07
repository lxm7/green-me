// components/MapComponent.web.tsx
import React, { useRef, useEffect } from "react";
import maplibregl, {
  Map,
  Marker,
  Popup,
  NavigationControl,
  LngLatBounds,
} from "maplibre-gl";
import { Business, Product } from "../types";
import style from "../mapStyle.json";
interface MapComponentProps {
  mapCenter: [number, number]; // [longitude, latitude]
  matchedBusinesses: Business[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapCenter,
  matchedBusinesses,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  // Initialize the map
  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", // OSM Raster Tiles
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: mapCenter,
      zoom: 14,
    });

    getUserLocation();
    map.current.addControl(new NavigationControl(), "top-right");
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

    // Add marker to map for user location
    new Marker({ color: "red" }).setLngLat(mapCenter).addTo(map.current);
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
      const highestGreenScoreProduct = products.reduce(
        (max: Product | null, product) =>
          product.greenScore > (max?.greenScore || 0) ? product : max,
        null
      );

      const popupContent = highestGreenScoreProduct
        ? `<strong>${name}</strong><br> ${highestGreenScoreProduct.name} - ${highestGreenScoreProduct.greenScore}`
        : `<strong>${name}</strong>`;

      const popup = new Popup({ closeOnClick: false }).setHTML(popupContent);

      const marker = new Marker()
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      marker.togglePopup();
      markersRef.current.push(marker);
      coordinatesArray.push(coordinates);
    });

    // Adjust map bounds to fit all markers
    if (markersRef.current.length === 1) {
      const singleMarkerCoordinates = markersRef.current[0].getLngLat();
      map.current.setCenter(singleMarkerCoordinates);
      map.current.setZoom(16);
    } else if (coordinatesArray.length > 1) {
      const bounds = coordinatesArray.reduce(
        (bounds: LngLatBounds, coord) => bounds.extend(coord),
        new LngLatBounds(coordinatesArray[0], coordinatesArray[0])
      );

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 17,
      });
    }
  };

  return <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />;
};

export default MapComponent;
