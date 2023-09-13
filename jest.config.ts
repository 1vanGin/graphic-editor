module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/spec/__mocks__/styleMock.ts",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/spec/__mocks__/fileMock.js",
  },
};
