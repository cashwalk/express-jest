module.exports = {
  testMatch: ['**/*.spec.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    '@/(.+)$': '<rootDir>/src/$1',
  },
}