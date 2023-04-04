import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { DraftingKonsepNaskahPage } from "../../../support/pages/sidebar/konsep_naskah/drafting_konsep_naskah.cy"
import { ReviewVerifikasiSuratPage } from "../../../support/pages/sidebar/kotak_masuk/review_verifikasi_surat.cy"

let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
let reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

before(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nipPemeriksa)
    loginPage.clickBtnMasuk()
})

/*after(() => {
    qase(411,
        loginPage.logout()
    )
})*/

describe('Detail Review dan Verifikasi hasil Surat (Kotak Masuk) Skenario', () => {
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

    qase(77,
        it('Melanjutkan drafting konsep naskah', () => {
            reviewVerifikasiSuratPage.lanjutkanReviewDrafting()
        })
    )
})