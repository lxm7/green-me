module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // or 'plugin:@typescript-eslint/recommended' if using TypeScript
    "prettier", // This disables ESLint rules that conflict with Prettier
  ],
  plugins: ["prettier", "import"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-var-requires": 0,
    "import/no-unresolved": "error",
  },
  overrides: [
    {
      files: ["*.native.tsx", "*.web.tsx", "*.ios.tsx", "*.android.tsx"],
      rules: {
        "import/no-unresolved": "off",
      },
    },
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "testing-library/prefer-screen-queries": "off",
      },
    },
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        project: "./expo-next/tsconfig.json",
        // alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default
        // use <root>/path/to/folder/tsconfig.json
        // // use a glob pattern
        // project: "packages/*/tsconfig.json",
        // // use an array
        // project: [
        //   "packages/module-a/tsconfig.json",
        //   "packages/module-b/tsconfig.json",
        // ],
        // // use an array of glob patterns
        // project: ["../packages/*/tsconfig.json"],
      },
    },
  },
};
