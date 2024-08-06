import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"

let loginPage = new LoginPage()
let user

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

before(() => {
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Login to SSO JABAR', { testIsolation: false }, () => {
    qase([3828, 3830],
        it('Login with username & password valid user SSO JABAR', () => {
            // Cek tombol login melalui SSO JABAR 3828
            loginPage.loginSSOJabar()

            // Login with username & password valid user SSO JABAR 3830
            loginPage.inputDataLoginSSO(user.user_sso, user.password_sso)
        })
    )
})