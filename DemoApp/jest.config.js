module.exports = {
  preset: '@react-native/jest-preset',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react-native)/)',
  ],
};
