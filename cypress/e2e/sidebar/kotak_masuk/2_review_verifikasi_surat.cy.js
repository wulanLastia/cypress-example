import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { ReviewVerifikasiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/2_review_verifikasi_surat.cy"

let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nipPemeriksa2, user.password)
    loginPage.directLogin()
})

after(() => {
    qase(411,
        loginPage.backToV1()
    )
})

describe('Detail Review dan Verifikasi hasil Surat (Kotak Masuk) Skenario', { testIsolation: false }, () => {
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(358,
        it('Cek detail halaman detail kotak masuk review naskah dengan status belum direview', () => {
            reviewVerifikasiSuratPage.suratBelumDireview()
        })
    )

    qase(99,
        it('Batal review naskah di kotak masuk', () => {
            reviewVerifikasiSuratPage.lanjutkanReviewDrafting()
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )
})