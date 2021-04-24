describe("renders correctly", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#email > .form-control").type("mik@o2.pl");
    cy.get("#password > .form-control").type("123456");
    cy.get(".btn-primary").contains("Login").click();
    cy.get(
      ":nth-child(1) > :nth-child(2) > .Projects_ProjectName__1B2Y2"
    ).click();
  });
  it("renders all elements", () => {
    cy.get(".Dashboard_ProjectTitle__2BowH").contains("Buggy").should("exist");
    cy.get(":nth-child(1) > .card > :nth-child(2) > .card-title")
      .contains("Done")
      .should("exist");
    cy.get(":nth-child(2) > .card > :nth-child(2) > .card-title")
      .contains("Open")
      .should("exist");
    cy.get(":nth-child(3) > .card > :nth-child(2) > .card-title")
      .contains("Pending")
      .should("exist");
    cy.get(".w-50").should("exist");
    cy.get(".w-25").should("exist");
    cy.get(".IssueTable_IssueTable__3Y5r8 > .container").should("exist");
  });

  it("shows open tickets", () => {
    cy.get(".w-25").select("open");
    cy.get(".IssueTable_IssueName__1H4qn")
      .contains("open issue for testing")
      .should("exist");
  });

  it("shows done tickets", () => {
    cy.get(".w-25").select("done");
    cy.get(":nth-child(1) > .IssueTable_IssueName__1H4qn")
      .contains("style it!")
      .should("exist");
  });
  it("sorts tickets by letter", () => {
    cy.get(".w-25").select("done");
    cy.get(".w-50").type("make");
    cy.get(".IssueTable_IssueTable__3Y5r8 > .container")
      .children()
      .contains("make")
      .should("exist");
  });
  it("goes to project settings page", () => {
    cy.get(".Dashboard_Title__kPzrq").click();
    cy.url().should("include", "projectSettings");
  });
  it("goes to create issue page", () => {
    cy.get(".Dashboard_PlusSign__2yueK").click();
    cy.url().should("include", "createIssue");
  });
  it("goes to manage members page", () => {
    cy.get(":nth-child(2) > .Dashboard_Hover__8fY50").click();
    cy.url().should("include", "manageteam");
  });
  it("goes to manage profile page", () => {
    cy.get('[href="/profile"]').click();
    cy.url().should("include", "profile");
  });


});
