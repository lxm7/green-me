import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
// eslint-disable-next-line import/no-unresolved
import MapContainer from "@components/MapContainer";
import { useSession } from "@hooks/useSession";

function App() {
  const { signOut } = useSession();

  return (
    <View className="flex-1">
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-64 p-6 border-r border-gray-200">
          <div className="flex items-center mb-8">
            <img
              src="https://placehold.co/40x40"
              alt="Profile avatar"
              className="rounded-full"
            />
            <div className="ml-3">
              <h2 className="font-semibold text-gray-800">Alex Moreton</h2>
              <p className="text-sm text-gray-500">Full stack developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-500 font-medium">Menu</p>
            <div className="flex items-center text-gray-600 hover:text-orange-500 cursor-pointer">
              <i className="far fa-search mr-3"></i>
              <span>Search Events</span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-orange-500 cursor-pointer">
              <i className="far fa-inbox mr-3"></i>
              <span>Inbox</span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-orange-500 cursor-pointer">
              <i className="far fa-envelope mr-3"></i>
              <span>Invites</span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-orange-500 cursor-pointer">
              <i className="far fa-user mr-3"></i>
              <span>Standups</span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-orange-500 cursor-pointer">
              <i className="far fa-calendar mr-3"></i>
              <span>My Calendar</span>
              <span className="ml-2 bg-orange-500 text-white text-xs px-1.5 rounded">
                5
              </span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-orange-500 cursor-pointer">
              <i className="fas fa-cog mr-3"></i>
              <span>Settings</span>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-gray-500 font-medium mb-4">
              Favorites Locations
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                <span className="text-gray-600">XD Club, Torronto</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                <span className="text-gray-600">Avengars Club, LA</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-400 mr-3"></div>
                <span className="text-gray-600">Super Stay, Lahore</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 text-sm text-gray-400">
            Copyrights text
          </div>
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
                <span className="text-purple-600">123</span>
                <span className="mx-1">-</span>
                <span className="text-gray-600">'23</span>
              </div>
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
        <div className="w-96 p-6 border-l border-gray-200 absolute bottom-0 bg-white top-20 right-[-360px]">
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
