// https://docs.cypress.io/api/introduction/api.html

describe("Post", () => {
  it("Edits a post", () => {
    cy.server();
    cy.route("PUT", "**/posts/1").as("updatePost");
    let title = "New title",
      body = "New body";
    cy.visit("/");
    cy.get("[data-testid=post]")
      .eq(0)
      .within(() => {
        cy.get("[data-testid=edit]").click();
        cy.get("[data-testid=edit-title]").type(title);
        cy.get("[data-testid=edit-body]").type(body);
        cy.get("[data-testid=edit-save]").click();
        cy.wait("@updatePost");
        cy.get("[data-testid=title]").contains(title);
        cy.get("[data-testid=body]").contains(body);
      });
  });

  it("Removes a post", () => {
    cy.server();
    cy.route("DELETE", "**/posts/1").as("deletePost");
    cy.visit("/");
    cy.get("[data-testid=post]")
      .eq(0)
      .within(() => {
        cy.get("[data-testid=title]").then(([{ textContent }]) => {
          cy.get("[data-testid=remove]").click();
          cy.wait("@deletePost");
          cy.contains("[data-testid=title]", textContent).should("not.exist");
        });
      });
  });
});
