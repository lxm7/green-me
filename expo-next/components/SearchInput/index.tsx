import React, { useRef, useEffect } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";

import { useStore } from "@state/store/useStore";

interface SearchInputComponentProps {
  onSearch: (term: string) => void;
  onSubmit: () => void;
}

const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  onSearch,
  onSubmit,
}) => {
  const searchInputRef = useRef<TextInput | null>(null);
  const searchTerm = useStore((state) => state.searchTerm);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  return (
    <View>
      <TextInput
        ref={searchInputRef}
        className="p-2 border border-gray-300 rounded"
        value={searchTerm}
        placeholder="Type coffee or t-shirt..."
        onChangeText={onSearch}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        className="mt-2 bg-blue-500 py-2 px-4 rounded"
        onPress={onSubmit}
      >
        <Text className="text-white text-center">Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SearchInputComponent);
