import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Business } from "@components/MapContainer/types";

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
        () => ({
          matchedBusinesses: businesses.sort(
            (a, b) =>
              (b.document.greenScore || 0) - (a.document.greenScore || 0),
          ),
        }),
        false,
        "setMatchedBusinesses",
      ),
  })),
);
