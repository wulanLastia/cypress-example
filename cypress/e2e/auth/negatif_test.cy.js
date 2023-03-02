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
    loginPage.navigateLoginPage()
})

describe('Login Negatif Skenario', () => {
    qase(252,
        it('Input NIP selain angka', () => {
            loginPage.enterNip(user.nipAbjad)
            loginPage.clickBtnMasuk()
            loginPage.alertFailedNipKosong()
        })
    )

    qase(249,
        it('Login dengan NIP kurang dari 18 karakter', () => {
            loginPage.enterNip(user.nipKurang)
            loginPage.clickBtnMasuk()
            loginPage.alertFailedNipKurang()
        })
    )
})