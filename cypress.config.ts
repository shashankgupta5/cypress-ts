import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
    experimentalPromptCommand: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    video: false,
    screenshotOnRunFailure: true,
    env: {
      amazonHomePageUrl: 'https://www.amazon.in/',
      iqWaveGameUrl: 'https://focus-check-lkm-001.web.app',
      spotifyClientId: '',
      spotifyClientSecret: '',
    },
  },
  watchForFileChanges: false,
});
