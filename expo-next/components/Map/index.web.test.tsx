import React from "react";
import { render, screen } from "@testing-library/react-native";
import { useMap } from "@hooks/useMap";
import UserMarker from "@components/UserMarker/index.web";
import EventDetailPanel from "@components/EventDetailPanel";
import MapComponent from "@components/Map/index.web";
import { Business } from "@components/MapContainer/types";

// Mock necessary components and hooks
jest.mock("@hooks/useMap", () => ({
  useMap: jest.fn(),
}));

jest.mock("@components/UserMarker", () => jest.fn(() => null));
jest.mock("@components/EventDetailPanel", () => jest.fn(() => null));

describe("MapComponent", () => {
  const mapCenter = [10, 20];
  const matchedBusinesses: Business[] = [
    {
      id: "1",
      document: {
        name: "Business 1",
        business: "business",
        score: 3,
        greenScore: 4,
        co2e: 0.01,
        image: "picture.jpg",
        publishedLCAs: null,
        coordinates: { type: "type", coordinates: [10, 20] },
      },
    },
  ];

  beforeEach(() => {
    (useMap as jest.Mock).mockReturnValue({
      MapComponentRef: { current: { id: "map" } },
      userMarkerRef: { current: { id: "user-marker" } },
    });
  });

  // it("renders the map container and child components", () => {
  //   render(
  //     <MapComponent
  //       mapCenter={mapCenter}
  //       matchedBusinesses={matchedBusinesses}
  //     />,
  //   );

  //   // Assert map container renders
  //   const mapContainer = screen.getByRole("region", { name: "map" });
  //   expect(mapContainer).toBeTruthy();

  //   // Ensure child components are rendered
  //   expect(UserMarker).toHaveBeenCalledWith(
  //     { container: { id: "map-marker" } },
  //     {},
  //   );
  //   expect(EventDetailPanel).toHaveBeenCalled();
  // });

  it("passes correct props to useMap hook", () => {
    render(
      <MapComponent
        mapCenter={mapCenter}
        matchedBusinesses={matchedBusinesses}
      />,
    );

    expect(useMap).toHaveBeenCalledWith(
      mapCenter,
      matchedBusinesses,
      process.env.EXPO_PUBLIC_MAPTILERS_API_KEY,
    );
  });
});
