//jest.config.js
module.exports = {
  testTimeout: 90000,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["<rootDir>/jest.config.js"],
};
