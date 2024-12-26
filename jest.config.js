const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],  // Asegúrate de que esté apuntando al archivo correcto
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Allow absolute imports
  },
};

module.exports = createJestConfig(customJestConfig);
