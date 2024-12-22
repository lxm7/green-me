import { create } from "zustand";
import { Business } from "@components/MapContainer/types";

interface BusinessStoreState {
  selectedBusiness: Business | null;
  setSelectedBusiness: (business: Business | null) => void;
}

export const useBusinessStore = create<BusinessStoreState>((set) => ({
  selectedBusiness: null,
  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
}));
