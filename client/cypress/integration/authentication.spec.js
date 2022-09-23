describe("Authentication", function () {
  it("Can log in.", function () {
    cy.intercept("POST", "log_in", {
      statusCode: 200,
      body: {
        "access": "ACCESS_TOKEN",
        "refresh": "REFRESH_TOKEN"
      }
    }).as("logIn");

    cy.visit("/#/log-in");
    cy.get("input#username").type("gary.cole@example.com");
    cy.get("input#password").type("pAssw0rd", { log: false });
    cy.get("button").contains("Log in").click();

    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait("@logIn");

    cy.hash().should("eq", "#/");
    cy.get("button").contains("Log out");
  });
  
  it("Can sign up.", function () {
    cy.visit("/#/sign-up");
    cy.get("input#username").type("gary.cole@example.com");
    cy.get("input#firstName").type("Gary");
    cy.get("input#lastName").type("Cole");
    cy.get("input#password").type("pAssw0rd", { log: false });
    cy.get("select#group").select("driver");
    cy.get("input#photo").attachFile("images/photo.jpg");
    cy.get("button").contains("Sign up").click();
    cy.hash().should("eq", "#/log-in");
  });

  it("Cannot visit the login page when logged in", function () {
    const { username, password } = Cypress.env("credentials")

    cy.intercept("Post", "log_in", {
      statusCode: 200,
      body: {
        "access": "ACCESS_TOKEN",
        "refresh": "REFRESH_TOKEN"
      }
    }).as("logIn");
    cy.visit("/#/log-in")
    cy.get("input#username").type(username)
    cy.get("input#password").type(password, {log: false})
    cy.get("button").contains("Log in").click()
    cy.hash().should("eq", "#/")
    cy.get("button").contains("Log out")
    cy.wait("@logIn")

    cy.visit("/#/log-in");
    cy.hash().should("eq", "#/")
  })
});
