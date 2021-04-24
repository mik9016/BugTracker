describe("renders correctly", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#email > .form-control").type("mik@o2.pl");
    cy.get("#password > .form-control").type("123456");
    cy.get(".btn-primary").contains("Login").click();
  });

  it("renders all elements", () => {
    cy.url().should("include", "projects");
    cy.get(".Projects_CreateProjectTitle__23HU0").should("exist");
    cy.get('.mr-auto > [href="/projects"]').should("exist");
    cy.get('[href="/profile"]').should("exist");
    cy.get(".NavigationBar_LoggedAs__242Td").should("exist");
    cy.get(".Projects_PlusSign__2H_JX").should("exist");
    cy.get(".NavigationBar_Pic__4acke").should("exist");
  });

  it("goes to create newProject page", () => {
    cy.get(".Projects_CreateProjectTitle__23HU0").click();
    cy.url().should("include", "createProject");
  });

  it("goes to project page", () => {
    cy.get(
      ":nth-child(2) > .Projects_ProjectName__1B2Y2 > .Projects_ProjectTextAlignmentSub1__1UzxC > .Projects_ProjectText__FYWMl"
    ).click();
    cy.url().should("include", "dashboard");
    cy.get(".Dashboard_ProjectTitle__2BowH").contains("Buggy").should("exist");
  });
});
