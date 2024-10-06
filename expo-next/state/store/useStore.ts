import { create } from "zustand";

// Define the type for the Zustand store
interface StoreState {
  searchTerm: string;
  matchedBusinesses: any[]; // Adjust this type according to your business data structure
  setMatchedBusinesses: (businesses: any[]) => void;
  setSearchTerm: (term: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  searchTerm: "",
  matchedBusinesses: [],
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setMatchedBusinesses: (businesses: any[]) =>
    set({ matchedBusinesses: businesses }),
}));
