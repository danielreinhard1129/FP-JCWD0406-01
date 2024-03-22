/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/dist/src/__test__',
    '<rootDir>/src/app.ts',
    '<rootDir>/src/config.ts',
    '<rootDir>/src/helpers',
    '<rootDir>/src/lib',
    '<rootDir>/src/middleware',
    '<rootDir>/src/repositories',
    '<rootDir>/src/actions/category',
    '<rootDir>/src/actions/product/createProduct.action.ts',
    '<rootDir>/src/actions/product/deleteProduct.action.ts',
    '<rootDir>/src/actions/product/getProducts.action.ts',
    '<rootDir>/src/controllers/category.controller.ts',
    '<rootDir>/src/routers/category.router.ts',
    '<rootDir>/src/actions/admin',
    '<rootDir>/src/actions/user',
    '<rootDir>/src/controllers/admin.controoler.ts',
    '<rootDir>/src/controllers/user.controller.ts',
  ],
};
