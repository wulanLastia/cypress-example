import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { ReviewVerifikasiSuratPage } from "../../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"
import { SetujuiPage } from "../../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"

let setujuiPage = new SetujuiPage()
let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Create Surat Biasa Skenario', () => {

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
            createSuratBiasaPage.inputBadanNaskah()
            createSuratBiasaPage.inputKakiSurat()
            createSuratBiasaPage.kirimSurat()
        })
    )

    qase([102, 422, 424],
        it('Aksi setujui untuk penomoran pada detail naskah surat masuk belum di-review', () => {
            // Login Pemeriksa 1
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            menuPage.goToKotakMasukReviewNaskah()
            reviewVerifikasiSuratPage.suratBelumDireview()
            setujuiPage.setujui()
        })
    )

    qase([633, 585],
        it('Cek list kotak masuk review naskah pemeriksa selanjutnya setelah menyetujui naskah', () => {
            // Login Pemeriksa Terakhhir
            loginPage.loginViaV1(user.nipPemeriksa2, user.password)
            loginPage.directLogin()

            menuPage.goToKotakMasukReviewNaskah()
            reviewVerifikasiSuratPage.suratBelumDireview()
            setujuiPage.setujuiDanPenomoran()
        })
    )
}) 