import BasePage from './base.page';

export default class IQWaveGamePage extends BasePage {
  readonly NAME_INPUT_LOCATOR: string = `[placeholder="Your Name"]`;
  readonly START_GAME_LOCATOR: string = `Start Game`;
  readonly HIT_TEXT_LOCATOR: string = `li:contains("HIT")`;
  readonly TIMER_TEXT_LOCATOR: string = `li:contains("TIMER")`;
  readonly FINAL_SCORE_LOCATOR: string = `div:contains("score")`;

  visitHomePage(): void {
    super.visitPage(Cypress.env('iqWaveGameUrl') as string);
  }

  enterUserName(name: string): void {
    cy.get(this.NAME_INPUT_LOCATOR).type(name);
  }

  clickStartGame(): void {
    cy.contains(this.START_GAME_LOCATOR).click();
  }

  playGameUntilOver(): void {
    cy.get(this.HIT_TEXT_LOCATOR)
      .find('span')
      .then(($el) => {
        const text = $el.text();
        cy.log(`Clicking on: ${text}`);
        cy.contains('p', text).parent('div').first().click({ force: true });

        cy.get(this.TIMER_TEXT_LOCATOR)
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

  captureFinalScore(screenshotName: string): void {
    cy.get(this.FINAL_SCORE_LOCATOR).then(($score) => {
      const score = $score.find('span').text();
      cy.log(score);
      cy.screenshot(screenshotName);
    });
  }
}
