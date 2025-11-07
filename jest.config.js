/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],

  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ],

  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy', 
  },
};
