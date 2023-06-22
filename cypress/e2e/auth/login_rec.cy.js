describe("Login Sidebar V1", () => {
    it("tests Login Sidebar V1", () => {
        cy.viewport(1512, 445);
        cy.visit("https://devsidebar.digitalservice.id/");
        cy.get("div:nth-of-type(3) > input").click();
        cy.get("div:nth-of-type(3) > input").type("196810082008011004");
        cy.get("#password").click();
        cy.get("#password").type("Simanisjuara22!");

        cy.get('#captchaword')
            .invoke('val')
            .then((val) => {
                cy.get("div:nth-of-type(6) > input").click();
                cy.get("div:nth-of-type(6) > input").type(val);
            })

        cy.get("div:nth-of-type(8) input").click();
        cy.location("href").should("eq", "https://devsidebar.digitalservice.id/administrator/anri_dashboard");
        cy.get("div.modal-footer > button").click();
    });
});


