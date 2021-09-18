module.exports = {
  parser: "babel-eslint",
  plugins: ["jsx-a11y"],
  extends: [
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "react-app",
  ],
  rules: {
    "jsx-a11y/no-onchange": "off",
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        pathGroups: [
          { pattern: "react", group: "builtin" },
          { pattern: "react-dom", group: "builtin" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
};
