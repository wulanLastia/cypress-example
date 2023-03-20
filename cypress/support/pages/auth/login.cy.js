import login from "../../selectors/login"
import navbar from "../../selectors/navbar"

export class LoginPage {

    navigateLoginPage() {
        cy.visit(Cypress.env('base_url'))
        
        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.click()

        const titleSso = cy.xpath(navbar.titleSimulasi)
        titleSso.should('contain','Simulasi login di Sidebar v1')
    }

    navigateLoginPageV1() {
        cy.visit(Cypress.env('base_url_v1'))
    }

    enterNip(nip) {
        const nips = cy.xpath(login.inputNip)

        nips.clear()
        nips.should('be.visible')
        nips.should('have.attr', 'type', 'number')
        nips.type(nip)
    }

    clickBtnMasuk() {
        const btnMasuk = cy.xpath(login.btnMasuk)

        btnMasuk.should('be.visible')
        btnMasuk.contains('Login')
        btnMasuk.click()
    }

    logout() {
        const btnProfile = cy.xpath(navbar.btnProfile).as('btnProfile')

        btnProfile.should('be.visible')
        btnProfile.click()

        const popupProfile = cy.xpath(navbar.popupProfile).as('popupProfile')
        popupProfile.should('be.visible')
        
        const btnKeluar = cy.xpath(navbar.btnKeluar).as('btnKeluar')
        btnKeluar.should('be.visible').and('contain', 'Log Out')
        btnKeluar.click()

        cy.url().should('eq', Cypress.env('base_url') + '/login?logout=true')
    }

    alertFailedNipKurang() {
        const alert = cy.xpath(navbar.responseNip)

        alert.should('be.visible')
             .and('contain', '{"nip":"Isian nip harus minimal 18 karakter."}')
    }

    alertFailedNipKosong() {
        const alert = cy.xpath(navbar.responseNip)

        alert.should('be.visible')
             .and('contain', '{"nip":"Isian nip tidak boleh string kosong."}')
    }

    navigateLoginPageV2() {
        cy.visit(Cypress.env('base_url'))
    }

}