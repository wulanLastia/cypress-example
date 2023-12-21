import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftingSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"
import { DraftingKopSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_kop_surat_perintah.cy"
import { DraftingKepalaSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kepala_surat.cy"
import { DraftingBadanSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_badan_surat.cy"
import { DraftingKakiSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kaki_surat.cy"
import { KembalikanNaskahPage } from "@pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "@pages/sidebar/kotak_masuk/6_perbaiki.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let draftingKopSuratPerintahPage = new DraftingKopSuratPerintahPage()
let draftingKepalaSuratPerintahPage = new DraftingKepalaSuratPerintahPage()
let draftingBadanSuratPerintahPage = new DraftingBadanSuratPerintahPage()
let draftingKakiSuratPerintahPage = new DraftingKakiSuratPerintahPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()

let user
let data_review
let testKepalaPositive
let testBadanPositive
let testKakiPositive

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
})

/*before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()

    cy.wait(1000)

    draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()

    cy.wait(3999)
})*/

before(() => {
    cy.fixture('non_cred/surat_perintah/kepala_surat/positive/kepala_surat_super_positive.json').then((data) => {
        testKepalaPositive = data
    })

    cy.fixture('non_cred/surat_perintah/badan_surat/positive/badan_surat_super_positive.json').then((data) => {
        testBadanPositive = data
    })

    cy.fixture('non_cred/surat_perintah/kaki_surat/positive/kaki_surat_super_positive.json').then((data) => {
        testKakiPositive = data
    })

    cy.fixture('non_cred/surat_perintah/review_naskah.json').then((data) => {
        data_review = data
    })
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

/* Create Surat Perintah */

describe('Kembalikan Naskah Skenario', () => {
    qase([2104, 2092, 2094, 2107, 2091],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            // Kembalikan Naskah
            kembalikanNaskahPage.emptyField()
            kembalikanNaskahPage.batalKembalikanNaskah()
            kembalikanNaskahPage.checkHalamanInformasi()
            kembalikanNaskahPage.checkBtnPeriksaKembali(data_review.kembalikan[0].kembalikan_perihal)
            kembalikanNaskahPage.kembalikanNaskah(data_review.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
            loginPage.closePopupLandingPage()
        })
    )
})

describe('Perbaiki Naskah Skenario', { testIsolation: false }, () => {
    qase(2263,
        it('Akses halaman perbaikan naskah', () => {
            // Login
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah()
            cy.wait(5000)
        })
    )

    qase(2272,
        it('Cek tombol batal kirim naskah', () => {
            perbaikiNaskahPage.batalPerbaikiNaskah()
            cy.wait(5000)
        })
    )

    qase(2267,
        it('Memperbaiki isi naskah', () => {
            perbaikiNaskahPage.goToPerbaikiNaskah()
            cy.wait(5000)
            perbaikiNaskahPage.perbaikiNaskahSuratPerintah(data_review.perbaiki[0].perbaiki_perihal)
            cy.wait(5000)
        })
    )

}) 