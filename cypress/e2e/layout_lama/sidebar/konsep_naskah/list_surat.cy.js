import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { KonsepNaskahPage } from "../../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/pgs_konsep_naskah.cy"

let konsepNaskahPage = new KonsepNaskahPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('List Surat Skenario', () => {
    qase(18,
        it('Cek detail container Konsep Naskah', () => {
            // Login
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Cek Detail
            konsepNaskahPage.checkDetailContainerKonsepNaskah()
        })
    )
})