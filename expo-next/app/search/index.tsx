import { View, ActivityIndicator, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { FontAwesome } from "@expo/vector-icons";

// eslint-disable-next-line import/no-unresolved
import MapContainer from "@components/MapContainer";
import { useSession } from "@hooks/useSession";
import { useStore } from "@state/store/useStore";
import { Text } from "@components/ui/text";
import { Button } from "@components/ui/button";
import { H2, H4, P, Small } from "@components/ui/typography";
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
const error = false;

function App() {
  const { signOut } = useSession();

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
    <View>
      <View className="flex-row flex min-h-screen">
        {/* Left Sidebar */}
        <View className="w-96 p-4 border-r border-gray-200">
          <View className="flex-row flex items-center mb-8">
            <Image
              source={{
                uri: "https://placehold.co/40x40", // business.document.image
              }}
              className="h-[40px] w-[40px] rounded-full"
              alt="Profile avatar"
              resizeMode="cover"
            />
            <View className="ml-3">
              <H4 className="font-semibold text-gray-800">Alex Moreton</H4>
              <View className="flex-row flex items-center">
                <Small className="text-gray-600">Earned rewards: </Small>
                <Small className="text-purple-600">2377 (VET)</Small>
                <Small className="text-gray-400">($142)</Small>
              </View>
              <P className="text-sm text-gray-500">Bio / Summary</P>
            </View>
          </View>

          <View>
            {/* Business List */}
            <View className="flex overflow-y-auto">
              {searchTerm.length === 0 && (
                <View>
                  <Text>
                    Start searching for social popup events and green gatherings
                    and earn to tokens for your efforts
                  </Text>
                </View>
              )}
            </View>
            {isError && (
              <View className="flex-1 justify-center items-center">
                <Text>Error loading businesses: {error!.message}</Text>
              </View>
            )}
            {isLoading && (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="small" color="lightblue" />
              </View>
            )}
            <View className="flex-row flex flex-1 overflow-y-auto">
              {searchTerm.length >= 3 && businesses && (
                <BusinessList businesses={businesses} />
              )}
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1">
          <View className="p-6 flex-row flex justify-between items-center border-b border-gray-200">
            <H2 className="border-0 font-semibold">Find X-to-Earn Events</H2>
            <View className="flex-row flex items-center space-x-4">
              <Image
                src="https://placehold.co/24x16"
                alt="US flag"
                className="h-4"
              />
              <FontAwesome name="bell" className="text-gray-600" />

              <View className="flex-row flex items-center">
                <Button
                  className="bg-pink-500 py-2 px-4 rounded"
                  // onPress={handleShowMapMarkers}
                >
                  <Text className="font-semibold text-center rounded-lg">
                    Connect wallet
                  </Text>
                </Button>
              </View>
            </View>
          </View>
          {/* Map Section */}
          <MapContainer />
        </View>
      </View>

      <View className="p-4 relative z-10">
        <Text
          onPress={() => {
            signOut();
            router.replace("/intro");
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );
}

export default App;
