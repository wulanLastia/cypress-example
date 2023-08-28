import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ReviewVerifikasiSuratPage } from "../../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"
import { CreateSuratBiasaPage } from "../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"

let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})

describe('Detail Review dan Verifikasi hasil Surat (Kotak Masuk) Skenario', () => {

    qase([13, 81, 83, 709, 150, 80],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputKepalaSurat()
            createSuratBiasaPage.inputKakiSurat()
            createSuratBiasaPage.inputBadanNaskah()
            createSuratBiasaPage.kirimSurat()
        })
    )

    qase([97, 358, 99],
        it('Check Detail Review dan Verifikasi hasil Surat (Kotak Masuk)', () => {
            //Login
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            menuPage.goToKotakMasukReviewNaskah()
            reviewVerifikasiSuratPage.suratBelumDireview()
            reviewVerifikasiSuratPage.lanjutkanReviewDrafting()
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )
})