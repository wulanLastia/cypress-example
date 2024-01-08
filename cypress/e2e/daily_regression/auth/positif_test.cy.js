import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"

let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': true,
        'SIDEBAR-V1-LOGIN-CAPTCHA': true
    })
})

describe('Login Positif Skenario', () => {
    qase([251, 411],
        it('Login dengan NIP akun yang aktif', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()
            loginPage.logoutV2()
        })
    )
})