import { useQuery } from "@tanstack/react-query";
import { useStore } from "@state/store/useStore";

import { Business } from "@components/MapContainer/types";
import { supabase } from "@utils/supabase";

// Fetch businesses based on the search term
export const fetchBusinesses = async (
  term: string,
): Promise<Business[] | null> => {
  if (!term) return null;

  try {
    const { data, error } = await supabase.rpc(
      "fetch_businesses_with_products",
      {
        search_term: `%${term}%`,
      },
    );
    if (error) {
      console.error("Error loading JSON data:", error);
      throw new Error("Error loading JSON data");
    }
    console.log("fetchBusinesses", { data });
    // Ensure the fetched data is valid before caching
    if (data && Array.isArray(data)) {
      return data;
    } else {
      console.warn("No businesses found.");
      return null;
    }
  } catch (error) {
    console.error("Error loading JSON data:", error);
    throw new Error("Error loading JSON data");
  }
};

// Custom hook to fetch businesses using react-query
export const useBusinessesQuery = (term: string) => {
  const { setMatchedBusinesses } = useStore();

  return useQuery({
    queryKey: ["businesses", term],
    queryFn: () => fetchBusinesses(term),
    enabled: !!term && term.length >= 3,
    // @ts-expect-error - TODO:
    onSuccess: (data: Business[]) => {
      if (data) {
        setMatchedBusinesses(data);
      }
    },
    onError: (error: Error) => {
      console.error("Error in useBusinessesQuery:", error);
    },
  });
};
