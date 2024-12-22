import React from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { useSession } from "@hooks/useSession";
import { Text } from "@components/ui/text";
import { Button } from "@components/ui/button";
import { H2 } from "@components/ui/typography";

const Header = () => {
  const { signOut } = useSession();

  return (
    <View className="p-6 flex-row flex justify-between items-center border-b border-gray-200">
      <H2 className="border-0 font-semibold">Find X-to-Earn Events</H2>
      <View className="flex-row flex items-center space-x-4">
        <Image src="https://placehold.co/24x16" alt="US flag" className="h-4" />
        <FontAwesome name="bell" className="text-gray-600" />
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
  );
};

export default Header;
