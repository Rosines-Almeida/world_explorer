import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  // COMENTE ESTA LINHA ORIGINAL:
  // stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  
  // USE ESTA NOVA LINHA (apenas arquivos específicos):
  stories: ['../src/stories/*.stories.ts'],
  
 addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: false,
    skipCompiler: true,
  },
};

export default config;