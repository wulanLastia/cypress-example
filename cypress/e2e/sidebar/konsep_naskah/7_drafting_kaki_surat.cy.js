import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKakiSuratPage } from "../../../support/pages/sidebar/konsep_naskah/6_drafting_kaki_surat.cy"

let draftingKakiSuratPage = new DraftingKakiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
    loginPage.closePopupLandingPage()
})

/*after(() => {
    qase(411,
        loginPage.logout()
    )
})*/

describe('Drafting Kaki Surat Skenario', () => {
    qase(150,
        it('Access kaki surat editing form', () => {
            menuPage.goToKonsepNaskah()
        })
    )

}) 