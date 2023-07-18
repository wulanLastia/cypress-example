import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingLampiranSuratPage } from "../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_lampiran_surat.cy"

let draftingLampiranSuratPage = new DraftingLampiranSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})

describe('Drafting Lampiran Surat Skenario', { testIsolation: false }, () => {

    qase([104, 280, 279],
        it('Check detail attachment editing form', () => {
            draftingLampiranSuratPage.aksesKonsepNaskahSuratBiasa()
            draftingLampiranSuratPage.aksesFormEditingLampiranSurat()
            draftingLampiranSuratPage.checkDetail()
        })
    )

    qase(105,
        it('Hapus lampiran drafting surat biasa', () => {
            draftingLampiranSuratPage.hapusLampiranSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
}) 