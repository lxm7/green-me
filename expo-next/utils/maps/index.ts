import { curry, compose } from "@utils/common";

// Helper function to normalize the term (lowercase and remove hyphens/spaces)
const normalizeTerm = (term: string) =>
  term.toLowerCase().replace(/[-\s]/g, "");

// Curried function to check if the term contains 3 matching characters from a word
const containsThreeChars = curry((word: string, term: string) => {
  for (let length = 3; length <= term.length; length++) {
    for (let i = 0; i <= term.length - length; i++) {
      const substring = term.slice(i, i + length); // Get substring of length 3 or more
      if (word.includes(substring)) {
        return word; // Return the word if any substring is found
      }
    }
  }
  return ""; // Return null if no matching substring is found
});

// Composed function to normalize and then check for a match with 'coffee' or 'tshirt'
export const checkForMatch = compose(
  (normalizedTerm: string) =>
    containsThreeChars("coffee", normalizedTerm) ||
    containsThreeChars("tshirt", normalizedTerm),
  normalizeTerm
);

export const matchesTerm = (string: string, term: string) =>
  checkForMatch(string.toLowerCase()) === checkForMatch(term.toLowerCase());

// Helper function to calculate distance between two points (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit = "miles"
) => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const R = unit === "miles" ? 3958.8 : 6371 * 1000; // Radius of Earth: 3958.8 miles or 6371 km (converted to meters)

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance; // Distance in the selected unit (either miles or meters)
};

// Function to get user's location
// const getUserLocation = () => {
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation([longitude, latitude]); // Set the user's location
//       setMapCenter([longitude, latitude]); // Center the map on user's location

//       // Add marker to map for user location
//       const userMarker = new maplibregl.Marker({ color: "red" })
//         .setLngLat([longitude, latitude])
//         .addTo(map.current);

//       map.current.setCenter([longitude, latitude]); // Center map on user
//       map.current.setZoom(15); // Zoom closer to the user's location
//     },
//     (error) => {
//       setMapCenter(mapCenter);
//       console.error("Error retrieving user location:", error);
//     }
//   );
// } else {
//   console.error("Geolocation is not supported by this browser.");
// }
// };

// Function to fetch geolocation data from OpenStreetMap
// const fetchGeolocation = async (query) => {
//   try {
//     const response = await axios.get(API_URL, {
//       params: {
//         q: query,
//         format: "json",
//         addressdetails: 1,
//         limit: 5, // Limit results to 5
//       },
//     });

//     setGeolocationResults(response.data);
//   } catch (error) {
//     console.error("Error fetching geolocation data:", error);
//   }
// };

// Handle geolocation search
// const handleGeolocationSearch = async (term) => {
//   setGeolocationTerm(term);
//   if (term.length >= 3) {
//     fetchGeolocation(term);
//   } else {
//     setGeolocationResults([]); // Clear results if less than 3 characters
//   }
// };
