describe("renders correctly",()=>{
    beforeEach(() => {
        cy.visit("/login");
        cy.get("#email > .form-control").type("mik@o2.pl");
        cy.get("#password > .form-control").type("123456");
        cy.get(".btn-primary").contains("Login").click();
        cy.get(':nth-child(2) > .Projects_ProjectName__1B2Y2 > .Projects_ProjectTextAlignmentSub1__1UzxC').click();
        cy.get(':nth-child(2) > .Dashboard_Hover__8fY50').click();
      });

      it("renders all elements",()=>{
        cy.get('.SetTeamUserRole_Card__uXzpL').should('exist');
        cy.get(':nth-child(3) > .btn').contains('Delete').should('exist');
        cy.get('[src="/static/media/add.2618b31d.svg"]').should('exist');
        cy.get('.SetTeamUserRole_MemberName__19GwC').should('exist');

      })

      it("goes to add member page",()=>{
        cy.get('[src="/static/media/add.2618b31d.svg"]').click();
        cy.url().should("include", "addmember");
      })
})