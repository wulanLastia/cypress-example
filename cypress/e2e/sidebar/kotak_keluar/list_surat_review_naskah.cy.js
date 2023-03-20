import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu.cy"
import { ListSuratReviewNaskahKeluarPage } from "../../../support/pages/sidebar/kotak_keluar/list_surat_review_naskah.cy"

let listSuratReviewNaskahKeluarPage = new ListSuratReviewNaskahKeluarPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.fixture('credentials.json').then((data) => {
        user = data
    })
})

after(() => {
    qase(411,
        loginPage.logout()
    )
})

describe('List Review Naskah Kotak Keluar Skenario', () => {
    qase(313,
        it('Akses menu kotak keluar (Review naskah)', () => {
            loginPage.navigateLoginPage()
            loginPage.enterNip(user.nip)
            loginPage.clickBtnMasuk()
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )

    qase(314,
        it('Cek detail halaman naskah kotak keluar review naskah', () => {
            listSuratReviewNaskahKeluarPage.checkDetailHalaman()
        })
    )
})