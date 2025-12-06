import './commands.ts';
import 'allure-cypress';

beforeEach(() => {
  cy.log('Starting test...');
});

afterEach(() => {
  cy.log('Ending test...');
});
