import { defineConfig } from 'cypress';
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin';

export default defineConfig({
  e2e: {
    retries: 1,
    pageLoadTimeout: 5000,
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on);
    },
    // env: {
    //   login_url: '/login',
    //   stepper_url: '/pages/layout/stepper',
    // },
  },
});
