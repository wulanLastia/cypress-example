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

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

afterEach(() => {
    cy.wait(3000)

    loginPage.logoutV2step2()
})

describe('Pengambilan nomor urut oleh user UK memilih UK Setda', () => {

    qase([1006, 1109, 1012, 1014, 1015, 1054, 1045, 1017],
        it('Cek detail list riwayat pengambilan nomor', () => {
            // Login
            loginPage.loginViaV1(user.nipUK, user.password)
            loginPage.directLogin()

            // Akses menu pengambilan nomor
            menuPage.goToPengambilanNomor()

            // Isi seluruh field form
            pengambilanNomorUrutPage.inputJenisNaskah(jenis_naskah.jenis_naskah1)
            pengambilanNomorUrutPage.inputUKUP(uk_up.uk_setda)

            // Cek popup
            ambilNomorOtomatisPage.checkPopupPengambilanNomor(jenis_naskah.jenis_naskah1, uk_up.uk_setda)

            // Cek detail
            ambilNomorOtomatisPage.checkDetailPopupPengambilanNomor()

            // Dapatkan nomor urut
            ambilNomorOtomatisPage.checkPopupDapatkanNomorUrut()

            // Selesai mendapatkan nomor
            ambilNomorOtomatisPage.checkBtnSelesaiMendapatkanNomor()

            // Cek tombol aksi
            listRiwayatPage.checkBtnAksi()

            // Check tampilan badge status
            listRiwayatPage.checkTampilanStatusBelumRegistrasi()

            // Validasi pada list UK yang bersangkutan
            ambilNomorOtomatisPage.checkNomorUrut()
        })
    )

    qase(1598,
        it('Cek data pada list ketika memilih UK sekda', () => {
            // Login
            loginPage.loginViaV1(user.nipUKSetda, user.password)
            loginPage.directLogin()

            // Validasi data pada list UK yang mengambil diluar organisasinya
            listRiwayatPage.validasiNomorUrutDiluarOrg()
        })
    )

})
