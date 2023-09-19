import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../support/pages/sidebar/menu/menu.cy"
import { PengambilanNomorUrutPage } from "../../../../support/pages/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut.cy"

let pengambilanNomorUrutPage = new PengambilanNomorUrutPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let jenis_naskah
let uk_up

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('credentials_dev.json').then((data) => {
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
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()
})

after(() => {
    loginPage.logoutV2step2()
})

describe('Pengambilan Nomor Urut (Drafting Luar)', { testIsolation: false }, () => {

    qase(1006,
        it('Akses halaman Pengambilan Nomor', () => {
            menuPage.goToPengambilanNomor()
        })
    )

    qase(1007,
        it('Cek detail form ambil nomor', () => {
            pengambilanNomorUrutPage.checkForm()
        })
    )

    qase(1008,
        it('Cek tombol ambil nomor jika belum mengisi field kategori jenis naskah', () => {
            pengambilanNomorUrutPage.checkBtnAmbilNomorBeforeJenisNaskah()
        })
    )

    qase(1010,
        it('Cek tombol ambil nomor jika belum mengisi field UK/UP', () => {
            pengambilanNomorUrutPage.checkBtnAmbilNomorBeforeUKUP()
        })
    )

    qase(1011,
        it('Cek field UK/UP jika belum mengisi field kategori jenis naskah', () => {
            pengambilanNomorUrutPage.checkFilterUKUPBeforeJenisNaskah()
        })
    )

    qase(1105,
        it('Cek dropdown list kategori jenis naskah jika role user biasa', () => {
            pengambilanNomorUrutPage.checkFilterJenisNaskahUserBiasa()
        })
    )

    qase(1109,
        it('Cek tombol ambil nomor jika sudah mengisi seluruh field', () => {
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_kadispusipda)
            pengambilanNomorUrutPage.checkBtnAmbilNomor()
        })
    )

})
