import React from "react";
import { View, Text } from "react-native";
import { Product, Business } from "@components/MapContainer/types";

interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  return (
    <View className="mt-4">
      {businesses.map((business: Business) => (
        <View key={business.id} className="mt-4">
          <Text className="font-bold">{business.document.name}</Text>
          {business.document.products.map((product: Product, idx: number) => (
            <Text key={idx}>
              {product.name} - {product.greenScore}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default React.memo(BusinessList);
