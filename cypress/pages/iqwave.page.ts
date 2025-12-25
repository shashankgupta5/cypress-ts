import BasePage from './base.page';

export default class IQWaveGamePage extends BasePage {
  public visitHomePage(): void {
    super.visitPage(Cypress.env('iqWaveGameUrl') as string);
  }

  public enterUserName(name: string): void {
    cy.get('[placeholder="Your Name"]').type(name);
  }

  public clickStartGame(): void {
    cy.contains('Start Game').click();
  }

  public playGameUntilOver(): void {
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
              this.playGameUntilOver();
            }
          });
      });
  }

  public captureFinalScore(): void {
    cy.get('div:contains("score")').then(($score) => {
      const score = $score.find('span').text();
      cy.log(score);
      cy.screenshot('final-score');
    });
  }
}
