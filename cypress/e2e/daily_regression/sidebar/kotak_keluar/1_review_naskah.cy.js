import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ListSuratReviewNaskahKeluarPage } from "../../../../support/pages/sidebar/kotak_keluar/list_surat_review_naskah.cy"

let listSuratReviewNaskahKeluarPage = new ListSuratReviewNaskahKeluarPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

after(() => {
    loginPage.logoutV2step2()
})

describe('List Review Naskah Kotak Keluar Skenario', { testIsolation: false }, () => {
    qase(513,
        it('Akses halaman kotak keluar review naskah', () => {
            loginPage.loginViaV1(user.nip, user.password)
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
            listSuratReviewNaskahKeluarPage.checkSearchResultsTujuanKotakKeluar()
        })
    )

    qase(324,
        it('Cek hasil pencarian Perihal pada kotak keluar review naskah', () => {
            listSuratReviewNaskahKeluarPage.checkSearchResultsPerihalKotakKeluar()
        })
    )

    qase([332, 725, 515, 546],
        it('Cek preview PDF Surat pada Kotak Keluar', () => {
            listSuratReviewNaskahKeluarPage.checkPreviewPDFSurat()
            cy.wait(6000)
        })
    )
})