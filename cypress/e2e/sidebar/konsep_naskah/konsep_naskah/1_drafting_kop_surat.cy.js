import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKopSuratPage } from "../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kop_surat.cy"

let draftingKopSuratPage = new DraftingKopSuratPage()
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

describe('Drafting Kop Surat Skenario', { testIsolation: false }, () => {
    qase(81,
        it('Akses form editing kop surat (drafting)', () => {
            draftingKopSuratPage.aksesKonsepNaskahSuratBiasa()
            draftingKopSuratPage.aksesFormEditingKopSurat()
        })
    )

    qase(82,
        it('Cek detail form editing kop surat', () => {
            draftingKopSuratPage.checkDetail()
        })
    )

    qase(291,
        it('Check selected radio button (default)', () => {
            draftingKopSuratPage.checkPreviewDefault()
        })
    )

    qase(285,
        it('Cek preview setelah memilih kop Sekretariat Daerah', () => {
            draftingKopSuratPage.checkPreviewSekda()
        })
    )

    qase(74,
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratPage.checkPreviewDinas()
        })
    )

    qase(75,
        it('Cek preview setelah memilih kop UPTD/cabang dinas', () => {
            draftingKopSuratPage.checkPreviewUPTD()
        })
    )

    qase(72,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratPage.closeKopSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
})