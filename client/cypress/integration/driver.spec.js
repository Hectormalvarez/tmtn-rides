const faker = require("faker");

const randomEmail = faker.internet.email();

describe("The driver dashboard", function () {
    it("Cannot be visited if the user is not a driver", function () {
        cy.intercept("POST", "sign_up").as("signUp");
        cy.intercept("POST", "log_in").as("logIn");

        cy.visit("/#/sign-up");
        cy.get("input#username").type(randomEmail)
        cy.get("input#firstName").type("Gary");
        cy.get("input#lastName").type("Cole");
        cy.get("input#password").type("pAssw0rd", {log: false});
        cy.get("select#group").select("rider");

        cy.get("input#photo").attachFile("images/photo.jpg")
    })
})