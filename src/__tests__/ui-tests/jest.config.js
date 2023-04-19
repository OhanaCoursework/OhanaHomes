//jest.config.js
module.exports = {
  testTimeout: 150000,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["<rootDir>/jest.config.js"],
};
