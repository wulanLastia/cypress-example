import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"

let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Login Positif Skenario', () => {
    qase([251, 411],
        it('Login dengan NIP akun yang aktif', () => {

            cy.overrideFeatureToggle({
                'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': true,
            })

            loginPage.loginViaV1(user.nip, 'xxxxxxx')
            loginPage.directLogin()
            loginPage.logoutV2()
        })
    )
})