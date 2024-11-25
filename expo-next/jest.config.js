module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  // setupFilesAfterEnv: ["./jest-setup.ts"], // adds alot of time to test suite, save until its needed
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
