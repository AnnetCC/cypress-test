import { defineConfig } from 'cypress';
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin';

export default defineConfig({
  e2e: {
    retries: 1,
    pageLoadTimeout: 5000,
    baseUrl: 'https://jsonplaceholder.typicode.com',
    specPattern: 'cypress/e2e/api/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on);
    },
    // env: {
    //   login_url: '/login',
    //   stepper_url: '/pages/layout/stepper',
    // },
  },
});
