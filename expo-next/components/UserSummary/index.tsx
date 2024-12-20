import React from "react";
import { View, Image } from "react-native";

import { H4, P, Small } from "@components/ui/typography";

const UserSummary = () => {
  return (
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
  );
};

export default UserSummary;
