import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { ListSuratReviewNaskahPage } from "../../../../support/pages/sidebar/kotak_masuk/1_list_surat_review_naskah.cy"

let listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()
let menuPage = new MenuPage()
let loginPage = new LoginPage()
let user
let data_filter

beforeEach(() => {
    cy.fixture('non_cred/kepala_surat/filter_kotak_masuk_dan_keluar.json').then((data) => {
        data_filter = data
    })

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

describe('Filter Naskah Kotak Masuk Skenario', { testIsolation: false }, () => {
    qase(97,
        it('Akses menu kotak masuk (Review naskah)', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

    // Filter Sifat //
    qase(243,
        it('Filter sifat biasa', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat1)
        })
    )

    qase(244,
        it('Filter sifat konfidensial', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat2)
        })
    )

    qase(245,
        it('Filter sifat penting', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat3)
        })
    )

    qase(246,
        it('Filter sifat rahasia', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat4)
        })
    )

    qase(247,
        it('Filter sifat sangat rahasia', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat5)
        })
    )
    // End Filter Sifat //

    // Filter Urgensi //
    qase(217,
        it('Filter urgensi biasa', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi1)
        })
    )

    qase(218,
        it('Filter urgensi penting', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi2)
        })
    )

    qase(219,
        it('Filter urgensi segera', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi3)
        })
    )

    qase(220,
        it('Filter urgensi amat segera', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi4)
        })
    )
    // End Filter Urgensi //

    // Filter Status //
    qase(210,
        it('Filter status belum direview', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status1)
        })
    )

    qase(211,
        it('Filter status belum ditandatangani', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status2)
        })
    )

    qase(213,
        it('Filter status dikembalikan', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status3)
        })
    )
    // End Filter Status //

    // Filter Jenis Naskah //
    qase(248,
        it('Filter jenis naskah nota dinas', () => {
            listSuratReviewNaskahPage.filterJenisNaskah(data_filter.filter_jenis_naskah[0].jenis_naskah1)
        })
    )

    qase(461,
        it('Filter jenis naskah surat biasa', () => {
            listSuratReviewNaskahPage.filterJenisNaskah(data_filter.filter_jenis_naskah[0].jenis_naskah2)
        })
    )

    qase(464,
        it('Filter jenis naskah surat perintah', () => {
            listSuratReviewNaskahPage.filterJenisNaskah(data_filter.filter_jenis_naskah[0].jenis_naskah3)
        })
    )
    // End Jenis Naskah //
})