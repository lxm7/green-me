import { useQuery } from "@tanstack/react-query";

import { Business } from "@components/MapContainer/types";
import { supabase } from "@utils/supabase";
import { BristolCentre } from "@constants/Place";

async function getCoordsFromGeoPlugin() {
  try {
    const geoPluginResponse = await fetch("http://www.geoplugin.net/json.gp");
    const data = await geoPluginResponse.json();
    // data.geoplugin_currencyCode // also possible
    // data.geoplugin_currencyConverter // also possible
    // data.geoplugin_currencySymbol // also possible
    return {
      latitude: data.geoplugin_latitude,
      longitude: data.geoplugin_longitude,
    };
    if (data.geoplugin_status === 200) {
      return {
        latitude: data.geoplugin_latitude,
        longitude: data.geoplugin_longitude,
      };
    } else {
      console.error("Unable to retrieve location from IP.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates from IP:", error);
    return null;
  }
}

// Fetch businesses based on the search term
export const fetchBusinesses = async (
  term: string,
  searchRadius?: number,
  userLongitude?: number,
  userLatitude?: number,
): Promise<Business[] | null> => {
  if (!term) return null;

  try {
    // const coords = await getCoordsFromGeoPlugin(); // coords!.longitude;
    const userLongitude = BristolCentre[0];
    const userLatitude = BristolCentre[1];
    const searchRadius = 5000; // Example: 5 kilometers

    const { data, error } = await supabase.rpc(
      "fetch_businesses_with_products",
      {
        search_term: term,
        //        search_term: `%${term}%`,
        radius: searchRadius,
        longitude: userLongitude,
        latitude: userLatitude,
      },
    );
    if (error) {
      console.error("Error loading JSON data:", error);
      throw new Error("Error loading JSON data");
    }

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
  return useQuery({
    queryKey: ["businesses", term],
    queryFn: () => fetchBusinesses(term),
    enabled: !!term && term.length >= 3,
    staleTime: 1000 * 60 * 100,
    gcTime: 1000 * 60 * 100,
  });
};
