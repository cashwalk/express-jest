module.exports = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['__mocks__', '.*Mock.*'],
  moduleNameMapper: {
    '@/(.+)$': '<rootDir>/src/$1',
    "^@test/(.*)$": "<rootDir>/__tests__/$1",
  },
}