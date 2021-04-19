module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: `${__dirname}/.babelrc.json`,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": "off",
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
