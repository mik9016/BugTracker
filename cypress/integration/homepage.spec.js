describe("renders the homepage", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("h1").should("exist");
  });
  it("has Login and Register Buttons", ()=> {
      cy.visit('/');
     cy.get('.btn-outline-primary').contains('Login').should('exist');
     cy.get('.btn-primary').contains('Register').should('exist');
  });
  it("goes to Login Page",()=>{
    cy.visit('/');
    cy.get('.btn-outline-primary').click();
    cy.url().should("include","login");
  });
  it("goes to Register Page",()=>{
    cy.visit('/');
    cy.get('.btn-primary').click();
    cy.url().should("include","register");
  });
});
