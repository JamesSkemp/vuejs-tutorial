const modulesWithExport = ['rpg-dice-roller'].join('|');

module.exports = {
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src',
    '<rootDir>/__tests__'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
	"<rootDir>/src/**/*.ts",
	// Exclude Vue.js main file.
	"!<rootDir>/src/main.ts",
	"!<rootDir>/src/**/*.d.ts",
	'!**/node_modules/**',
  ],
  transformIgnorePatterns: [
    `/node_modules/(?!${modulesWithExport})`
  ],
  // The directory where Jest should output its coverage files
  //coverageDirectory: "coverage",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
