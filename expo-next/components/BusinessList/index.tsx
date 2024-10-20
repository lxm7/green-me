import React from "react";
import { View, FlatList, Image } from "react-native";
import { Business } from "@components/MapContainer/types";
import { Text } from "@components/ui/text";
import { Separator } from "@components/ui/separator";
import { P, Small } from "@components/ui/typography";

const LCAColorMap: { [key: string]: string } = {
  "Carbon Trust": "bg-pink-500",
  "Fair Trade": "bg-yellow-500",
  "Carbon Neutral": "bg-blue-500",
  "Cradle to Cradle Certified": "bg-purple-500",
  "Rainforest Alliance": "bg-pink-500",
  GOTS: "bg-yellow-500",
  "OEKO-TEX": "bg-blue-500",
};

// Default color and name if LCA not found in the lookup
const defaultLCA = { name: "UNKNOWN", color: "bg-gray-300" };

interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  const sortedBusinesses = [...businesses].sort(
    (a, b) => b.document.greenScore! - a.document.greenScore!,
  );

  return (
    <View>
      <FlatList
        data={sortedBusinesses}
        keyExtractor={(business: Business) => business.id}
        renderItem={({ item: business }: { item: Business }) => (
          <View key={business.id}>
            <View className="flex-row pt-4 pb-4 gap-4 bg-white ">
              <Image
                source={{
                  uri:
                    business.document.image || "https://placehold.co/600x400",
                }}
                className="w-16 h-24 rounded-lg"
                resizeMode="cover"
              />

              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <P className="text-lg font-bold leading-none">
                    {business.document.name}
                  </P>
                  <P className="text-lg font-bold leading-none">
                    {business.document.greenScore}
                  </P>
                </View>
                <P className="text-xs native:text-base text-muted-foreground mb-1">
                  1 centre street, Bristol, BS1 5PU
                </P>
                <View className="flex flex-row h-5 items-center gap-4 ">
                  <Small className="font-normal">
                    {business.document.business}
                  </Small>
                  <Separator orientation="vertical" />
                  <Small className="font-normal">Co2e:</Small>
                  <Separator orientation="vertical" />
                  <Small className="font-normal">
                    {business.document.co2e}
                  </Small>
                </View>

                <View className="flex-1 justify-end mt-1">
                  <View className="flex-row flex-wrap gap-1 mt-auto">
                    {business.document.publishedLCAs.map((lca, index) => {
                      const colour = LCAColorMap[lca] || defaultLCA.color;
                      return (
                        <Text
                          key={index}
                          className={`px-1 text-xs ${colour} text-white rounded-full font-bold flex-wrap`}
                        >
                          {lca}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
            <Separator className="my-4" />
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(BusinessList);
