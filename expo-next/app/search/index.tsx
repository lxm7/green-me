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
import { H2, H3, H4, P, Small } from "@components/ui/typography";
import BusinessList from "@components/BusinessList";
import { useBusinessesQuery } from "@state/queries/useBusinessQueries";

function App() {
  const { signOut } = useSession();

  const { searchTerm } = useStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
    })),
  );

  const {
    data: businesses,
    isLoading,
    isError,
    error,
  } = useBusinessesQuery(searchTerm);

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
                <Small className="text-purple-600">2377</Small>
                <Small className="mx-1">-</Small>
                <Small className="text-gray-600">TOKEN</Small>
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

      {/* Right Sidebar */}
      <View className="w-96 p-6 border-l border-gray-200 absolute bottom-0 bg-white top-20 right-[-450px]">
        <View className="flex-row flex justify-between items-center mb-6">
          <Button className="text-gray-600">
            <FontAwesome name="arrow-left" />
          </Button>
          <View className="flex-row flex space-x-4">
            <Button className="text-gray-600">
              <FontAwesome name="share" />
            </Button>
            <Button className="text-gray-600">
              <FontAwesome name="heart" />
            </Button>
          </View>
        </View>
        <View className="rounded-lg overflow-hidden mb-6">
          <Image
            src="https://placehold.co/400x200"
            alt="Electronic Sound event banner"
            className="w-full"
          />
        </View>
        <H2 className="text-2xl font-semibold mb-4">
          Electronic Sound with DJ ARMY ft Miss Lexa
        </H2>
        <View className="flex-row flex items-center justify-between mb-6">
          <View>
            <View className="text-3xl font-semibold">29</View>
            <View className="text-gray-500">Mar</View>
          </View>
          <View>
            <View className="font-medium">Tuesday</View>
            <View className="text-gray-500">10:00 PM - End</View>
          </View>
          <Button className="text-orange-500">
            <FontAwesome name="calendar" />
          </Button>
        </View>
        <View className="mb-6">
          <H3 className="font-semibold mb-2">About this events</H3>
          <P className="text-gray-600">
            We're celebrating our 30th edition of the California Art Festival in
            CA this Spring so join us at the Building Park in California State
            University from March 29 - 30, 2022 with our Private View opening on
            Saturday, March 26!
          </P>
          <Button className="text-orange-500 mt-2">Show more</Button>
        </View>
        <View className="flex-row flex justify-between items-center">
          <View>
            <View className="font-semibold">$25.98 - $35.00</View>
            <View className="text-gray-500">100 Spot left</View>
          </View>
          <Button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
            Get a Ticket
          </Button>
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
