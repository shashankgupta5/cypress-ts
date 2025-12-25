import AmazonPage from '../pages/amazon.page';

describe('Amazon tests', () => {
  const amazonPage: AmazonPage = new AmazonPage();
  let testData;

  beforeEach('launch website', () => {
    amazonPage.visitHomePage();
    cy.fixture('amazon.spec.testData.json').then((data) => {
      testData = data;
    });
  });

  it('validate search items appears', () => {
    amazonPage.updatePincode(testData.pincodeToUpdate);
    amazonPage.searchProduct(testData.productToSearch);
  });

  it('search product', () => {
    amazonPage.updatePincode(testData.pincodeToUpdate);
    amazonPage.searchProduct(testData.productToSearch);
    amazonPage.clickSearchIcon();
    amazonPage.printProductNameAndPriceAfterFilter(testData.productFilter);
  });
});
