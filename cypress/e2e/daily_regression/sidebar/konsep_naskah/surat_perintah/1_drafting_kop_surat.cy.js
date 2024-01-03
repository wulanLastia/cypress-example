import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"
import { DraftingKopSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_kop_surat_perintah.cy"


let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let draftingKopSuratPerintahPage = new DraftingKopSuratPerintahPage()

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});


before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
        'SIDEBAR-V1-LOGIN-CAPTCHA': true
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
    cy.wait(1000)
    draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()

    cy.wait(3999)
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Kop Surat Surat Perintah Skenario', { testIsolation: false }, () => {
    qase([1395, 1419],
        it('Akses form editing kop surat (drafting)', () => {
            draftingKopSuratPerintahPage.aksesFormEditingKopSurat()
            cy.wait(6000)
        })
    )

    qase([1420, 1732],
        it('Cek detail form editing kop surat', () => {
            draftingKopSuratPerintahPage.checkDetail()
        })
    )

    qase(1422,
        it('Check selected radio button (default)', () => {
            draftingKopSuratPerintahPage.checkPreviewDefault()
        })
    )

    qase([1731, 1421],
        it('Cek preview setelah memilih kop Sekretariat Daerah', () => {
            draftingKopSuratPerintahPage.checkPreviewSekda()
        })
    )

    qase([1417, 1732],
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratPerintahPage.checkPreviewDinas()
        })
    )

    qase([1418, 1732],
        it('Cek preview setelah memilih kop UPTD/cabang dinas', () => {
            draftingKopSuratPerintahPage.checkPreviewUPTD()
        })
    )

    qase([1415, 1732],
        it('Cek list pilihan dropdown UPTD/Cabang Dinas', () => {
            draftingKopSuratPerintahPage.checkDropdownUPTD()
        })
    )

    qase(1416,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratPerintahPage.closeKopSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
})