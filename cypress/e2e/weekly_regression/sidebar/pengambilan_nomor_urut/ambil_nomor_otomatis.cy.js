import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PengambilanNomorUrutPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut.cy"
import { AmbilNomorOtomatisPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/ambil_nomor_otomatis.cy"

let pengambilanNomorUrutPage = new PengambilanNomorUrutPage()
let ambilNomorOtomatisPage = new AmbilNomorOtomatisPage()
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


})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

after(() => {
    loginPage.logoutV2step2()
})

describe('Ambil Nomor Otomatis', { testIsolation: false }, () => {

    qase([1006, 1009, 1012],
        it('Cek pop up jika mengambil nomor hari ini', () => {
            // Akses menu pengambilan nomor
            menuPage.goToPengambilanNomor()

            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)

            // Cek popup
            ambilNomorOtomatisPage.checkPopupPengambilanNomor(jenis_naskah.jenis_naskah1, uk_up.uk_kadispusipda)
        })
    )

    qase(1016,
        it('Cek fungsi tombol Batal', () => {
            ambilNomorOtomatisPage.batalMengambilNomorUrut()
        })
    )

    qase(1013,
        it('Cek detail pop up konfirmasi penomoran naskah otomatis', () => {
            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)

            // Cek popup
            ambilNomorOtomatisPage.checkPopupPengambilanNomor(jenis_naskah.jenis_naskah1, uk_up.uk_kadispusipda)

            // Cek detail
            ambilNomorOtomatisPage.checkDetailPopupPengambilanNomor()
        })
    )

    qase(1014,
        it('Cek fungsi tombol Dapatkan nomor urut', () => {
            ambilNomorOtomatisPage.checkPopupDapatkanNomorUrut()
        })
    )

    qase(1015,
        it('Cek fungsi tombol Selesai', () => {
            ambilNomorOtomatisPage.checkBtnSelesaiMendapatkanNomor()
        })
    )

    qase(1017,
        it('Cek nomor urut', () => {
            ambilNomorOtomatisPage.checkNomorUrut()
        })
    )

})