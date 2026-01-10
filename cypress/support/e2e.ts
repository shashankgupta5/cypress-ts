import './commands.ts';
import 'allure-cypress';
import 'cypress-iframe';

beforeEach(() => {
  cy.log('Starting test...');
});

afterEach(() => {
  cy.log('Ending test...');
});
