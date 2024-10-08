import { useQuery } from "@tanstack/react-query";
import { useStore } from "@state/store/useStore";

import { checkForMatch } from "@utils/maps";
import { Business } from "@components/mapLibre/types";

// export const fetchBusinesses = async (term: string) => {
//   const matchedTerm = checkForMatch(term);
//   if (!matchedTerm) return null;

//   // Check if the data is already cached
//   if (cache[matchedTerm]) {
//     console.info(`Serving ${matchedTerm} from cache.`);
//     return cache[matchedTerm]; // Return cached data
//   }

//   try {
//     const response = await axios.get(`/app/api/${matchedTerm}.json`);
//     const businesses = response.data.hits;
//     cache[matchedTerm] = businesses; // Cache fetched data
//     return businesses;
//   } catch (error) {
//     console.error("Error fetching business data:", error);
//     throw new Error("Error fetching business data");
//   }
// };

// Define cache type
type CacheType = {
  coffee: Business[] | null;
  tshirt: Business[] | null;
};

// Initialize cache with the proper type
export const cache: CacheType = {
  coffee: null,
  tshirt: null,
};

// Fetch businesses based on the search term
export const fetchBusinesses = async (
  term: string
): Promise<Business[] | null> => {
  const matchedTerm = checkForMatch(term);
  if (!matchedTerm) return null;

  // Check if the data is already cached
  if (cache[matchedTerm as keyof CacheType]) {
    console.info(`Serving ${matchedTerm} from cache.`);
    return cache[matchedTerm as keyof CacheType]; // Return cached data
  }

  let businesses: Business[] = [];

  try {
    switch (matchedTerm) {
      case "coffee":
        businesses = require("../../app/api/coffee.json").hits;
        break;
      case "tshirt":
        businesses = require("../../app/api/tshirt.json").hits;
        break;
    }
  } catch (error) {
    console.error("Error loading JSON data:", error);
    throw new Error("Error loading JSON data");
  }

  // Cache fetched data
  cache[matchedTerm as keyof CacheType] = businesses;
  return businesses;
};

// Custom hook to fetch businesses using react-query
export const useBusinessesQuery = (term: string) => {
  const { setMatchedBusinesses } = useStore();

  return useQuery({
    queryKey: ["businesses", term],
    queryFn: () => fetchBusinesses(term),
    enabled: !!term && term.length >= 3,
    // @ts-ignore - TODO:
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
