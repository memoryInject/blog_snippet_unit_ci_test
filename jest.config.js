const config = {
  verbose: true,
  testPathIgnorePatterns: ['/client/', '/cypress/'],
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/client'],
  // testMatch: ['**/blogRoutes*test*'],
};

module.exports = config;
