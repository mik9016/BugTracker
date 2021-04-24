describe("renders correctly",()=>{
    beforeEach(() => {
        cy.visit("/login");
        cy.get("#email > .form-control").type("mik@o2.pl");
        cy.get("#password > .form-control").type("123456");
        cy.get(".btn-primary").contains("Login").click();
        cy.get(':nth-child(2) > .Projects_ProjectName__1B2Y2 > .Projects_ProjectTextAlignmentSub1__1UzxC > .Projects_ProjectText__FYWMl').click();
        cy.get(':nth-child(3) > .IssueTable_IssueName__1H4qn').click();
      });

      it("renders all elements",()=>{
        cy.get('.IssueDetails_Card__1tstQ').should('exist');
        cy.get(':nth-child(1) > .form-control').should('have.value','New cypress test issue');
        cy.get(':nth-child(2) > .form-control').should('have.value', 'New cypress test issue description');
        cy.get(':nth-child(3) > .form-control').should('exist');
        cy.get(':nth-child(4) > .form-control').should('exist');
        cy.get('.btn-outline-success').contains('Save').should('exist');
        cy.get('.btn-outline-danger').contains('Delete').should('exist');
      })
      
})