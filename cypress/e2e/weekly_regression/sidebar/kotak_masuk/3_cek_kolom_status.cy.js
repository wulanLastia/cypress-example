import { qase } from 'cypress-qase-reporter/dist/mocha';
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

describe('Pengecekan Kolom Status', { testIsolation: false }, () => {
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            loginPage.loginViaV1(user.nipPemeriksa, user.password)
            loginPage.directLogin()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    qase([221, 222],
        it('Cek warna label status', () => {
            listSuratReviewNaskahPage.checkWarnaLabelStatus()
        })
    )
})