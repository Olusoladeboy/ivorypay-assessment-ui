import React from "react";
import Checkout from "./checkout";

describe("<Checkout />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Checkout />);
    cy.wait(1000);
  });

  it("successfully submits the form", () => {
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="item"]').type("Product");
    cy.get('input[name="price"]').type("10");

    cy.get('button[type="submit"]').click();
  });
});
