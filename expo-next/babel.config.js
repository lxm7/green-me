module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      "@babel/preset-typescript",
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  };
};
