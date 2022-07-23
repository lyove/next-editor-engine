module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  plugins: [],
  settings: {
    "import/resolver": {
      webpack: {
        config: "config/webpack.common.js",
      },
    },
  },
  rules: {},
};
