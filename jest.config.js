module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  passWithNoTests: true,
  
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|rxjs)',
  ],
  
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  
  moduleFileExtensions: ['ts', 'js', 'html'],
  
  testMatch: [
    '**/+(*.)+(spec).+(ts)'
  ],
  
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/test-setup.ts',
    '!src/main.ts',
    '!src/**/*.module.ts'
  ],
  
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    }
  }
};