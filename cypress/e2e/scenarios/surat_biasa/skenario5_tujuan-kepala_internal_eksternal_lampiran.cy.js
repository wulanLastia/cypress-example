import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"

let createSuratBiasaPage = new CreateSuratBiasaPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Skenario Create Surat Biasa Tujuan Internal Eksternal Skenario 5 (Tujuan Kepala Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 176],
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
            createSuratBiasaPage.inputKakiSuratSkenario3()
            createSuratBiasaPage.inputKepalaSuratSkenario5()
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression()
            createSuratBiasaPage.kirimSurat()
        })
    )
})