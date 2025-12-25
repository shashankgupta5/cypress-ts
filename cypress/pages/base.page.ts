export default abstract class BasePage {
  protected visitPage(url: string) {
    cy.visit(url);
  }
}
