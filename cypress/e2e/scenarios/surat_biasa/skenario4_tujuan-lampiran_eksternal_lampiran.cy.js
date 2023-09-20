import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { ReviewVerifikasiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { FilterDanSearchPenomoranPage } from "../../../support/pages/sidebar/kotak_masuk/4_search_filter_penomoran.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

let setujuiPage = new SetujuiPage()
let filterDanSearchPenomoranPage = new FilterDanSearchPenomoranPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Skenario Create Surat Biasa Tujuan Eksternal Skenario 4 (Tujuan Lampiran Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 849, 176],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputLampiranSurat()
            createSuratBiasaPage.inputLampiranSurat2()
            createSuratBiasaPage.inputKakiSuratSkenario2()
            createSuratBiasaPage.inputKepalaSuratSkenario4()
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression()
            createSuratBiasaPage.kirimSurat()
        })
    )
})