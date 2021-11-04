module.exports = {
  testPathIgnorePatterns: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts', 'jest-canvas-mock'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom'
}
