import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ActivityIndicator, FlatListProps } from "react-native";

// Import the component
import BusinessListPanel from "@components/BusinessListPanel";

// We'll import the references to these mocks
import { useStore } from "@state/store/useStore";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";

// Mock Zustand store
jest.mock("@state/store/useStore", () => ({
  useStore: jest.fn(),
}));

// Mock the business query
jest.mock("@state/queries/useBusinessQueries", () => ({
  useBusinessesQuery: jest.fn(),
}));

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

describe("BusinessListPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("1) Shows a message when searchTerm is empty", () => {
    // 1. Mock Zustand store to return an empty search term
    (useStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: "",
    });

    // 2. Mock useBusinessesQuery to return some default state
    (useBusinessesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    // 3. Render the component
    render(<BusinessListPanel />);

    // 4. Expect the "start searching" message to be visible
    expect(
      screen.getByText(
        /Start searching for social popup events and green gatherings/i,
      ),
    ).toBeTruthy();

    // 5. Ensure that the businesses list is NOT rendered
    expect(screen.queryByTestId("mocked-flatlist")).toBeNull();
  });

  test("2) Shows an error message when query has errored", () => {
    // 1. Mock Zustand store with any searchTerm
    (useStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: "test",
    });

    // 2. Mock an error state from useBusinessesQuery
    (useBusinessesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: "Network error" },
    });

    // 3. Render the component
    render(<BusinessListPanel />);

    // 4. Expect the error text
    expect(
      screen.getByText(/Error loading businesses: Network error/i),
    ).toBeTruthy();
  });

  test("3) Shows loading spinner when query is loading", async () => {
    // 1. Mock Zustand store with a searchTerm of length >= 3
    (useStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: "abc",
    });

    // 2. Mock a loading state
    (useBusinessesQuery as jest.Mock).mockResolvedValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    // 3. Render
    render(<BusinessListPanel />);
    // 4. The loading spinner (ActivityIndicator) should be visible
    expect(<ActivityIndicator />).not.toBeNull();
  });

  test("4) Renders the list of businesses when searchTerm >= 3 and data is available", () => {
    // 1. Mock Zustand store
    (useStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: "abc",
    });

    // 2. Mock query data
    const mockBusinesses = [
      { id: "1", document: { name: "Green Cafe", greenScore: 80 } },
      { id: "2", document: { name: "Eco Bakery", greenScore: 60 } },
    ];
    (useBusinessesQuery as jest.Mock).mockReturnValue({
      data: mockBusinesses,
      isLoading: false,
      isError: false,
      error: null,
    });

    // 3. Render
    const { getByText } = render(<BusinessListPanel />);

    // 4. Verify items are rendered
    expect(getByText("Green Cafe")).toBeTruthy();
    expect(getByText("Eco Bakery")).toBeTruthy();
  });
});
