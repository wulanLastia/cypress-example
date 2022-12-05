export class LoginPage {

    navigateLoginPage() {
        cy.visit(Cypress.env('base_url'))
    }

    enterUsername(username) {
        cy.xpath("//input[@placeholder='Username']").type(username)
    }

    enterPassword(password) {
        cy.xpath("//input[@placeholder='Password']").type(password)
    }

    clickBtnLogin(){
        cy.xpath("//button[normalize-space()='Login']").click()
    }

    loginSampleKonseptor(username, password){
        cy.visit(Cypress.env('base_url'))
        cy.xpath("//input[@placeholder='Username']").type(username)
        cy.xpath("//input[@placeholder='Password']").type(password)
        cy.xpath("//button[normalize-space()='Login']").click()
    }
    
}