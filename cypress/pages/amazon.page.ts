import BasePage from './base.page';

export default class AmazonPage extends BasePage {
  public visitHomePage(): void {
    super.visitPage(Cypress.env('amazonHomePageUrl') as string);
  }

  public updatePincode(pincode: string): void {
    cy.get(`a[id='nav-global-location-popover-link']`).click();
    cy.get('#GLUXZipInputSection')
      .find('input')
      .first()
      .should('be.visible')
      .type(`${pincode}{enter}`, { force: true });

    cy.get('#glow-ingress-line2', { timeout: 5000 }).should(
      'contain.text',
      pincode
    );
  }

  public searchProduct(product: string): void {
    cy.get('#twotabsearchtextbox').type(product, {
      delay: 100,
    });
    cy.get('[id*="sac-suggestion-row"]').should('have.length.greaterThan', 1);
  }

  public clickSearchIcon(): void {
    cy.get('input[value="Go"]').click();
  }

  public printProductNameAndPriceAfterFilter(productFilter: string): void {
    cy.get('[data-component-type="s-search-result"]')
      .should('have.length.greaterThan', 1)
      .filter((_, element) => {
        const e = element.querySelector('h2');
        return e && e.innerText.trim().toLowerCase().includes(productFilter);
      })
      .each((element) => {
        const name = element.find('h2').text();
        const price = element.find(`span[class='a-offscreen']`).text();
        cy.log(`Name = ${name} & price = ${price}`);
      });
  }
}
