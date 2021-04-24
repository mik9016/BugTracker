describe("renders correctly",()=>{
    beforeEach(() => {
        cy.visit("/login");
        cy.get("#email > .form-control").type("mik@o2.pl");
        cy.get("#password > .form-control").type("123456");
        cy.get(".btn-primary").contains("Login").click();
        cy.get(".Projects_CreateProjectTitle__23HU0").click();
      });

    it("renders all elements",()=>{
        cy.get(':nth-child(1) > .w-75').should('exist');
        cy.get(':nth-child(2) > .w-75').should('exist');
        cy.get('.w-50').contains('Create').should('exist');
    })

    it("shows error when input are empty",()=>{
        cy.get('.w-50').click();
        cy.get('.fade').contains('Fields can not be empty').should('exist');

    });
    it('creates a new project correctly',()=>{
        cy.get(':nth-child(1) > .w-75').type('New Cyperess project');
        cy.get(':nth-child(2) > .w-75').select('Manager');
        cy.get('.w-50').click();
        cy.url().should("include", "projects");
      
    })
    it('checks if project was created correctly',()=>{
        cy.get('.CreateProject_Image__30SqC').click();
        cy.get('.row > :nth-child(1)').contains('New Cyperess project').should('exist');
      
    })
})