import React from "react";
import { View } from "react-native";
import { Product, Business } from "@components/MapContainer/types";
import { Text } from "@components/ui/text";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  return (
    <View className="mt-4">
      {businesses.map((business: Business) => (
        <Card key={business.id} className="mt-4">
          <CardHeader>
            <Text className="font-bold text-lg">{business.document.name}</Text>
          </CardHeader>
          <CardContent>
            {business.document.products.map((product: Product, idx: number) => (
              <View key={idx} className="mt-2">
                <Text>
                  {product.name} - Green Score: {product.greenScore}
                </Text>
              </View>
            ))}
          </CardContent>
        </Card>
      ))}
    </View>
  );
};

export default React.memo(BusinessList);
