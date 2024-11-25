const { defaults: tsjPreset } = require("ts-jest/presets");

// module.exports = {
//   ...tsjPreset,
//   preset: "react-native",
//   transform: {
//     "^.+\\.jsx$": "babel-jest",
//     "^.+\\.tsx?$": [
//       "ts-jest",
//       {
//         tsconfig: "tsconfig.jest.json",
//       },
//     ],
//   },
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
//   testEnvironment: "node",
//   setupFilesAfterEnv: ["./jest-setup.ts"],
//   moduleNameMapper: {
//     "^@app/(.*)": "<rootDir>/app/$1",
//     "^@components/(.*)": "<rootDir>/components/$1",
//   },
//   transformIgnorePatterns: [
//     "/node_modules/(?!(?:@react-native|@react-native-community|@expo|expo|@rn-primitives|@react-native/js-polyfills)/)",
//   ],
// };

module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-native" +
      "|@react-native" +
      "|@react-native-community" +
      "|@expo" +
      "|expo" +
      "|@testing-library" +
      "|@unimodules" +
      "|unimodules" +
      "|sentry-expo" +
      "|native-base" +
      "|@rneui" +
      "|@react-navigation" +
      "|@react-native-picker" +
      "|@react-native-masked-view" +
      "|@react-native-async-storage" +
      "|@react-native-svg" +
      "|react-native-svg" +
      "|@rn-primitives" +
      "|@react-native/js-polyfills" +
      "|expo-modules-core" +
      ")/)",
  ],
};
