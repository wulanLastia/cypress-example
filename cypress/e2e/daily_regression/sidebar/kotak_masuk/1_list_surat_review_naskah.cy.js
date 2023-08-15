import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ListSuratReviewNaskahPage } from "../../../../support/pages/sidebar/kotak_masuk/1_list_surat_review_naskah.cy"

let listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('credentials_dev.json').then((data) => {
        user = data
    })
})

after(() => {
    qase(411,
        loginPage.logoutV2()
    )
})

describe('List Surat Review Naskah Kotak Masuk Skenario', { testIsolation: false }, () => {
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(202,
        it('Cek detail halaman naskah kotak masuk review naskah', () => {
            listSuratReviewNaskahPage.checkDetailHalaman()
        })
    )
})