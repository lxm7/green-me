import { Product } from "@components/MapContainer/types";
import maplibregl, {
  Marker,
  NavigationControl,
  LngLatBounds,
} from "maplibre-gl";
import { Business } from "@components/MapContainer/types";

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
) => {
  // Clear existing markers
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
              highestGreenScoreProductAtBusiness.greenScore >= 4.8
                ? `<div class="relative bottom-[-8px] left-[20px] bg-pink-500 w-fit px-1 rounded-md text-xs font-bold">
                  Most Green
                </div>`
                : ""
            }
            <div class="bg-purple-500 px-4 py-2 rounded-md mt-1 text-xs">
              ${highestGreenScoreProductAtBusiness.name} - ${highestGreenScoreProductAtBusiness.greenScore}<br>
              Co2e est: ${highestGreenScoreProductAtBusiness.co2e}
              <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500"></div>
            </div>
          </div>`
      : `<div class="relative bg-purple-500 text-white text-center px-4 py-2 rounded-md">
          ${name}
          <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500"></div>
        </div>`;

    const el = document.createElement("div");
    el.innerHTML = markerContent;
    const marker = new maplibregl.Marker({ element: el, draggable: false })
      .setLngLat(coordinates.coordinates)
      .addTo(map);

    markersRef.current.push(marker);
    coordinatesArray.push(coordinates.coordinates);
  });

  if (markersRef.current.length === 1) {
    const singleMarkerCoordinates = markersRef.current[0].getLngLat();
    map.setCenter(singleMarkerCoordinates);
    map.setZoom(16);
  } else if (coordinatesArray.length > 1) {
    const bounds = coordinatesArray.reduce(
      (bounds: LngLatBounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinatesArray[0], coordinatesArray[0]),
    );
    map.fitBounds(bounds, { padding: 120, maxZoom: 16 });
  }
};
