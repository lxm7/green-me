import React from "react";
import { View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import MapContainer from "@components/MapContainer";
import Header from "@components/Header";
import UserSummary from "@components/UserSummary";
import BusinessListPanel from "@components/BusinessListPanel";

function Search() {
  return (
    <View className="flex-row flex min-h-screen">
      {/* Left Sidebar */}
      <View className="w-96 p-4 border-r border-gray-200">
        <UserSummary />
        <BusinessListPanel />
      </View>

      {/* Main Content */}
      <View className="flex-1">
        <Header />
        <MapContainer />
      </View>
    </View>
  );
}

export default Search;
