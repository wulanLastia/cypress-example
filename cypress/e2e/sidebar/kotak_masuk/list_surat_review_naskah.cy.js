import { qase } from 'cypress-qase-reporter/dist/mocha'
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu.cy"
import { ListSuratReviewNaskahPage } from "../../../support/pages/sidebar/kotak_masuk/list_surat_review_naskah.cy"

let listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

beforeEach(() => {
    loginPage.navigateLoginPage()
    loginPage.enterNip(user.nip)
    loginPage.clickBtnMasuk()
})

afterEach(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('List Surat Review Naskah Skenario', () => {
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(202,
        it.only('Cek detail halaman naskah kotak masuk review naskah', () => {
            menuPage.goToKotakMasukReviewNaskah()
            listSuratReviewNaskahPage.checkDetailHalaman()
        })
    )
})