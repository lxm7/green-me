import React, { useRef, useState, useEffect, useCallback } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import "maplibre-gl/dist/maplibre-gl.css";

import { checkForMatch, matchesTerm } from "./utils";

const cache = {
  coffee: null,
  tshirt: null,
};

const API_URL = "https://nominatim.openstreetmap.org/search";

const MapUI = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchInputRef = useRef(null); // Create a ref for the search input

  const [mapCenter, setMapCenter] = useState([-2.5879, 51.4545]); // Default to Bristol, UK
  const [searchTerm, setSearchTerm] = useState("");
  const [geolocationResults, setGeolocationResults] = useState([]);
  const [matchedBusinesses, setMatchedBusinesses] = useState([]); // To hold the fetched businesses
  const [travelMode, setTravelMode] = useState("walk"); // Default is Walk
  const [selectedDistance, setSelectedDistance] = useState(250); // Default distance is 1 mile

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
    getUserLocation();
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, [mapCenter]);

  // Function to get user's location
  const getUserLocation = () => {
    // mocked for now
    setMapCenter(mapCenter);
    // Add marker to map for user location
    new maplibregl.Marker({ color: "red" })
      .setLngLat(mapCenter)
      .addTo(map.current);
    map.current.setZoom(15);
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    //       setUserLocation([longitude, latitude]); // Set the user's location
    //       setMapCenter([longitude, latitude]); // Center the map on user's location

    //       // Add marker to map for user location
    //       const userMarker = new maplibregl.Marker({ color: "red" })
    //         .setLngLat([longitude, latitude])
    //         .addTo(map.current);

    //       map.current.setCenter([longitude, latitude]); // Center map on user
    //       map.current.setZoom(15); // Zoom closer to the user's location
    //     },
    //     (error) => {
    //       setMapCenter(mapCenter);
    //       console.error("Error retrieving user location:", error);
    //     }
    //   );
    // } else {
    //   console.error("Geolocation is not supported by this browser.");
    // }
  };

  // Helper function to calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2, unit = "miles") => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = unit === "miles" ? 3958.8 : 6371 * 1000; // Radius of Earth: 3958.8 miles or 6371 km (converted to meters)

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance; // Distance in the selected unit (either miles or meters)
  };

  // Function to fetch businesses from local endpoint
  const fetchBusinesses = async (term) => {
    const matchedTerm = checkForMatch(term);
    if (!matchedTerm) return;

    // Check if the data is already cached
    if (cache[matchedTerm]) {
      console.info(`Serving ${matchedTerm} from cache.`);
      return cache[matchedTerm]; // Return cached data
    }

    try {
      const response = await axios.get(`/app/api/${matchedTerm}.json`);
      const businesses = response.data.hits;
      cache[matchedTerm] = businesses; // Cache fetched data
      setMatchedBusinesses(businesses); // Set fetched businesses in state
      return businesses;
    } catch (error) {
      console.error("Error fetching business data:", error);
      return null; // Return null on error
    }
  };

  // Function to fetch geolocation data from OpenStreetMap
  // const fetchGeolocation = async (query) => {
  //   try {
  //     const response = await axios.get(API_URL, {
  //       params: {
  //         q: query,
  //         format: "json",
  //         addressdetails: 1,
  //         limit: 5, // Limit results to 5
  //       },
  //     });

  //     setGeolocationResults(response.data);
  //   } catch (error) {
  //     console.error("Error fetching geolocation data:", error);
  //   }
  // };

  // Handle geolocation search
  // const handleGeolocationSearch = async (term) => {
  //   setGeolocationTerm(term);
  //   if (term.length >= 3) {
  //     fetchGeolocation(term);
  //   } else {
  //     setGeolocationResults([]); // Clear results if less than 3 characters
  //   }
  // };

  // Adjust the slider based on travel mode (walk or drive)
  const handleModeChange = (mode) => {
    setTravelMode(mode);
    // Remove all existing markers on the map
    if (map.current.markers) {
      map.current.markers.forEach((marker) => marker.remove());
      map.current.markers = []; // Clear the marker array
    }

    if (mode === "walk") {
      // Reset distance to the nearest 250m increment if switching to walk
      setSelectedDistance(250);
    } else {
      // Reset distance to the nearest 1 mile increment if switching to drive
      setSelectedDistance(1);
    }
  };

  // Adjust slider and display distance in appropriate units
  const handleDistanceChange = (e, distance) => {
    const value = e.target.value;
    setSelectedDistance(Number(value));
    handleSearch(searchTerm, distance);
  };

  // Convert meters to miles for display in miles when driving mode is selected
  const getDisplayedDistance = () => {
    if (travelMode === "walk") {
      return `${selectedDistance} meters`;
    }
    return `${selectedDistance} miles`;
  };

  const handleSearch = useCallback(
    async (term) => {
      setSearchTerm(term);
      if (term.length < 3) {
        setMatchedBusinesses([]); // Clear if less than 3 characters
        return;
      }

      // Ensure caches are populated
      if (!cache.coffee) {
        await fetchBusinesses("coffee");
      }
      if (!cache.tshirt) {
        await fetchBusinesses("tshirt");
      }

      const businesses = [...(cache.coffee || []), ...(cache.tshirt || [])];
      if (!businesses || businesses.length === 0) return;

      const unit = travelMode === "walk" ? "meters" : "miles"; // Use meters for walk, miles for drive

      // Filter businesses based on search term
      const matched = businesses.filter((business) => {
        const businessNameMatch = matchesTerm(business.document.name, term);

        const productMatch = business.document.products.some(
          (product) =>
            matchesTerm(product.name, term) ||
            product.keywords.some((keyword) => matchesTerm(keyword, term))
        );

        // Calculate the distance between user and business
        const businessDistance = calculateDistance(
          mapCenter[1], // User's latitude
          mapCenter[0], // User's longitude
          business.document.coordinates[1], // Business latitude
          business.document.coordinates[0], // Business longitude
          unit
        );

        // Filter based on distance and search term
        return (
          (businessNameMatch || productMatch) &&
          businessDistance <= selectedDistance
        );
      });

      setMatchedBusinesses(matched); // Update autocomplete list
    },
    [mapCenter, selectedDistance, travelMode]
  );

  // Function to populate map when submit is clicked
  const handleSubmit = () => {
    showMarkersOnMap(matchedBusinesses); // Populate the map
  };

  // Function to center the map to selected geolocation
  const centerMapToGeolocation = (place) => {
    const boundingbox = place.boundingbox.map(Number);
    const bounds = [
      [boundingbox[2], boundingbox[0]], // Southwest [west_longitude, south_latitude]
      [boundingbox[3], boundingbox[1]], // Northeast [east_longitude, north_latitude]
    ];
    map.current.fitBounds(bounds, {
      padding: 50, // Padding around the box
      maxZoom: 14, // Optional: limit the maximum zoom level
    });
    // const coordinates = [place.lon, place.lat];
    // setMapCenter(coordinates); // Update map center to selected location
    setGeolocationResults([]); // Clear the dropdown after selection
  };

  // Function to show markers on the map
  const showMarkersOnMap = (businesses) => {
    if (businesses.length === 0) return;

    // Remove previous markers if any
    if (map.current.markers) {
      map.current.markers.forEach((marker) => marker.remove());
    }
    map.current.markers = [];

    const coordinatesArray = [];

    businesses.forEach((business) => {
      const { coordinates, name, products } = business.document;
      const highestGreenScoreProduct = products.reduce(
        (max, product) =>
          product.greenScore > (max?.greenScore || 0) ? product : max,
        null
      );

      const popup = new maplibregl.Popup({ closeOnClick: false }).setHTML(
        `<strong>${name}</strong><br> ${highestGreenScoreProduct.name} - ${highestGreenScoreProduct.greenScore}`
      );

      const marker = new maplibregl.Marker()
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current);

      marker.togglePopup();
      map.current.markers.push(marker);
      coordinatesArray.push(coordinates);
    });

    // Adjust map bounds to fit all markers
    if (map.current.markers.length === 1) {
      const singleMarkerCoordinates = map.current.markers[0].getLngLat();
      map.current.setCenter(singleMarkerCoordinates);
      map.current.setZoom(16);
    } else {
      const bounds = coordinatesArray.reduce(
        (bounds, coord) => bounds.extend(coord),
        new maplibregl.LngLatBounds(coordinatesArray[0], coordinatesArray[0])
      );

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 17,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 p-4 bg-white h-screen flex flex-col">
        {/* Geolocation search input */}

        {/* Travel Mode Selection */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex space-x-4 mb-4">
            <button
              className={`py-2 px-4 rounded-full ${
                travelMode === "walk"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handleModeChange("walk")}
            >
              🚶 Walk
            </button>
            <button
              className={`py-2 px-4 rounded-full ${
                travelMode === "drive"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handleModeChange("drive")}
            >
              🚗 Drive
            </button>
          </div>

          {/* Distance Slider */}
          <div className="w-full mt-4">
            <label htmlFor="distance" className="block text-gray-700">
              (Select Distance: {getDisplayedDistance()})
            </label>
            <input
              id="distance"
              type="range"
              min={travelMode === "walk" ? 250 : 1}
              max={travelMode === "walk" ? 2000 : 10}
              step={travelMode === "walk" ? 250 : 1}
              value={selectedDistance}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Geolocation dropdown */}
          {geolocationResults.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded mt-2">
              {geolocationResults.map((place, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => centerMapToGeolocation(place)}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
          {/* Business search input */}
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              placeholder="Type coffee or t-shirt..."
              onChange={(e) => handleSearch(e.target.value, null)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Autocomplete business list */}
        <div className="overflow-y-scroll flex-grow mt-4">
          {searchTerm.length >= 3 && (
            <ul>
              {matchedBusinesses.map((business) => (
                <li key={business.id} className="mt-4">
                  <strong>{business.document.name}</strong>
                  <ul>
                    {business.document.products.map((product, idx) => (
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
      </div>

      {/* Right Map Section */}
      <div className="w-2/3 relative">
        <div ref={mapContainer} className="h-full w-full" />
      </div>
    </div>
  );
};

export default MapUI;
