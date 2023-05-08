import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/7_create_surat_biasa.cy"

let createSuratBiasaPage = new CreateSuratBiasaPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
    loginPage.closePopupLandingPage()
})

/*after(() => {
    qase(411,
        loginPage.logout()
    )
})*/

describe('Create Surat Biasa Skenario', () => {
    qase(13,
        it('Akses halaman konsep naskah', () => {
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
        })
    )

    qase(81,
        it('Akses form editing kop surat (drafting)', () => {
            createSuratBiasaPage.inputKopSurat()
        })
    )

    qase(83,
        it('Akses form editing kepala surat', () => {
            createSuratBiasaPage.inputKepalaSurat()
        })
    )

    qase(709,
        it('Akses form editing badan naskah', () => {
            createSuratBiasaPage.inputBadanNaskah()
        })
    )

    qase(150,
        it('Access kaki surat editing form', () => {
            createSuratBiasaPage.inputKakiSurat()
        })
    )

    qase(80,
        it('Kirim drafting naskah surat biasa', () => {
            createSuratBiasaPage.kirimSurat()
        })
    )
}) 