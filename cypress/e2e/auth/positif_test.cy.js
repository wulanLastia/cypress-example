import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../support/pages/auth/login.cy"

let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

beforeEach(() => {
    loginPage.navigateLoginPage()
})

afterEach(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('Login Positif Skenario', () => {
    qase(251,
        it('Login dengan NIP akun yang aktif', () => {
            loginPage.enterNip(user.nip)
            loginPage.clickBtnMasuk()
            loginPage.closePopupLandingPage()
        })
    )
})