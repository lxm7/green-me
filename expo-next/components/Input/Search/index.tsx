import React from "react";

import { Input } from "@components/ui/input";
import { useStore } from "@state/store/useStore";

interface SearchInputComponentProps {
  onSearch: (term: string) => void;
}

const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  onSearch,
}) => {
  const searchTerm = useStore((state) => state.searchTerm);

  return (
    <Input
      className="p-2 border border-gray-300 rounded"
      value={searchTerm}
      placeholder="Type coffee or t-shirt..."
      onChangeText={onSearch}
      blurOnSubmit={false}
    />
  );
};

export default React.memo(SearchInputComponent);
