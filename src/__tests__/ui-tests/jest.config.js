//jest.config.js
module.exports = {
  testTimeout: 15000,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["<rootDir>/jest.config.js"],
};
