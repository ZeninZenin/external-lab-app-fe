module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-console': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-unused-vars': 2,
    'react-hooks/exhaustive-deps': 2,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
