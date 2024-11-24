module.exports = {
  preset: "@testing-library/react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["./jest-setup.ts"],
  moduleNameMapper: {
    "^app(.*)": "<rootDir>/app/$1",
    "^components(.*)": "<rootDir>/components/$1",
  },
};
