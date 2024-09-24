const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add 'mp4' to assetExts and remove it from sourceExts
// const { assetExts, sourceExts } = config.resolver;
// config.resolver.assetExts = [...assetExts, "jpg", "png", "mp4"];
// config.resolver.sourceExts = sourceExts.filter((ext) => ext !== "mp4");

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
