import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftingSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"
import { DraftingKopSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_kop_surat_perintah.cy"
import { DraftingKepalaSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kepala_surat.cy"
import { DraftingBadanSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_badan_surat.cy"
import { DraftingKakiSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kaki_surat.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let draftingKopSuratPerintahPage = new DraftingKopSuratPerintahPage()
let draftingKepalaSuratPerintahPage = new DraftingKepalaSuratPerintahPage()
let draftingBadanSuratPerintahPage = new DraftingBadanSuratPerintahPage()
let draftingKakiSuratPerintahPage = new DraftingKakiSuratPerintahPage()
let setujuiPage = new SetujuiPage()

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

describe('Setujui Naskah Skenario', { testIsolation: false }, () => {
    qase([2152, 2146],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview()
            setujuiPage.setujui()

            cy.wait(5000)
        })
    )
}) 