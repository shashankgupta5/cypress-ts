describe('Frame example test', () => {
  it('frame test', () => {
    cy.visit('https://www.dezlearn.com/nested-iframes-example/');

    // Load parent iframe
    cy.frameLoaded('#parent_iframe');

    // Work on parent iframe
    cy.iframe('#parent_iframe').within(() => {
      cy.get('h4').should('have.text', 'Parent iframe');

      // Load child frame
      cy.frameLoaded('#iframe1');

      // Work on parent iframe
      cy.iframe('#iframe1').within(() => {
        cy.get('h4').should('have.text', 'iframe 2');
      });
    });

    cy.get(`h2[class*='elementor-heading-title']`).should(
      'have.text',
      'Nested iFrames Example'
    );
  });
});
