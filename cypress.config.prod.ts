import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.local';

export default defineConfig({
  ...baseConfig,
  retries: 0,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://google.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
