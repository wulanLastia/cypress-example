import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { KonsepNaskahPage } from "../../../support/pages/sidebar/konsep_naskah/konsep_naskah.cy"

let konsepNaskahPage = new KonsepNaskahPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

beforeEach(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
    loginPage.closePopupLandingPage()
})

afterEach(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('List Review Naskah Keluar', () => {
    qase(46,
        it('Cek detail container naskah keluar', () => {
            konsepNaskahPage.checkDetailContainerNaskahKeluar()
        })
    )
})