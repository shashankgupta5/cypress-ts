import * as allure from 'allure-js-commons';

describe('IQ-Wave Game', () => {
  it('User plays game and captures final score', () => {
    allure.step('Navigate and enter name', () => {
      cy.visit('https://focus-check-lkm-001.web.app');
      cy.get('[placeholder="Your Name"]').type('Cypress User');
      cy.contains('Start Game').click();
    });

    allure.step('Play game', () => {
      playGameUntilOver();
    });

    allure.step('Capture final score and take screenshot', () => {
      cy.get('div:contains("score")').then(($score) => {
        const score = $score.find('span').text();
        cy.log(score);
        cy.screenshot('final-score');
      });
    });
  });
});

function playGameUntilOver() {
  cy.get('li:contains("HIT")')
    .find('span')
    .then(($el) => {
      const text = $el.text();
      cy.log(`Clicking on: ${text}`);
      cy.contains('p', text).parent('div').first().click({ force: true });

      cy.get('li:contains("TIMER")')
        .find('span')
        .then(($timer) => {
          const timeLeft = $timer.text();
          if (Number(timeLeft) === 0) {
            cy.log('Game Over');
          } else {
            playGameUntilOver();
          }
        });
    });
}
