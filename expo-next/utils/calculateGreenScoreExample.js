const axios = require("axios");

const fs = require("fs");

function parseEnvFile(filePath) {
  const env = {};
  const content = fs.readFileSync(filePath, "utf-8");
  content.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      env[key.trim()] = value.trim();
    }
  });
  return env;
}

const envVariables = parseEnvFile("../.env.development");
const apiKey = envVariables.EXPO_PUBLIC_CLIMATIQ_API_KEY;

// Function to calculate carbon footprint via Climatiq API
// weight in grams of beans before processing for 1 cup of coffee
async function getCarbonFootprintCoffee(productType, weight = 12) {
  // const response = await axios.post(
  //   "https://api.climatiq.io/estimate",
  //   {
  //     emission_factor: {
  //       activity_id: "consumer_goods-type_coffee-origin_region_global",
  //       source: "WRAP",
  //       region: "GLOBAL",
  //       year: 2018,
  //       source_lca_activity: "cradle_to_processing_gate",
  //       data_version: "^0",
  //     },
  //     parameters: {
  //       weight,
  //       weight_unit: "g",
  //     },
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //   },
  // );
  // console.log("response.data.co2e coffee", response.data.co2e);

  return 0.01701;
}

// weight in grams of cotton for 1 tshirt
async function getCarbonFootprintTshirt(productType, weight = 200) {
  // const response = await axios.post(
  //   "https://api.climatiq.io/estimate",
  //   {
  //     emission_factor: {
  //       activity_id: "consumer_goods-type_clothing_primary_material_production",
  //       data_version: "^0",
  //     },
  //     parameters: {
  //       weight,
  //       weight_unit: "g",
  //     },
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //   },
  // );
  // console.log("response.data.co2e tshirt", response.data.co2e);

  return 0.02231;
}

// Example of manual data for water footprint and waste (to be automated later)
function getWaterFootprint(productType) {
  // Using static data from the Water Footprint Network
  const waterData = {
    coffee: 140, // Liters per cup
    sandwich: 150, // Liters per sandwich
    tshirt: 2700, // Liters per cotton t-shirt
  };

  return waterData[productType] || 0;
}

function getWasteRecyclabilityScore(productType) {
  // Using static scores for waste/recyclability
  const wasteData = {
    coffee: 4, // Score 0-5 based on packaging
    sandwich: 3,
    tshirt: 5,
  };

  return wasteData[productType] || 0;
}

// Function to calculate the overall environmental score
async function calculateEnvironmentalScore(productType, amount) {
  const carbonFootprint =
    (await productType) === "coffee"
      ? getCarbonFootprintCoffee(productType, amount)
      : getCarbonFootprintTshirt(productType, amount);
  const waterFootprint = getWaterFootprint(productType);
  const wasteScore = getWasteRecyclabilityScore(productType);
  const carbonPerItem = await carbonFootprint;
  // Combine the scores (weighting could be adjusted)
  const finalScore =
    carbonPerItem * 0.4 + waterFootprint * 0.3 + wasteScore * 0.3;

  console.log(`Environmental score for ${productType}: ${finalScore}`);
}

// Example: Calculate the score for a cup of coffee
calculateEnvironmentalScore("coffee", 1); // 43.206804000000005
calculateEnvironmentalScore("tshirt", 1); // 811.508924
