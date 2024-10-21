const customStyles = {
  style: {
    version: 8,
    sources: {
      openmaptiles: {
        type: "vector",
        url: "https://api.maptiler.com/tiles/v3/tiles.json?key=${process.env.EXPO_PUBLIC_MAPTILERS_API_KEY}",
      },
    },
    layers: [
      // Land layer (light grey)
      {
        id: "land",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landuse",
        paint: {
          "fill-color": "#f4f4f4",
        },
      },
      // Water layer (light greyish blue)
      {
        id: "water",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        paint: {
          "fill-color": "#e2e2f0",
        },
      },
      // Roads (Single configuration for all roads)
      {
        id: "roads",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        paint: {
          "line-color": [
            "case",
            ["==", ["get", "class"], "primary"],
            "#bbbbbb", // Major roads
            "#cccccc", // Default for smaller roads
          ],
          "line-width": [
            "case",
            ["==", ["get", "class"], "primary"],
            2, // Major roads width
            1, // Smaller roads width
          ],
        },
      },
    ],
  },
};

export default customStyles;
