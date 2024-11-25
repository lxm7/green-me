module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      "@babel/preset-typescript",
      //"module:metro-react-native-babel-preset",
    ],
  };
};
