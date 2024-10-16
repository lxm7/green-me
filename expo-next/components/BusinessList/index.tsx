import React from "react";
import { View, FlatList } from "react-native";
import { Product, Business } from "@components/MapContainer/types";
import { Text } from "@components/ui/text";
import {
  Card,
  CardContent,
  CardHeader,
  // CardFooter,
  // CardTitle,
} from "@components/ui/card";
interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  return (
    <View>
      <FlatList
        data={businesses}
        keyExtractor={(business: Business) => business.id}
        renderItem={({ item: business }: { item: Business }) => (
          <Card key={business.id} className="mt-4">
            <CardHeader>
              <Text className="font-bold text-lg">
                {business.document.name}
              </Text>
            </CardHeader>
            <CardContent>
              <FlatList
                data={business.document.products}
                keyExtractor={(product: Product, index: number) =>
                  index.toString()
                }
                renderItem={({ item: product }: { item: Product }) => (
                  <View className="mt-2">
                    <Text>
                      {product.name} - Green Score: {product.greenScore}
                    </Text>
                  </View>
                )}
              />
            </CardContent>
          </Card>
        )}
      />
    </View>
  );
};

export default React.memo(BusinessList);
