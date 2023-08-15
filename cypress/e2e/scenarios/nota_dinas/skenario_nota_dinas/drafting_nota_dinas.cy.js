import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingNotaDinasPage } from "../../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"

let draftingNotaDinasPage = new DraftingNotaDinasPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

/*after(() => {
    qase(411,
        loginPage.backToV1()
    )
})*/

describe('Drafting Konsep Naskah Nota Dinas Skenario', { testIsolation: false }, () => {

    qase(1,
        it('Cek detail halaman drafting konsep naskah surat biasa', () => {
            draftingNotaDinasPage.goToKonsepNaskahNotaDinas()
        })
    )
})