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
    "^app/(.)$": "<rootDir>/src/app/$1",
    "^entities/(.)$": "<rootDir>/src/entities/$1",
    "^features/(.)$": "<rootDir>/src/features/$1",
    "^pages/(.)$": "<rootDir>/src/pages/$1",
    "^shared/(.)$": "<rootDir>/src/shared/$1",
    "^widgets/(.)$": "<rootDir>/src/widgets/$1",
  },
};
