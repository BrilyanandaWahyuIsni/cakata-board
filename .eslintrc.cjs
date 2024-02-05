module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0 }],
    "no-console": ["error", { allow: ["warn"] }],
    "no-duplicate-imports": "error",
    // "max-lines-per-function": ["error", { "max": 80 }],
    "no-duplicate-case": "error",
    // "curly": ["error", "multi", "consistent"],
    "curly": "error",
    "semi": ["error", "always"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "block-spacing": "error",
    "space-in-parens": ["error", "never"],
    // "key-spacing": ["error", {
    //   "multiLine": {
    //     "beforeColon": false,
    //     "afterColon": true

    //   },
    //   "align": {
    //     "beforeColon": true,
    //     "afterColon": true,
    //     "on": "colon"
    //   }
    // }]
  },
}
