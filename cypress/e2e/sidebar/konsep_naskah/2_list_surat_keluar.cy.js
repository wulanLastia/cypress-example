import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { KonsepNaskahPage } from "../../../support/pages/sidebar/konsep_naskah/1_konsep_naskah.cy"

let konsepNaskahPage = new KonsepNaskahPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

after(() => {
    qase(411,
        loginPage.backToV1()
    )
})

describe('List Review Naskah Keluar', () => {
    qase(46,
        it('Cek detail container naskah keluar', () => {
            // Login
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Check Detail
            konsepNaskahPage.checkDetailContainerNaskahKeluar()
        })
    )
})