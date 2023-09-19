import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PerbaikiNaskahPage } from "../../../../support/pages/sidebar/kotak_masuk/6_perbaiki.cy"

let perbaikiNaskahPage = new PerbaikiNaskahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

describe('Perbaiki Naskah Skenario', { testIsolation: false }, () => {
    qase(367,
        it('Akses halaman perbaikan naskah', () => {
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
            perbaikiNaskahPage.goToPerbaikiNaskah()
            cy.wait(5000)
            perbaikiNaskahPage.perbaikiNaskah()
            cy.wait(5000)
        })
    )

}) 