module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    semi: [2, 'never'],
    'react-native/no-inline-styles': ['off'],
  },
  plugins: ['@typescript-eslint'],
}
