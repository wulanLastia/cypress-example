import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKonsepNaskahPage } from "../../../support/pages/sidebar/konsep_naskah/drafting_konsep_naskah.cy"

let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
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

after(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('Drafting Konsep Naskah Skenario', () => {
    qase(70,
        it('Cek detail halaman drafting konsep naskah surat biasa', () => {
            draftingKonsepNaskahPage.checkDetail()
        })
    )

    qase(76,
        it('Batal drafting konsep naskah', () => {
            draftingKonsepNaskahPage.batalDrafting()
        })
    )

    qase(77,
        it('Melanjutkan drafting konsep naskah', () => {
            draftingKonsepNaskahPage.lanjutkanDrafting()
        })
    )
})