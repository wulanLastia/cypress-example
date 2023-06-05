import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { KembalikanNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"

let createSuratBiasaPage = new CreateSuratBiasaPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Kembalikan Naskah Skenario', () => {

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

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            // Create Naskah
            kembalikanNaskahPage.emptyField()
            kembalikanNaskahPage.batalKembalikanNaskah()
            kembalikanNaskahPage.checkHalamanInformasi()
            kembalikanNaskahPage.checkBtnPeriksaKembali()
            kembalikanNaskahPage.kembalikanNaskah()
            cy.wait(3000)
            loginPage.closePopupLandingPage()
        })
    )


}) 