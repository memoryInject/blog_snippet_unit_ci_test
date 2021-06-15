const config = {
  verbose: true,
  testPathIgnorePatterns: ['/client/'],
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/client'],
  // testMatch: ['**/blogRoutes*test*'],
};

module.exports = config;
