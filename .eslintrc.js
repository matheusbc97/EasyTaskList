module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['detox', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.e2e.ts'],
    },
  ],
  env: {
    'detox/detox': true,
    jest: true,
    'jest/globals': true,
  },
};
