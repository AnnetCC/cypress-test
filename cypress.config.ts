import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 4000,
    setupNodeEvents(on, config) {
      },
  },
});
