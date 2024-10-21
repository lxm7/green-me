import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function fetchProfiles() {
  try {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/profiles`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// Custom hook using react-query
export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => fetchProfiles(),
    refetchOnWindowFocus: false, // Disable refetch on window focus
    staleTime: 1000 * 60 * 100,
    gcTime: 1000 * 60 * 100,
  });
}
