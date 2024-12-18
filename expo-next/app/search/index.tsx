import { View, ActivityIndicator } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";

// eslint-disable-next-line import/no-unresolved
import MapContainer from "@components/MapContainer";
import { useSession } from "@hooks/useSession";
import { useStore } from "@state/store/useStore";
import { Text } from "@components/ui/text";
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
    <View className="flex-1">
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-80 p-6 border-r border-gray-200">
          <div className="flex items-center mb-8">
            <img
              src="https://placehold.co/40x40"
              alt="Profile avatar"
              className="rounded-full"
            />
            <div className="ml-3">
              <h2 className="font-semibold text-gray-800">Alex Moreton</h2>
              <div className="flex items-center">
                <span className="text-purple-600">2377</span>
                <span className="mx-1">-</span>
                <span className="text-gray-600">TOKEN</span>
              </div>
              <p className="text-sm text-gray-500">Bio / Summary</p>
            </div>
          </div>

          <View className="m-auto">
            {/* Business List */}
            <View className="flex flex-1 overflow-y-auto">
              {searchTerm.length === 0 && (
                <View className="content-">
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
            <View className="flex flex-1 overflow-y-auto">
              {searchTerm.length >= 3 && businesses && (
                <BusinessList businesses={businesses} />
              )}
            </View>
          </View>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h1 className="text-2xl font-semibold">Find X-to-Earn Events</h1>
            <div className="flex items-center space-x-4">
              <img
                src="https://placehold.co/24x16"
                alt="US flag"
                className="h-4"
              />
              <i className="far fa-bell text-gray-600"></i>

              <div className="flex items-center">
                <span className="font-semibold">MyWeb3Wallet.eth</span>
                <i className="fas fa-chevron-down ml-2 text-gray-400"></i>
              </div>
            </div>
          </div>
          {/* Map Section */}
          <MapContainer />
        </div>

        {/* Right Sidebar */}
        <div className="w-96 p-6 border-l border-gray-200 absolute bottom-0 bg-white top-20 right-[-450px]">
          <div className="flex justify-between items-center mb-6">
            <button className="text-gray-600">
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="flex space-x-4">
              <button className="text-gray-600">
                <i className="fas fa-share"></i>
              </button>
              <button className="text-gray-600">
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src="https://placehold.co/400x200"
              alt="Electronic Sound event banner"
              className="w-full"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Electronic Sound with DJ ARMY ft Miss Lexa
          </h2>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-semibold">29</div>
              <div className="text-gray-500">Mar</div>
            </div>
            <div>
              <div className="font-medium">Tuesday</div>
              <div className="text-gray-500">10:00 PM - End</div>
            </div>
            <button className="text-orange-500">
              <i className="far fa-calendar"></i>
            </button>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">About this events</h3>
            <p className="text-gray-600">
              We're celebrating our 30th edition of the California Art Festival
              in CA this Spring so join us at the Building Park in California
              State University from March 29 - 30, 2022 with our Private View
              opening on Saturday, March 26!
            </p>
            <button className="text-orange-500 mt-2">Show more</button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">$25.98 - $35.00</div>
              <div className="text-gray-500">100 Spot left</div>
            </div>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
              Get a Ticket
            </button>
          </div>
        </div>
      </div>
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
