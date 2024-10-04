import React, { useRef, useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import "maplibre-gl/dist/maplibre-gl.css";

const API_URL = "https://nominatim.openstreetmap.org/search";

const MapUI = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchInputRef = useRef(null); // Create a ref for the search input

  const [mapCenter, setMapCenter] = useState([-2.5879, 51.4545]); // Default to Bristol, UK
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedBusinesses, setMatchedBusinesses] = useState([]); // To hold the fetched businesses

  useEffect(() => {
    if (map.current) return; // Initialize map only once

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

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, [mapCenter]);

  // Function to fetch businesses from local endpoint
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("/app/api/coffee.json"); // Fetch data from local JSON file
      const businesses = response.data.hits;
      setMatchedBusinesses(businesses); // Set fetched businesses in state
      return businesses;
    } catch (error) {
      console.error("Error fetching business data:", error); // Handle error
    }
  };

  // Function to search businesses and products by search term
  const handleSearch = async (term) => {
    setSearchTerm(term); // Update the search term
    if (term.length < 3) {
      setMatchedBusinesses([]); // Clear results if less than 3 characters
      if (map.current.markers) {
        map.current.markers.forEach((marker) => marker.remove()); // Remove all markers
      }
      return;
    }

    const businesses = await fetchBusinesses();
    // Filter businesses based on search term
    const matched = businesses.filter((business) => {
      const businessNameMatch = business.document.name
        .toLowerCase()
        .includes(term.toLowerCase());
      const productMatch = business.document.products.some(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.keywords.some((keyword) =>
            keyword.toLowerCase().includes(term.toLowerCase())
          )
      );

      return businessNameMatch || productMatch;
    });

    setMatchedBusinesses(matched); // Set the matched businesses
    showMarkersOnMap(matched); // Show markers on the map

    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Keep the search input focused
    }
  };

  // Function to show markers on MapLibre map
  const showMarkersOnMap = (businesses) => {
    if (businesses.length === 0) return;
    // Remove previous markers if any
    if (map.current.markers) {
      map.current.markers.forEach((marker) => marker.remove());
    }
    map.current.markers = [];

    // Create an array to store coordinates for bounds adjustment
    const coordinatesArray = [];

    businesses.forEach((business) => {
      const { coordinates, name, products } = business.document;

      // Create a popup showing the business name and highscore product
      const highestGreenScoreProduct = products.reduce(
        (max, product) =>
          product.greenScore > (max?.greenScore || 0) ? product : max,
        null
      );

      // Create a popup showing the business name and highest greenScore product
      const popup = new maplibregl.Popup({ closeOnClick: false }).setHTML(
        `<strong>${name}</strong><br> ${highestGreenScoreProduct.name} - ${highestGreenScoreProduct.greenScore}`
      );

      // Create a marker for each business
      const marker = new maplibregl.Marker()
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current);

      marker.togglePopup();
      map.current.markers.push(marker);
      coordinatesArray.push(coordinates);
    });

    // If there are markers, adjust the map bounds to fit all markers
    // Fit the map to the bounds with some padding
    if (map.current.markers.length === 1) {
      // When there's only one marker, set the center and zoom manually
      const singleMarkerCoordinates = map.current.markers[0].getLngLat();
      map.current.setCenter(singleMarkerCoordinates);
      map.current.setZoom(16); // Set a reasonable zoom level for one marker
    } else {
      // When there are multiple markers, use fitBounds with padding
      const bounds = coordinatesArray.reduce(
        (bounds, coord) => bounds.extend(coord),
        new maplibregl.LngLatBounds(coordinatesArray[0], coordinatesArray[0])
      );

      map.current.fitBounds(bounds, {
        padding: 50, // Padding for multiple markers
        maxZoom: 17, // Ensure max zoom is respected
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      {/* Sidebar with Search */}
      <div className="w-1/3 p-4 bg-white">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          placeholder="Type coffee..."
          onChange={(e) => handleSearch(e.target.value)} // Call search handler
          className="w-full p-2 border rounded"
        />
        {searchTerm.length >= 3 && (
          <ul>
            {matchedBusinesses
              .sort((a, b) => {
                // If both a and b have null scores and are Independent
                if (
                  a.document.score === null &&
                  a.document.business === "Independent"
                )
                  return -1;
                if (
                  b.document.score === null &&
                  b.document.business === "Independent"
                )
                  return 1;

                // Sort by score in descending order otherwise
                return b.document.score - a.document.score;
              })
              .map((business) => (
                <li key={business.id} className="mt-4">
                  <strong>
                    {business.document.name} - Score:{" "}
                    {business.document.score || "n/a"}
                  </strong>
                  <ul>
                    {business.document.products
                      .sort((a, b) => b.greenScore - a.greenScore)
                      .map((product, idx) => (
                        <li key={idx}>
                          {product.name} - {product.greenScore}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Right Map Section */}
      <div className="w-2/3 relative">
        <div ref={mapContainer} className="h-full w-full" />
      </div>
    </div>
  );
};

export default MapUI;
