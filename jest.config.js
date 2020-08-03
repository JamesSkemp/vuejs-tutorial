
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.d.ts"
  ],

  // The directory where Jest should output its coverage files
  //coverageDirectory: "coverage",
  /*moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },*/
  globals: {
    'ts-jest': {
    }
  }
};
