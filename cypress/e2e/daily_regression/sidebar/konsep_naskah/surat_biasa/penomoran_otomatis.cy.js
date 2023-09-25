import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { KembalikanNaskahPage } from "../../../../../support/pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "../../../../../support/pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "../../../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"
import { KoreksiSuratPage } from "../../../../../support/pages/sidebar/kotak_masuk/7_koreksi.cy"

let createSuratBiasaPage = new CreateSuratBiasaPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let koreksiSuratPage = new KoreksiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

afterEach(() => {
    cy.wait(10000)
    loginPage.logoutV2step2()
})


describe('Skenario Create Surat Biasa Tujuan Internal Eksternal (Tujuan Kepala Surat) Penomoran Otomatis', () => {

    qase([13, 81, 83, 709, 150, 80],
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

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah()
            perbaikiNaskahPage.perbaikiNaskah()
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview()
            setujuiPage.setujui()
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa2, user.password)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview()
            koreksiSuratPage.checkDetailKoreksiTandatangani()
            koreksiSuratPage.koreksiTandatanganiNaskah(user.passphrase)
            cy.wait(10000)
        })
    )
})
