describe("renders correctly",()=>{
    beforeEach(() => {
        cy.visit("/login");
        cy.get("#email > .form-control").type("mik@o2.pl");
        cy.get("#password > .form-control").type("123456");
        cy.get(".btn-primary").contains("Login").click();
        cy.get(':nth-child(2) > .Projects_ProjectName__1B2Y2 > .Projects_ProjectTextAlignmentSub1__1UzxC').click();
        cy.get('.Dashboard_PlusSign__2yueK').click();
      });
    it("renders all elements",()=>{
        cy.get('.card-body').should('exist');
        cy.get(':nth-child(1) > .form-control').should('exist');
        cy.get(':nth-child(2) > .form-control').should('exist');
        cy.get(':nth-child(3) > #formGridState').should('exist');
        cy.get(':nth-child(4) > #formGridState').should('exist');
        cy.get('.mt-2').contains('Create').should('exist');
    })
    it("shows error if inputs are empty",()=>{
       
        cy.get('.mt-2').click();
        cy.get('.fade').contains('Fields can not be empty').should('exist');

    })

    it("creates issue correctly",()=>{
        cy.get(':nth-child(1) > .form-control').type('New cypress test issue');
        cy.get(':nth-child(2) > .form-control').type('New cypress test issue description');
        cy.get(':nth-child(3) > #formGridState').select('Mikolaj Gruszecki');
        cy.get(':nth-child(4) > #formGridState').select('mik@o2.pl');
        cy.get('.mt-2').click();
        cy.url().should("include", "dashboard");
        cy.get('.IssueTable_IssueTable__3Y5r8 > .container').children().contains('New cypress test issue').should('exist');
    })

})