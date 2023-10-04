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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Create Surat Biasa Skenario', () => {

    qase([13, 81, 83, 709, 150, 80, 913, 695, 176, 271],
        it('Create Naskah Surat Biasa', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputKepalaSurat()
            createSuratBiasaPage.inputKakiSuratPDF()
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression()
            createSuratBiasaPage.inputKakiSuratSkenario4()
            createSuratBiasaPage.simpanSurat()
        })
    )

}) 