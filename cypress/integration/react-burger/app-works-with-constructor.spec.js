import "@4tw/cypress-drag-drop";

describe("Dragtest", () => {
  it("should dragndrop", () => {
    cy.visit("http://localhost:3001");
  });

  it("should get ingredients", () => {
    cy.intercept("https://norma.nomoreparties.space/api/ingredients").as(
      "getIngredients"
    );
    cy.wait("@getIngredients").then((interception) => {});
  });

  it("should find ingredient to drag", () => {
    cy.get("a")
      .contains("Соус фирменный")
      .trigger("dragstart")
      .trigger("dragleave");
  });

  it("should drag and drop", () => {
    cy.get("a")
      .contains("Соус фирменный")
      .trigger("dragenter")
      .trigger("dragover");

    cy.get('#drop-area').trigger("drop")
      .trigger("dragend");
  });

  it('should make button visible', () => {
    cy.get('button').contains('Оформить заказ');
  });

  it('should delete ingredient', () => {
    cy.get('.constructor-element__action').click();
    cy.get('#drop-area').children().get('.burger-constructor_list').should('not.exist')
  });

  it('should make button hidden', () => {
    cy.get('button').should('not.exist');
  });
});
