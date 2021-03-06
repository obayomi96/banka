module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "consistent-return": 0,
    "import/no-unresolved": 0,
    "comma-dangle": 0,
    "no-console": 0,
    "linebreak-style": ["error", "windows"],
    "max-len": ["error", { "code": 200 }]
  }
};
