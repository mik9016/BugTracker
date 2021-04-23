describe("renders the login page", () => {
    it("renders correctly", ()=>{
        cy.visit("/register");
        cy.get('.card-body').should("exist");
        cy.get('#name').should('exist');
        cy.get('#email').should('exist');
        cy.get('#password').should('exist');
        cy.get('.btn-primary').contains('Register').should('exist');
        cy.get('.RegisterPage_Text__1pLFa > a').should('exist');
    })

    it("returns error if to short name", ()=>{
        cy.visit('/register');
        cy.get('#name > .form-control').type('a');
        cy.get('.btn-primary').contains('Register').click();
        cy.get('.fade').contains('To short name. Minimum 3 characters').should('exist');
        
    })

    it("returns error if to wrong email", ()=>{
        cy.visit('/register');
        cy.get('#name > .form-control').type('asdf');
        cy.get('#email > .form-control').type('asdas');
        cy.get('.btn-primary').contains('Register').click();
        cy.get('.fade').contains('To short or incorrect email').should('exist');
        
    })

    it("returns error if to wrong password", ()=>{
        cy.visit('/register');
        cy.get('#name > .form-control').type('asdf');
        cy.get('#email > .form-control').type('asdas@.sdihj2.pl');
        cy.get('#password > .form-control').type('a');
        cy.get('.btn-primary').contains('Register').click();
        cy.get('.fade').contains('To short password. Minimum 6 characters').should('exist');
        
    })

    

    it("goes to Login Page",()=>{
        cy.visit('/register');
        cy.get('.RegisterPage_Text__1pLFa > a').click();
        cy.url().should("include","login");
      });


});