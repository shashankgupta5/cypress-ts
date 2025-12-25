import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    video: false,
    screenshotOnRunFailure: true,
  },
  watchForFileChanges: false,
});
