// @ts-nocheck - TODO cache type index
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "@state/store/useStore";
import { checkForMatch } from "@utils/maps";

export const cache = {
  coffee: null,
  tshirt: null,
};

export const fetchBusinesses = async (term: string) => {
  const matchedTerm = checkForMatch(term);
  if (!matchedTerm) return null;

  // Check if the data is already cached
  if (cache[matchedTerm]) {
    console.info(`Serving ${matchedTerm} from cache.`);
    return cache[matchedTerm]; // Return cached data
  }

  try {
    const response = await axios.get(`/app/api/${matchedTerm}.json`);
    const businesses = response.data.hits;
    cache[matchedTerm] = businesses; // Cache fetched data
    return businesses;
  } catch (error) {
    console.error("Error fetching business data:", error);
    throw new Error("Error fetching business data");
  }
};

export const useBusinessesQuery = (term: string) => {
  const { setMatchedBusinesses } = useStore();

  return useQuery({
    queryKey: ["businesses", term], // Use an array as the query key
    queryFn: () => fetchBusinesses(term), // Fetch function
    enabled: !!term && term.length >= 3, // Only fetch if search term is valid
    onSuccess: (data) => {
      if (data) {
        setMatchedBusinesses(data); // Update Zustand store with fetched data
      }
    },
  });
};
