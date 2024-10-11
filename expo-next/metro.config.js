/* eslint-env node */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = [...assetExts, "mp4", "json"];
config.resolver.sourceExts = sourceExts.filter(
  (ext) => ext !== "mp4" && ext !== "json",
);

// const theConfig = {
//   ...config,
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     assetExts: ["jpg", "png", "mp4"],
//   },
// };

module.exports = withNativeWind(config, { input: "./app/global.css" });
