import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useShallow } from "zustand/react/shallow";

// eslint-disable-next-line import/no-unresolved
import MapContainer from "@components/MapContainer";
import Header from "@components/Header";
import UserSummary from "@components/UserSummary";
import BusinessListPanel from "@components/BusinessListPanel";
import { useStore } from "@state/store/useStore";
import { Text } from "@components/ui/text";
import BusinessList from "@components/BusinessList";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";

const businesses = [
  {
    id: "eb7efa2d-ab1b-4a31-b3e2-599c12472eff",
    document: {
      co2e: 0.01,
      name: "(Mugshot) The Vegan Deli",
      image: "vegan_deli.jpg",
      score: 4.8,
      business: "deli",
      products: [
        {
          name: "Coffee",
          price: 2.5,
          business: "deli",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 45.0,
        },
      ],
      greenScore: 4.8,
      coordinates: {
        type: "Point",
        coordinates: [-2.598, 51.452],
      },
      publishedLCAs: ["Carbon Trust", "Fair Trade", "Carbon Neutral"],
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
      products: [
        {
          name: "Flat White",
          price: 3.2,
          business: "cafe",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 44.0,
        },
        {
          name: "Americano",
          price: 2.8,
          business: "cafe",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 41.0,
        },
        {
          name: "Espresso",
          price: 2.5,
          business: "cafe",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 47.0,
        },
      ],
      greenScore: 4.5,
      coordinates: {
        type: "Point",
        coordinates: [-2.595, 51.458],
      },
      publishedLCAs: ["OEKO-TEX"],
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
      products: [
        {
          name: "Latte",
          price: 3.5,
          business: "bakery",
          category: "coffee",
          keywords: ["coffee"],
          available: true,
          coordinates: {
            type: "Point",
            coordinates: [-2.5971, 51.4548],
          },
          environmentScore: 41.0,
        },
      ],
      greenScore: 4.5,
      coordinates: {
        type: "Point",
        coordinates: [-2.5935, 51.4565],
      },
      publishedLCAs: ["Carbon Trust"],
    },
  },
];

const isLoading = false;
const isError = false;
const error = {} as Error;

function App() {
  const { searchTerm } = useStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
    })),
  );

  // const {
  //   data: businesses,
  //   isLoading,
  //   isError,
  //   error,
  // } = useBusinessesQuery(searchTerm);

  return (
    <View className="flex-row flex min-h-screen">
      {/* Left Sidebar */}
      <View className="w-96 p-4 border-r border-gray-200">
        <UserSummary />

        <BusinessListPanel
          searchTerm={searchTerm}
          isLoading={isLoading}
          isError={isError}
          error={error}
          businesses={businesses}
        />
      </View>

      {/* Main Content */}
      <View className="flex-1">
        <Header />
        <MapContainer />
      </View>
    </View>
  );
}

export default App;
