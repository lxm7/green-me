import React from "react";
import { View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useBusinessStore } from "@state/store/useBusinessStore";
import { Text } from "@components/ui/text";
import { Button } from "@components/ui/button";
import { H2, H3, P } from "@components/ui/typography";

const EventDetailPanel: React.FC = () => {
  const { selectedBusiness, setSelectedBusiness } = useBusinessStore();
  return (
    <div
      className={`w-96 h-full p-6 border-l border-gray-200 absolute bottom-0 bg-white top-[15%] z-50
         right-0 shadow-2xl transform transition-transform duration-300
        ${selectedBusiness ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {selectedBusiness && (
        <View className="">
          <View className="flex-row flex justify-between items-center mb-6">
            <Button
              className="text-gray-600 bg-red-600"
              onPress={() => setSelectedBusiness(null)}
            >
              <FontAwesome name="arrow-right" className="text-white" />
              <Text>Close</Text>
            </Button>
            <View className="flex-row flex space-x-4">
              <Button className="text-gray-600">
                <FontAwesome name="share" className="text-white" />
              </Button>
              <Button className="text-gray-600">
                <FontAwesome name="heart" className="text-white" />
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
            (Mugshot) The Vegan Deli
          </H2>
          <View className="flex-row flex items-center justify-between mb-6">
            <View>
              <Text className="text-3xl font-semibold">29</Text>
              <Text className="text-gray-500">Mar</Text>
            </View>
            <View>
              <Text className="font-medium">Tuesday</Text>
              <Text className="text-gray-500">10:00 AM - 14:00 PM</Text>
            </View>
            <Button className="text-orange-500">
              <FontAwesome name="calendar" className="text-white" />
            </Button>
          </View>
          <View className="mb-6">
            <H3 className="font-semibold mb-2">About this events</H3>
            <P className="text-gray-600">Description</P>
            <Button className="text-orange-500 mt-2">
              <Text>Show more</Text>
            </Button>
          </View>
          <View className="flex-row flex justify-between items-center">
            <View>
              <Text className="font-semibold">$2.98 - $4.50</Text>
              <Text className="text-gray-500">100 Spots left</Text>
            </View>
            <Button className="bg-yellow-400 text-white px-6 py-3 rounded-lg">
              <Text>Join event</Text>
            </Button>
          </View>
        </View>
      )}
    </div>
  );
};

export default EventDetailPanel;
