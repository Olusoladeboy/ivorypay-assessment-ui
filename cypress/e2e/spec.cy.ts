import Checkout from "../../src/app/checkout/checkout";

describe('Checkout Component', () => {
  beforeEach(() => {
    cy.visit('localhost:4000');
  });

  it('submits the form successfully', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="item"]').type('Item 1');
    cy.get('input[name="price"]').type('10');

    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('input[name="item"]').should('have.value', '');
    cy.get('input[name="price"]').should('have.value', '');
  });
});