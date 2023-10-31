import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingSuratPerintahPage } from "../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"
import { DraftingKopSuratPerintahPage } from "../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_kop_surat_perintah.cy"


let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

let draftingSuratPerintahPage = new DraftingSuratPerintahPage()

let draftingKopSuratPerintahPage = new DraftingKopSuratPerintahPage()


    
before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
    draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Kop Surat Surat Perintah Skenario', { testIsolation: false }, () => {
    qase(1064,
        it('Akses form editing kop surat (drafting)', () => {
            draftingKopSuratPerintahPage.aksesFormEditingKopSurat()
            cy.wait(6000)
        })
    )

    qase([1065,71],
        it('Cek detail form editing kop surat', () => {
            draftingKopSuratPerintahPage.checkDetail()
        })
    )

    qase(1067,
        it('Check selected radio button (default)', () => {
            draftingKopSuratPerintahPage.checkPreviewDefault()
        })
    )

    qase([1066,71],
        it('Cek preview setelah memilih kop Sekretariat Daerah', () => {
            draftingKopSuratPerintahPage.checkPreviewSekda()
        })
    )

    qase([1062,71],
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratPerintahPage.checkPreviewDinas()
        })
    )

    qase([1063,71],
        it('Cek preview setelah memilih kop UPTD/cabang dinas', () => {
            draftingKopSuratPerintahPage.checkPreviewUPTD()
        })
    )

    qase(1061,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratPerintahPage.closeKopSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
})