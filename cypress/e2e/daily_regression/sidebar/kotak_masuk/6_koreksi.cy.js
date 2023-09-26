import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { KoreksiSuratPage } from "../../../../support/pages/sidebar/kotak_masuk/7_koreksi.cy"

let koreksiSuratPage = new KoreksiSuratPage()
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

before(() => {
    loginPage.loginViaV1(user.nipPemeriksa2, user.password)
    loginPage.directLogin()
})

describe('Koreksi Naskah Skenario', { testIsolation: false }, () => {
    qase(368,
        it('Akses halaman koreksi naskah', () => {
            koreksiSuratPage.goToNaskahBelumDireview()
        })
    )

    qase(370,
        it('Cek detail halaman koreksi naskah', () => {
            koreksiSuratPage.checkDetailKoreksiTandatangani()
        })
    )

    qase(372,
        it('Akses form editing kepala naskah (koreksi)', () => {
            koreksiSuratPage.koreksiTandatanganiNaskah(user.passphrase)
        })
    )
}) 