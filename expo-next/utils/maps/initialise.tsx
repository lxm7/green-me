import maplibregl, {
  Marker,
  NavigationControl,
  LngLatBounds,
} from "maplibre-gl";
import { createRoot } from "react-dom/client";

import { Business } from "@components/MapContainer/types";
import MarkerInfo from "@components/MarkerInfo";
import { useBusinessStore } from "@state/store/useBusinessStore";

// Utility to initialize and update the map
export const initializeMap = (
  mapContainer: HTMLDivElement,
  mapCenter: [number, number],
  apiKey: string,
) => {
  const map = new maplibregl.Map({
    container: mapContainer,
    style: `https://api.maptiler.com/maps/streets-v2-light/style.json?key=${apiKey}`,
    center: mapCenter,
    zoom: 14,
  });

  map.addControl(new NavigationControl(), "top-right");
  return map;
};

// Utility to show markers on the map
export const showMarkersOnMap = (
  map: maplibregl.Map,
  businesses: Business[],
  markersRef: React.MutableRefObject<Marker[]>,
  mapCenter: [number, number],
  userCoordinates: [number, number],
) => {
  // Clear existing markers
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];

  const coordinatesArray: [number, number][] = [];

  const greenScores = businesses.map(
    (business) => business.document.greenScore,
  );

  // Find the highest greenScore using Math.max
  const highestGreenScore = Math.max(...greenScores);
  const { setSelectedBusiness } = useBusinessStore.getState();

  businesses.forEach((business) => {
    const { coordinates, greenScore } = business.document;

    const el = document.createElement("div");
    // Render the MarkerInfo component into the element
    const root = createRoot(el);
    root.render(
      <MarkerInfo
        business={business}
        isHighest={greenScore === highestGreenScore}
      />,
    );

    // const markerContent = greenScore
    //   ? `
    //     <div class="relative">
    //       ${
    //         highestGreenScore === greenScore
    //           ? `<div class="w-full relative bottom-[-8px] text-white text-center bg-pink-500 px-1 rounded-sm text-xs font-bold">
    //             Most Rewards*
    //           </div>`
    //           : ""
    //       }
    //       <div class="bg-white px-4 py-2 rounded-md mt-1 text-xs">
    //         <div class="relative flex items-center">
    //           <img src="https://placehold.co/40x40" alt="${name}" class="w-12 h-12 pr-2" />
    //           <div>
    //             <div class="font-semibold">${name} - ${greenScore}</div>
    //             Co2e est: ${co2e}<br>
    //             March 29th: 10AM - 2PM
    //           </div>
    //           <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500"></div>
    //         </div>
    //       </div>
    //     </div>
    //   `
    //   : `<div class="relative bg-white px-4 py-2 rounded-md">
    //       ${name}
    //       <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500"></div>
    //     </div>`;

    // el.innerHTML = markerContent;
    const marker = new maplibregl.Marker({ element: el, draggable: false })
      .setLngLat(coordinates.coordinates)
      .addTo(map);

    marker.getElement().addEventListener("click", () => {
      setSelectedBusiness(business);
    });

    markersRef.current.push(marker);
    coordinatesArray.push(coordinates.coordinates);
  });
  // Include the user's coordinates in the coordinates array
  coordinatesArray.push(userCoordinates);

  if (markersRef.current.length === 1) {
    const singleMarkerCoordinates = markersRef.current[0].getLngLat();
    map.setCenter(singleMarkerCoordinates);
    map.setZoom(16);
  } else if (coordinatesArray.length > 1) {
    const bounds = coordinatesArray.reduce(
      (bounds: LngLatBounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinatesArray[0], coordinatesArray[0]),
    );
    map.fitBounds(bounds, { padding: 160, maxZoom: 16 });
  }
};
