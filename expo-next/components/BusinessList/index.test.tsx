import React from "react";
import { FlatListProps } from "react-native";
import { render, screen } from "@testing-library/react-native";

import BusinessList from "@components/BusinessList";
import { Business } from "@components/MapContainer/types";

jest.mock("react-native/Libraries/Lists/FlatList", () => {
  const React = require("react");
  const { View } = require("react-native");

  // Return a custom mock component
  return class MockFlatList<T> extends React.Component<FlatListProps<T>> {
    render() {
      const { renderItem, data, ...restProps } = this.props;

      // Render a simple View with each item
      // For each item, call renderItem({ item, index })
      return (
        <View {...restProps} testID="mocked-flatlist">
          {data.map((item: FlatListProps<T>, index: number) =>
            renderItem({ item, index }),
          )}
        </View>
      );
    }
  };
});

const mockedBusinesses: Business[] = [
  {
    id: "eb7efa2d-ab1b-4a31-b3e2-599c12472eff",
    document: {
      co2e: 0.01,
      name: "(Mugshot) The Vegan Deli",
      image: "vegan_deli.jpg",
      score: 4.8,
      business: "deli",
      greenScore: 4.8,
      coordinates: {
        type: "Point",
        coordinates: [-2.598, 51.452],
      },
      publishedLCAs: ["niche cert"],
    },
  },
  {
    id: "ca91d66e-fa58-43cd-a6df-39b9eb1cf50d",
    document: {
      co2e: 0.01583,
      name: "(Mugshot) Bristol Brews",
      image: "bristol_brews.jpg",
      score: 4.5,
      business: "cafe",
      greenScore: 4.5,
      coordinates: {
        type: "Point",
        coordinates: [-2.595, 51.458],
      },
      publishedLCAs: [],
    },
  },
  {
    id: "1cfb001d-74ea-44de-a781-77cce4686909",
    document: {
      co2e: 0.01617,
      name: "(GreenCart) City Bakery",
      image: "city_bakery.jpg",
      score: 4.5,
      business: "bakery",
      greenScore: 4.5,
      coordinates: {
        type: "Point",
        coordinates: [-2.5935, 51.4565],
      },
      publishedLCAs: [],
    },
  },
];

describe("BusinessList Component", () => {
  test("renders businesses sorted by greenScore in descending order", () => {
    render(<BusinessList businesses={mockedBusinesses} />);

    // The item with the highest greenScore (4.8) should appear first
    const firstItem = screen.getByText("(Mugshot) The Vegan Deli");
    const secondItem = screen.getByText("(Mugshot) Bristol Brews");
    const thirdItem = screen.getByText("(GreenCart) City Bakery");
    const itemsInOrder = screen.getAllByText(
      /(\(Mugshot\) The Vegan Deli|\(Mugshot\) Bristol Brews|\(GreenCart\) City Bakery)/,
    );

    expect(itemsInOrder[0]).toBe(firstItem);
    expect(itemsInOrder[1]).toBe(secondItem);
    expect(itemsInOrder[2]).toBe(thirdItem);
  });

  test("displays correct basic info for each business", () => {
    render(<BusinessList businesses={mockedBusinesses} />);

    // Check for the business names
    expect(screen.getByText("(Mugshot) The Vegan Deli")).toBeTruthy();
    expect(screen.getByText("(Mugshot) Bristol Brews")).toBeTruthy();
    expect(screen.getByText("(GreenCart) City Bakery")).toBeTruthy();

    // Check for the greenScore
    expect(screen.getByText("Reward score: 4.8")).toBeTruthy();
    // expect(screen.getByText("Reward score: 95")).toBeTruthy();
    // expect(screen.getByText("Reward score: 60")).toBeTruthy();

    // Check CO2e text
    expect(screen.getByText("0.01")).toBeTruthy(); // Mugshot) The Vegan Deli
    expect(screen.getByText("0.01583")).toBeTruthy(); // (Mugshot) Bristol Brews
    expect(screen.getByText("0.01617")).toBeTruthy(); // (GreenCart) City Bakery

    // Check for the business type
    expect(screen.getByText("deli")).toBeTruthy();
    expect(screen.getByText("cafe")).toBeTruthy();
  });

  test("falls back to default LCA style when LCA is not found in LCAColorMap", () => {
    render(<BusinessList businesses={mockedBusinesses} />);

    // "Unknown Certification" is not in LCAColorMap, so it should use the default
    // color "bg-gray-300" (as indicated in the code snippet).
    // We can locate the element by text and check its class or style.

    const unknownLCAText = screen.getByText("niche cert");
    // Verify it has the fallback color style applied in the className:
    // (Note: With React Native + tailwind-rn or similar, you might need
    //        to adjust how you check for styles or classes.)
    expect(unknownLCAText.props.className).toContain("bg-gray-300");
  });
});
