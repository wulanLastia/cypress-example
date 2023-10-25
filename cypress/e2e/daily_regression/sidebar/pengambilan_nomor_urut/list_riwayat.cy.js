import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PengambilanNomorUrutPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut.cy"
import { AmbilNomorOtomatisPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/ambil_nomor_otomatis.cy"
import { ListRiwayatPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/list_riwayat.cy"

let pengambilanNomorUrutPage = new PengambilanNomorUrutPage()
let ambilNomorOtomatisPage = new AmbilNomorOtomatisPage()
let listRiwayatPage = new ListRiwayatPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let jenis_naskah
let uk_up

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/penomoran/jenis_naskah.json').then((data) => {
        jenis_naskah = data
    })

    cy.fixture('non_cred/penomoran/uk_up.json').then((data) => {
        uk_up = data
    })

    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

after(() => {
    loginPage.logoutV2step2()
})

describe('List riwayat pengambilan nomor urut', { testIsolation: false }, () => {

    qase([1006, 1035],
        it('Cek detail list riwayat pengambilan nomor', () => {
            // Login
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Akses menu pengambilan nomor
            menuPage.goToPengambilanNomor()

            // Cek detail list riwayat
            listRiwayatPage.checkDetail()
        })
    )

    qase([1109, 1012, 1014, 1015, 1054],
        it('Cek tombol aksi jika status belum registrasi', () => {
            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)

            // Cek popup
            ambilNomorOtomatisPage.checkPopupPengambilanNomor(jenis_naskah.jenis_naskah1, uk_up.uk_kadispusipda)

            // Cek detail
            ambilNomorOtomatisPage.checkDetailPopupPengambilanNomor()

            // Dapatkan nomor urut
            ambilNomorOtomatisPage.checkPopupDapatkanNomorUrut()

            // Selesai mendapatkan nomor
            ambilNomorOtomatisPage.checkBtnSelesaiMendapatkanNomor()

            // Cek tombol aksi
            listRiwayatPage.checkBtnAksi()
        })
    )

    qase(1045,
        it('Cek tampilan jika status belum registrasi', () => {
            listRiwayatPage.checkTampilanStatusBelumRegistrasi()
        })
    )

})
