import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"

let loginPage = new LoginPage()
let user

beforeEach(() => {
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
    })
})

describe('Login Negatif Skenario', () => {
    qase(252,
        it('Input NIP selain angka', () => {
            loginPage.loginViaV1(user.nipAbjad, user.password)
            loginPage.alertGagalLogin()
        })
    )

    qase(249,
        it('Login dengan NIP kurang dari 18 karakter', () => {
            loginPage.loginViaV1(user.nipKurang, user.password)
            loginPage.alertGagalLogin()
        })
    )
})