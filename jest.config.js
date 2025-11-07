export default {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },

  // ✅ Isso impede que o Jest tente "ler" SCSS/arquivos de estilo
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },

  // ✅ Garante que templates externos sejam carregados corretamente
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
