import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"
import { DraftingKopSuratPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kop_surat.cy"

let draftingKopSuratPage = new DraftingKopSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let data_temp

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
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
            draftingKopSuratPage.checkPreviewDefault(data_temp.org[0].org1)
        })
    )

    qase(285,
        it('Cek preview setelah memilih kop Sekretariat Daerah', () => {
            draftingKopSuratPage.checkPreviewSekda(data_temp.org[0].org1)
        })
    )

    qase(74,
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratPage.checkPreviewDinas(data_temp.org[0].org1)
        })
    )

    qase(75,
        it('Cek preview setelah memilih kop UPTD/cabang dinas', () => {
            draftingKopSuratPage.checkPreviewUPTD(data_temp.org[0].org1)
        })
    )

    qase(72,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratPage.closeKopSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )
})