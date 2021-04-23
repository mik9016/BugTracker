describe("renders the login page", () => {
    it("renders correctly", ()=>{
        cy.visit("/login");
        cy.get('.card-body').should("exist");
        cy.get('#email').should('exist');
        cy.get('#password').should('exist');
        cy.get('.btn-primary').contains('Login').should('exist');
        cy.get('.LoginPage_Text__2gKed > a').should('exist');
    })

    it("returns error if wrong email", ()=>{
        cy.visit('/login');
        cy.get('#email > .form-control').type('random user');
        cy.get('#password > .form-control').type('randompassword');
        cy.get('.btn-primary').contains('Login').click();
        cy.get('.fade').contains('To short or incorrect email').should('exist');
        
    })

    it("returns error if wrong password", ()=>{
        cy.visit('/login');
        cy.get('#email > .form-control').type('random@user.pl');
        cy.get('#password > .form-control').type('r');
        cy.get('.btn-primary').contains('Login').click();
        cy.get('.fade').contains('To short password. Minimum 6 characters').should('exist');
        
    })

    it("goes to Register Page",()=>{
        cy.visit('/login');
        cy.get('.LoginPage_Text__2gKed > a').click();
        cy.url().should("include","register");
      });

    it("loggs in correctly",()=>{
        cy.visit('/login');
        cy.get('#email > .form-control').type('mik@o2.pl');
        cy.get('#password > .form-control').type('123456');
        cy.get('.btn-primary').contains('Login').click();
        cy.url().should("include","projects");
    })
});