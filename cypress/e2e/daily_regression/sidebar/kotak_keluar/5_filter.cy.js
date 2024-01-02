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

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
        'SIDEBAR-V1-LOGIN-CAPTCHA': true
    })
})

after(() => {
    loginPage.logoutV2step2()
})

describe('Filter Naskah Kotak Keluar Skenario', { testIsolation: false }, () => {
    qase(513,
        it('Akses halaman kotak keluar review naskah', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()
            menuPage.goToKotakKeluarReviewNaskah()
        })
    )

    // Filter Sifat //
    qase(342,
        it('Filter sifat biasa', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat1)
        })
    )

    qase(343,
        it('Filter sifat konfidensial', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat2)
        })
    )

    qase(344,
        it('Filter sifat penting', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat3)
        })
    )

    qase(345,
        it('Filter sifat rahasia', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat4)
        })
    )

    qase(346,
        it('Filter sifat sangat rahasia', () => {
            listSuratReviewNaskahPage.filterSifat(data_filter.filter_sifat[0].sifat5)
        })
    )
    // End Filter Sifat //

    // Filter Urgensi //
    qase(338,
        it('Filter urgensi biasa', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi1)
        })
    )

    qase(339,
        it('Filter urgensi penting', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi2)
        })
    )

    qase(340,
        it('Filter urgensi segera', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi3)
        })
    )

    qase(341,
        it('Filter urgensi amat segera', () => {
            listSuratReviewNaskahPage.filterUrgensi(data_filter.filter_urgensi[0].urgensi4)
        })
    )
    // End Filter Urgensi //

    // Filter Status //
    qase(328,
        it('Filter status belum direview', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status1)
        })
    )

    qase(329,
        it('Filter status belum ditandatangani', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status2)
        })
    )

    qase(332,
        it('Filter status disetujui', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status4)
        })
    )

    qase(331,
        it('Filter status dikembalikan', () => {
            listSuratReviewNaskahPage.filterStatus(data_filter.filter_status[0].status3)
        })
    )
    // End Filter Status //

    // Filter Jenis Naskah //
    qase(466,
        it('Filter jenis naskah nota dinas', () => {
            listSuratReviewNaskahPage.filterJenisNaskah(data_filter.filter_jenis_naskah[0].jenis_naskah1)
        })
    )

    qase(468,
        it('Filter jenis naskah surat biasa', () => {
            listSuratReviewNaskahPage.filterJenisNaskah(data_filter.filter_jenis_naskah[0].jenis_naskah2)
        })
    )

    qase(471,
        it('Filter jenis naskah surat perintah', () => {
            listSuratReviewNaskahPage.filterJenisNaskah(data_filter.filter_jenis_naskah[0].jenis_naskah3)
        })
    )
    // End Jenis Naskah //
})