/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/app.ts',
    '<rootDir>/src/config.ts',
    '<rootDir>/src/helpers',
    '<rootDir>/src/lib',
    '<rootDir>/src/middleware',
    '<rootDir>/src/repositories',
  ],
};
