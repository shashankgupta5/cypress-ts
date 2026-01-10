import * as allure from 'allure-js-commons';
import IQWaveGamePage from '../../pages/iqwave.page';

describe('IQ-Wave Game', () => {
  const iQWaveGamePage: IQWaveGamePage = new IQWaveGamePage();

  it('User plays game and captures final score', () => {
    allure.step('Navigate and enter name', () => {
      iQWaveGamePage.visitHomePage();
      iQWaveGamePage.enterUserName('Cypress User');
      iQWaveGamePage.clickStartGame();
    });

    allure.step('Play game', () => {
      iQWaveGamePage.playGameUntilOver();
    });

    allure.step('Capture final score and take screenshot', () => {
      iQWaveGamePage.captureFinalScore('final-score');
    });
  });
});
