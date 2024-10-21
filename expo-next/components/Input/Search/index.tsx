import React from "react";
import { View } from "react-native";

import { Text } from "@components/ui/text";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useStore } from "@state/store/useStore";

interface SearchInputComponentProps {
  onSearch: (term: string) => void;
  onSubmit: () => void;
}

const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  onSearch,
  onSubmit,
}) => {
  const searchTerm = useStore((state) => state.searchTerm);

  return (
    <View>
      <Input
        className="p-2 border border-gray-300 rounded mb-3"
        value={searchTerm}
        placeholder="Type coffee or t-shirt..."
        onChangeText={onSearch}
        blurOnSubmit={false}
      />
      <Button
        className="mt-2 bg-purple-500 py-2 px-4 rounded"
        onPress={onSubmit}
      >
        <Text className="text-white text-center">Show markers</Text>
      </Button>
    </View>
  );
};

export default React.memo(SearchInputComponent);
