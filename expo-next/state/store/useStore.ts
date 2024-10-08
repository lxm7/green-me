import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Business } from "@components/mapLibre/types";

interface StoreState {
  searchTerm: string;
  matchedBusinesses: Business[];
  setSearchTerm: (term: string) => void;
  setMatchedBusinesses: (businesses: Business[]) => void;
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    searchTerm: "",
    matchedBusinesses: [],
    setSearchTerm: (term: string) =>
      set(() => ({ searchTerm: term }), false, "setSearchTerm"),
    setMatchedBusinesses: (businesses: Business[]) =>
      set(
        () => ({ matchedBusinesses: businesses }),
        false,
        "setMatchedBusinesses"
      ),
  }))
);
