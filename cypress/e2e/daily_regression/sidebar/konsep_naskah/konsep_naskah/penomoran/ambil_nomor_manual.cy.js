import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../../support/pages/sidebar/menu/menu.cy"
import { AmbilNomorManualPage } from "../../../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/penomoran/ambil_nomor_manual.cy"

let ambilNomorManualPage = new AmbilNomorManualPage()
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

/*after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})*/

describe('Ambil Nomor Manual Skenario', { testIsolation: false }, () => {
    qase(1206,
        it('Cek pop up jika mengambil nomor manual', () => {
            ambilNomorManualPage.aksesKonsepNaskahSuratBiasa()
            ambilNomorManualPage.aksesFormEditingKakiSurat()
            ambilNomorManualPage.aksesFormEditingKepalaSurat()
            ambilNomorManualPage.checkPopUpPenomoranManual()
        })
    )

    qase(1210,
        it('Cek detail pop up pilih tanggal penomoran manual', () => {
            ambilNomorManualPage.checkDetail()
        })
    )

})