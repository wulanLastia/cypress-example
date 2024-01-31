import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../../support/pages/auth/login.cy"
import { ListNaskahSuratBiasaPage } from "../../../../../../support/pages/sidebar/konsep_naskah/surat_biasa/drafting_luar/list_jenis_naskah.cy"

let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

/*after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})*/

describe('Drafting Luar - Test Case List Jenis Naskah', { testIsolation: false }, () => {

    qase(1825,
        it('Mengakses halaman konsep naskah', () => {
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            listNaskahSuratBiasaPage.batalDrafting()
        })
    )

    qase(1823,
        it('Scroll list semua template', () => {
            listNaskahSuratBiasaPage.scrollListDown()
            listNaskahSuratBiasaPage.scrollListUp()
        })
    )

    qase(1826,
        it('Cek kesesuaian button Buat Draft jika naskah termasuk drafting dalam', () => {
            listNaskahSuratBiasaPage.checkButtonBuatDraft()
        })
    )

    qase(2651,
        it('Cek kesesuaian flag Multifile jika naskah dapat melakukan upload multifile', () => {
            listNaskahSuratBiasaPage.checkFlagMultifile()
        })
    )

    qase(2652,
        it('Cek kesesuaian flag eMaterai jika naskah mengharuskan membubukan ematerai', () => {
            listNaskahSuratBiasaPage.checkFlagEmaterai()
        })
    )

    qase(2696,
        it('Cek redirect halaman buat naskah pada jenis naskah surat biasa', () => {
            listNaskahSuratBiasaPage.checkDirectSuratBiasa()
            listNaskahSuratBiasaPage.batalDrafting()
        })
    )

    qase(2695,
        it('Cek redirect halaman buat naskah pada jenis naskah nota dinas', () => {
            listNaskahSuratBiasaPage.checkDirectNotaDinas()
        })
    )
})