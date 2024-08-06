import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ListSuratReviewNaskahKeluarPage } from "../../../../support/pages/sidebar/kotak_keluar/list_surat_review_naskah.cy"

let listSuratReviewNaskahKeluarPage = new ListSuratReviewNaskahKeluarPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user
let data_filter

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/filter_kotak_masuk_dan_keluar.json').then((data) => {
        data_filter = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })


})

after(() => {
    loginPage.logoutV2step2()
})

describe('List Review Naskah Kotak Keluar Skenario', { testIsolation: false }, () => {
    qase(513,
        it('Akses halaman kotak keluar review naskah', () => {
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )

    qase(314,
        it('Cek detail halaman naskah kotak keluar review naskah', () => {
            listSuratReviewNaskahKeluarPage.checkDetailHalaman()
        })
    )

    qase(324,
        it('Cek hasil pencarian Tujuan pada kotak keluar review naskah', () => {
            listSuratReviewNaskahKeluarPage.checkSearchResultsTujuanKotakKeluar(data_filter.search_kotak_keluar[0].search_tujuan)
        })
    )

    qase(324,
        it('Cek hasil pencarian Perihal pada kotak keluar review naskah', () => {
            listSuratReviewNaskahKeluarPage.checkSearchResultsPerihalKotakKeluar(data_filter.search_kotak_keluar[0].search_perihal)
        })
    )

    qase([332, 725, 515, 546],
        it('Cek preview PDF Surat pada Kotak Keluar', () => {
            listSuratReviewNaskahKeluarPage.checkPreviewPDFSurat()
            cy.wait(6000)
        })
    )
})