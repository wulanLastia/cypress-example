import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"

let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
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