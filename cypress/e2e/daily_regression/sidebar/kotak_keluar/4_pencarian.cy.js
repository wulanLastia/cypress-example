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

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
        'SIDEBAR-V1-LOGIN-CAPTCHA': true
    })
})

after(() => {
    loginPage.logoutV2step2()
})

describe('Pencarian Naskah Kotak Keluar Skenario', { testIsolation: false }, () => {
    qase(513,
        it('Akses halaman kotak keluar review naskah', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )

    qase(324,
        it('Akses halaman kotak keluar review naskah', () => {
            listSuratReviewNaskahPage.searchDokumen('Automation')
        })
    )

    qase(323,
        it('Cek aksi pencarian jika kata kunci kurang dari 3 karakter', () => {
            listSuratReviewNaskahPage.searchDokumen('Di')
        })
    )

    qase(325,
        it('Melakukan pencarian dengan kata kunci yang tidak tersedia pada data', () => {
            listSuratReviewNaskahPage.searchDokumen('<script>alert("hai")</script>')
        })
    )

    qase(205,
        it('Melakukan pencarian dengan kata kunci yang tidak tersedia pada data', () => {
            listSuratReviewNaskahPage.searchDokumen('XX1234XX')
        })
    )
})