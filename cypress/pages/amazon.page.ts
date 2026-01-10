import BasePage from './base.page';

export default class AmazonPage extends BasePage {
  readonly PIN_CODE_SELECT_LOCATOR: string = `a[id='nav-global-location-popover-link']`;
  readonly PINCODE_INPUT_LOCATOR: string = `#GLUXZipInputSection`;
  readonly UPDATED_PIN_CODE_LOCATOR: string = `#glow-ingress-line2`;

  readonly SEARCH_BOX_LOCATOR: string = `#twotabsearchtextbox`;
  readonly SEARCH_SUGGESTIONS_LOCATOR: string = `[id*="sac-suggestion-row"]`;
  readonly SEARCH_BTN_LOCATOR: string = `input[value='Go']`;

  readonly SEARCH_RESULTS_LOCATOR: string = `[data-component-type="s-search-result"]`;
  readonly SEARCH_ITEM_PRICE_LOCATOR: string = `span[class='a-offscreen']`;

  visitHomePage(): void {
    super.visitPage(Cypress.env('amazonHomePageUrl') as string);
  }

  updatePincode(pincode: string): void {
    cy.get(this.PIN_CODE_SELECT_LOCATOR).click();
    cy.get(this.PINCODE_INPUT_LOCATOR)
      .find('input')
      .first()
      .should('be.visible')
      .type(`${pincode}{enter}`, { force: true });

    cy.get(this.UPDATED_PIN_CODE_LOCATOR, { timeout: 5000 }).should(
      'contain.text',
      pincode
    );
  }

  searchProduct(product: string): void {
    cy.get(this.SEARCH_BOX_LOCATOR).type(product, {
      delay: 100,
    });
  }

  validateSearchResultsAppears(): void {
    cy.get(this.SEARCH_SUGGESTIONS_LOCATOR).should(
      'have.length.greaterThan',
      1
    );
  }

  clickSearchIcon(): void {
    cy.get(this.SEARCH_BTN_LOCATOR).click();
  }

  clickLowestPriceProductAfterFilter(productFilter: string): void {
    const priceToProductMap = new Map();

    cy.get(this.SEARCH_RESULTS_LOCATOR)
      .should('have.length.greaterThan', 1)
      .filter((_, element) => {
        const e = element.querySelector('h2');
        return e && e.innerText.trim().toLowerCase().includes(productFilter);
      })
      .each((element) => {
        const price = element.find(this.SEARCH_ITEM_PRICE_LOCATOR)?.text();
        if (price) {
          const formattedPrice = price.replace(/[₹,]/g, '').trim();
          priceToProductMap.set(Number(formattedPrice), element);
        }
      })
      .then(() => {
        expect(priceToProductMap.size).to.be.greaterThan(0);

        const lowestPrice = Math.min(...priceToProductMap.keys());
        const lowestPriceProduct = priceToProductMap.get(lowestPrice);
        const lowestPriceProductName = lowestPriceProduct.find('h2').text();
        cy.log(`Lowest price product name = ${lowestPriceProductName}`);

        if (lowestPriceProduct) {
          cy.wrap(lowestPriceProduct)
            .find('a')
            .first()
            .invoke('removeAttr', 'target')
            .click({ force: true });

          cy.title().should('contain', lowestPriceProductName);
        } else {
          throw new Error(
            `Something went wrong with lowest price product, products found were ${priceToProductMap}`
          );
        }
      });
  }
}
