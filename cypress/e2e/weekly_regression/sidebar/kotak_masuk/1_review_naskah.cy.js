import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ListSuratReviewNaskahPage } from "../../../../support/pages/sidebar/kotak_masuk/1_list_surat_review_naskah.cy"

let listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })


})

after(() => {
    loginPage.logoutV2step2()
})

describe('List Surat Review Naskah Kotak Masuk Skenario', { testIsolation: false }, () => {
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase(202,
        it('Cek detail halaman naskah kotak masuk review naskah', () => {
            cy.wait(3000)
            listSuratReviewNaskahPage.checkDetailHalaman()
        })
    )

    qase(232,
        it('Cek tombol Sebelumnya pada halaman pertama tabel', () => {
            listSuratReviewNaskahPage.checkPreviousPage()
        })
    )
})