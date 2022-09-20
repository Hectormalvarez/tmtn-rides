/* eslint-disable no-undef */
describe("Navigation", function () {
    it("can navigate to sign up from home", function () {
        cy.visit("/#/");
        cy.get("a").contains("Sign up").click();
        cy.hash().should("eq", "#/sign-up");
    })
})