import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PerbaikiNaskahPage } from "../../../../support/pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { KembalikanNaskahPage } from "../../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { CreateSuratBiasaPage } from "../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"

let createSuratBiasaPage = new CreateSuratBiasaPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

beforeEach(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Create dan Kembalikan Naskah Skenario', () => {

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

            cy.wait(5000)
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            // Kembalikan Naskah
            kembalikanNaskahPage.emptyField()
            kembalikanNaskahPage.batalKembalikanNaskah()
            kembalikanNaskahPage.checkHalamanInformasi()
            kembalikanNaskahPage.checkBtnPeriksaKembali()
            kembalikanNaskahPage.kembalikanNaskah()
            cy.wait(3000)
            loginPage.closePopupLandingPage()
            cy.wait(5000)
        })
    )
})

describe('Perbaiki Naskah Skenario', { testIsolation: false }, () => {
    qase(367,
        it('Akses halaman perbaikan naskah', () => {
            // Login
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah()
            cy.wait(5000)
        })
    )

    qase(717,
        it('Cek tombol batal kirim naskah', () => {
            perbaikiNaskahPage.batalPerbaikiNaskah()
            cy.wait(5000)
        })
    )

    qase([712, 713, 714, 715],
        it('Memperbaiki isi naskah', () => {
            // Login
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah()
            cy.wait(5000)
            perbaikiNaskahPage.perbaikiNaskah()
            cy.wait(5000)
        })
    )

}) 