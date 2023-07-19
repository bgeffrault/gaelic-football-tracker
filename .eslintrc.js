module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    quotes: ["error", "double"],
    "no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "comma-dangle": "off",
    "no-underscore-dangle": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "no-use-before-define": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
  },
};
